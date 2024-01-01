import { ReactHandsontableContext } from "@/../package/ReactHandsontableContext";
import { Checkbox } from "antd";
import { useContext, useState } from "react";

const TestCheckBox=() => { 
  const reactHandsontableContext = useContext(ReactHandsontableContext)!
  const [defaultValue]=useState(reactHandsontableContext.getValue!())
  const onChange = (e:any) => { 
    reactHandsontableContext.setValue!(e.target.checked)
  }
  return <Checkbox defaultChecked={defaultValue } onChange={onChange}></Checkbox>
}
export default TestCheckBox