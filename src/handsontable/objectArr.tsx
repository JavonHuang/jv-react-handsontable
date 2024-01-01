
import React, { useState,useEffect,memo, useRef} from 'react'
import ReactHandsontable from '@/components/ReactHandsontable';
import { Icolumns } from '@/components/interface';
import { Button, Calendar, CalendarProps, Checkbox, DatePicker, DatePickerProps, Select, Space } from 'antd';
import dayjs from 'dayjs';
import Test from './test';
import Test2 from './test2';
import Test3 from './test3';
import TestCheckBox from './TestCheckBox';
import _ from 'lodash';


const MyTable = () => {
  const [dataListt, setDataList] = useState<Array<any>>([])
  const [data, setData] = useState<any>()
  const [columns, setColumns] = useState<Array<Icolumns>>([
    {
      title: '文本',
      width: 180,
      wordWrap: true,
      className:'center',
      required: true,
      data: "year",
    },
    {
      title: '身高',
      width: 80,
      className:'center',
      required: true,
      data:"momth"
    },
    {
      title: '体重',
      width: 80,
      className:'center',
      required: true,
      data:'day',
    },
    {
      title: '单选',
      width: 80,
      data:"second",
      editorReactNode: <Test></Test>,
    },
  ])

  useEffect(() => {
    init()
  }, []);

  const init = () => {
    let list1 = [];
    let year = 2023;
    for (let i = 0; i < 10; i++) {
      list1.push({
        year: year - i,
        momth: 12,
        day: 160 + i,
        second: i
      })
    }
    setData(list1)
  }
  return <>
    <ReactHandsontable
      isData
    data={data}
    selected
    columns={columns}
  >
    </ReactHandsontable>
  </>
}
export default memo(MyTable)

