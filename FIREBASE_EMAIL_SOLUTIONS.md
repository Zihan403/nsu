# Firebase Email Template - Alternative Solutions

## Solution 1: Use Firebase's "Customize Domain" (Recommended)

If Firebase won't let you edit the message body directly, you can customize the domain:

1. In the Firebase Console, look for **"Customize domain"** link (top right)
2. This allows you to:
   - Use your own custom domain (e.g., noreply@yourdomain.com)
   - Customize the sender name
   - Add custom headers

This won't change the email body but makes it look more professional.

---

## Solution 2: Use Custom SMTP (Better Control)

Since Firebase's default email editor is limited, set up a custom SMTP:

1. Go to **Authentication** → **Templates** → **SMTP settings**
2. Click **Set up SMTP**
3. Enter your email provider details:

### Option A: SendGrid (FREE - 100 emails/day)
```
SMTP Host: smtp.sendgrid.net
Port: 587
Username: apikey
Password: [Your SendGrid API Key]
Sender: noreply@yourdomain.com
```

### Option B: Gmail App Password
```
SMTP Host: smtp.gmail.com
Port: 587
Username: your-email@gmail.com
Password: [Your App Password - not regular password]
```

### Option C: Your Own Email Server
Contact your email provider for SMTP details

---

## Solution 3: Use SendGrid Directly (My Recommendation)

Since Firebase templates are limited, use SendGrid which gives you full HTML control:

1. **Get SendGrid API Key:**
   - Go to https://sendgrid.com (Sign up for FREE)
   - Get API Key from Settings → API Keys
   - Create `.env.local` entry: `SENDGRID_API_KEY=your_key_here`

2. **Use the API endpoint I created:**
   - Endpoint: `/api/send-email-verification`
   - Sends beautiful HTML emails with clickable buttons
   - Full branding control

3. **Update your AuthContext to use it:**
   ```typescript
   const sendEmailVerificationFunc = async () => {
     if (!user) throw new Error('No user logged in')
     
     try {
       // Send verification email via Firebase
       await sendEmailVerification(user)
       
       // Also send custom branded email via SendGrid
       await fetch('/api/send-email-verification', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
           email: user.email,
           link: `${window.location.origin}/verify-email`
         })
       })
     } catch (error) {
       console.error('Error:', error)
       throw error
     }
   }
   ```

---

## My Recommendation:

**Use Solution 2 (Firebase SMTP) with SendGrid:**

1. Get free SendGrid account (100 emails/day is plenty for testing)
2. Add to `.env.local`:
   ```
   SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
   SENDGRID_FROM_EMAIL=noreply@yourdomain.com
   ```
3. In Firebase Console:
   - Go to **Authentication** → **Templates** → **SMTP settings**
   - Enter SendGrid SMTP details (host: smtp.sendgrid.net, port: 587)
   - Firebase will now send emails through SendGrid with professional formatting

This gives you **both** Firebase integration + professional HTML emails! ✅

---

## Quick Setup (5 minutes):

1. Go to https://sendgrid.com and sign up (FREE)
2. Get your API Key
3. In Firebase Console, set SMTP settings to SendGrid
4. Done! Firebase now sends beautiful HTML emails

Would you like me to help you set this up?
