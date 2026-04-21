# POP 🎉
### A Full Stack Social Media Application

POP is a full stack social media platform built with the MERN stack. Users can share posts, interact with each other in real time, follow accounts, and engage through likes and comments.

---

## ✨ Features

- 📰 **Posts & Stories Feed** — Create and browse posts and stories from people you follow
- ❤️ **Likes & Comments** — Engage with content through reactions and threaded comments
- 👥 **Follow System** — Follow and unfollow users, personalized feed based on who you follow
- 💬 **Real-Time Chat** — Instant messaging between users powered by Socket.io

---

## 🛠️ Tech Stack

**Frontend**
- React.js
- JavaScript ES6+
- CSS3

**Backend**
- Node.js
- Express.js
- Socket.io (real-time features)

**Database**
- MongoDB
- Mongoose

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 14
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Erfan91/POP.git
cd POP
```

2. **Install dependencies**

Backend:
```bash
cd backend
npm install
```

Frontend:
```bash
cd frontend
npm install
```

3. **Set up environment variables**

Create a `.env` file in src folder inside backend:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

4. **Run the app**

Backend:
```bash
cd backend
npm start
```

Frontend:
```bash
cd frontend
npm start
```

The app will run at `http://localhost:3000`

---

## 📁 Project Structure

```
POP/
├── front/
│   ├── src/
│   │   ├── components/
│   │   ├── styles/
│   │   └── App.jsx
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── controllers/
│   │   ├── index.jsx./ // server
```

---

## 👨‍💻 Author

**Sayed Erfan** — Full Stack MERN Developer  
[GitHub](https://github.com/Erfan91)
