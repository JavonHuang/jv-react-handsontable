import { tuple } from "./tsTool";

export interface IRefReactHandsontable{
  validateFields:()=>Promise<any>
}
export interface IReactHandsontable { 
  data: []
  isData?:boolean
  columns: Array<Icolumns> | []
  selected?:boolean|number,
  onColumnWidthChange?:(newSize:number,column:number)=>void
}
export const classTypes = tuple('center', 'left', 'top', 'right');

export type IclassTypes = typeof classTypes[number];

export interface Icolumns { 
  title: string
  data?:string,
  type?: string
  width?: number,
  readOnly?: boolean,
  editor?: boolean,
  allowInvalid?: boolean,
  wordWrap?: boolean,
  copyable?: boolean,
  copyPaste?: boolean,
  className?:IclassTypes,
  required?:boolean,
  editorReactNode?: React.ReactNode
  validator?:(value:any, callback:(e:boolean)=>void)=>void
  rendereCell?:(value:any, cellProperties:Object) =>React.ReactNode
}