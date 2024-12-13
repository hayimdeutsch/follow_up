export default {
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || 'your-google-client-id-here',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'your-google-client-secret-here',
    redirectUri: process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/auth/google/callback',
    scopes: [
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/gmail.readonly',
      'https://www.googleapis.com/auth/gmail.send',
      'profile',
      'email',
    ],
    accessType: 'offline',  // Still required to get a refresh token
    approvalPrompt: 'auto',
  },
};
