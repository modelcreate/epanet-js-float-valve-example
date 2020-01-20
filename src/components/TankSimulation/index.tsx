import React, { useState, ChangeEvent, FunctionComponent } from "react";
import { Project, Workspace } from "epanet-js";

import SimpleChart from "../SimpleChart";

import { baseNetwork } from "../../utils/baseNetwork";
import runModel from "../../utils/runModel";

const ws = new Workspace();
const model = new Project(ws);

ws.writeFile("net1.inp", baseNetwork);
model.open("net1.inp", "report.rpt", "out.bin");

const TankSimulation: FunctionComponent = () => {
  const [range, setRange] = useState(1);
  const [depth, setDepth] = useState(2.5);

  const handleRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRange(Number(e.target.value));
  };

  const handleDepthChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDepth(Number(e.target.value));
  };

  const t0 = performance.now();
  const tankLevelData = runModel(model, depth, range, 2);
  const t1 = performance.now();

  const timeToRun = t1 - t0;

  return (
    <div>
      {/*<a href="https://github.com/modelcreate/epanet-js">
        Learn more about epanet-js
      </a>

      <p>Model Ran in: {timeToRun.toFixed(0)}ms</p>

      <p>
        This is a work in progress demo of getting a float valve with continuous
        regulation working in epanet-js.
      </p>

      <div>
        <label htmlFor="depth">Depth: {depth}</label>
        <input
          type="range"
          id="depth"
          name="depth"
          min="1.5"
          max="3.4"
          step={0.01}
          onChange={handleDepthChange}
          value={depth}
        />
      </div>

      <div>
        <label htmlFor="regRange">Regulation Range: {range}</label>
        <input
          type="range"
          id="regRange"
          name="regRange"
          min="0.1"
          max="1"
          step={0.01}
          onChange={handleRangeChange}
          value={range}
        />
  </div> */}

      <SimpleChart
        xLabel="Time (hours)"
        yLabel="Depth (m)"
        data={tankLevelData}
      />
    </div>
  );
};

export default TankSimulation;
