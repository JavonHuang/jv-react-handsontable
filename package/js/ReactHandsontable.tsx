
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

interface IcellNodeMap { 
  [key:string]: {
    td: HTMLElement
    node: React.ReactNode
  }
}

const ReactHandsontable :React.ForwardRefRenderFunction<IRefReactHandsontable | undefined, IReactHandsontable> = (props, ref) => {
  const columnsRef = useRef<ColumnSettings[]>([])
  const rootRef = useRef(null)
  const rootHot = useRef<Handsontable>()
  const [node,setNode]=useState<React.ReactNode>()
  const [style, setStyle] = useState()
  
  //for edit
  const [handsontableInfo, setHandsontableInfo] = useState<IhandsontableInfo>()
  const editRef = useRef<any>()
  
  //for cell render
  let cellNodeMapRef: IcellNodeMap | any = {}
  const [cellNodeList, setCellNodeList] = useState<Array<{td:HTMLElement,node:React.ReactNode}>>([])
  const [checkAllNode,setCheckAllNode]=useState<Element>()
  const [checkedAll, setCheckedAll] = useState<boolean>(false)
  const selectRowIndexRef=useRef<number>(-1)
  //for foot-tool
  const [selectRowCount,setSelectRowCount]=useState<number>(0)
  const [selectColCount, setSelectColCount] = useState<number>(0)
  const [selectSum,setSelectSum]=useState<number>(0)
  const [selectMean,setSelectMean]=useState<number>(0)
  const [selectMax,setSelectMax]=useState<number|undefined>(0)
  const [selectMin,setSelectMin]=useState<number|undefined>(0)

  //for row header render


  useEffect(() => {
    init()
  }, [props.data]);

  const afterRenderEdit = (row:number, col:number, originalValue:any, hot:Core,editClass:any) => { 
    setHandsontableInfo({
      row: row,
      col: col,
      hot: hot,
      originalValue:originalValue,
    })
    editRef.current=editClass
  }

  const renderNode = (node: any,p:any) => {
    let cloneNode=node
    if (node!=null) { 
      cloneNode = cloneElement(node, p)
    }
    setNode(cloneNode)
  }

  const renderStyle=(cssStyle:CSSStyleDeclaration)=>{
    const reactStyle:any = {};  
  
    for (let prop in cssStyle) {  
      if (parseInt(prop).toString() =="NaN" && cssStyle.hasOwnProperty(prop) && cssStyle[prop]!="") {  
        reactStyle[prop.replace(/-([a-z])/gi, (g) => g[1].toUpperCase())] = cssStyle[prop];  
      }  
    }  
    setStyle(reactStyle)
  }

  const init = () => {
    columnsRef.current = []
    let columns=[...props.columns]
    // if (typeof props.selected  !== 'undefined' ) {
    //   if(typeof props.selected === 'boolean'){
    //     selectRowIndexRef.current=0
    //   }
    //   if(typeof props.selected === 'number' &&props.selected>0){
    //     selectRowIndexRef.current=props.selected
    //   }
    // }
    // if (selectRowIndexRef.current>-1) {
    //   let selectColumn:any = {
    //     title: '',
    //     width: 60,
    //     className:"center",
    //     editor: false,
    //     copyable:false,
    //     rendereCell: (value:any,p:any) => { 
    //       return <Checkbox disabled={p.readOnly} defaultChecked={value}></Checkbox>;
    //     }
    //   }
    //   if (props.isData) { 
    //     selectColumn = {...selectColumn,data:'selected'}
    //   }
    //   columns.splice(selectRowIndexRef.current, 0, selectColumn);  
    // }
    //默认配置
    const defaultConfig = {wordWrap:false}
    
    columns.forEach((e:Icolumns)=>{
      let column:any = {...defaultConfig,...e,}
      //处理编辑列渲染
      if (e.editorReactNode) {
        column.editor = CustomEditors
        column.renderNode = renderNode
        column.renderStyle = renderStyle
        column.afterRenderEdit = afterRenderEdit
      }
      //处理显示渲染
      if (e.rendereCell) { 
        column.renderer = (instance: Core, td: HTMLElement, row: number, col: number, prop: any, value: any, cellProperties: any) => { 
          let firstDom = td.firstChild
          let dom = document.createElement('div')
          dom.setAttribute('last-data',value)
          if (firstDom) {
            let lastValue = firstDom!.getAttribute('last-data')
            if (value!=null&&lastValue!=value.toString()) { 
              cellNodeMapRef[`index-${row}${col}`]={
                td: dom,
                node:e.rendereCell!(value, cellProperties)
              }
              td.replaceChild(dom, firstDom)
            }
          } else { 
            cellNodeMapRef[`index-${row}${col}`]={
              td: dom,
              node:e.rendereCell!(value, cellProperties)
            }
            td.appendChild(dom)
          }
          if(cellProperties.className){
            td.classList.add(cellProperties.className)
          }
          if (cellProperties.required) {
            td.classList.add('is-required')
          }
          if(typeof cellProperties.valid!=='undefined' && !cellProperties.valid){
            td.classList.add('highlight-error')
          }
          return td; 
        }
      }
      if(e.required){
        e.className = e.className ? `${e.className} is-required` : 'is-required'
        // e.title=`<span class="is-required">${e.title}</span>`
        // e.required=true
      }
      columnsRef.current.push(column)
    })
    if (!props.data|| props.data.length==0) { 
      return
    }
    //添加勾选列数据
    // if (selectRowIndexRef.current>-1) {
    //   props.data.forEach((item: Array<any>|any) => { 
    //     if (props.isData) {
    //       item["selected"]=false
    //     } else { 
    //       item.splice(selectRowIndexRef.current, 0, false);  
    //     }
    //   })
    // }
    rootHot.current = new Handsontable(rootRef.current!, {
      data:!props.data|| props.data.length==0? []:props.data,
      columns: columnsRef.current,
      rowHeaders:props.selected? function(visualRowIndex) {
        return `<div>${visualRowIndex}${RowCheckbox.getDom(visualRowIndex)}</div>`;
      }:true,
      columnHeaderHeight: 40,
      rowHeights: 40,
      manualColumnResize: true,
      enterMoves: (event)=>{
        let selectArr:any = rootHot.current!.getSelected()
        let allArr=rootHot.current!.getData();
        if(allArr.length==(selectArr[0][0]+1)){
          rootHot.current!.alter('insert_row_below');
        }
        return {col: 0, row: 1};
      },
      invalidCellClassName: 'highlight-error',
      licenseKey: 'non-commercial-and-evaluation', // for non-commercial use only
      contextMenu:{
        callback(key, selection, clickEvent) {
          // Common callback for all options
          switch(key){
            case 'downLoad':
              const exportPlugin = rootHot.current!.getPlugin('exportFile');
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
      },
      afterRender: (isForced)=>{ 
        // if (isForced) { 
          let list:any=[]
          Object.keys(cellNodeMapRef).map((key) => {
            list.push(cellNodeMapRef[key])
          }) 
        setCellNodeList(list)
        // console.log("afterRender",isForced)

      },
      afterGetColHeader: (column, TH, headerLevel) => { 
        // if(props.selected && column==-1){
        //   rowHeaderNodeMapRef[`index-${-1}`]={
        //     td: TH.firstElementChild?.firstElementChild,
        //     node:<Checkbox key={new Date().getDate()}></Checkbox>
        //   }
        // }
        // if (selectRowIndexRef.current>-1 && column == selectRowIndexRef.current) {
        //   let domDiv = document.createElement("div")
        //   TH.firstChild!.firstChild!.innerHTML=""
        //   TH.firstChild!.firstChild!.appendChild(domDiv)
        //   setCheckAllNode(domDiv)
        // }
        //添加必选标记
        if(column>-1 && columns[column].required){
          TH.firstElementChild!.firstElementChild!.classList.add('is-required')
        }
        if (column==-1) { 
          // TH.firstElementChild!.firstElementChild!.innerHTML
          RowCheckbox.createCheckbox(-1, TH.firstElementChild!.firstElementChild!)
        }
      },
      afterSelection: (row, column, row2, column2, preventScrolling, selectionLayerLevel) => { 
        let arra:any = rootHot.current!.getSelected()
        if (arra?.length > 0) { 
          setSelectRowCount((arra[0][2] - arra[0][0]) + 1)
          setSelectColCount((arra[0][3] - arra[0][1]) + 1)
          let arrayData = rootHot.current!.getSourceDataArray(arra[0][0], arra[0][1], arra[0][2], arra[0][3])
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
      },
      afterColumnResize:(newSize,column)=>{
        if(props.onColumnWidthChange){
          props.onColumnWidthChange(newSize,column)
        }
      },
      afterGetRowHeader: (row, TH) => {
        console.log("afterGetRowHeader", row)
        RowCheckbox.addEventListener(row,TH)
        // let list:any=[]
        // if(props.selected){
        //   rowHeaderNodeMapRef[`index-${row}`]={
        //     td: TH.firstElementChild?.firstElementChild,
        //     node:<Checkbox></Checkbox>
        //   }
        //   list.push({
        //     td: TH.firstElementChild?.firstElementChild,
        //     node:<Checkbox></Checkbox>
        //   })
        // }
        // TH.firstElementChild!.firstElementChild!.innerHTML='<label class="ant-checkbox-wrapper css-dev-only-do-not-override-2rgkd4"><span class="ant-checkbox ant-wave-target css-dev-only-do-not-override-2rgkd4"><input class="ant-checkbox-input" type="checkbox"><span class="ant-checkbox-inner"></span></span></label>'
      },
      afterViewRender: (isForced) => { 
        // console.log("afterViewRender", isForced)
      }
    });
    RowCheckbox.setHot(rootHot.current)
  }

  const setValue = (value: any, close: boolean = true) => { 
    editRef.current && (editRef.current.isClose = close)
    if (handsontableInfo) { 
      handsontableInfo?.hot?.setDataAtCell(handsontableInfo.row!, handsontableInfo.col!, value)
      editRef.current.isClose = true
    }
  }

  const getValue = () => { 
    if (handsontableInfo) {
      return handsontableInfo.originalValue
    } else { 
      return null
    }
  }
  // const onChangeAll = (e:any) => { 
  //   setCheckedAll!(e.target.checked)
  //   for (let row = 0; row < props.data.length; row++) { 
  //     rootHot.current?.setDataAtCell([[row,selectRowIndexRef.current,e.target.checked]])
  //   }
  // }

  // const onChangeItem = (e:any,p:any) => { 
  //   if(!e.target.checked){
  //     setCheckedAll!(e.target.checked)
  //   }
  //   //自动勾选选中的行
  //   let selectArr:any = rootHot.current!.getSelected()
  //   selectArr.forEach((item:Array<number>) => {
  //     if(item[1]==-1){
  //       for(let startRowIndex=item[0];startRowIndex<=item[2];startRowIndex++){
  //         rootHot.current?.setDataAtCell([[startRowIndex,p.col,e.target.checked]])
  //       }
  //     }
  //   });
  //   rootHot.current?.setDataAtCell([[p.row,p.col,e.target.checked]])
  //   let dataList=rootHot.current?.getData()
  //   let isAll=true
  //   dataList?.forEach(row=>{
  //     if(!row[selectRowIndexRef.current]){
  //       isAll=false
  //     }
  //   })
  //   setCheckedAll!(isAll)
  // }
  useImperativeHandle(ref, () => {
    return {
      validateFields:()=>{
        return new Promise(( resolve, reject ) => {
          rootHot.current?.validateCells((valid)=>{
            if(valid){
              resolve(valid)
            }else{
              reject(valid)
            }
          })
        })
      }
    }
  });

  return <ReactHandsontableContext.Provider value={{
        handsontableInfo: handsontableInfo,
        setValue:setValue,
        getValue:getValue
  }}>
  <div className="react-handsontable">
    <div className='main'>
        <div ref={ rootRef}>
          <div className='react-node' style={style}>
            {
              node&&node
            }
          </div> 
        </div>
      </div>
      <div className='foot-tool'>选中[行数:{selectRowCount} 列数:{selectColCount} 求和:{selectSum} 平均:{selectMean} 最大:{selectMax} 最小:{ selectMin}]</div>
    </div>
    {
      cellNodeList.map((e) => { 
        return createPortal(e.node,e.td)
      })
    }
    {
      checkAllNode && createPortal(<Checkbox defaultChecked={ checkedAll} onChange={onChangeAll}></Checkbox>,checkAllNode)
    }
  </ReactHandsontableContext.Provider>
}
export default React.forwardRef<IRefReactHandsontable|undefined, IReactHandsontable>(ReactHandsontable);

