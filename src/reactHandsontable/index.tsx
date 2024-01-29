
import React, { useState,useEffect,memo, useRef} from 'react'
import { BaseEditorComponent, HotColumn, HotTable } from '@handsontable/react';
import _ from 'lodash';
import dayjs from 'dayjs';
import 'handsontable/dist/handsontable.full.min.css';
import { Button, ColorPicker, DatePicker, Modal, Select } from 'antd';
import CustomEditors from 'package/react/CustomEditors';
import CustomRender from 'package/react/CustomRender';

import ReactHandsontable from 'package/react/ReactHandsontable';
import {checkboxCell,checkboxPageCell} from "package/react"
import SelectEdit from "./edit/SelectEdit"
import MselectEdit from './edit/MselectEdit';
import CheckBoxRender from './render/CheckBoxRender';
import DatePickerEdit from './edit/DatePickerEdit';
import RadioRender from './render/RadioRender';
import MCheckBoxRender from './render/MCheckBoxRender';
import ColorPickerRender from './render/ColorPickerRender';
import ModalTable from './modalTable';
import SelectObj from './edit/SelectObj';
import MSelectObj from './edit/MSelectObj';

const MyTable = () => {
  const rootMyTable = useRef(null)
  const checkIDMap = useRef({})

  const [data, setData] = useState<any>([])

  const [isModalOpen, setIsModalOpen] = useState(false);

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
    for (let i = 0; i < 4; i++) {
      // list1.push({
      //   year: yaer - i, momth: 12, day: 160+i,second:i
      // })
      let m=_.round(Math.random() * 10 + 1,2)
      list1.push({
        key0:`id_${i}`,
        key1: 'joijjoijoijjoijoijjoijjoijoijoij',
        key2: false,
        key3: 'Apple',
        key4: "jack",
        key5: "jack,lucy",
        key6: 56 + m,
        key7: "jack",
        key8: dayjs().unix(),
        key9: '#1677ff',
        key10: null,
        key11: false,
        key12: '断言。',
        fSelect:{
          key: '008',
          label: '珠海',
          value: '008',
        },
        fSelectMultiple: [
          {
            key: '005',
            label: '厦门',
            value: '005',
          },
          {
            key: '006',
            label: '澳门',
            value: '006',
          },
        ],
      })
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
    if (value>160) {
      callback(true);

    } else {
      callback(false);
    }
  };

  const setCellClassName=(rowData)=>{
    if(rowData[1]==true){
      return "select-row"
    }
    return "";
  }



    const showModal = () => {
      setIsModalOpen(true);
    };

    const handleOk = () => {
      setIsModalOpen(false);
    };

    const handleCancel = () => {
      setIsModalOpen(false);
    };

    const rendererFSelect=(instance, td, row, col, prop, value, cellProperties)=>{
      td.innerHTML=value.label
      return td;
    }

    const rendererfSelectMultiple=(instance, td, row, col, prop, value, cellProperties)=>{
      td.innerHTML=JSON.stringify(value)
      let laebl=value.map(e=>e.label).join(',')
      td.innerHTML=laebl
      return td;
  }
  
  const rendererChecked = (instance, td, row, col, prop, value, cellProperties)=>{
    checkboxPageCell(instance, td, row, col, prop, value, cellProperties,checkIDMap.current)
    return td;
}

  return <div className='mytable'>
    <Button onClick={getRow}>获取选中行</Button>
    <Button onClick={validate}>校验</Button>
    <Button onClick={showModal}>弹窗</Button>

    <ReactHandsontable
      ref={rootMyTable}
      data={data}
      selected={false}
      onColumnWidthChange={(newSize, column) => console.log(newSize, column)}
      setCellClassName={setCellClassName}
    >
      <HotColumn width={80} data={'key0'} renderer={rendererChecked} allChecked>
      </HotColumn>
      <HotColumn width={250} title='文本' dropdownMenu={false} data={'key1'}>
        <CustomEditors hot-editor >
          <SelectEdit></SelectEdit>
        </CustomEditors>
        {/* <CustomRender hot-renderer renderer={(e) => <> Row: {e.row},column: {e.col},value: {e.value}</>}>
        </CustomRender> */}
      </HotColumn>
      <HotColumn width={80} title='勾选-单选' data={'key2'} renderer={checkboxCell}>
        {/* <CustomRender hot-renderer>
          <CheckBoxRender />
        </CustomRender> */}
      </HotColumn>
      <HotColumn width={250} title='勾选-多选' data={'key3'}>
        <CustomRender hot-renderer>
          <MCheckBoxRender />
        </CustomRender>
      </HotColumn>
      {/* <HotColumn width={200} title='单选' filter={false} data={'key4'}>
        <CustomEditors hot-editor >
          <SelectEdit />
        </CustomEditors>
      </HotColumn>
      <HotColumn width={200} title='多选' filter={false} data={'key5'}>
        <CustomEditors hot-editor >
          <MselectEdit />
        </CustomEditors>
      </HotColumn>
      <HotColumn width={100} title='身高' reqiured={true} validator={emptyValidator} allowInvalid={true} data={'key6'}>
        <CustomRender hot-renderer>
        </CustomRender>
      </HotColumn>
      <HotColumn width={100} filter_by_value={false} title='过滤器' data={'key7'}>
      </HotColumn>
      <HotColumn width={120} title='日期'>
        <CustomEditors hot-editor >
          <DatePickerEdit />
        </CustomEditors>
        <CustomRender hot-renderer renderer={(e) => dayjs.unix(e.value).format('YYYY-MM-DD')} data={'key8'}>
        </CustomRender>
      </HotColumn>
      <HotColumn width={100} title='颜色' data={'key9'}>
        <CustomRender hot-renderer>
          <ColorPickerRender />
        </CustomRender>
      </HotColumn>
      <HotColumn width={220} title='颜色' data={'key10'}>
        <CustomRender hot-renderer>
          <RadioRender />
        </CustomRender>
      </HotColumn>
      <HotColumn width={220} title='单选对象' data={'fSelect'} renderer={rendererFSelect}>
      <CustomEditors hot-editor >
          <SelectObj />
        </CustomEditors>
      </HotColumn> */}
      <HotColumn width={220} title='多选对象' data={'fSelectMultiple'} renderer={rendererfSelectMultiple}>
      <CustomEditors hot-editor >
          <MSelectObj />
        </CustomEditors>
      </HotColumn>
    </ReactHandsontable>
    <Modal className='modal-base' title="Basic Modal" zIndex={998} width="80%" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <ModalTable></ModalTable>
    </Modal>
  </div>
}
export default memo(MyTable)

