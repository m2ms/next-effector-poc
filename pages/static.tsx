import React from "react";
import { useStore } from "effector-react";
import Link from "next/link";
import { Layout } from '../components/Layout';
import { $currentSelectionItem } from "../models/store";

export default function StaticOptimizedPage() {
    const data = useStore($currentSelectionItem);

    return (
        <Layout title="Static | Next.js PoC">
            <div className="container my-5">
                <div>
                    <h1>Static Page</h1>
                    <div className="mb-1 text-muted">
                        Store state: {JSON.stringify(data)}
                    </div>                    <br />
                    <Link href="/">
                        <a className="text-dark">to server page</a>
                    </Link>
                </div>
            </div>
        </Layout>
    );
}