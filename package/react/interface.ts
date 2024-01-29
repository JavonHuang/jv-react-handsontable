export interface IRefReactHandsontable{
  validateFields:()=>Promise<any>
}
export interface IReactHandsontable { 
  data: []
  children: Array<React.ReactNode>
  selected?:boolean,
  onColumnWidthChange?:(newSize:number,column:number)=>void,
  setCellClassName?:(value:any,Row:number,column:number)=>string,
  onSelectAll?:()=>boolean,
}

