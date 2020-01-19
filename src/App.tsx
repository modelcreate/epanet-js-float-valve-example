import React, { useState, ChangeEvent } from "react";
import "./App.css";
import { Project, Workspace } from "epanet-js";

import SimpleChart from "./components/SimpleChart";

import { baseNetwork } from "./utils/baseNetwork";
import runModel from "./utils/runModel";

const ws = new Workspace();
const model = new Project(ws);

ws.writeFile("net1.inp", baseNetwork);
model.open("net1.inp", "report.rpt", "out.bin");

const App: React.FC = () => {
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
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <p>Model Ran in: {timeToRun.toFixed(0)}ms</p>
      </header>

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
      </div>

      <SimpleChart xLabel="Test" yLabel="Test" data={tankLevelData} />
    </div>
  );
};

export default App;
