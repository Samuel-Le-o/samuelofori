const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const MIN_FORM_FILL_TIME_MS = 3000;
const MIN_SECONDS_BETWEEN_REQUESTS = 10 * 1000;
const rateLimitStore = globalThis.__contactRateLimitStore || new Map();
globalThis.__contactRateLimitStore = rateLimitStore;

function jsonResponse(statusCode, payload) {
    return {
        statusCode,
        headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
        },
        body: JSON.stringify(payload)
    };
}

function getClientIp(event) {
    const headers = event.headers || {};
    return (
        headers['x-nf-client-connection-ip'] ||
        headers['client-ip'] ||
        headers['x-forwarded-for']?.split(',')[0]?.trim() ||
        'unknown'
    );
}

function isRateLimited(clientIp) {
    const now = Date.now();
    const existing = rateLimitStore.get(clientIp) || { count: 0, windowStart: now, lastRequestAt: 0 };

    if (now - existing.windowStart > RATE_LIMIT_WINDOW_MS) {
        existing.count = 0;
        existing.windowStart = now;
    }

    if (now - existing.lastRequestAt < MIN_SECONDS_BETWEEN_REQUESTS) {
        rateLimitStore.set(clientIp, existing);
        return true;
    }

    if (existing.count >= MAX_REQUESTS_PER_WINDOW) {
        rateLimitStore.set(clientIp, existing);
        return true;
    }

    existing.count += 1;
    existing.lastRequestAt = now;
    rateLimitStore.set(clientIp, existing);
    return false;
}

exports.handler = async (event) => {
    if (event.httpMethod === 'GET') {
        return jsonResponse(200, {
            ok: true,
            message: 'Contact function is reachable.',
            config: {
                resendApiKeyConfigured: Boolean(process.env.RESEND_API_KEY),
                contactToEmailConfigured: Boolean(process.env.CONTACT_TO_EMAIL),
                contactFromEmailConfigured: Boolean(process.env.CONTACT_FROM_EMAIL)
            }
        });
    }

    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: corsHeaders,
            body: ''
        };
    }

    if (event.httpMethod !== 'POST') {
        return jsonResponse(405, { message: 'Method Not Allowed' });
    }

    let body;
    try {
        body = JSON.parse(event.body || '{}');
    } catch (error) {
        return jsonResponse(400, { message: 'Invalid request payload.' });
    }

    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim();
    const subject = String(body.subject || '').trim();
    const message = String(body.message || '').trim();
    const company = String(body.company || '').trim();
    const formLoadedAt = Number(body.formLoadedAt || 0);

    // Honeypot check: bots often fill hidden fields.
    if (company) {
        return jsonResponse(200, { message: 'Message received.' });
    }

    if (!formLoadedAt || Number.isNaN(formLoadedAt) || Date.now() - formLoadedAt < MIN_FORM_FILL_TIME_MS) {
        return jsonResponse(400, { message: 'Submission rejected. Please wait a moment and try again.' });
    }

    const clientIp = getClientIp(event);
    if (isRateLimited(clientIp)) {
        return jsonResponse(429, { message: 'Too many requests. Please wait before sending another message.' });
    }

    if (!name || !email || !subject || !message) {
        return jsonResponse(400, { message: 'Please fill in all required fields.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return jsonResponse(400, { message: 'Please provide a valid email address.' });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL || 'samuelofori4@gmail.com';
    const fromEmail = process.env.CONTACT_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';

    if (!resendApiKey) {
        return jsonResponse(500, {
            message: 'Server email configuration is missing. Please set RESEND_API_KEY in Netlify environment variables.'
        });
    }

    try {
        const resendResponse = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${resendApiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from: fromEmail,
                to: [toEmail],
                reply_to: email,
                subject: `Portfolio Contact: ${subject}`,
                    text: `New portfolio contact form submission\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage:\n${message}`,
        const resendData = await resendResponse.json();

        if (!resendResponse.ok) {
            const errorMessage =
                resendData?.message ||
                resendData?.error?.message ||
                resendData?.error ||
                'Unable to send email at this time.';

            console.error('Resend API error:', {
                status: resendResponse.status,
                body: resendData
            });

            return jsonResponse(502, {
                message: errorMessage,
                providerStatus: resendResponse.status,
                providerError: resendData
            });
        }

        return jsonResponse(200, { message: 'Message sent successfully.' });
    } catch (error) {
        console.error('Contact function unexpected error:', error);
        return jsonResponse(500, { message: 'Unexpected server error while sending your message.' });
    }
};
