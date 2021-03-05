import { createEvent } from "effector";
import { SelectionItem } from "./../model/selectionItem";
import { GeneratedItem } from "../model/item";

export const addGeneratedItems = createEvent<GeneratedItem[]>();
export const setGeneratedItems = createEvent<GeneratedItem[]>();
export const addSelectedItem = createEvent<SelectionItem>(); 
export const saveSelectedItem = createEvent<SelectionItem>();
export const setCUrrentSelectedItem = createEvent<SelectionItem>();
export const deleteSelectedItem = createEvent<number>();
export const addSelectedIds = createEvent<number[]>();
export const increment = createEvent<number>();
export const saveSeed = createEvent<string>();
export const saveCount = createEvent<number>();
export const setRestorePlot = createEvent<boolean>();
export const reset = createEvent<void>();
