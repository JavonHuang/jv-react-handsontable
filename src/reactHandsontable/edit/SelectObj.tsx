import { Select } from 'antd'
import React, { useState,useEffect,memo, useRef} from 'react'
const SelectObj = (props: any) => { 
  let de;
  if (props.originalValue) { 
    de=props.originalValue
  }
  const [value,setValue]=useState(props.originalValue)

  const change=(e:any)=>{
    let {value,key,label}=e
    setValue({
      value,key,label
    })
   props.hotInstance.setDataAtCell(props.row,props.col,{
      value,key,label
    })
  }


  return <Select
    placeholder="Select a person"
    defaultValue={de}
    onChange={change}
    value={value}
    labelInValue
    optionFilterProp="children"
    options={[{
        key: '008',
        label: '珠海',
        value: '008',
      },
      {
        key: '005',
        label: '厦门',
        value: '005',
      },
      {
        key: '006',
        label: '澳门',
        value: '006',
      },
      {
        key: '007',
        label: '香港',
        value: '007',
      },
    ]}
  />
}
 
export default memo(SelectObj)