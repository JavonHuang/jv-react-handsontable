
import React, { useState,useEffect,memo, useRef, ReactElement, cloneElement} from 'react'
import "./index.scss"
import 'handsontable/dist/handsontable.full.min.css';
import Handsontable from 'handsontable';
import { IReactHandsontable, Icolumns } from './interface';
import CustomEditors from './CustomEditors';
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

const ReactHandsontable = (props: IReactHandsontable) => {
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
  
  //for foot-tool
  const [selectRowCount,setSelectRowCount]=useState<number>(0)
  const [selectColCount, setSelectColCount] = useState<number>(0)
  const [selectSum,setSelectSum]=useState<number>(0)
  const [selectMean,setSelectMean]=useState<number>(0)
  const [selectMax,setSelectMax]=useState<number|undefined>(0)
  const [selectMin,setSelectMin]=useState<number|undefined>(0)


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
    if (props.selected) {
      let selectColumn:any = {
        title: '',
        width: 60,
        className:"center",
        editor: false,
        copyable:false,
        rendereCell: (value:any,p:any) => { 
          return <Checkbox disabled={p.readOnly} defaultChecked={value} onChange={(e)=>onChangeItem(e,p)}></Checkbox>;
        }
      }
      if (props.isData) { 
        selectColumn = {...selectColumn,data:'selected'}
      }
      columns.unshift(selectColumn)
    }
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
            if (lastValue!=value.toString()) { 
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
          return td; 
        }
      }
      if(e.required){
        e.className=e.className?`${e.className} is-required`:'is-required'
      }
      columnsRef.current.push(column)
    })
    if (!props.data|| props.data.length==0) { 
      return
    }
    //添加勾选列数据
    if (props.selected) {
      props.data.forEach((item: Array<any>|any) => { 
        if (props.isData) {
          item["selected"]=false
        } else { 
          item!.unshift(false)
        }
      })
    }
    rootHot.current = new Handsontable(rootRef.current!, {
      data:!props.data|| props.data.length==0? [{year:1,momth:1,day:1,second:1}]:props.data,
      columns: columnsRef.current,
      rowHeaders: true,
      rowHeights: 40,
      licenseKey: 'non-commercial-and-evaluation', // for non-commercial use only
      afterRender: (isForced)=>{ 
        let list:any=[]
        Object.keys(cellNodeMapRef).map((key) => {
          list.push(cellNodeMapRef[key])
        }) 
        setTimeout(() => {
          setCellNodeList(list)
        }, 0);
      },
      afterGetColHeader: (column, TH, headerLevel) => { 
        if (column == 0) { 
          let domDiv = document.createElement("div")
          TH.firstChild!.firstChild!.innerHTML=""
          TH.firstChild!.firstChild!.appendChild(domDiv)
          setCheckAllNode(domDiv)
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
            let coList = arrayData[row]
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
    });
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
  const onChangeAll = (e:any) => { 
    setCheckedAll!(e.target.checked)
    for (let row = 0; row < props.data.length; row++) { 
      rootHot.current?.setDataAtCell([[row,0,e.target.checked]])
    }
  }

  const onChangeItem = (e:any,p:any) => { 
    if(!e.target.checked){
      setCheckedAll!(e.target.checked)
    }
    rootHot.current?.setDataAtCell([[p.row,p.col,e.target.checked]])
    let dataList=rootHot.current?.getData()
    let isAll=true
    dataList?.forEach(row=>{
      if(!row[0]){
        isAll=false
      }
    })
    setCheckedAll!(isAll)
  }

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
export default ReactHandsontable
