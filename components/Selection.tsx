import React from 'react';
import { Button } from '@material-ui/core';
import SelectionView from './SelectionView'
import { useList } from "effector-react";
import { useStore } from "effector-react";
import { currentGeneratedItems, seed, xaxisName, yaxisName, count, selectedIds, savedSelectedItems } from '../state/store';
import { saveSelectedItem, } from '../state/event';
import { SelectionItem } from '../model/selectionItem';

const Selection: React.FC = () => {
    const currentSeed = useStore(seed);
    const ids = useStore(selectedIds);
    const items = useStore(currentGeneratedItems);
    const x = useStore(xaxisName);
    const y = useStore(yaxisName);
    const countValue = useStore(count);

    const saveSelection = async () => {
        let itemsToSave = items.filter(i => ids.includes(i.id));

        let newItemsToSave = itemsToSave.map((item) => {
            return { id: item.id, x: item.fields.find(f => f.name === x)?.value, y: item.fields.find(f => f.name === y)?.value }
        });

        let timestamp = Date.now();
        let selectionItem: SelectionItem = { timestamp: timestamp, seed: currentSeed, count: countValue, data: JSON.stringify(newItemsToSave) };
        saveSelectedItem(selectionItem);
    }

    return (
        <>
            <div className="d-flex flex-column">
                <p className="my-0 mr-md-auto font-weight-bold text-dark"> Selections
            </p>
                <p>{'Restore a saved selection by clicking an option bellow'}</p>
            </div>
            <div className="d-flex pb-3">
                <Button variant="contained" color="default" onClick={() => saveSelection()}>
                    Save selection
                </Button>
            </div>
            <div className="d-flex flex-column overflow-auto" style={{ flex: '1 1 0' }}>
                {useList(savedSelectedItems, (item, itemIndex) => (
                    <SelectionView key={itemIndex} item={item} />
                ))}
            </div>
        </>
    );
}

export default React.memo(Selection);