# 🕯️ FCJ-Pray - Online Prayer Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-14%2B-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.18-blue.svg)](https://expressjs.com/)

A beautiful and secure online prayer platform that allows users to submit their prayers and receive notifications via Telegram. Built with modern web technologies and security best practices.

## ✨ Features

- 🎨 **Beautiful UI**: Modern, responsive design with floating animations
- 🔒 **Privacy-First**: Email is optional for user privacy
- 📱 **Telegram Integration**: Real-time notifications via Telegram Bot
- 🛡️ **Security**: Rate limiting, input validation, and security headers
- 📱 **Responsive**: Works perfectly on desktop, tablet, and mobile
- 🌈 **Custom Branding**: FCJ logo and custom color scheme
- ⚡ **Fast**: Optimized for performance and minimal dependencies

## 🚀 Quick Start

### Prerequisites

- Node.js 14+ 
- npm or yarn
- Telegram Bot Token
- Telegram Chat ID

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nghiadaulau/fcj-pray.git
   cd fcj-pray
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` file:
   ```env
   TELEGRAM_BOT_TOKEN=your-telegram-bot-token-here
   TELEGRAM_CHAT_ID=your-telegram-chat-id-here
   PORT=3000
   NODE_ENV=development
   ```

4. **Start the server**
   ```bash
   npm start
   ```

5. **Open your browser**
   ```
   http://localhost:3000
   ```

## 🔧 Telegram Bot Setup

### Step 1: Create Telegram Bot

1. Open Telegram and search for `@BotFather`
2. Send `/newbot` command
3. Choose a name for your bot (e.g., "FCJ-Pray Bot")
4. Choose a username (e.g., "fcj_pray_bot")
5. Copy the **Bot Token** provided

### Step 2: Get Chat ID

1. Search for `@userinfobot` on Telegram
2. Send `/start` to the bot
3. Copy your **Chat ID** from the response

### Step 3: Configure Environment

Add your credentials to `.env`:
```env
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHAT_ID=123456789
```

## 📁 Project Structure

```
fcj-pray/
├── index.html              # Main HTML file
├── styles.css              # CSS styles and animations
├── script.js               # Frontend JavaScript
├── server.js               # Express server
├── package.json            # Dependencies and scripts
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore rules
├── SECURITY.md             # Security documentation
└── README.md               # This file
```

## 🛡️ Security Features

- **Helmet**: Security headers protection
- **Rate Limiting**: 10 requests per 15 minutes per IP
- **Input Validation**: Name required, email optional with validation
- **Environment Protection**: Sensitive data in environment variables
- **No CORS**: Simplified security model
- **Error Handling**: Graceful error responses

## 📱 API Endpoints

### POST `/api/pray`
Submit a prayer request

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",  // optional
  "prayer": "Prayer message",   // optional
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Data sent successfully!"
}
```

### GET `/api/status`
Check server status

**Response:**
```json
{
  "success": true,
  "message": "FCJ-Pray server is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 🎨 Customization

### Colors
The platform uses a custom color scheme:
- `#F2BBCF` - Light pink
- `#733954` - Dark purple  
- `#A2E4F2` - Light blue
- `#F2CD88` - Light yellow
- `#F2CAA7` - Light orange

### Logo
Replace `fcj-logo.png` with your own logo (recommended size: 200x200px)

### Styling
Modify `styles.css` to customize:
- Colors and gradients
- Animations and effects
- Layout and spacing
- Typography

## 🚀 Deployment

### Heroku
1. Create a new Heroku app
2. Set environment variables in Heroku dashboard
3. Deploy:
   ```bash
   git push heroku main
   ```

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Deploy: `vercel --prod`

### DigitalOcean App Platform
1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically

## 📊 Telegram Message Format

When someone submits a prayer, you'll receive a formatted message:

```
🕯️ FCJ-Pray - Thắp Hương Online

👤 Tên: [Tên người dùng]
📧 Email: [Email] (nếu có)
🔒 Email: Không cung cấp (riêng tư) (nếu không có)
⏰ Thời gian: [Ngày giờ]
🙏 Lời cầu nguyện: [Lời cầu nguyện] (nếu có)

✨ Chúc bạn bình an và hạnh phúc! ✨
```

## 🔧 Development

### Available Scripts

```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
```

### Development Setup

1. Install dependencies: `npm install`
2. Copy environment file: `cp env.example .env`
3. Configure your Telegram credentials
4. Start development server: `npm run dev`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Owner**: [@nghiadaulau](https://github.com/nghiadaulau)
- **Repository**: [fcj-pray](https://github.com/nghiadaulau/fcj-pray)

## 🆘 Support

If you encounter any issues:

1. Check the [Security Guide](SECURITY.md)
2. Verify your Telegram bot configuration
3. Check server logs for errors
4. Open an issue on GitHub

## 🙏 Acknowledgments

- Built with ❤️ for the FCJ community
- Inspired by traditional prayer practices
- Modern web technologies for accessibility

---

**Made with ❤️ by [@nghiadaulau](https://github.com/nghiadaulau)**