import { ReactElement, ReactNode, cloneElement, memo } from "react";
interface ICustomRender { 
  children: ReactElement
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

  console.log(props.cellProperties)
  return (
    <div style={containerStyle}>
      {cloneElement(props.children,props)}
    </div>
  );
}

export default memo(CustomRender)