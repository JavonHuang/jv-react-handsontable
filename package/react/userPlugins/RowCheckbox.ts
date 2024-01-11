import HotTable from "@handsontable/react";
import Handsontable from "handsontable/base";

export default class RowCheckbox { 
  static hot: HotTable;
  static selectMap: any = {}
  static selectClass:any = "ant-checkbox-checked"
  
  static createCheckbox = (row: number, parent: Element) => { 
    let dom: HTMLElement = document.createElement("div")
    let _class = ""
    if (this.selectMap[row]) { 
      _class=this.selectClass
    }
    dom.innerHTML=`<label class="ant-checkbox-wrapper css-dev-only-do-not-override-2rgkd4"><span class="all-RowCheckbox ant-checkbox ant-wave-target css-dev-only-do-not-override-2rgkd4 ${_class}"><input class="ant-checkbox-input" type="checkbox"><span class="ant-checkbox-inner"></span></span></label>`
    this.selectMap[row]=false
    parent.appendChild(dom)
    let  allList = parent.querySelectorAll('.all-RowCheckbox')!
    for(let i=0;i<allList.length;i++){
      let has=allList[i]
      has.addEventListener("click", (e)=>{
        if (!this.selectMap[row]) { 
          has.classList.add('ant-checkbox-checked')
          this.selectMap[row] = true
          this.changeAll(true)
  
          let listNde = document.querySelectorAll('.RowCheckbox')
          for (let i = 0; i < listNde.length; i++){ 
            listNde[i].classList.add('ant-checkbox-checked')
          }
        }else{ 
          has.classList.remove('ant-checkbox-checked')
          this.selectMap[row] = false
          this.changeAll(false)
  
          let listNde = document.querySelectorAll('.RowCheckbox')
          for (let i = 0; i < listNde.length; i++){ 
            listNde[i].classList.remove('ant-checkbox-checked')
          }
        }
      });
    }
  }
  static addEventListener = (row: number, parent: HTMLElement) => { 
    let has = parent.querySelector('.RowCheckbox')!
    has.addEventListener("click", (e)=>{
      if (!this.selectMap[row]) { 
        has.classList.add('ant-checkbox-checked')
        this.selectMap[row]=true
        this.updateSelectRowChecked(true)
      }else{ 
        has.classList.remove('ant-checkbox-checked')
        this.selectMap[row] = false
        this.updateSelectRowChecked(false)
      }
      this.checkIsAllSelect()
    });
  }

  static getDom = (row: number): string => { 
    let _class = ""
    if (this.selectMap[row] || this.selectMap['-1']) {
      _class = this.selectClass
      this.selectMap[row]=true
    } 
    return `<label class="ant-checkbox-wrapper css-dev-only-do-not-override-2rgkd4"><span id="my-rowIndex-${row}" class="RowCheckbox ant-checkbox ant-wave-target css-dev-only-do-not-override-2rgkd4 ${_class}"><input class="ant-checkbox-input" type="checkbox"><span class="ant-checkbox-inner"></span></span></label>`
  }

  static setHot = (e: Handsontable,data:Array<any>  ) => { 
    this.hot = e
    for (let i = 0; i < data.length; i++) { 
      this.selectMap[i]=false
    }
  }

  static changeAll = (result:boolean) => { 
    Object.keys(this.selectMap).map(key => { 
      this.selectMap[key]=result
    })
  }

  static checkIsAllSelect = () => { 
    let result=true
    Object.keys(this.selectMap).map(key => { 
      if(!this.selectMap[key]&&key!='-1'){
        result=false
      }
    })
    let allList = document.querySelectorAll('.all-RowCheckbox')!
    for(let i=0;i<allList.length;i++){
      let item=allList[i]
      if(!result){
        item.classList.remove('ant-checkbox-checked')
        this.selectMap[-1]=false
      }else{
        item.classList.add('ant-checkbox-checked')
        this.selectMap[-1]=true
      }
    }
  }

  static updateSelectRowChecked=(e:boolean)=>{
    let selectArr:any = this.hot.getSelected()
    selectArr.forEach((item:Array<number>) => {
      if(item[1]==-1){
        for(let startRowIndex=item[0];startRowIndex<=item[2];startRowIndex++){
          let node = document.getElementById(`my-rowIndex-${startRowIndex}`)!
          if(e){
            node.classList.add('ant-checkbox-checked')
          }else{
            node.classList.remove('ant-checkbox-checked')
          }
          this.selectMap[startRowIndex] = e
        }
      }
    });
  }
}