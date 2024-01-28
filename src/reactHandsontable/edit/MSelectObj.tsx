import { Select } from 'antd'
import React, { useState,useEffect,memo, useRef} from 'react'
const MSelectObj = (props: any) => { 
  let de;
  
  if (props.originalValue) { 
    de=props.originalValue
  }
  const [value,setValue]=useState(props.originalValue)

  const change=(e:any)=>{
    let list=e.map(item=>{
      return {'value':item.value,'key':item.key,'label':item.label}
    })

    setValue(list)
  }

  const onDropdownVisibleChange=()=>{
    props.setCloseCallback(null)
    props.hotInstance.setDataAtCell(props.row,props.col,value)
  }
  props.setCloseCallback(onDropdownVisibleChange)


  return <Select
    placeholder="Select a person"
    defaultValue={de}
    onChange={change}
    mode='multiple'
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
 
export default memo(MSelectObj)