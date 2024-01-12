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

  return <div style={containerStyle} className={[props.cellProperties.reqiured?'jv-cell is-reqiured':'jv-cell',props.cellProperties.valid===false?props.cellProperties.invalidCellClassName:''].join(' ')}>
      {props.children?cloneElement(props.children,props):props.value}
    </div>
}

export default memo(CustomRender)