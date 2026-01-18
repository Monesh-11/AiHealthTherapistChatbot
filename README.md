# AI Health Therapist

A full-stack web application that provides AI-powered emotional support and therapeutic guidance. Users can register, log in, and chat with an AI therapist that offers empathetic responses and coping strategies for mental health challenges.

## 🌟 Features

- **User Authentication**: Secure registration and login system with JWT tokens
- **AI-Powered Chat**: Real-time chat interface with AI therapist responses
- **Emotional Support**: Specialized responses for anxiety, depression, sleep issues, and stress
- **Message History**: All conversations are saved in the database
- **Responsive Design**: Clean and intuitive chat interface
- **Privacy-Focused**: All data stored securely in MySQL database

## 🛠️ Tech Stack

**Frontend:**
- HTML5
- CSS3
- JavaScript (Vanilla)

**Backend:**
- Node.js
- Express.js
- Prisma ORM

**Database:**
- MySQL

**AI/ML:**
- Groq API (llama-3.1-8b-instant model)

**Authentication:**
- JWT (JSON Web Tokens)
- bcrypt (Password hashing)

## 📋 Prerequisites

Before running the project, ensure you have:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MySQL** (v5.7 or higher) - [Download](https://dev.mysql.com/downloads/mysql/)
- **Groq API Key** (Free) - [Get here](https://console.groq.com/)

## 🚀 Installation

### 1. Clone or Extract the Project

```bash
cd ai-health-therapist
```

### 2. Install Dependencies

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd ../client
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the `server` directory:

```bash
cd ../server
```

Edit `server/.env` and add:

```env
DATABASE_URL="mysql://root:YOUR_PASSWORD@localhost:3306/chatbot"
JWT_SECRET="your-secret-key-here"
GROQ_API_KEY="your-groq-api-key-here"
PORT=4000
```

Replace:
- `YOUR_PASSWORD` - Your MySQL root password
- `your-secret-key-here` - Any random secret string
- `your-groq-api-key-here` - Your Groq API key from https://console.groq.com/

### 4. Set Up Database

```bash
cd server
npx prisma db push
```

This creates the necessary database tables.

## ▶️ How to Execute the Project

### Option 1: Run Both Servers (Recommended)

**Terminal 1 - Start Backend Server:**
```bash
cd server
node src/app.js
```

Expected output:
```
Server running on http://localhost:4000
```

**Terminal 2 - Start Frontend Server:**
```bash
cd client
npx http-server -p 8000
```

Expected output:
```
Available on:
  http://127.0.0.1:8000
```

### Option 2: Using npm Scripts

If you want to add npm scripts, update `server/package.json`:

```json
"scripts": {
  "dev": "node src/app.js",
  "start": "node src/app.js"
}
```

Then run:
```bash
cd server
npm run dev
```

## 🌐 Access the Application

1. Open your browser and go to: **http://localhost:8000**
2. You should see the login page

## 📖 Usage Guide

### 1. Register a New Account

- Click **"Register"** button
- Enter your email and password
- Click **"Register"** to create an account
- You'll see a confirmation message

### 2. Login

- Enter your registered email and password
- Click **"Login"**
- You'll be redirected to the chat page

### 3. Start Chatting

- Type your message in the input field
- Click **"Send"** or press Enter
- The AI therapist will respond with supportive guidance

### Example Messages to Try

- "I don't have mental peace"
- "I'm feeling anxious about my job"
- "I'm having trouble sleeping"
- "How do I deal with stress?"

## 📁 Project Structure

```
ai-health-therapist/
├── client/                          # Frontend application
│   ├── index.html                  # Login page
│   ├── chat.html                   # Chat interface
│   ├── css/
│   │   └── style.css              # Styling
│   └── js/
│       ├── auth.js                # Authentication logic
│       ├── chat.js                # Chat functionality
│       └── api.js                 # API calls
│
├── server/                          # Backend application
│   ├── src/
│   │   ├── app.js                 # Express server setup
│   │   ├── controllers/
│   │   │   ├── authController.js  # User registration/login
│   │   │   └── chatController.js  # Chat message handling
│   │   ├── middleware/
│   │   │   └── authMiddleware.js  # JWT verification
│   │   ├── routes/
│   │   │   ├── authRoutes.js      # Auth endpoints
│   │   │   └── chatRoutes.js      # Chat endpoints
│   │   └── services/
│   │       └── aiService.js       # Groq API integration
│   ├── prisma/
│   │   └── schema.prisma          # Database schema
│   ├── .env                        # Environment variables
│   └── package.json
│
└── README.md                        # This file
```

## 🔌 API Endpoints

### Authentication Endpoints

**Register User**
```
POST /api/auth/register
Body: { "email": "user@example.com", "password": "password123" }
```

**Login User**
```
POST /api/auth/login
Body: { "email": "user@example.com", "password": "password123" }
Response: { "token": "jwt-token-here" }
```

### Chat Endpoints

**Send Message**
```
POST /api/chat/message
Headers: { "Authorization": "Bearer jwt-token-here" }
Body: { "message": "I'm feeling sad" }
Response: { "reply": "AI response here" }
```

## 🐛 Troubleshooting

### Issue: "Cannot find module 'dotenv'"
**Solution:** Run `npm install` in the server directory

### Issue: "Database connection refused"
**Solution:** 
- Make sure MySQL is running
- Check DATABASE_URL in .env file
- Verify username and password

### Issue: "GROQ_API_KEY is not set"
**Solution:**
- Get API key from https://console.groq.com/
- Add it to .env file: `GROQ_API_KEY="your-key"`

### Issue: "Port 4000 already in use"
**Solution:**
```bash
# Windows
netstat -ano | findstr :4000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :4000
kill -9 <PID>
```

### Issue: "Frontend not loading"
**Solution:**
- Check if http-server is running on port 8000
- Try hard refresh: Ctrl+Shift+R
- Clear browser cache

## 📝 Database Schema

### User Table
```sql
- id (INT, Primary Key)
- email (VARCHAR, Unique)
- password (VARCHAR, Hashed)
- createdAt (DATETIME)
```

### Message Table
```sql
- id (INT, Primary Key)
- content (TEXT)
- role (ENUM: 'USER' or 'AI')
- userId (INT, Foreign Key)
- createdAt (DATETIME)
```

## 🔐 Security Features

- Passwords are hashed using bcrypt
- JWT tokens for session management
- SQL injection protection via Prisma ORM
- CORS enabled for frontend communication
- Environment variables for sensitive data

## 🚧 Future Enhancements

- [ ] Message export/download feature
- [ ] Multiple chat sessions
- [ ] User profile management
- [ ] Mood tracking/history
- [ ] Crisis hotline integration
- [ ] Mobile app
- [ ] Dark mode
- [ ] Email notifications
- [ ] Multi-language support

## 📄 License

This project is open source and available for personal and educational use.

## 👨‍💻 Contributing

Contributions are welcome! Feel free to:
1. Fork the project
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 💡 Tips & Best Practices

1. **Keep conversations confidential**: Don't share personal information you wouldn't share elsewhere
2. **Seek professional help**: This AI is a support tool, not a replacement for professional mental health care
3. **Regular backups**: Always backup your database regularly
4. **Update dependencies**: Regularly run `npm update` to get security patches
5. **Monitor logs**: Check server logs for errors during development

## 📞 Support

If you encounter any issues or have questions, please:
1. Check the Troubleshooting section above
2. Review error logs in the terminal
3. Check browser console (F12) for frontend errors
4. Verify API key and database configuration

## ⚠️ Disclaimer

This AI Health Therapist is an educational tool designed to provide emotional support and coping strategies. It should not be used as a replacement for professional mental health care. If you are experiencing a mental health crisis, please contact:

- **US**: National Suicide Prevention Lifeline - 988
- **UK**: Samaritans - 116 123
- **India**: AASRA - 9820466726
- **Global**: Find crisis hotline at findahelpline.com

---

**Happy Chatting!** 🎉

For more information about the Groq API, visit: https://console.groq.com/docs
