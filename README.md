# DNS Website - Educational Resource

A comprehensive, interactive website about Domain Name Systems (DNS) with a professional design and educational content.

## Features

- **Responsive Design**: Mobile-friendly layout that works on all devices
- **Interactive Navigation**: Smooth scrolling between sections
- **Comprehensive Content**:
  - What is DNS explanation
  - How DNS works (step-by-step process)
  - Common DNS record types (A, AAAA, CNAME, MX, TXT, NS)
  - Benefits of DNS
- **DNS Lookup Tool**: Interactive tool to look up DNS records for any domain
- **Modern UI**: Gradient backgrounds, smooth animations, and card-based layouts

## File Structure

```
├── index.html        # Main HTML file with page structure
├── styles.css        # Complete styling and responsive design
├── script.js         # JavaScript for interactivity
└── README.md         # This file
```

## Getting Started

### Option 1: Direct File Access
Simply open `index.html` in your web browser. No server required for basic functionality.

### Option 2: Local Server (Recommended for DNS Lookup Tool)
For the DNS lookup tool to work properly, run a local web server:

**Using Python 3:**
```bash
python -m http.server 8000
```

**Using Python 2:**
```bash
python -m SimpleHTTPServer 8000
```

**Using Node.js (with http-server):**
```bash
npx http-server
```

Then open `http://localhost:8000` in your browser.

## Sections

### Home
Introduction to DNS with a call-to-action button for exploration.

### What is DNS?
- Definition of DNS
- Purpose and importance
- Speed and efficiency

### How It Works
Step-by-step visualization of the DNS query process:
1. User Query
2. Recursive Resolver
3. Root Nameserver
4. TLD Nameserver
5. Authoritative Nameserver
6. Connection

### DNS Records
Documentation of common DNS record types with examples:
- **A Record**: Maps domains to IPv4 addresses
- **AAAA Record**: Maps domains to IPv6 addresses
- **CNAME Record**: Creates domain aliases
- **MX Record**: Routes emails to mail servers
- **TXT Record**: Holds text information (SPF, DKIM, etc.)
- **NS Record**: Specifies authoritative nameservers

### Benefits
Six key benefits of DNS:
- User-Friendly naming
- Server flexibility
- Security (DNSSEC)
- Load balancing
- Global content delivery
- Email routing

### DNS Lookup Tool
Interactive tool that allows users to:
- Enter a domain name
- View DNS A records (IPv4 addresses)
- Validate domain format
- Handle errors gracefully

## Features Explained

### Responsive Design
The website uses CSS Grid and media queries to adapt to:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (480px - 767px)
- Small Mobile (<480px)

### Animations
- Slide-down animation on page load
- Hover effects on cards and buttons
- Smooth scrolling navigation

### DNS Lookup API
The tool uses the Google Public DNS API (`https://dns.google`) to perform real DNS lookups, allowing users to query actual DNS records.

## Browser Compatibility

- Chrome/Chromium: Full support
- Firefox: Full support
- Safari: Full support
- Edge: Full support
- IE 11: Partial support (some animations may not work)

## Customization

### Colors
The website uses a purple gradient color scheme. To change it:
- Edit the gradient colors in `styles.css`
- Look for: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`

### Content
- Edit text content directly in `index.html`
- Add new sections by duplicating `<section>` blocks
- Update navigation links in the navbar

### Fonts
Change the font-family in `styles.css` (currently using Segoe UI with fallbacks)

## Future Enhancements

Potential additions:
- DNS record type filter/search
- Interactive DNS hierarchy visualization
- DNS security explanation (DNSSEC, DoH)
- Performance testing tools
- Real-time DNS cache visualization
- Blog/articles section

## License

This educational resource is provided as-is for learning purposes.

## Notes

- The DNS lookup tool requires internet access to function
- Some networks/browsers may block the Google DNS API due to CORS restrictions
- For educational purposes, consider setting up your own DNS server demo

---

Created: March 24, 2026