import { ColorPicker } from 'antd'
import React, { useState,useEffect,memo, useRef} from 'react'
const ColorPickerRender = (props: any) => { 
  const color=useRef(props.value)
  const onChange = (e,hex) => { 
    // props.cellProperties.instance.setDataAtCell(props.row,props.col,e)
    color.current=hex
  }
  const onOpenChange=(e)=>{
    if(!e){
      props.cellProperties.instance.setDataAtCell(props.row,props.col,color.current)
    }
  }
  return   <ColorPicker defaultValue={props.value} size="small" onChange={onChange} onOpenChange={onOpenChange}/>
}
 
export default memo(ColorPickerRender)