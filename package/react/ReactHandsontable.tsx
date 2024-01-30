
import React, { useState,useEffect, useRef, useImperativeHandle} from 'react'
import "./index.scss"
import { registerAllModules } from 'handsontable/registry';

import 'handsontable/dist/handsontable.full.min.css';
import { IReactHandsontable, IRefReactHandsontable } from './interface';
import {  ReactHandsontableContext} from './ReactHandsontableContext';
import setDropdownMenu from "./userPlugins/DropdownMenu";
import setContextMenu from "./userPlugins/ContextMenu"
import setEnterMoves from "./userPlugins/EnterMoves"
import * as _ from 'lodash'
import BigNumber from "bignumber.js"
import HotTable, { HotColumn } from '@handsontable/react';
import Handsontable from 'handsontable';
import ReactHandsontableFoot from "./ReactHandsontableFoot";
import {checkboxAll} from "./CheckboxCell"
import { createPortal } from 'react-dom';


registerAllModules();

const ReactHandsontable: React.ForwardRefRenderFunction<IRefReactHandsontable | undefined, IReactHandsontable> = (props, ref) => {
  const rootHot = useRef<HotTable>(null)
  const checkAllcolumn = useRef(null)
  const [checkAllTH,setCheckAllTH]= useState(null)



  const [renderFinish, setRenderFinish] = useState(false);
  useEffect(() => { 
    Handsontable.hooks.once('afterRender', ()=>{ 
      if (!renderFinish) { 
        setRenderFinish(true)
      }
    });
  }, [])

  useEffect(() => { 
    if (renderFinish && checkAllTH &&checkAllcolumn.current!=null ) { 
      setSelectAllDom(false)
    }
  }, props.data)

  
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
    
    if (column != -1 && rootHot.current && props.children[column].props.allChecked) { 
      checkAllcolumn.current = column
      !checkAllTH && setCheckAllTH(TH.children[0])
      rootHot.current!.hotInstance!['selectItem'] = function (e) { 
        let data = rootHot.current?.hotInstance!.getDataAtCol(checkAllcolumn.current)!
        let index=data.findIndex(e=>e==false)
        setSelectAllDom(index == -1)
      }
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
    }
  });

  const onSelectAll = (e: any) => { 
    let data = rootHot.current?.hotInstance!.getData()!

    if (e.target.checked) {
      e.target.parentElement.classList.add('is-checked')
    } else { 
      e.target.parentElement.classList.remove('is-checked')
    }
    let all=[]
    rootHot.current?.hotInstance!.suspendRender();
    for (let i = 0; i < data?.length; i += 1) { 
      all.push([i,checkAllcolumn.current!, e.target.checked])
    }
    rootHot.current?.hotInstance!.setDataAtCell(all);

    rootHot.current?.hotInstance!.resumeRender(); 
  }

  const setSelectAllDom = (e) => {
    if (e) { 
      checkAllTH.querySelector('input').checked=e
      checkAllTH.lastChild.children[0].classList.add('is-checked')
    } else {
      checkAllTH.querySelector('input').checked=e
      checkAllTH.lastChild.children[0].classList.remove('is-checked')
     }
   }

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
      {
        checkAllTH && createPortal(<label className="jv-checkbox"><span className="all-RowCheckbox" onClick={onSelectAll}><input className="checkbox-input" type="checkbox"/><span className="checkbox-inner"></span></span></label>,checkAllTH!)
      }
      {renderFinish && <ReactHandsontableFoot hotInstance={rootHot.current.hotInstance} />}
  </div>
  </ReactHandsontableContext.Provider>
}
 
export default React.forwardRef<IRefReactHandsontable|undefined, IReactHandsontable>(ReactHandsontable);