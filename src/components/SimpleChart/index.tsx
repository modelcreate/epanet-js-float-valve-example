import React, { FunctionComponent } from "react";
import { VictoryChart, VictoryLine, VictoryAxis, VictoryTheme } from "victory";

export type SimpleGraphData = {
  x: number;
  y: number;
}[];

interface SmallChartProperties {
  xLabel: string;
  yLabel: string;
  data: SimpleGraphData;
}

const observered = [
  2.36,
  2.362,
  2.366,
  2.369,
  2.375,
  2.38,
  2.381,
  2.385,
  2.387,
  2.387,
  2.39,
  2.39,
  2.391,
  2.392,
  2.394,
  2.393,
  2.395,
  2.396,
  2.396,
  2.393,
  2.393,
  2.388,
  2.385,
  2.38,
  2.375,
  2.367,
  2.357,
  2.338,
  2.324,
  2.32,
  2.313,
  2.313,
  2.31,
  2.311,
  2.312,
  2.318,
  2.319,
  2.325,
  2.325,
  2.325,
  2.327,
  2.329,
  2.333,
  2.33,
  2.328,
  2.332,
  2.334,
  2.339,
  2.342,
  2.341,
  2.342,
  2.342,
  2.342,
  2.34,
  2.337,
  2.338,
  2.334,
  2.332,
  2.331,
  2.331,
  2.33,
  2.332,
  2.333,
  2.332,
  2.332,
  2.332,
  2.329,
  2.324,
  2.324,
  2.331,
  2.333,
  2.337,
  2.338,
  2.335,
  2.33,
  2.328,
  2.328,
  2.331,
  2.329,
  2.329,
  2.327,
  2.326,
  2.331,
  2.334,
  2.337,
  2.335,
  2.337,
  2.343,
  2.339,
  2.342,
  2.34,
  2.34,
  2.344,
  2.347,
  2.352,
  2.359
];

const SmallChart: FunctionComponent<SmallChartProperties> = ({
  xLabel,
  yLabel,
  data
}) => {
  const observeredData = data.map((timestep, i) => ({
    x: timestep.x,
    y: observered[i]
  }));
  return (
    <VictoryChart theme={VictoryTheme.material} height={175} width={400}>
      <VictoryAxis
        style={{
          axisLabel: { fontSize: 8, padding: 30 },
          tickLabels: { fontSize: 6, padding: 5 }
        }}
        label={xLabel}
      />
      <VictoryAxis
        style={{
          axisLabel: { fontSize: 8, padding: 30 },
          tickLabels: { fontSize: 6, padding: 5 }
        }}
        dependentAxis
        label={yLabel}
      />
      <VictoryLine
        style={{
          data: { stroke: "#1528f7" },
          labels: { fill: "#00000", fontSize: 20, textAnchor: "start" }
        }}
        data={data}
      />

      <VictoryLine
        data={observeredData}
        style={{
          data: { stroke: "green" }
        }}
      />
    </VictoryChart>
  );
};

export default SmallChart;
