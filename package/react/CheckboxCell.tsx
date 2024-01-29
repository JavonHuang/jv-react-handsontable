
const checkboxCell= (instance, td, row, col, prop, value, cellProperties)=>{
  let _class = ""
  if (value) { 
    _class= "is-checked"
  }
  td.onclick = function () {
    td.onclick=null
    instance.setDataAtCell(row,col,!value)
  }
  td.innerHTML=`<label class="jv-checkbox"><span class="all-RowCheckbox ${_class}"><input class="checkbox-input" type="checkbox"><span class="checkbox-inner"></span></span></label>`
}


const checkboxPageCell= (instance, td, row, col, prop, value, cellProperties,map)=>{
  let _class = ""
  if (map&&map[value]&&map[value]==true) { 
    _class= "is-checked"
  }
  td.onclick = function () {
    if (map&&map[value]) {
      map[value] = false
    } else { 
      map[value] = true
    }
    td.onclick = null
    instance.setDataAtCell(row,col,value)
  }
  td.innerHTML=`<label class="jv-checkbox"><span class="all-RowCheckbox ${_class}"><input class="checkbox-input" type="checkbox"><span class="checkbox-inner"></span></span></label>`
}


const checkboxPageAll= (td,hot,onClick)=>{
  td.onclick = function () {
    let result=onClick()
    if(result){
      td.innerHTML=`<label class="jv-checkbox"><span class="all-RowCheckbox is-checked"><input class="checkbox-input" type="checkbox"><span class="checkbox-inner"></span></span></label>`
    }else{
      td.innerHTML=`<label class="jv-checkbox"><span class="all-RowCheckbox"><input class="checkbox-input" type="checkbox"><span class="checkbox-inner"></span></span></label>`
    }
    td.onclick=null
    hot.hotInstance.render()
  }
  td.innerHTML=`<label class="jv-checkbox"><span class="all-RowCheckbox"><input class="checkbox-input" type="checkbox"><span class="checkbox-inner"></span></span></label>`
}

export { checkboxCell, checkboxPageCell ,checkboxPageAll};