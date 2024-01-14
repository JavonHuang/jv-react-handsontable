import { Checkbox } from 'antd'
import React, { useState,useEffect,memo, useRef} from 'react'
const CheckBoxRender = (props: any) => { 
  const change = (e) => { 
    props.cellProperties.instance.setDataAtCell(props.row,props.col,e.target.checked)
  }

  return <Checkbox defaultChecked={props.value??false} onChange={change}></Checkbox>
}
 
export default memo(CheckBoxRender)