import React from 'react';
import { SelectionItem } from '../models/selectionItem';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteSelectedItem, changeSeed, addSelectedIds, setGeneratedItems, setRestorePlot, changeCount } from '../models';
import { createStore } from "effector";
import { restore } from "effector";
import { useEvent } from "effector-react";

interface SelectionItemProps {
    item: SelectionItem,
}

const restoreSelection = (state: SelectionItem) => {
    const handleChangeCount = useEvent(changeCount);
    const handleChangeSeed = useEvent(changeSeed);

    const { seed, data, count } = restore(state);

    let seedValue = seed.getState();
    let dataValue = data.getState();
    let countValue = count.getState();

    handleChangeCount(countValue);
    handleChangeSeed(seedValue);
    setGeneratedItems([]);
    setRestorePlot(true);

    if (dataValue) {
        let ids = dataValue.map((item: any) => { return item.id });
        addSelectedIds(ids);
    } else {
        addSelectedIds([]);
    }
}

const deleteSelection = (name: number) => {
    deleteSelectedItem(name);
}

const SelectionView = ({ item = { count: 0, data: [], seed: "", xaxisName: "", yaxisName: "", timestamp: Date.now() } }: SelectionItemProps) => {
    let name = item.timestamp;
    const currentSelectionItem = createStore(item, { name: name.toString() });
    //const itemCount = createStore(item.count, { name: name.toString() });
    let itemState = currentSelectionItem.getState();

    return (
        <>
            <div className="d-flex flex-row align-items-center pb-3">
                <div className="d-flex flex-column mr-3">
                    <IconButton aria-label="delete" color="inherit" onClick={() => deleteSelection(name)} >
                        <DeleteIcon />
                    </IconButton>
                </div>
                <div className="d-flex flex-column" >
                    <p className=" my-0" onClick={() => { restoreSelection(itemState) }} style={{ cursor: 'pointer' }}> Selection name {name}</p>
                    <p className=" my-0 text-muted">{JSON.stringify(item).replace(/\\/g, '')}</p>
                </div>
            </div>
        </>
    );
}

export default React.memo(SelectionView);