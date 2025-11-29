# Firebase Email Template Setup Guide

## Step 1: Go to Firebase Console
1. Open [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **nsu-alumni-5685b**
3. Click **Authentication** in the left sidebar

## Step 2: Access Email Templates
1. Click on the **Templates** tab at the top
2. You should see several template options:
   - Email address verification
   - Password reset
   - Email change confirmation
   - SMS verification

## Step 3: Customize Email Address Verification Template

1. Click on **Email address verification** template
2. Click the **pencil icon** (Edit) to customize

3. **Change these fields:**

   - **Subject:** 
     ```
     Verify Your NSU Alumni Account
     ```

   - **From display name:**
     ```
     NSU Alumni Melbourne
     ```

   - **Email body:** Replace with this HTML:
     ```html
     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb;">
       <!-- Header -->
       <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0;">
         <h1 style="color: white; margin: 0; font-size: 28px;">NSU Alumni Melbourne</h1>
       </div>
       
       <!-- Content -->
       <div style="padding: 40px 20px; background: #f9fafb;">
         <h2 style="color: #1f2937; margin-top: 0; font-size: 24px;">Welcome to NSU Alumni!</h2>
         
         <p style="color: #6b7280; font-size: 16px; line-height: 1.6; margin: 20px 0;">
           Thank you for creating your account. Please verify your email address by clicking the button below.
         </p>
         
         <!-- Verification Button -->
         <div style="text-align: center; margin: 40px 0;">
           <a href="%LINK%" style="display: inline-block; padding: 14px 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px; transition: transform 0.2s; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);">
             Verify Email Address
           </a>
         </div>
         
         <p style="color: #6b7280; font-size: 14px; margin: 30px 0;">
           If the button doesn't work, copy and paste this link in your browser:
         </p>
         
         <p style="background: #e5e7eb; padding: 15px; border-radius: 6px; word-break: break-all; font-family: monospace; font-size: 12px; color: #374151; margin: 0;">
           %LINK%
         </p>
         
         <hr style="margin: 30px 0; border: none; border-top: 1px solid #d1d5db;">
         
         <p style="color: #6b7280; font-size: 14px; margin: 0;">
           <strong>Link expires in:</strong> 24 hours
         </p>
         
         <p style="color: #9ca3af; font-size: 12px; margin: 20px 0 0 0;">
           If you didn't create this account, you can safely ignore this email.
         </p>
       </div>
       
       <!-- Footer -->
       <div style="background: #1f2937; color: white; padding: 20px; text-align: center; font-size: 12px; border-radius: 0 0 8px 8px;">
         <p style="margin: 0;">© 2025 Melbourne NSUers. All rights reserved.</p>
       </div>
     </div>
     ```

## Important Notes:

- **Use `%LINK%`** - This is Firebase's placeholder for the verification link
- **Don't modify the link format** - Firebase automatically injects the correct verification URL
- The template uses HTML, so the link will be clickable ✅

## Step 4: Save Changes

1. Click **Save** button at the bottom
2. Firebase will now send verification emails with your custom template
3. Recipients will see a nice, branded email with a clickable "Verify Email Address" button

## Testing:

1. Go back to your app and try signing up with a new test email
2. Check the email inbox - you should now see the formatted email with a clickable button!
3. Users can now just click the button instead of copying/pasting the link

## Other Templates (Optional):

You can also customize these templates the same way:
- **Password reset** - For forgot password functionality
- **Email change confirmation** - For when users change their email
- **SMS verification** - For phone number verification (if needed)

---

That's it! 🎉 Your Firebase email verification is now fully customized and branded!
