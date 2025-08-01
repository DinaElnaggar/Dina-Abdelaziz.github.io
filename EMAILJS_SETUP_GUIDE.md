# EmailJS Setup Guide - Fix Email Reception

## 🚨 **Current Issue**
Your EmailJS is configured but you're not receiving emails. This guide will help you fix this.

## 📋 **Step-by-Step Fix**

### **Step 1: Check Your EmailJS Template**

Go to your EmailJS dashboard and edit template `template_9zxlzjr`. Make sure it has this exact content:

```html
To: dinaabdelaziz514@gmail.com
Subject: New Contact Form Message from {{from_name}}

Hello {{to_name}},

You have received a new message from your portfolio website:

**Name:** {{from_name}}
**Email:** {{from_email}}
**Subject:** {{subject}}

**Message:**
{{message}}

**Additional Info:**
- Website: {{site_url}}
- Reply to: {{reply_to}}

Best regards,
Your Portfolio Website
```

### **Step 2: Verify Your Email Service**

1. Go to EmailJS Dashboard → Email Services
2. Check that `service_bsl9abn` is **Active** and **Connected**
3. Make sure it's connected to your Gmail account
4. Test the service connection

### **Step 3: Check Your Gmail Settings**

1. **Check Spam Folder** - Emails might be going there
2. **Check Gmail Filters** - Make sure no filters are blocking emails
3. **Check Gmail Settings** - Ensure emails from EmailJS are allowed

### **Step 4: Test the Configuration**

1. Open your website
2. Open browser console (F12)
3. Fill out the contact form
4. Submit the form
5. Check console for any error messages

## 🔧 **Common Issues & Solutions**

### **Issue 1: "Recipients address is empty"**
**Solution:** Add `To: dinaabdelaziz514@gmail.com` at the top of your template

### **Issue 2: "Service not found"**
**Solution:** Check your Service ID is correct: `service_bsl9abn`

### **Issue 3: "Template not found"**
**Solution:** Check your Template ID is correct: `template_9zxlzjr`

### **Issue 4: Emails in Spam**
**Solution:** 
- Check your spam folder
- Mark EmailJS emails as "Not Spam"
- Add EmailJS to your contacts

### **Issue 5: Gmail Service Not Connected**
**Solution:**
1. Go to EmailJS → Email Services
2. Reconnect your Gmail service
3. Make sure 2FA is enabled on Gmail
4. Generate a new App Password if needed

## 📧 **Template Variables**

Your template should use these variables:
- `{{from_name}}` - User's name
- `{{from_email}}` - User's email
- `{{subject}}` - Message subject
- `{{message}}` - User's message
- `{{to_name}}` - Your name (Dina Abdelaziz)
- `{{to_email}}` - Your email (dinaabdelaziz514@gmail.com)
- `{{reply_to}}` - User's email (for reply)
- `{{site_url}}` - Website URL

## 🧪 **Testing Steps**

1. **Test with Console:**
   ```javascript
   // Open browser console and run this:
   emailjs.init("0hXIeGG4Xh9uxvPEq");
   emailjs.send('service_bsl9abn', 'template_9zxlzjr', {
       from_name: 'Test User',
       from_email: 'test@example.com',
       subject: 'Test Message',
       message: 'This is a test message',
       to_name: 'Dina Abdelaziz',
       to_email: 'dinaabdelaziz514@gmail.com',
       reply_to: 'test@example.com',
       site_url: window.location.href
   }).then(
       function(response) {
           console.log('SUCCESS:', response);
       },
       function(error) {
           console.log('FAILED:', error);
       }
   );
   ```

2. **Check EmailJS Dashboard:**
   - Go to EmailJS → Activity
   - Look for recent email attempts
   - Check for any error messages

3. **Check Gmail:**
   - Check inbox
   - Check spam folder
   - Check all mail

## 📞 **Alternative Solutions**

If EmailJS continues to have issues, consider:

1. **Formspree** - Simple form handling
2. **Netlify Forms** - If hosting on Netlify
3. **Google Forms** - Embed a Google Form
4. **Direct Email Links** - Use mailto: links

## 🔍 **Debugging Checklist**

- [ ] EmailJS template has correct "To:" field
- [ ] Email service is connected and active
- [ ] Template variables match JavaScript parameters
- [ ] Gmail account is properly configured
- [ ] No spam filters blocking emails
- [ ] Console shows no JavaScript errors
- [ ] EmailJS dashboard shows successful sends

## 📞 **Support**

If you still have issues:
1. Check EmailJS documentation
2. Contact EmailJS support
3. Check your Gmail settings
4. Try a different email service

---

**Remember:** The most common issue is missing the "To:" field in the EmailJS template. Make sure it's the first line of your template! 