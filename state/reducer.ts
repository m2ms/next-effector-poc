import { GeneratedItem } from "../model/item";
import { SelectionItem } from "../model/selectionItem";
import { saveSelectedItem, addSelectedIds, addGeneratedItems, setGeneratedItems, increment, saveSeed,saveCount,deleteSelectedItem, reset,setCUrrentSelectedItem, setRestorePlot} from './event';
import { savedSelectedItems,selectedIds, currentGeneratedItems, fromCount, allGeneratedItems, seed, count, currentSelectionItem, restorePlot } from "./store";

export const attachReducers = () => {   
    allGeneratedItems
    .on(addGeneratedItems, (state, items: GeneratedItem[]) => [...new Set([...state ,...items])])      
    .reset([reset]);
  
    currentGeneratedItems
    .on(setGeneratedItems, (state, items: GeneratedItem[]) => items)    
    .reset([reset]);

    savedSelectedItems
    .on(saveSelectedItem, (state, item: SelectionItem) => [...state, item])                      
    .on(deleteSelectedItem, (state, name: number) => state.filter(e => e.timestamp !== name));

    currentSelectionItem
    .on(setCUrrentSelectedItem, (state, item: SelectionItem) => item);

    selectedIds.on(addSelectedIds, (state, items: number[]) => items)               
    .reset([reset]);
    
    restorePlot.on(setRestorePlot, (state, item: boolean) => item);
    fromCount.on(increment, (state, item: number) => state + item);
    seed.on(saveSeed, (state, item: string) => item);
    count.on(saveCount, (state, item: number) => item);
}