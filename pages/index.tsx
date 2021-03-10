import { useKeycloak } from '@react-keycloak/ssr'
import type { KeycloakInstance, KeycloakTokenParsed } from 'keycloak-js'
import { Layout } from '../components/Layout'
import React from "react";
import Link from "next/link";
import { useStore } from "effector-react";
import { withStart } from "effector-next";
import { pageLoaded } from "../models";
import { $currentSelectionItem } from "../models/store";

const enhance = withStart(pageLoaded);

type ParsedToken = KeycloakTokenParsed & {
  email?: string

  preferred_username?: string

  given_name?: string

  family_name?: string
}

function IndexPage() {
  const data = useStore($currentSelectionItem);

  const { keycloak } = useKeycloak<KeycloakInstance>()
  const parsedToken: ParsedToken | undefined = keycloak?.tokenParsed

  const loggedinState = keycloak?.authenticated ? (
    <span className="text-success">logged in</span>
  ) : (
      <span className="text-danger">NOT logged in</span>
    )

  const welcomeMessage =
    keycloak?.authenticated || (keycloak && parsedToken)
      ? `Welcome back ${parsedToken?.preferred_username ?? ''}!`
      : 'Welcome visitor. Please login to continue.'

  return (
    <Layout title="Home | Next.js PoC">
      <div className="container my-5"> <h1 className="mt-5">Hello Next.js PoC + Keycloak 👋</h1>
        <div className="mb-5 lead text-muted">
          This is an example of a Next.js site using Keycloak.
      </div>
        <p>You are: {loggedinState}</p>
        <p>{welcomeMessage}</p>
      </div>
      <div className="container my-5">
        <h1>Server Page</h1>

        <div className="mb-1 lead text-muted">
          Store state: {JSON.stringify(data)}
        </div>
        <br />
        <Link href="/static">
          <a className="text-dark">to static page</a>
        </Link>
      </div>
    </Layout >
  )
}

export default enhance(IndexPage);