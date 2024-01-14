import { Checkbox } from 'antd'
import React, { useState,useEffect,memo, useRef} from 'react'
const MCheckBoxRender = (props: any) => { 
  let de;
  if (props.value) { 
    de=props.value.split(',')
  }
  const options = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' },
  ];
  const onChange = (e) => { 
    props.cellProperties.instance.setDataAtCell(props.row,props.col,e.join(','))
  }

  return <Checkbox.Group
    options={options}
    defaultValue={de}
    onChange={onChange}
  />
}
 
export default memo(MCheckBoxRender)