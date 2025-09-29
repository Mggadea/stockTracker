import * as AuthSession from 'expo-auth-session';
export const AUTH0_DOMAIN = "dev-ptswdz57muxafcrm.us.auth0.com";
export const AUTH0_CLIENT_ID = "4AHbqRWPfQGgaonQC5iVHP29qgFL4FZh";
export const AUTH0_REDIRECT_URI = AuthSession.makeRedirectUri();
console.log('Auth0 Redirect URI:', AUTH0_REDIRECT_URI);
