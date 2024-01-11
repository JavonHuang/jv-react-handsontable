
import React, { useState,useEffect,memo, useRef, ReactElement, cloneElement, useImperativeHandle} from 'react'
import "./index.scss"
import 'handsontable/dist/handsontable.full.min.css';
import Handsontable from 'handsontable';
import { IReactHandsontable, IRefReactHandsontable,Icolumns } from './interface';
import CustomEditors from './CustomEditors';
import RowCheckbox from "./userPlugins/RowCheckbox";
import { ColumnSettings } from 'handsontable/settings';
import { IhandsontableInfo, ReactHandsontableContext} from './ReactHandsontableContext';
import Core from 'handsontable/core';
import { createPortal } from 'react-dom';
import { Checkbox } from 'antd';
import * as _ from 'lodash'
import BigNumber from "bignumber.js"
import HotTable from '@handsontable/react';

interface IcellNodeMap { 
  [key:string]: {
    td: HTMLElement
    node: React.ReactNode
  }
}
const ReactHandsontable: React.ForwardRefRenderFunction<IRefReactHandsontable | undefined, IReactHandsontable> = (props, ref) => {
  const rootHot = useRef<HotTable>(null)

  const [handsontableInfo, setHandsontableInfo] = useState<IhandsontableInfo>()

  //for foot-tool
  const [selectRowCount,setSelectRowCount]=useState<number>(0)
  const [selectColCount, setSelectColCount] = useState<number>(0)
  const [selectSum,setSelectSum]=useState<number>(0)
  const [selectMean,setSelectMean]=useState<number>(0)
  const [selectMax,setSelectMax]=useState<number|undefined>(0)
  const [selectMin, setSelectMin] = useState<number | undefined>(0)

  
  const afterGetColHeader = (column, TH, headerLevel) => {
    if (column==-1) { 
      // TH.firstElementChild!.firstElementChild!.innerHTML
      RowCheckbox.createCheckbox(-1, TH.firstElementChild!.firstElementChild!)
    }
  }

  useEffect(() => { 
    rootHot.current&& props.data&& RowCheckbox.setHot(rootHot.current!.__hotInstance!,props.data) 
  },[props.data])
  
 const afterGetRowHeader= (row, TH) => {
    console.log("afterGetRowHeader", row)
    RowCheckbox.addEventListener(row,TH)
  }

  return <ReactHandsontableContext.Provider value={{
        handsontableInfo: handsontableInfo,
    }}>
    <div className="react-handsontable">
      <HotTable
        ref={rootHot}
        data={props.data}
        colHeaders={true}
        rowHeaders={props.selected? function(visualRowIndex) {
          return `<div>${visualRowIndex}${RowCheckbox.getDom(visualRowIndex)}</div>`;
        }:true}
        height="100%"
        width="100%"
        rowHeights='50'
        afterGetColHeader={afterGetColHeader}
        afterGetRowHeader={afterGetRowHeader}
        licenseKey="non-commercial-and-evaluation" // for non-commercial use only
      >
        { props.children}
    </HotTable>
    <div className='foot-tool'>选中[行数:{selectRowCount} 列数:{selectColCount} 求和:{selectSum} 平均:{selectMean} 最大:{selectMax} 最小:{ selectMin}]</div>
  </div>
  </ReactHandsontableContext.Provider>
}
 
export default React.forwardRef<IRefReactHandsontable|undefined, IReactHandsontable>(ReactHandsontable);