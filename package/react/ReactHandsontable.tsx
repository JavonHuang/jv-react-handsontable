
import React, { useState,useEffect, useRef, useImperativeHandle} from 'react'
import "./index.scss"
import { registerAllModules } from 'handsontable/registry';

import 'handsontable/dist/handsontable.full.min.css';
import { IReactHandsontable, IRefReactHandsontable } from './interface';
import RowCheckbox from "./userPlugins/RowCheckbox";
import {  ReactHandsontableContext} from './ReactHandsontableContext';
import setDropdownMenu from "./userPlugins/DropdownMenu";
import setContextMenu from "./userPlugins/ContextMenu"
import setEnterMoves from "./userPlugins/EnterMoves"
import * as _ from 'lodash'
import BigNumber from "bignumber.js"
import HotTable, { HotColumn } from '@handsontable/react';
import Handsontable from 'handsontable';
import ReactHandsontableFoot from "./ReactHandsontableFoot";

registerAllModules();

const ReactHandsontable: React.ForwardRefRenderFunction<IRefReactHandsontable | undefined, IReactHandsontable> = (props, ref) => {
  const rootHot = useRef<HotTable>(null)
  const checkedAllRef=useRef<any>(null)

  const [renderFinish, setRenderFinish] = useState(false);
  useEffect(() => { 
    Handsontable.hooks.once('afterRender', ()=>{ 
      if (!renderFinish) { 
        setRenderFinish(true)
      }
    });
  }, [])
  
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
    if(column!=-1 &&props.children[column].props.dropdownMenu===false){
      const button = TH.querySelector('.changeType');
      if (!button) {
        return;
      }
      button.parentElement.removeChild(button);
    }
  }

  const afterGetRowHeader = (row, TH) => {
    if (props.selected) { 
      RowCheckbox.addEventListener(row,TH)
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
        autoRowSize={false}
        autoColumnSize={false}
        manualColumnResize={true}
        columnHeaderHeight={40}
        invalidCellClassName={'highlight-error'}
        rowHeaders={ true}
        height="100%"
        width="100%"
        rowHeights='50'
        minRows={0}
        afterGetColHeader={afterGetColHeader}
        afterGetRowHeader={afterGetRowHeader}
        afterColumnResize={afterColumnResize}
        enterMoves={setEnterMoves(rootHot.current!)}
        filters={true}
        beforeRenderer={(TD,Row,column,prop,value,cellProperties)=>{
          if(props.setCellClassName){
            let rowData=cellProperties.instance.getDataAtRow(Row)
            let className= props.setCellClassName(rowData,Row,column)
            if(className){
              TD.parentElement!.classList.add(className)
            }else{
              TD.parentElement!.className=""
            }
          }
        }}
        afterScroll={()=>{
          rootHot.current?.hotInstance?.destroyEditor()
        }}
        dropdownMenu={setDropdownMenu(rootHot.current!,props)}
        contextMenu={setContextMenu(rootHot.current!)}
        licenseKey="non-commercial-and-evaluation" // for non-commercial use only
      >
        {props.children}
      </HotTable>
      {props.selected && <div className='all-checkbox' ref={checkedAllRef}></div>}
      {renderFinish && <ReactHandsontableFoot hotInstance={rootHot.current.hotInstance} />}
  </div>
  </ReactHandsontableContext.Provider>
}
 
export default React.forwardRef<IRefReactHandsontable|undefined, IReactHandsontable>(ReactHandsontable);