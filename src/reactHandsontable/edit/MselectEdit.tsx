import { Select } from 'antd'
import React, { useState,useEffect,memo, useRef} from 'react'
const MselectEdit = (props: any) => { 
  let de;
  if (props.getValue()) { 
    de=props.getValue().split(',')
  }
  const [value,setValue]=useState(de)

  const change=(e:any)=>{
    props.setValue!(e)
    setValue(e)
  }
  return <Select
    placeholder="Select a person"
    onChange={change}
    mode="multiple"
    defaultValue={de}
    value={value}
    optionFilterProp="children"
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
 
export default memo(MselectEdit)