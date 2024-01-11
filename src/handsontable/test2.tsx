import { ReactHandsontableContext } from "@/../package/js/ReactHandsontableContext";
import { Select } from "antd";
import { useContext, useEffect, useState } from "react";

const Test2=(props:any) => { 
  const reactHandsontableContext = useContext(ReactHandsontableContext)!
  let defaultValue:any=[]
  if(props.originalValue){
    defaultValue=props.originalValue
  }
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