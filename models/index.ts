import { forward, createEvent, createEffect, PageContext } from 'effector-next';
import { SelectionItem } from '../models/selectionItem';
import { GeneratedItem, ResponseDataFile } from '../models/item';
import {
  $count,
  $currentSelectionItem,
  $currentGeneratedItems,
  $savedSelectedItems,
  $selectedIds,
  $restorePlot,
  $seed,
  $file,
} from './store';

export const pageLoaded = createEvent<PageContext>();
export const changeFileCount = createEvent<ResponseDataFile>();
export const changeCount = createEvent<number>();
export const changeSeed = createEvent<string>();
export const setGeneratedItems = createEvent<GeneratedItem[]>();
export const addSelectedItem = createEvent<SelectionItem>();
export const deleteSelectedItem = createEvent<number>();
export const addSelectedIds = createEvent<number[]>();
export const setRestorePlot = createEvent<boolean>();
export const reset = createEvent<void>();
export const init = createEvent<PageContext<number>>();

const initialServerState: SelectionItem = {
  timestamp: new Date().getTime(),
  seed: '333333333',
  data: [],
  count: 30,
  xaxisName: 'a',
  yaxisName: 'b',
};

const effect = createEffect({
  handler(value: SelectionItem) {
    return Promise.resolve({ value });
  },
});

const effectFile = createEffect({
  handler(value: ResponseDataFile) {
    return Promise.resolve({ value });
  },
});

$currentSelectionItem.on(effect.done, (_, { result }) => result.value);
$count.on(effect.done, (_, { result }) => result.value.count);
$seed.on(effect.done, (_, { result }) => result.value.seed);
$file.on(effectFile.done, (_, { result }) => result.value);

forward({
  from: pageLoaded.map(() => initialServerState),
  to: effect,
});

forward({
  from: changeCount.map((i) => {
    let currentItem = $currentSelectionItem.getState();
    currentItem.count = i;
    return currentItem;
  }),
  to: effect,
});

forward({
  from: changeSeed.map((i) => {
    let currentItem = $currentSelectionItem.getState();
    currentItem.seed = i;
    return currentItem;
  }),
  to: effect,
});

forward({
  from: changeFileCount.map((i) => i),
  to: effectFile,
});

$currentGeneratedItems
  .on(setGeneratedItems, (_, items: GeneratedItem[]) => items)
  .reset([reset]);

$savedSelectedItems
  .on(addSelectedItem, (state, item: SelectionItem) => [...state, item])
  .on(deleteSelectedItem, (state, name: number) =>
    state.filter((e) => e.timestamp !== name)
  );

$selectedIds.on(addSelectedIds, (_, items: number[]) => items).reset([reset]);
$restorePlot.on(setRestorePlot, (_, item: boolean) => item);
