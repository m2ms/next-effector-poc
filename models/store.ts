import { createDomain } from 'effector-next';
import { SelectionItem } from './selectionItem';
import { GeneratedItem } from './item';

const initialState: SelectionItem = {
  timestamp: new Date().getTime(),
  seed: '11111111',
  data: [],
  count: 10,
  xaxisName: 'c',
  yaxisName: 'd',
};

const initialStateItems: SelectionItem[] = [initialState];

export const selectionDomain = createDomain();
export const generationDomain = createDomain();

export const $currentSelectionItem = selectionDomain.createStore<SelectionItem>(
  initialState
);
export const $savedSelectedItems = selectionDomain.createStore(
  initialStateItems
);
export const $count = selectionDomain.createStore(initialState.count);
export const $seed = selectionDomain.createStore(initialState.seed);
export const $xaxisName = selectionDomain.createStore(initialState.xaxisName);
export const $yaxisName = selectionDomain.createStore(initialState.yaxisName);

export const $currentGeneratedItems = generationDomain.createStore(
  new Array<GeneratedItem>()
);
export const $selectedIds = generationDomain.createStore(new Array<number>());
export const $restorePlot = generationDomain.createStore(false);
