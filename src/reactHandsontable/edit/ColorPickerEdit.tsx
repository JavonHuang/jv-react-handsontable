import { ColorPicker, DatePicker, DatePickerProps, Select } from 'antd'
import React, { useState,useEffect,memo, useRef} from 'react'
import dayjs from 'dayjs';

const ColorPickerEdit = (props: any) => { 
  let de;
  if (props.getValue()) { 
    de=dayjs.unix(props.getValue())
  }
  const [value,setValue]=useState(de)

  const onChange = (color) => {
    props.setValue!(color)
    setValue(color);
  }
  return <ColorPicker defaultValue="de" value={value} onChange={onChange}/>;
}
 
export default memo(ColorPickerEdit)