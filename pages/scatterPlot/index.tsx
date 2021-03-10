import type { NextPage, NextPageContext } from 'next'
import * as React from 'react'
import seedrandom from 'seedrandom';
import { Layout } from '../../components/Layout'
import Selection from '../../components/Selection'
import { TextField, Button } from '@material-ui/core';
import { GeneratedItem } from '../../models/item';
import { pageLoaded, changeCount } from '../../models';
import { setGeneratedItems, changeSeed, reset, setRestorePlot } from '../../models';
import { $selectedIds, $seed, $count, $restorePlot } from '../../models/store';
import { useStore, useEvent } from "effector-react";
import { withStart } from "effector-next";
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { getInitFileRequest } from '../../domains/upload/upload.services';
import { parseCookies } from "../../utils/utils";

const enhance = withStart(pageLoaded);

const DynamicComponentWithNoSSR = dynamic(
    () => import('../../components/ScatterPlot'),
    { ssr: false }
)

interface InitialProps {
    data: number;
}

const ScatterPlotPage: NextPage<InitialProps> = ({ data }) => {
    const selectedIds = useStore($selectedIds);
    const seed = useStore($seed);
    const count = useStore($count);
    const restorePlot = useStore($restorePlot);
    const startFrom = data;
    const joinedIds = selectedIds.join(", ");

    const handleChangeCount = useEvent(changeCount);
    const handleChangeSeed = useEvent(changeSeed);

    const generateRows = (event: any) => {
        event.preventDefault();
        generateItem();
    }

    const generateItem = () => {

        if (restorePlot === false) {
            reset();
        }
        setGeneratedItems([]);

        let items: GeneratedItem[];
        let item: GeneratedItem;
        let rng = seedrandom(seed);

        items = [];

        for (var i = startFrom; i < count; i++) {
            let a = rng();
            let b = rng();
            let c = rng();
            let d = rng();
            item = { id: i, fields: [{ name: 'a', value: a }, { name: 'b', value: b }, { name: 'c', value: c }, { name: 'd', value: d }] };
            items.push(item);
        }

        setGeneratedItems(items);
    }

    useEffect(() => {
        if (restorePlot === true) {
            generateItem();
            setRestorePlot(false);
        }
    }, [restorePlot])

    return (
        <Layout title="Scatter Plot | Next.js PoC">
            <div className="d-flex flex-column flex-md-row justify-content-center">
                <div className="d-flex flex-column justify-content-center ">
                    <div className="d-flex flex-column flex-md-row justify-content-center mb-5">
                        <form className="d-flex flex-column flex-md-row justify-content-center w-100" onSubmit={generateRows}>
                            <TextField fullWidth={false} id="count" label="Count" variant="filled" required value={count} name="count" className={"mr-1"}
                                onChange={e => handleChangeCount(parseInt(e.target.value))} />

                            <TextField fullWidth={true} id="number" label="Seed" variant="filled" required name="number" value={seed}
                                onChange={e => handleChangeSeed(e.target.value)} />

                            <Button variant="contained" color="primary" className='ml-3 w-25' type="submit">
                                Get Randn
                            </Button>
                        </form>
                    </div>
                    <div className="d-flex flex-column flex-md-row justify-content-center">
                        <DynamicComponentWithNoSSR width={800} height={700} />
                    </div>
                    <div className="d-flex flex-column flex-md-row justify-content-start mt-5">
                        <TextField fullWidth={true} id="selection" label="Selection" variant="filled" disabled rows={2} multiline={true} value={joinedIds} />
                    </div>
                </div>
                <div className="d-flex flex-column justify-content-start w-50" style={{ marginTop: 60, marginLeft: 20 }}>
                    <Selection />
                </div>
            </div>
        </Layout >
    )
}
ScatterPlotPage.getInitialProps = async (ctx: NextPageContext) => {

    const cookies = parseCookies(ctx?.req);
    let responseData = await getInitFileRequest();
    return {
        data: responseData as number ?? 1,
        cookies: cookies
    };
};

export default enhance(ScatterPlotPage)