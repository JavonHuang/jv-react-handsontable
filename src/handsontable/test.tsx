import { ReactHandsontableContext } from "@/../package/ReactHandsontableContext";
import { Select } from "antd";
import { useContext, useState,useEffect } from "react";

const Test = (props:any) => { 
  
  const [yyuy, setYUYU] = useState()
  const reactHandsontableContext = useContext(ReactHandsontableContext)

  useEffect(() => { 
    console.log("Test:初始化",props)
  },[])

  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  const change=(e:any)=>{
    setYUYU(e)
    reactHandsontableContext.setValue!(e)
  }
  return <div>
  <Select
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