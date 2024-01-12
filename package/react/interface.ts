import { HotColumn, HotTableProps } from "@handsontable/react";
import { tuple } from "./tsTool";

export interface IRefReactHandsontable{
  validateFields:()=>Promise<any>
}
export interface IReactHandsontable { 
  data: []
  children: Array<React.ReactNode>
  selected?:boolean,
  onColumnWidthChange?:(newSize:number,column:number)=>void
}

