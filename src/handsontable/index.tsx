
import React, { useState,useEffect,memo, useRef} from 'react'
import ReactHandsontable from '@/../package/ReactHandsontable';
import { Icolumns } from '@/../package/interface';
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
      required:true
    },
    {
      title: '身高',
      width: 80,
      className:'center',
      required:true
    },
    {
      title: '体重',
      width: 80,
      className:'center',
      required:true
    },
    {
      title: '单选',
      width: 80,
      editorReactNode: <Test></Test>,
    },
    {
      title: '多选',
      width: 180,
      editorReactNode: <Test2></Test2>
    },
    {
      title: '月份',
      width: 240,
      editorReactNode: <Test3></Test3>
    },
    {
      title: 'ant checkbox',
      width: 240,
      editorReactNode: <TestCheckBox></TestCheckBox>
    },
    {
      title: '原生checkbox',
      width: 240,
      type:'checkbox'
    },
    {
      title: '溢出',
      width: 80,
      wordWrap:false
    },
  ])

  useEffect(() => {
    init()
  }, []);

  const init = () => {
    let list1 = [];
    let year = 2023;
    for (let i = 0; i < 10; i++) {
      // list1.push({
      //   year: yaer - i, momth: 12, day: 160+i,second:i
      // })
      let m=_.round(Math.random() * 10 + 1,2)
      list1.push(["joijjoijoijjoijoijjoijo ijjoijoij  joijoijoij" +"jiojio",160+m,56+m,"jack","jack",dayjs('2015/01/01', 'YYYY/MM/DD'),false,false,'在上面的示例中，我们首先定义了一个包含数字的数组。然后，我们使用类型断言将该数组转换为字符串类型数组。这里有两种方式可以实现：一种是使用Array<string>类型断言，另一种是直接使用string[]类型断言。'])
    }
    setData(list1)
  }
  return <>
    <ReactHandsontable
    data={data}
    selected
    columns={columns}
  >
    </ReactHandsontable>
  </>
}
export default memo(MyTable)

