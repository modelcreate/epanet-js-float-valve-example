import { Project, InitHydOption, NodeProperty, LinkProperty } from "epanet-js";
import { SimpleGraphData } from "../components/SimpleChart";
import getValveKValue from "./floatValves";

const runModel = (
  model: Project,
  controlDepth: number,
  range: number,
  multiplier: number
): SimpleGraphData => {
  model.openH();
  model.initH(InitHydOption.NoSave);

  const nodeIndex = model.getNodeIndex("Tank");
  const linkIndex = model.getLinkIndex("Res.1");

  let tStep = Infinity;
  let tankLevelData: SimpleGraphData = [];
  do {
    const tankLevel = model.getNodeValue(nodeIndex, NodeProperty.Pressure);
    const k = getValveKValue(controlDepth, range, tankLevel, multiplier);
    model.setLinkValue(linkIndex, LinkProperty.Setting, k);

    const time = model.runH();
    //const flow = model.getLinkValue(linkIndex, LinkProperty.Flow);

    tankLevelData.push({ x: time / 60 / 60, y: tankLevel });

    tStep = model.nextH();
  } while (tStep > 0);

  model.closeH();

  return tankLevelData;
};

export default runModel;
