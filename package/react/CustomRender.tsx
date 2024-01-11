import { ReactElement, ReactNode, cloneElement, memo, useEffect } from "react";
interface ICustomRender { 
  children?: ReactElement
}
const CustomRender = (props:ICustomRender|any) => {
  // the available renderer-related props are:
  // - `row` (row index)
  // - `col` (column index)
  // - `prop` (column property name)
  // - `TD` (the HTML cell element)
  // - `cellProperties` (the `cellProperties` object for the edited cell)
  let containerStyle: React.CSSProperties = {
    height:props.cellProperties.rowHeights-2+'px'
  };

  useEffect(()=>{
    console.log( props.cellProperties.valid)
  },[
    props.cellProperties.valid
  ])

  // console.log(props.cellProperties)
  return (
    <div style={containerStyle} className={props.cellProperties.reqiured?'jv-cell is-reqiured':'jv-cell'}>
      {props.children?cloneElement(props.children,props):props.value}
    </div>
  );
}

export default memo(CustomRender)