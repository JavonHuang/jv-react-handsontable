import { memo } from "react"

import { HotTable, HotColumn } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';

// register Handsontable's modules
registerAllModules();

// a renderer component
const ScoreRenderer = (props) => {
  const { value } = props;
  const color = value > 60 ? '#2ECC40' : '#FF4136';
  return (
    <span style={{ color }}>{value}</span>
  );
};

// a renderer component
const PromotionRenderer = (props) => {
  const { value } = props;
  if (value) {
    return (
      <span>&#10004;</span>
    );
  }
  console.log(props)
  return (
    <span>&#10007;</span>
  );
};

// you can set `data` to an array of objects
let data = [

];

for (let i = 0; i < 1; i += 1) { 
  data.push({
    id: i,
    name: 'Alex='+1,
    score: 10,
    isPromoted: false,
  })
}

const emptyValidator = (value:any, callback:(e: boolean) => void) => {
  if (value) {
    callback(true);

  } else {
    callback(false);
  }
};
export const ExampleComponent = () => {
  return <>
    {data.length > 0 && <HotTable
      data={data}
      autoWrapRow={true}
      autoWrapCol={true}
      licenseKey="non-commercial-and-evaluation"
      autoRowSize={false}
      autoColumnSize={false}
      rowHeaders={true}
      colHeaders={true}
      nestedRows={true}
        
    >
      {/* use the `data` prop to reference the column data */}
      <HotColumn data="id" />
      <HotColumn data="name" />
      <HotColumn data="score" validator={emptyValidator}>
        {/* add the `hot-renderer` attribute to mark the component as a Handsontable renderer */}
        <ScoreRenderer hot-renderer />
      </HotColumn>
      <HotColumn data="isPromoted">
        {/* add the `hot-renderer` attribute to mark the component as a Handsontable renderer */}
        <PromotionRenderer hot-renderer />
      </HotColumn>
    </HotTable>}
    </>;
};
export default memo(ExampleComponent)
