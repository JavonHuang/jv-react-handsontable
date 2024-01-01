import Core from "handsontable/core";
import { createContext } from "react";
/**
 * @param hot table对象，可以调用原handsontable的函数及钩子
 * @param row 当前行
 * @param col 当前列
 * @param originalValue 原始值
 */
export interface IhandsontableInfo { 
  hot?: Core|undefined
  row?: number|undefined
  col?: number | undefined,
  originalValue?:any
}
/**
 * @param getValue 获取当前编辑单元格的初始值
 * @param setValue 更新值e，close是否立即关闭编辑
 * @param handsontableInfo 当前编辑的单元格信息
 */
export interface IReactHandsontableContext { 
  getValue?:()=>any
  setValue?:(e:any,close?:boolean)=>void
  handsontableInfo?: IhandsontableInfo,
}
export const ReactHandsontableContext = createContext<IReactHandsontableContext>({});
