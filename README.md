# 🌸 Find Your Ikigai

A beautifully crafted web experience exploring the Japanese concept of Ikigai — your reason for being. This interactive site combines philosophy, self-reflection, and AI-powered insights to help you discover the intersection of what you love, what you're good at, what the world needs, and what you can be paid for.

**Live Demo:** https://ikigai-website-omega.vercel.app/

---

## ✨ Features

### 🎨 Design & Experience
- **Japanese-inspired aesthetic** with deep indigo and gold color palette
- **Authentic book cover SVG** with cherry blossom artwork
- **Dark mode toggle** with smooth transitions and spring-bounce animation
- **Particle animations:**
  - Light mode: 30 pink sakura petals falling gracefully
  - Dark mode: 30 gold fireflies (hotaru) rising with pulsing glow
- **Fully responsive** design optimized for mobile and desktop
- **Paper-tone aesthetic** that honors the book's contemplative nature

### 📖 Content Pages
1. **Home** - Beautiful hero section with scroll indicator
2. **Philosophy** - Deep dive into the Ikigai concept
3. **The Map** - Interactive Venn diagram showing the four circles
4. **The Inquiry** - AI-powered five-question discovery flow
5. **Words** - 12 best quotes from the original book by García & Miralles

### 🤖 AI-Powered Discovery
- **Real AI integration** using Groq API (Llama 3.3 70B)
- **Secure backend** via Vercel serverless functions
- **Sophisticated prompt engineering** for genuine synthesis (not template responses)
- **Four-stage generation** with animated progress indicators
- **Personal reflection** delivered as literary prose with:
  - Core Ikigai statement (20-30 words)
  - Three interpretive paragraphs about your nature, convergence, and path forward
  - Resonant quote from the book

### 🔒 Security & Privacy
- **No exposed API keys** in frontend code
- **Serverless backend architecture** on Vercel
- **Environment variables** for secure key storage
- **CORS-enabled** API endpoint
- **No data storage** — all processing happens in real-time

---

## 📁 Project Structure

```
ikigai-website/
├── find-your-ikigai.html    # Main website (frontend)
├── api/
│   └── generate.js          # Serverless function (backend)
└── README.md                # This file
```

---

## 🛠️ Technologies Used

### Frontend
- **HTML5** — Semantic markup
- **CSS3** — Custom properties, animations, responsive design
- **Vanilla JavaScript** — No frameworks, pure ES6+
- **Canvas API** — Particle animation system

### Backend
- **Vercel Serverless Functions** — Node.js runtime
- **Groq API** — AI model (Llama 3.3 70B Versatile)

### Design System
- **Color Palette:**
  - Light: Cream (#F4F1EA), Navy (#1E2A38), Steel Blue (#4A7C9F)
  - Dark: Deep Indigo (#0B0D1A), Gold (#C8A76A), Cream (#E8E2D0)
- **Typography:** Lora (serif) for body, system fonts for UI
- **Animations:** 60fps canvas rendering, CSS transitions

---

## 🙏 Credits

### Content
- **Book:** *Ikigai: The Japanese Secret to a Long and Happy Life*
- **Authors:** Héctor García & Francesc Miralles
- **Quotes:** All quotes verified from the original book

### Development
- **Coded with:** Claude AI by Anthropic
- **Design:** Custom, inspired by Japanese aesthetic principles
- **Artwork:** SVG cherry blossom book cover

### Technologies
- **AI Model:** Llama 3.3 70B by Meta (via Groq)
- **Hosting:** Vercel
- **Version Control:** GitHub

---

## 💬 Contact

**Developer:** Jees Sunny  
**GitHub:** [@jeessunny](https://github.com/jeessunny)  
**Website:** [ikigai-website-omega.vercel.app](https://ikigai-website-omega.vercel.app/)

---

## ⭐ Acknowledgments

- Héctor García & Francesc Miralles for the inspiring book
- The centenarians of Ogimi, Okinawa for sharing their wisdom
- Claude AI (Anthropic) for coding assistance and design implementation

---

<div align="center">

**Built with 🌸 and coded by Claude AI**

*"Only staying active will make you want to live a hundred years."*  
— García & Miralles, *Ikigai*

</div>
