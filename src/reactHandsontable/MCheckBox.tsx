import { Checkbox } from 'antd'
import React, { useState,useEffect,memo, useRef} from 'react'
const MCheckBox = (props: any) => { 
  const [value,setValue]=useState(props.value??false)
  console.log('MCheckBox', props)
  const change = (e) => { 
    props.cellProperties.instance.setDataAtCell(props.row,props.col,e.target.checked)
  }

  return <Checkbox defaultChecked={props.value??false} onChange={change}></Checkbox>
}
 
export default memo(MCheckBox)