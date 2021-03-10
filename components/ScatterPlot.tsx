import React from 'react';
import { Datum } from 'plotly.js';
import Plotly from 'plotly.js-basic-dist';
import createPlotlyComponent from 'react-plotly.js/factory';
import { FieldMeta, GeneratedItem } from '../models/item';
import { isNumber } from '../utils/utils';
import { $currentGeneratedItems, $xaxisName, $yaxisName, } from '../models/store';
import { addSelectedIds } from '../models';
import { useStore } from "effector-react";

const Plot = createPlotlyComponent(Plotly);

// Utils
const getPropArrayFromMolecules = (items: GeneratedItem[], prop: string | null) => {
  if (prop === 'id') {
    return items.map((item) => item.id);
  } else {
    return items.map(
      (item) => item.fields.find((field) => field.name === prop)?.value ?? null,
    );
  }
};

type AxisSeries = ReturnType<typeof getPropArrayFromMolecules>;

/* Gets the axis display text of the curried prop name */
const getPropDisplayName = (fields: FieldMeta[]) => (prop: string | null) => {
  if (prop !== null) {
    return fields.find((f) => f.name === prop)?.nickname ?? prop;
  } else {
    return 'Select a property to display';
  }
};

const scaleToSize = (sizeaxis: AxisSeries) => {
  if (sizeaxis.every(isNumber)) {
    const sx = sizeaxis as number[];
    const min = Math.min(...sx);
    const max = Math.max(...sx);

    const scaledSizes = sx.map((v) => (45 * (v - min)) / max + 5);

    return { sizes: scaledSizes, min, max };
  }
  return { sizes: 10 };
};

const validateColours = (colouraxis: AxisSeries) => {
  if (colouraxis.every(isNumber)) {
    const cx = colouraxis as number[];

    const min = Math.min(...cx);
    const max = Math.max(...cx);

    return { colours: colouraxis, min, max };
  }
  return { colours: 1 };
};

interface IProps {
  width: number;
  height: number;
}

const ScatterPlot = ({ width, height }: IProps) => {

  const xaxisName = useStore($xaxisName);
  const yaxisName = useStore($yaxisName);
  const currentGeneratedItems = useStore($currentGeneratedItems);
  const selection: number[] = [];

  let fields: FieldMeta[] = [];
  let xprop: string = xaxisName;
  let yprop: string = yaxisName;
  let size: string = '500';
  let colour: string = 'blue';

  const selectedPoints = [selection.map((id) => currentGeneratedItems.findIndex((m) => m.id === id))];

  const xaxis = getPropArrayFromMolecules(currentGeneratedItems, xprop);
  const yaxis = getPropArrayFromMolecules(currentGeneratedItems, yprop);

  const sizeaxis = getPropArrayFromMolecules(currentGeneratedItems, size);
  const colouraxis = getPropArrayFromMolecules(currentGeneratedItems, colour);

  const { sizes } = scaleToSize(sizeaxis);
  const { colours } = validateColours(colouraxis);

  const labelGetter = getPropDisplayName(fields);
  const xlabel = labelGetter(xprop);
  const ylabel = labelGetter(yprop);

  const displayWidth = width - 2 * 8;
  const displayHeight = height - 2 * 8;

  return (
    <>
      <Plot
        data={[
          {
            x: xaxis,
            y: yaxis,
            customdata: currentGeneratedItems.map((m) => m.id), // Add custom data for use in selection
            selectedpoints: selectedPoints.length ? selectedPoints : null,
            type: 'scatter',
            mode: 'markers',
            marker: {
              color: colours,
              size: sizes,
              colorscale: 'Bluered',
            },
          } as any,
        ]}
        layout={{
          width: displayWidth,
          height: displayHeight,
          margin: { t: 10, r: 10, b: 50, l: 50 },
          dragmode: 'select',
          hovermode: 'closest',
          xaxis: { title: xlabel },
          yaxis: { title: ylabel },
        }}
        config={{
          modeBarButtonsToRemove: [
            'resetScale2d',
            'hoverClosestCartesian',
            'hoverCompareCartesian',
            'toImage',
            'toggleSpikelines',
          ],
        }}
        onSelected={(event) => {
          const points = event?.points;
          if (points) {
            let pointsIds = points.map((p) => (p as typeof p & { customdata: Datum }).customdata) as number[];
            addSelectedIds(pointsIds);
          }
        }}
        onDeselect={() => {
          addSelectedIds([])
        }}
      />
    </>
  );
}

export default React.memo(ScatterPlot);