import { ReactHandsontableContext } from "@/../package/ReactHandsontableContext";
import { Select } from "antd";
import { useContext, useState } from "react";

const Test2=(props:any) => { 
  const reactHandsontableContext = useContext(ReactHandsontableContext)!
  const [defaultValue] = useState(props.originalValue)
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  const onChange = (e:any) => { 
    reactHandsontableContext.setValue!(e,false)
  }
  return <Select
    onMouseDown={onPreventMouseDown}
    mode="multiple"
    placeholder="Select a person"
    optionFilterProp="children"
    defaultValue={defaultValue}
    onChange={onChange}
    options={[
      {
        value: 'jack',
        label: 'Jack',
      },
      {
        value: 'lucy',
        label: 'Lucy',
      },
      {
        value: 'tom',
        label: 'Tom',
      },
    ]}
  />
}
export default Test2