import { ReactHandsontableContext } from "@/../package/ReactHandsontableContext";
import { Select } from "antd";
import { useContext, useState,useEffect } from "react";

const Test = (props:any) => { 
  
  const [defaultValue] = useState(props.originalValue)
  const reactHandsontableContext = useContext(ReactHandsontableContext)

  useEffect(() => { 
    console.log("Test:初始化",props)
  },[])

  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  const change=(e:any)=>{
    reactHandsontableContext.setValue!(e)
  }
  return <div>
    <Select
      defaultValue={defaultValue}
      onMouseDown={onPreventMouseDown}
      placeholder="Select a person"
      optionFilterProp="children"
      onChange={change}
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
  </div>
}

export default Test