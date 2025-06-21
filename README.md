# notify-nodejs

# **Blog Commenting System with Notifications**  

A **Node.js + Express + MongoDB** backend API for handling blog comments, replies, and notifications.

---

## **✨ Features**  
✅ **User Authentication** (JWT)  
✅ **Nested Commenting System** (Replies to comments)  
✅ **Notifications** (Email)  
✅ **Mention Users** (`@username` detection)  
✅ **Pagination** (Comments & Notifications)  
✅ **Admin Controls** (Delete/modify comments)  

---

## **🚀 Setup Guide**  

### **Prerequisites**  
- Node.js (v16+)  
- MongoDB (Local or Atlas)  
- Nodemailer (for email notifications)  

### **1. Clone the Repository**  
```bash
git clone https://github.com/sarfarazadil/notify-nodejs.git
```

### **2. Install Dependencies**  
```bash
npm install
```

### **3. Configure Environment Variables**  
Create a `.env` file in the root directory:  
```env
MONGO_URI=
JWT_SECRET=
EMAIL_SERVICE=gmail
EMAIL_USERNAME=
EMAIL_PASSWORD=
EMAIL_FROM=
FRONTEND_URL=
PORT=5000
```

### **4. Start the Server**  
```bash
npm start   
```
---

## **📡 API Endpoints**  

### **🔐 Authentication**  
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login user |
| `GET` | `/api/auth/me` | Get current user |

### **💬 Comments**  
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/comments` | Create a comment/reply |
| `GET` | `/api/comments/:postId` | Get comments for a post |
| `GET` | `/api/comments/:postId/thread` | Get nested comments |
| `GET` | `/api/comments/:commentId` | Get a single comment |
| `PATCH` | `/api/comments/:commentId` | Edit a comment |
| `DELETE` | `/api/comments/:commentId` | Delete a comment |

### **🔔 Notifications**  
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/notifications` | Get user notifications (paginated) |
| `PATCH` | `/api/notifications/:id/read` | Mark as read |
| `PATCH` | `/api/notifications/mark-all-read` | Mark all as read |
| `DELETE` | `/api/notifications/:id` | Delete a notification |

---

## Deployment 🚀
 URL:

### **Deployment**  
```bash
URL:  clone https://github.com/sarfarazadil/notify-nodejs.git
```

---

## **🛡️ Security**  
- **JWT Authentication** (Bearer Token)  
- **Password Hashing** (bcrypt)  
- **Rate Limiting** (Recommended: `express-rate-limit`)  

---

## **📞 Support**  
For issues, contact:  
📧 `sarfarazadil18@gmail.com`   

---

**🎉 Happy Coding!**  