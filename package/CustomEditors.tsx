import { Button, Select } from 'antd';
import Handsontable from 'handsontable'
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { createPortal } from 'react-dom';

class CustomEditors extends Handsontable.editors.BaseEditor {
  //第一次编辑才触发
  init() {
    // Create detached node, add CSS class and make sure its not visible
    this.select = this.hot.rootDocument.createElement('div');
    this.select.classList.add('htSelectEditor');
    this.select.style.display = 'none';
    // Attach node to DOM, by appending it to the container holding the table
    this.hot.rootElement.appendChild(this.select);
  }

  //编辑选中
  prepare(row, col, prop, td, originalValue, cellProperties) {
    super.prepare(row, col, prop, td, originalValue, cellProperties);
    this.close()
    this.row = row
    this.col = col
    this.originalValue=originalValue
    this.renderStyle = this.cellProperties.renderStyle
    this.renderNode = this.cellProperties.renderNode
    this.renderNode(null)
  }

  // onChange=(e,blClose)=> { 
  //   this._blClose=blClose
  //   this.hot.setDataAtCell(this.row, this.col, e)
  //   if(blClose){
  //     this.select.style.display = 'none';
  //   }
  // }

  getValue()  {
    return this.select.value;
  }
  
  setValue(value){
    this.select.value = value;
  }
  
  open() {
    const {
      top,
      start,
      width,
      height,
    } = this.getEditedCellRect();
    const selectStyle = this.select.style;
    this.cellProperties.afterRenderEdit(this.row, this.col, this.originalValue, this.hot,this)

    this._opened = true;
    this.renderNode(this.cellProperties.editorReactNode, {
      row: this.row,
      col: this.col,
      hot: this.hot,
      originalValue:this.originalValue,
    })

    selectStyle.height = `${height}px`;
    selectStyle.minWidth = `${width}px`;
    selectStyle.top = `${top}px`;
    selectStyle[this.hot.isRtl() ? 'right' : 'left'] = `${start}px`;
    selectStyle.margin = '0px';
    selectStyle.display = '';
    this.renderStyle(selectStyle)
  }
  
  focus() {
    this.select.focus();
  }
  
  close() {
    if (this.isClose) { 
      this._opened = false;
      this.select.style.display = 'none';
      this.renderStyle(this.select.style)
      this.renderNode(null)
      delete this.isClose
    }
    if (typeof this.isClose == 'undefined') { 
      this.select.style.display = 'none';
      this.renderStyle && this.renderStyle(this.select.style)
    }
  }
}

export default CustomEditors