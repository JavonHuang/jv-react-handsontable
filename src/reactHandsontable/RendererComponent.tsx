import { memo } from "react";

const RendererComponent = (props) => {
  return (
    <>
     Row: {props.row},column: {props.col},value: {props.value}
    </>
  );
}

export default memo(RendererComponent)