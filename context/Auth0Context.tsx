import * as AuthSession from 'expo-auth-session';
import * as SecureStore from 'expo-secure-store';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { AUTH0_CLIENT_ID, AUTH0_DOMAIN } from '../constants/auth0';

interface AuthContextProps {
  user: any;
  accessToken: string | null;
  login: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Load session from SecureStore on mount
  useEffect(() => {
    (async () => {
      const storedToken = await SecureStore.getItemAsync('auth0_access_token');
      const storedUser = await SecureStore.getItemAsync('auth0_user');
      if (storedToken) setAccessToken(storedToken);
      if (storedUser) setUser(JSON.parse(storedUser));
    })();
  }, []);

  // Auth0 endpoints
  const discovery = {
    authorizationEndpoint: `https://${AUTH0_DOMAIN}/authorize`,
    tokenEndpoint: `https://${AUTH0_DOMAIN}/oauth/token`,
    revocationEndpoint: `https://${AUTH0_DOMAIN}/v2/logout`,
  };

  // Auth request config
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: AUTH0_CLIENT_ID,
      redirectUri: AuthSession.makeRedirectUri({ native: undefined }),
      scopes: ['openid', 'profile', 'email'],
      responseType: AuthSession.ResponseType.Token,
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === 'success' && response.params.access_token) {
      setAccessToken(response.params.access_token);
      SecureStore.setItemAsync('auth0_access_token', response.params.access_token);
      // Optionally fetch user info
      fetch(`https://${AUTH0_DOMAIN}/userinfo`, {
        headers: { Authorization: `Bearer ${response.params.access_token}` },
      })
        .then(res => res.json())
        .then(userInfo => {
          setUser(userInfo);
          SecureStore.setItemAsync('auth0_user', JSON.stringify(userInfo));
        });
    }
  }, [response]);

  const login = async () => {
    await promptAsync();
  };

  const logout = async () => {
    setUser(null);
    setAccessToken(null);
    await SecureStore.deleteItemAsync('auth0_access_token');
    await SecureStore.deleteItemAsync('auth0_user');
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
