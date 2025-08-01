# EmailJS Setup Guide

This guide will help you set up EmailJS to make your contact form work properly.

## Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Add Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the authentication steps
5. Note down your **Service ID** (you'll need this later)

## Step 3: Create Email Template

1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template content:

```html
Subject: New Contact Form Message from {{from_name}}

Hello {{to_name}},

You have received a new message from your portfolio website:

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

Best regards,
Your Portfolio Website
```

4. Save the template and note down your **Template ID**

## Step 4: Get Your Public Key

1. Go to "Account" → "API Keys"
2. Copy your **Public Key**

## Step 5: Update Your Code

Replace the placeholder values in your `script.js` file:

```javascript
// Replace "YOUR_PUBLIC_KEY" with your actual public key
emailjs.init("0hXIeGG4Xh9uxvPEq");

// Replace "YOUR_SERVICE_ID" with your service ID
// Replace "YOUR_TEMPLATE_ID" with your template ID
emailjs.send('service_bsl9abn', 'template_9zxlzjr', templateParams)
```

## Example with Real Values:

```javascript
// Initialize EmailJS
(function() {
    emailjs.init("0hXIeGG4Xh9uxvPEq"); // Your public key
})();

// In the form submission:
emailjs.send('service_abc123', 'template_xyz789', templateParams)
```

## Step 6: Test Your Form

1. Open your portfolio website
2. Fill out the contact form
3. Submit the form
4. Check your email to see if you received the message

## Troubleshooting

### Common Issues:

1. **"Service not found" error**: Make sure your Service ID is correct
2. **"Template not found" error**: Make sure your Template ID is correct
3. **"Public key invalid" error**: Make sure your Public Key is correct
4. **Emails not sending**: Check your email service configuration

### Free Plan Limitations:

- EmailJS free plan allows 200 emails per month
- For more emails, consider upgrading to a paid plan

## Alternative: Using Gmail SMTP

If you prefer to use Gmail directly:

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password
3. Use Gmail SMTP settings in EmailJS

## Security Notes:

- Never share your private keys publicly
- The public key is safe to use in client-side code
- Consider rate limiting to prevent spam

## Support:

- EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- EmailJS Community: [https://community.emailjs.com/](https://community.emailjs.com/)

---

Once you've completed these steps, your contact form will send real emails to your inbox when someone submits a message through your portfolio website! 