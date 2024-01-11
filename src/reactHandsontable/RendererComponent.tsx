import { memo } from "react";
import { Checkbox } from 'antd';

const RendererComponent = (props) => {
  // the available renderer-related props are:
  // - `row` (row index)
  // - `col` (column index)
  // - `prop` (column property name)
  // - `TD` (the HTML cell element)
  // - `cellProperties` (the `cellProperties` object for the edited cell)
  console.log(props)
  return (
    <>
      <Checkbox></Checkbox>
     Row: {props.row}, column: {props.col},      value: {props.value}
    </>
  );
}

export default memo(RendererComponent)