# Samuel Ofori - Frontend Developer Portfolio

A modern, visually engaging personal portfolio website built with vanilla HTML, CSS, and JavaScript. This portfolio showcases frontend development skills with a focus on responsive design, smooth animations, and user experience.

## 🚀 Features

- **Modern Design**: Clean, confident, and slightly bold aesthetic with strong typography
- **Responsive Layout**: Mobile-first design that works perfectly on all devices
- **Smooth Animations**: Scroll-reveal animations, hover effects, and micro-interactions
- **Performance Optimized**: Fast loading times and smooth scrolling
- **SEO Friendly**: Semantic HTML5 structure with proper meta tags
- **Interactive Elements**: Functional navigation, contact form, and project showcases
- **Dark Mode Ready**: CSS variables support for dark mode themes

## 🎨 Design Highlights

- **Hero Section**: Strong headline with abstract visual elements
- **About Me**: Engaging storytelling with animated statistics
- **Skills Grid**: Modern categorized display of technical skills
- **Projects Showcase**: Interactive project cards with live demo links
- **Services Section**: Client-focused service offerings
- **Contact Form**: Functional contact form with validation
- **Smooth Navigation**: Sticky header with active state indicators

## 🛠️ Technologies Used

- **HTML5**: Semantic markup for accessibility and SEO
- **CSS3**: Modern CSS with custom properties, animations, and responsive design
- **Vanilla JavaScript**: No frameworks - pure JavaScript for functionality
- **Font Awesome**: Icon library for visual elements
- **Google Fonts**: Inter and Space Grotesk for typography

## 📁 Project Structure

```
portfolio-website/
├── index.html          # Main HTML file
├── styles.css          # Complete styling with animations
├── script.js           # Interactive functionality
└── README.md           # Project documentation
```

## 🚀 Getting Started

1. **Clone or Download** the project files
2. **Open `index.html`** in your web browser
3. **That's it!** No build process required

### Local Development

For the best development experience:

```bash
# Using a simple HTTP server (Python 3)
python -m http.server 8000

# Using Node.js live-server
npm install -g live-server
live-server

# Using VS Code Live Server extension
# Right-click index.html and select "Open with Live Server"
```

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

## 🎯 Key Features

### Navigation
- Sticky header with scroll effects
- Mobile hamburger menu
- Smooth scrolling to sections
- Active section highlighting

### Animations
- Fade-in animations on scroll
- Parallax effects in hero section
- Hover states on interactive elements
- Counter animations for statistics
- Morphing abstract shapes

### Contact Form
- Client-side validation
- Email format verification
- Real email sending via Netlify Serverless Function
- Honeypot field to reduce bot spam
- Basic rate limiting on the serverless function
- Loading states and notifications
- Modern floating label design

### Performance
- Optimized CSS with custom properties
- Debounced scroll events
- Intersection Observer for animations
- Minimal JavaScript footprint

## 🎨 Customization

### Colors
Edit the CSS custom properties in `:root`:

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #22d3ee;
    --accent-color: #f43f5e;
    /* ... more colors */
}
```

### Typography
Font families are defined as CSS variables:

```css
:root {
    --font-primary: 'Inter', sans-serif;
    --font-secondary: 'Space Grotesk', sans-serif;
}
```

### Content
Update the following in `index.html`:
- Personal information in the hero section
- About section content
- Projects and their details
- Skills and tools
- Contact information
- Contact form endpoint in `data-endpoint` (defaults to `/.netlify/functions/contact`)

## 🔧 Browser Support

- **Chrome**: 60+
- **Firefox**: 55+
- **Safari**: 12+
- **Edge**: 79+
- **Mobile Safari**: iOS 12+
- **Chrome Mobile**: Android 8+

## 📊 Performance Metrics

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🚀 Deployment

### Static Hosting
This portfolio can be deployed on any static hosting service:

- **Netlify**: Drag and drop the files
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Use the `gh-pages` branch
- **Firebase Hosting**: Use the Firebase CLI
- **Surge.sh**: Simple command-line deployment

### Netlify Serverless Contact Setup

The contact form sends messages through `netlify/functions/contact.js`.

1. Deploy this project to Netlify.
2. In Netlify dashboard, set these environment variables:
   - `RESEND_API_KEY` = your Resend API key
   - `CONTACT_TO_EMAIL` = inbox to receive contact messages (optional, defaults to `samuelofori4@gmail.com`)
   - `CONTACT_FROM_EMAIL` = verified sender identity in Resend (recommended for production)
3. Make sure your sender domain/email is verified in Resend.
4. Submit the contact form from the deployed site to test delivery.
5. Spam protection included:
   - Hidden honeypot field (`company`) to trap bots
   - Minimum form fill time check (3 seconds)
   - Rate limit per IP (5 requests per 15 minutes, 10 seconds between attempts)
6. Verify function health after deploy:
   - Open `https://<your-site>.netlify.app/.netlify/functions/contact`
   - You should see JSON with `ok: true` and config flags.

### Example Deployment Commands

```bash
# Using Surge
npm install -g surge
surge

# Using Firebase
firebase init hosting
firebase deploy

# Using Netlify CLI
npm install -g netlify-cli
netlify deploy --prod --dir .
```

## 📝 SEO Optimization

- Semantic HTML5 structure
- Proper meta tags and descriptions
- Open Graph meta tags for social sharing
- Structured data markup ready
- Clean URL structure
- Image alt attributes

## 🔒 Security

- No server-side dependencies
- Contact form uses a Netlify serverless function
- HTTPS ready (when deployed)
- No third-party tracking scripts

## 🤝 Contributing

This is a personal portfolio, but feel free to use it as inspiration for your own projects. If you find issues or have suggestions:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 About the Developer

Samuel Ofori is a results-driven frontend developer specializing in building responsive, high-converting websites for clients. With a focus on modern design principles and user experience, Samuel transforms ideas into powerful digital experiences that drive real business results.

**Contact:** samuelofori4@gmail.com

---

**Built with passion, creativity, and modern web technologies. 🚀**
