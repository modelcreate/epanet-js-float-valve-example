import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  Project,
  Workspace,
  InitHydOption,
  NodeProperty,
  LinkProperty
} from "epanet-js";

import { baseNetwork } from "./utils/baseNetwork";
import getValveKValue from "./utils/floatValves";

const ws = new Workspace();
const model = new Project(ws);

ws.writeFile("net1.inp", baseNetwork);
model.open("net1.inp", "report.rpt", "out.bin");

model.openH();
model.initH(InitHydOption.NoSave);

const nodeIndex = model.getNodeIndex("Tank");
const linkIndex = model.getLinkIndex("Res.1");

let tStep = Infinity;
do {
  const tankLevel = model.getNodeValue(nodeIndex, NodeProperty.Pressure);
  const k = getValveKValue(2.485, 0.87, tankLevel, 2);
  model.setLinkValue(linkIndex, LinkProperty.Setting, k);

  const time = model.runH();
  const flow = model.getLinkValue(linkIndex, LinkProperty.Flow);

  console.log(`${time} - ${tankLevel}-  ${k} -  ${flow}`);

  tStep = model.nextH();
} while (tStep > 0);

model.closeH();

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
      </header>
    </div>
  );
};

export default App;
