import type { NextPage } from 'next'
import * as React from 'react'
import seedrandom from 'seedrandom';
import { Layout } from '../../components/Layout'
import Scatterplot from '../../components/ScatterPlot'
import Selection from '../../components/Selection'
import { TextField, Button } from '@material-ui/core';
import { GeneratedItem } from '../../model/item';
import { setGeneratedItems, saveSeed, saveCount, reset, setRestorePlot } from '../../state/event';
import { fromCount, selectedIds, seed, count, restorePlot } from '../../state/store';
import { useStore } from "effector-react";
import { useEffect } from 'react'

const ScatterPlotPage: NextPage = () => {
    const startFrom = useStore(fromCount);
    const ids = useStore(selectedIds);
    const seedNumber = useStore(seed);
    const countToGenerate = useStore(count);
    const restoring = useStore(restorePlot);

    let joinedIds = ids.join(", ");

    const generateRows = (event: any) => {
        event.preventDefault();
        generateItem();
    }

    const generateItem = () => {

        if (restoring === false) {
            reset();
        }
        setGeneratedItems([]);

        const fromCount = startFrom;
        const toCount = countToGenerate;

        let items: GeneratedItem[];
        let item: GeneratedItem;
        let rng = seedrandom(seedNumber);

        items = [];

        for (var i = fromCount; i < toCount; i++) {
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
        if (restoring === true) {
            generateItem();
            setRestorePlot(false);
        }
    }, [restoring])

    return (
        <Layout title="Scatter Plot | Next.js PoC">
            <div className="d-flex flex-column flex-md-row justify-content-center">
                <div className="d-flex flex-column justify-content-center ">
                    <div className="d-flex flex-column flex-md-row justify-content-center mb-5">
                        <form className="d-flex flex-column flex-md-row justify-content-center w-100" onSubmit={generateRows}>
                            <TextField fullWidth={false} id="count" label="Count" variant="filled" required name="count" value={countToGenerate} className={"mr-1"}
                                onChange={e => saveCount(parseInt(e.target.value))} />

                            <TextField fullWidth={true} id="number" label="Seed" variant="filled" required name="number" value={seedNumber}
                                onChange={e => saveSeed(e.target.value)} />

                            <Button variant="contained" color="primary" className='ml-3 w-25' type="submit">
                                Get Randn
                            </Button>
                        </form>
                    </div>
                    <div className="d-flex flex-column flex-md-row justify-content-center">
                        <Scatterplot width={700} height={500} />
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

export default ScatterPlotPage