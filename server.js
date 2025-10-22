const express = require('express');
const path = require('path');
const axios = require('axios');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "https:"],
            scriptSrc: ["'self'"],
            connectSrc: ["'self'"]
        }
    }
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 10 requests per windowMs
    message: {
        success: false,
        message: 'Too many requests, please try again later'
    }
});

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname)));

// Apply rate limiting to API routes
app.use('/api/', limiter);

// Telegram configuration - Security check
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Validate required environment variables
if (!TELEGRAM_BOT_TOKEN || TELEGRAM_BOT_TOKEN === 'your-telegram-bot-token') {
    process.exit(1);
}

if (!TELEGRAM_CHAT_ID || TELEGRAM_CHAT_ID === 'your-telegram-chat-id') {
    process.exit(1);
}

// Send message to Telegram
async function sendToTelegram(data) {
    try {
        const message = `🕯️ *FCJ-Pray - Thắp Hương Online*

👤 *Tên:* ${data.name}
${data.email ? `📧 *Email:* ${data.email}` : '🔒 *Email:* Không cung cấp (riêng tư)'}
⏰ *Thời gian:* ${new Date(data.timestamp).toLocaleString('vi-VN')}
${data.prayer ? `🙏 *Lời cầu nguyện:* ${data.prayer}` : ''}

✨ *Chúc bạn bình an và hạnh phúc!* ✨`;

        const response = await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'Markdown'
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

// API endpoint to send prayer data
app.post('/api/pray', async (req, res) => {
    try {
        const { name, email, prayer, timestamp } = req.body;
        
        // Validate data
        if (!name) {
            return res.status(400).json({ 
                success: false, 
                message: 'Name is required' 
            });
        }
        
        // Validate email format if email provided
        if (email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Invalid email format' 
                });
            }
        }
        
        // Send to Telegram
        await sendToTelegram({
            name,
            email,
            prayer: prayer || '',
            timestamp: timestamp || new Date().toISOString()
        });
        
        res.json({ 
            success: true, 
            message: 'Data sent successfully!' 
        });
        
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error sending data' 
        });
    }
});

// API endpoint to check status
app.get('/api/status', async (req, res) => {
    try {
        res.json({ 
            success: true, 
            message: 'FCJ-Pray server is running',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error checking status' 
        });
    }
});

// Serve static files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(500).json({ 
        success: false, 
        message: 'Server error occurred' 
    });
});

// Start server
app.listen(PORT, () => {
    // Server started
});

module.exports = app;
