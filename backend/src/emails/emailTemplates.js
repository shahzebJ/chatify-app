export const buildWelcomeEmailTemplate = (name = "Shahzeb") => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111827;">
      <h2 style="margin-bottom: 8px;">Welcome to Chatify, ${name}! 👋</h2>
      <p style="font-size: 15px; line-height: 1.6;">
        Your account has been created successfully.
      </p>
      <p style="font-size: 15px; line-height: 1.6;">
        You can now sign in, start chats, and connect with people instantly.
      </p>
      <a
        href="https://chatify.app"
        style="
          display: inline-block;
          margin-top: 14px;
          background: #2563eb;
          color: #ffffff;
          padding: 10px 16px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
        "
      >
        Open Chatify
      </a>
      <p style="font-size: 12px; color: #6b7280; margin-top: 20px;">
        If you did not create this account, you can safely ignore this email.
      </p>
    </div>
  `;
};
