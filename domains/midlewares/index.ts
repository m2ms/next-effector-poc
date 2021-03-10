import { session } from 'next-session';
import Keycloak from 'keycloak-connect';

const kcConfig = {
  realm: 'squonk',
  'auth-server-url': 'https://squonk.informaticsmatters.org/auth/',
  'ssl-required': 'external',
  resource: 'next-effector-poc',
  credentials: {
    secret: 'a26926f7-874d-442e-8528-ae3f379399ae',
  },
  'confidential-port': 0,
};

const memoryStore = session();
const keycloak = new Keycloak({ store: memoryStore }, kcConfig);

const sessionMiddleware = session({
  name: 'test session',
  //store: memoryStore,
});

export { keycloak, sessionMiddleware };
