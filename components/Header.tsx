import { useKeycloak } from "@react-keycloak/ssr";
import type { KeycloakInstance } from "keycloak-js";
import Link from "next/link";
import * as React from "react";
import { Home, Star } from "@material-ui/icons";

export const Header: React.FC = () => {
  const { keycloak } = useKeycloak<KeycloakInstance>();

  const appState = keycloak?.authenticated ? (
    <></>
  ) : (
    <>
      <Star fontSize="small" />
      <Link href="/scatterPlot">
        <a className="my-0 mr-md-auto font-weight-bold text-dark">App</a>
      </Link>
    </>
  );

  return (
    <header className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
      <Home fontSize="small" />
      <Link href="/">
        <a className="my-0 mr-md-5 font-weight-bold text-dark">Home</a>
      </Link>
      {appState}
      <nav className="my-2 my-md-0 mr-md-3">
        <Link href="/profile">
          <a className="p-2 text-dark">Profile</a>
        </Link>
      </nav>
      {keycloak?.authenticated ? (
        <>
          <button
            type="button"
            className="mx-2 btn btn-outline-primary"
            onClick={() => {
              if (keycloak) {
                window.location.href = keycloak.createAccountUrl();
              }
            }}
          >
            My Account
          </button>

          <button
            type="button"
            className="mx-2 btn btn-outline-danger"
            onClick={() => {
              if (keycloak) {
                window.location.href = keycloak.createLogoutUrl();
              }
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <button
            type="button"
            className="mx-2 btn btn-outline-primary"
            onClick={() => {
              if (keycloak) {
                window.location.href = keycloak.createRegisterUrl();
              }
            }}
          >
            Signup
          </button>

          <button
            type="button"
            className="mx-2 btn btn-outline-success"
            onClick={() => {
              if (keycloak) {
                window.location.href = keycloak.createLoginUrl();
              }
            }}
          >
            Login
          </button>
        </>
      )}
    </header>
  );
};
