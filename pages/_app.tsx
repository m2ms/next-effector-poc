import cookie from 'cookie';
import { SSRCookies, SSRKeycloakProvider } from '@react-keycloak/ssr';
import keycloakJSON from '../keycloak.json';

import type { IncomingMessage } from 'http';
import type { AppProps, AppContext } from 'next/app';

import { attachReducers } from '../state/reducer';

const keycloakCfg = {
  url: keycloakJSON['auth-server-url'],
  realm: keycloakJSON.realm,
  clientId: keycloakJSON.resource,
};

interface InitialProps {
  cookies: unknown;
}

function MyApp({ Component, pageProps, cookies }: AppProps & InitialProps) {

  attachReducers();
  console.log("cookies");
  console.log(cookies);

  return (
    <SSRKeycloakProvider keycloakConfig={keycloakCfg} persistor={SSRCookies(cookies)}>
      <Component {...pageProps} />
    </SSRKeycloakProvider>
  );
}

function parseCookies(req?: IncomingMessage) {
  if (!req || !req.headers) {
    return {};
  }
  return cookie.parse(req.headers.cookie || '');
}

MyApp.getInitialProps = async (context: AppContext) => {
  // Extract cookies from AppContext
  return {
    cookies: parseCookies(context?.ctx?.req),
  };
};
export default MyApp;
