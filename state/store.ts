import { createStore,createDomain } from "effector";
import  { SelectionItem } from "../model/selectionItem";
import  { GeneratedItem } from "../model/item";

const initialState: SelectionItem = 
    {      
      timestamp: new Date().getTime(),
      seed: '15689745',
      data: '',
      count: 250
    };

const initialStateItems: SelectionItem[] = [
    initialState
  ];

export const selectionDomain = createDomain();

export const currentSelectionItem = selectionDomain.createStore(initialState);
export const savedSelectedItems = selectionDomain.createStore(initialStateItems);

export const count = createStore(250, {name: "item"});
export const fromCount = createStore(1);
export const seed = createStore("15689745");
export const xaxisName = createStore("c");
export const yaxisName = createStore("d");
export const allGeneratedItems = createStore(new Array<GeneratedItem>());
export const currentGeneratedItems = createStore(new Array<GeneratedItem>());
export const selectedIds = createStore(new Array<number>());
export const restorePlot = createStore(false);