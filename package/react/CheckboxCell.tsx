
const checkboxCell= (instance, td, row, col, prop, value, cellProperties)=>{
  let _class = ""
  if (value) { 
    _class= "is-checked"
  }
  td.onclick=function(){
    instance.setDataAtCell(row,col,!value)
    td.onclick=null
  }
  td.innerHTML=`<label class="jv-checkbox"><span class="all-RowCheckbox ${_class}"><input class="checkbox-input" type="checkbox"><span class="checkbox-inner"></span></span></label>`
}

export default checkboxCell;