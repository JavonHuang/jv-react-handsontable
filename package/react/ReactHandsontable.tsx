
import React, { useState,useEffect,memo, useRef, ReactElement, cloneElement, useImperativeHandle} from 'react'
import "./index.scss"
import { registerAllModules } from 'handsontable/registry';

import 'handsontable/dist/handsontable.full.min.css';
import { IReactHandsontable, IRefReactHandsontable } from './interface';
import RowCheckbox from "./userPlugins/RowCheckbox";
import {  ReactHandsontableContext} from './ReactHandsontableContext';
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
  const checkedAllRef=useRef<any>(null)
  //for foot-tool
  const [selectRowCount,setSelectRowCount]=useState<number>(0)
  const [selectColCount, setSelectColCount] = useState<number>(0)
  const [selectSum,setSelectSum]=useState<number>(0)
  const [selectMean,setSelectMean]=useState<number>(0)
  const [selectMax,setSelectMax]=useState<number|undefined>(0)
  const [selectMin, setSelectMin] = useState<number | undefined>(0)
  registerAllModules();

  useEffect(() => { 
    if(rootHot.current&& props.data){}
    rootHot.current&& props.data&& RowCheckbox.setHot(rootHot.current!,props.data) 
  },[props.data])

  useEffect(() => {
    if (props.selected) { 
      RowCheckbox.createCheckbox(checkedAllRef.current!)
    }
  },[])
  
  const afterGetColHeader = (column, TH, headerLevel) => {
    if(column!=-1 && props.children[column].props.reqiured){
      TH.classList.add('is-reqiured')
    }
  }

  const afterGetRowHeader = (row, TH) => {
    if (props.selected) { 
      RowCheckbox.addEventListener(row,TH)
    }
  }
  const afterSelection=(row, column, row2, column2, preventScrolling, selectionLayerLevel) => { 
    let arra:any = rootHot.current!.hotInstance!.getSelected()
    if (arra?.length > 0) { 
      setSelectRowCount((arra[0][2] - arra[0][0]) + 1)
      setSelectColCount((arra[0][3] - arra[0][1]) + 1)
      let arrayData = rootHot.current!.hotInstance!.getSourceDataArray(arra[0][0], arra[0][1], arra[0][2], arra[0][3])
      let list: Array<number> = []
      let sum=0
      for (let row = 0; row < arrayData.length; row++) { 
        let coList = arrayData[row]??[]
        list = [...list, ...coList]
        for (let col = 0; col < coList.length; col++) { 
          sum=new BigNumber(sum).plus(coList[col]).toNumber();
        }
      }
      setSelectSum(sum)
      setSelectMean(new BigNumber(sum).div(list.length).toNumber())
      setSelectMin(BigNumber.min(...list).toNumber())
      setSelectMax(BigNumber.max(...list).toNumber())
    }
  }

  const afterColumnResize=(newSize,column)=>{
    if(props.onColumnWidthChange){
      props.onColumnWidthChange(newSize,column)
    }
  }

  useImperativeHandle(ref, () => {
    return {
      validateFields:()=>{
        return new Promise(( resolve, reject ) => {
          rootHot.current?.hotInstance!.validateCells((valid)=>{
            rootHot.current?.hotInstance!.render()
            if(valid){
              resolve(valid)
            }else{
              reject(valid)
            }
          })
        })
      },
      getSelectRow:()=>{
        return RowCheckbox.getCheckRowData()
      }
    }
  });

  return <ReactHandsontableContext.Provider value={{
        hot: rootHot.current,
    }}>
    <div className="react-handsontable">
      <HotTable
        ref={rootHot}
        data={props.data}
        autoWrapRow={true}
        autoWrapCol={true}
        manualColumnResize={true}
        columnHeaderHeight={40}
        invalidCellClassName={'highlight-error'}
        rowHeaders={props.selected ? function (visualRowIndex) {
          return `<div>${visualRowIndex}${RowCheckbox.getDom(visualRowIndex)}</div>`;
        } : true}
        height="100%"
        width="100%"
        rowHeights='50'
        minRows={0}
        afterGetColHeader={afterGetColHeader}
        afterGetRowHeader={afterGetRowHeader}
        afterSelection={afterSelection}
        afterColumnResize={afterColumnResize}
        enterMoves={(event) => {
          let selectArr: any = rootHot.current!.hotInstance!.getSelected()
          let allArr =rootHot.current!.hotInstance!.getData();
          if (allArr.length == (selectArr[0][0] + 1)) {
            rootHot.current!.hotInstance!.alter('insert_row_below');
          }
          return { col: 0, row: 1 };
        }}
        contextMenu={{
          callback(key, selection, clickEvent) {
            // Common callback for all options
            switch (key) {
              case 'downLoad':
                const exportPlugin = rootHot.current!.hotInstance!.getPlugin('exportFile');
                exportPlugin.downloadFile('csv', {
                  bom: false,
                  columnDelimiter: ',',
                  columnHeaders: true,
                  exportHiddenColumns: true,
                  exportHiddenRows: true,
                  fileExtension: 'csv',
                  filename: 'Handsontable-CSV-file_[YYYY]-[MM]-[DD]',
                  mimeType: 'text/csv',
                  rowDelimiter: '\r\n',
                  rowHeaders: true
                });
                break;
            }
          },
          items: {
            'downLoad': {
              name: '保存到本地'
            },
          }
        }}
        licenseKey="non-commercial-and-evaluation" // for non-commercial use only
      >
        { props.children}
      </HotTable>
      { props.selected && <div className='all-checkbox' ref={checkedAllRef}></div>}
    <div className='foot-tool'>选中[行数:{selectRowCount} 列数:{selectColCount} 求和:{selectSum} 平均:{selectMean} 最大:{selectMax} 最小:{ selectMin}]</div>
  </div>
  </ReactHandsontableContext.Provider>
}
 
export default React.forwardRef<IRefReactHandsontable|undefined, IReactHandsontable>(ReactHandsontable);