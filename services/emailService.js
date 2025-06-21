const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendWelcomeEmail = async (email, username) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Welcome to our Blog Community!',
    html: `<p>Hello ${username},</p>
           <p>Welcome to our blog community! You can now comment on posts and engage with other users.</p>
           <p>Happy blogging!</p>`,
  };

  await transporter.sendMail(mailOptions);
};

const sendCommentNotification = async (email, commenterUsername, postId) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'New comment on your post',
    html: `<p>Hello,</p>
           <p>${commenterUsername} has commented on your post.</p>
           <p><a href="${process.env.FRONTEND_URL}/posts/${postId}">View the comment</a></p>`,
  };

  await transporter.sendMail(mailOptions);
};

const sendReplyNotification = async (email, replierUsername, postId) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'New reply to your comment',
    html: `<p>Hello,</p>
           <p>${replierUsername} has replied to your comment.</p>
           <p><a href="${process.env.FRONTEND_URL}/posts/${postId}">View the reply</a></p>`,
  };

  await transporter.sendMail(mailOptions);
};

const sendMentionNotification = async (email, mentionerUsername, postId) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'You were mentioned in a comment',
    html: `<p>Hello,</p>
           <p>${mentionerUsername} mentioned you in a comment.</p>
           <p><a href="${process.env.FRONTEND_URL}/posts/${postId}">View the comment</a></p>`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendWelcomeEmail,
  sendCommentNotification,
  sendReplyNotification,
  sendMentionNotification,
};