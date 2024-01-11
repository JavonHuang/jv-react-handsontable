import { Select } from 'antd'
import React, { useState,useEffect,memo, useRef} from 'react'
const Uselect = (props: any) => { 
  console.log('Uselect', props)
  console.log('Uselect',props.getValue())
  const change=(e:any)=>{
    props.setValue!(e)
  }
  return <Select
    placeholder="Select a person"
    mode="multiple"
    onChange={change}
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
 
export default memo(Uselect)