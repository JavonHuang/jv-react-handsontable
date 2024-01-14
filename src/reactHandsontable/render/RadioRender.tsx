import { Radio } from 'antd'
import React, { useState,useEffect,memo, useRef} from 'react'
const RadioRender = (props: any) => { 
  const onChange = (e) => { 
    props.cellProperties.instance.setDataAtCell(props.row,props.col,e.target.value)
    props.cellProperties.instance.selectCell(props.row,props.col)
  }
  return   <Radio.Group defaultValue={props.value} onChange={onChange}>
    <Radio value={"1"}>A</Radio>
    <Radio value={"2"}>B</Radio>
    <Radio value={"3"}>C</Radio>
    <Radio value={"4"}>D</Radio>
  </Radio.Group>
}
 
export default memo(RadioRender)