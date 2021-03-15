import { useKeycloak } from '@react-keycloak/ssr'
import type { KeycloakInstance, KeycloakTokenParsed } from 'keycloak-js'
import { Layout } from '../components/Layout'
import React from "react";
import Link from "next/link";
import { useStore } from "effector-react";
import { withStart } from "effector-next";
import { pageLoaded, changeFileCount } from "../models";
import { $currentSelectionItem, $file } from "../models/store";
import { getInitFileRequest } from '../domains/upload/upload.services';
import { Button } from '@material-ui/core';
import { useEvent } from "effector-react";

const enhance = withStart(pageLoaded);

type ParsedToken = KeycloakTokenParsed & {
  email?: string

  preferred_username?: string

  given_name?: string

  family_name?: string
}

interface InitialProps {
  test: string;
}

function IndexPage({ test }: InitialProps) {
  const data = useStore($currentSelectionItem);
  const file = useStore($file);
  const handleChangeFileCount = useEvent(changeFileCount);

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

  const getFile = async (token: string | undefined) => {
    let responseData = await getInitFileRequest(token);

    handleChangeFileCount(responseData);
    console.log("responseData");
    console.log(responseData);
  }

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
        <div className="mb-1 lead text-muted">
          Props: {test}
        </div>
        <br />
        <Link href={"/static"}>
          <a className="text-dark">to static page</a>
        </Link>
        <div>
          <Button variant="contained" color="primary" className='mt-3' onClick={() => getFile(keycloak?.token)}>
            Get File
        </Button>
          <div className="mb-1 lead text-muted">
            File data: {file.data}
          </div>
          <div className="mb-1 lead text-muted">
            File message: {file.message}
          </div>
        </div>
      </div>
    </Layout >
  )
}

export default enhance(IndexPage);