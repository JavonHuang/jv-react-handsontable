
const checkboxCell= (instance, td, row, col, prop, value, cellProperties)=>{
  let _class = ""
  if (value) { 
    _class= "is-checked"
  }
  td.onclick = function () {
    td.onclick=null
    instance.setDataAtCell(row, col, !value)
    if (cellProperties.allChecked) { 
      instance.selectItem({row, col, value})
    }
  }
  td.innerHTML=`<label class="jv-checkbox"><span class="all-RowCheckbox ${_class}"><input class="checkbox-input" type="checkbox"><span class="checkbox-inner"></span></span></label>`
}


const checkboxAll = ( td, value) => {
  let _class = ""
  if (value) { 
    _class= "is-checked"
  }
  td.onclick = function () {
    td.onclick=null
  }
  td.innerHTML=`<label class="jv-checkbox"><span class="all-RowCheckbox ${_class}"><input class="checkbox-input" type="checkbox"><span class="checkbox-inner"></span></span></label>`
}

export { checkboxCell,checkboxAll};