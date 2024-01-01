import { ReactHandsontableContext } from "@/../package/ReactHandsontableContext";
import { DatePicker, DatePickerProps } from "antd";
import { useContext, useState } from "react";

const Test3 = () => { 
  const reactHandsontableContext = useContext(ReactHandsontableContext)
  const [defaultValue]=useState(reactHandsontableContext.getValue!())

  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    // setValue(dateString,true)
    reactHandsontableContext.setValue!(dateString,true)

  };
  return <DatePicker
    defaultValue={defaultValue}
    format={'YYYY/MM/DD'}
    onMouseDown={onPreventMouseDown}
    onChange={onChange} />
}

export default Test3