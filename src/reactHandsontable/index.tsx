
import React, { useState,useEffect,memo, useRef} from 'react'
import { BaseEditorComponent, HotColumn, HotTable } from '@handsontable/react';
import _ from 'lodash';
import dayjs from 'dayjs';
import 'handsontable/dist/handsontable.full.min.css';
import { Button, Select } from 'antd';
import CustomEditors from 'package/react/CustomEditors';
import CustomRender from 'package/react/CustomRender';

import ReactHandsontable from 'package/react/ReactHandsontable';
import Uselect from "./select"
import RendererComponent from './RendererComponent';

const MyTable = () => {
  const rootMyTable = useRef(null)

  const [data, setData] = useState<any>()
  useEffect(() => {
    init()
  }, []);

  const emailValidator = (value:any, callback:(e: boolean) => void) => {
    setTimeout(() => {
      if (/.+@.+/.test(value)) {
        callback(true);
  
      } else {
        callback(false);
      }
    }, 0);
  };

  const init = () => {
    let list1 = [];
    let year = 2023;
    for (let i = 0; i < 500; i++) {
      // list1.push({
      //   year: yaer - i, momth: 12, day: 160+i,second:i
      // })
      let m=_.round(Math.random() * 10 + 1,2)
      list1.push(["joijjoijoijjoijoijjoijjoijoijoij" ,160+m,56+m,"jack","jack",dayjs('2015/01/01', 'YYYY/MM/DD'),false,false,'断言。'])
    }
    setData(list1)
  }

  const getRow=()=>{
    console.log(rootMyTable.current!.getSelectRow())
  }

  const validate=()=>{
    rootMyTable.current?.validateFields().then(valid=>{
      console.log(valid)
    }).catch(error=>{
      console.log(error)
    })
  }


  const emptyValidator = (value:any, callback:(e: boolean) => void) => {
    if (value) {
      callback(true);

    } else {
      callback(false);
    }
  };

  return <div className='mytable'>
    <Button onClick={getRow}>获取选中行</Button>
    <Button onClick={validate}>校验</Button>

    <ReactHandsontable
      ref={rootMyTable}
      data={data}
      selected
    >
      <HotColumn width={250} title='文本'>
        <CustomEditors hot-editor >
          <Uselect></Uselect>
        </CustomEditors>
        {/* <CustomRender hot-renderer>
          <RendererComponent></RendererComponent>
        </CustomRender> */}
      </HotColumn>
      <HotColumn width={200} title='身高' wordWrap={ false} >
        <CustomEditors hot-editor >
          <Select
            placeholder="Select a person"
            mode="multiple"

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
        </CustomEditors>
      </HotColumn>
      <HotColumn width={200} title='身高' reqiured={ true} allowInvalid={true} validator={emptyValidator}>
        <CustomRender hot-renderer>
        </CustomRender>
      </HotColumn>
    </ReactHandsontable>
  </div>
}
export default memo(MyTable)

