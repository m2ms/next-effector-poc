import { session } from 'next-session';
import Keycloak from 'keycloak-connect';
import keycloakJSON from '../../keycloak.json';

const memoryStore = session();
const keycloak = new Keycloak({ store: memoryStore }, keycloakJSON);

const sessionMiddleware = session({
  name: 'test session',
  //store: memoryStore,
});

export { keycloak, sessionMiddleware };
