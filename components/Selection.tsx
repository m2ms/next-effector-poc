import React from 'react';
import { Button } from '@material-ui/core';
import SelectionView from './SelectionView'
import { useList } from "effector-react";
import { useStore } from "effector-react";
import { $currentGeneratedItems, $seed, $xaxisName, $yaxisName, $count, $selectedIds, $savedSelectedItems } from '../models/store';
import { addSelectedItem, } from '../models';
import { SelectionItem } from '../models/selectionItem';
import { uploadFileRequest } from '../domains/upload/upload.services';
import { useKeycloak } from '@react-keycloak/ssr';
import type { KeycloakInstance } from 'keycloak-js';

const Selection = () => {
    const { keycloak } = useKeycloak<KeycloakInstance>();
    const token = keycloak?.token;

    const seed = useStore($seed);
    const selectedIds = useStore($selectedIds);
    const currentGeneratedItems = useStore($currentGeneratedItems);
    const xaxisName = useStore($xaxisName);
    const yaxisName = useStore($yaxisName);
    const count = useStore($count);

    const saveSelection = async () => {
        let itemsToSave = currentGeneratedItems.filter(i => selectedIds.includes(i.id));

        let newItemsToSave = itemsToSave.map((item) => {
            return { id: item.id, x: item.fields.find(f => f.name === xaxisName)?.value, y: item.fields.find(f => f.name === yaxisName)?.value }
        });

        let timestamp = Date.now();
        let selectionItem: SelectionItem = { timestamp: timestamp, seed: seed, count: count, xaxisName: xaxisName, yaxisName: yaxisName, data: newItemsToSave, };
        addSelectedItem(selectionItem);

        const response = await uploadFileRequest(selectionItem, token);
        console.log(response);
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
                {useList($savedSelectedItems, (item, itemIndex) => (
                    <SelectionView key={itemIndex} item={item} />
                ))}
            </div>
        </>
    );
}

export default React.memo(Selection);