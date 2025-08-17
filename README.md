# Shreyas Salian - Portfolio Website

A modern, responsive portfolio website showcasing AI Engineering and Full-Stack Development skills.

## Features

- **Responsive Design**: Works perfectly on all devices
- **Interactive Projects**: Filterable project showcase with live demos
- **Smooth Animations**: CSS animations and smooth scrolling
- **Contact Form**: Fully functional contact form with PHP backend
- **Modern UI**: Clean, professional design with gradient accents

## Contact Form Setup

The contact form is now fully functional using **pure PHP** - no third-party services required! Here's what you need:

### Requirements

1. **PHP-enabled hosting** (Most web hosts support this)
2. **Server permissions to send mail** (Check with your host)
3. **SPF/DKIM records** (To prevent emails going to spam)

### How It Works

1. **`mailer.php`** - Server-side script that processes form submissions
2. **Form validation** - Client-side validation with real-time feedback
3. **Direct email delivery** - Emails sent directly to your inbox using PHP's `mail()` function

### Configuration

1. **Update email address**: Open `mailer.php` and change the `$to` variable to your email
2. **Upload files**: Upload both `index.html` and `mailer.php` to your web server
3. **Test the form**: Fill out the contact form and submit to verify it works

### Email Headers

The form includes enhanced headers for better email delivery:
- Proper MIME version and content type
- Reply-To header for easy responses
- X-Mailer identification
- UTF-8 character encoding

### Spam Prevention Tips

To improve email delivery and reduce spam:
1. **Set up SPF records** for your domain
2. **Configure DKIM** authentication
3. **Use a reputable hosting provider** with good mail reputation
4. **Monitor your spam folder** initially

## Current Features

- ✅ Responsive navigation with mobile menu
- ✅ Smooth scrolling and animations
- ✅ Project filtering by category
- ✅ Interactive skills visualization
- ✅ Professional timeline for experience
- ✅ **PHP-based contact form** (no third-party dependencies)
- ✅ Social media integration
- ✅ Back to top button
- ✅ SEO optimized

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Optimized images and assets
- Minimal JavaScript footprint
- CSS animations using transform/opacity for smooth performance
- **No external API calls** - everything runs on your server

## Customization

The website uses CSS custom properties (variables) for easy customization:

```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #1e40af;
    --text-color: #1f2937;
    /* ... more variables */
}
```

## Deployment

1. **Upload all files** to your PHP-enabled web hosting service
2. **Ensure `mailer.php`** is in the same directory as `index.html`
3. **Test the contact form** functionality
4. **Verify email delivery** and check spam folders initially
5. **Set up SPF/DKIM** records for better deliverability

## File Structure

```
your-portfolio/
├── index.html          # Main website
├── style.css           # Styling
├── script.js           # JavaScript functionality
├── mailer.php          # PHP email backend
├── assets/             # Images and media
└── README.md           # This file
```

## Troubleshooting

### Common Issues

1. **Emails not sending**: Check if your host allows PHP mail() function
2. **Emails in spam**: Set up SPF/DKIM records for your domain
3. **Form not working**: Ensure `mailer.php` is in the same directory
4. **Validation errors**: Check browser console for JavaScript errors

### Alternative Solutions

If PHP mail() doesn't work on your hosting:
1. **Contact your host** about mail permissions
2. **Use PHPMailer** for more reliable delivery
3. **Consider SMTP** configuration if available

## Support

For any issues with the contact form:
1. Check your hosting provider's PHP mail support
2. Verify file permissions and directory structure
3. Test with a simple PHP script first
4. Contact your hosting provider for mail configuration help

---

**Note**: This solution uses pure PHP with no external dependencies. All emails are processed and sent directly from your server to your inbox.
