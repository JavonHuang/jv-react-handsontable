import { DatePicker, DatePickerProps, Select } from 'antd'
import React, { useState,useEffect,memo, useRef} from 'react'
import dayjs from 'dayjs';

const DatePickerEdit = (props: any) => { 
  let de;
  if (props.getValue()) { 
    de=dayjs.unix(props.getValue())
  }
  const [value,setValue]=useState(de)

  const onChange = (date, dateString) => {
    props.setValue!(dayjs(date).unix())
    setValue(date)
  }
  return <DatePicker defaultValue={de} value={value} onChange={onChange}/>
}
 
export default memo(DatePickerEdit)