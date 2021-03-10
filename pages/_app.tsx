import { SSRCookies, SSRKeycloakProvider } from '@react-keycloak/ssr';
import keycloakJSON from '../keycloak.json';

import type { AppContext } from 'next/app';
import App from "next/app";

import { withHydrate } from "effector-next";
import { parseCookies } from "../utils/utils";

const enhance = withHydrate();

const keycloakCfg = {
  url: keycloakJSON['auth-server-url'],
  realm: keycloakJSON.realm,
  clientId: keycloakJSON.resource,
};

/* interface InitialProps {
  cookies: unknown;
} */

/* const MyApp = ({ Component, pageProps, cookies }: AppProps & InitialProps) => {
  return (
    <SSRKeycloakProvider keycloakConfig={keycloakCfg} persistor={SSRCookies(cookies)}>
      <Component {...pageProps} />
    </SSRKeycloakProvider>
  );
}
 */
/* function parseCookies(req?: IncomingMessage) {
  if (!req || !req.headers) {
    return {};
  }
  return cookie.parse(req.headers.cookie || '');
} */

/* MyApp.getInitialProps = async (context: AppContext) => {

  // Extract cookies from AppContext
  return {
    cookies: parseCookies(context?.ctx?.req),
  };
}; */

function MyComponent({ children }: any) {
  return <>{children}</>
}

class TestApp extends App {

  static async getInitialProps(appContext: AppContext) {
    const appProps = await App.getInitialProps(appContext);
    const cookies = parseCookies(appContext?.ctx?.req);
    appProps.pageProps.cookies = cookies;
    appProps.pageProps.test = "test intial props";

    console.log("appProps");
    console.log(appProps);
    return { ...appProps }
  }

  render() {
    const { Component, pageProps } = this.props
    const cookies = pageProps.cookies;

    return <MyComponent>
      <SSRKeycloakProvider keycloakConfig={keycloakCfg} persistor={SSRCookies(cookies)}>
        <Component {...pageProps} />
      </SSRKeycloakProvider>
    </MyComponent>
  }
}

export default enhance(TestApp);
