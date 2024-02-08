import { memo, useEffect } from "react"

import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.min.css';
import { render } from "react-dom";

export const ExampleComponentjs = () => {
  useEffect(() => { 
    init()
  }, [])
  const init = () => { 
    const container = document.querySelector('#example5');
    const data = [
      { id: 1, name: {first: 'Ted', last: 'Right'}, address: '' },
      { id: 2, address: '' }, // Handsontable will create missing properties on demand
      { id: 3, name: {first: 'Joan', last: 'Well'}, address: '' }
    ];
    const renderer = (instance, td, row, col, prop, value, cellProperties) => { 
    console.log(instance, td, row, col, prop, value, cellProperties)  
    }
    const hot = new Handsontable(container!, {
      data,
      colHeaders: true,
      height: '100%',
      width: '100%',
      columns: [
        { data: 'id' },
        { data: 'name.first' ,renderer},
        { data: 'name.last' },
        { data: 'address' }
      ],
      minSpareRows: 1,
      autoWrapRow: true,
      autoWrapCol: true,
      licenseKey: 'non-commercial-and-evaluation'
    });
  }
  return <div  style={{height:'100%',width:'100%'}}>
    <div id="example5" style={{height:'100%',width:'100%'}}></div>
  </div>;
};
export default memo(ExampleComponentjs)
