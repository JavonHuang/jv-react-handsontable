import HotTable from "@handsontable/react";

export default class RowCheckbox { 
  static hot: HotTable;
  static selectClass:any = "is-checked"
  static selectArr:Array<boolean>=[]
  static allCheck:boolean=false
  static allCheckDom:Element;

  
  static createCheckbox = (parent: Element) => { 
    if(!parent){
      return;
    }
    this.allCheckDom=parent;
    let dom: HTMLElement = document.createElement("div")
    let _class = ""
    if (this.allCheck) { 
      _class=this.selectClass
    }
    dom.innerHTML=`<label class="jv-checkbox"><span class="all-RowCheckbox ${_class}"><input class="checkbox-input" type="checkbox"><span class="checkbox-inner"></span></span></label>`
    
    parent.appendChild(dom)
    dom.addEventListener("click", (e)=>{
      if (!this.allCheck) { 
        this.allCheckDom.querySelector('.all-RowCheckbox')!.classList.add('is-checked')
        this.allCheck = true
        this.changeAll(true)

        let listNde = document.querySelectorAll('.RowCheckbox')
        for (let i = 0; i < listNde.length; i++){ 
          listNde[i].classList.add('is-checked')
        }
      }else{ 
        this.allCheckDom.querySelector('.all-RowCheckbox')!.classList.remove('is-checked')
        this.allCheck= false
        this.changeAll(false)

        let listNde = document.querySelectorAll('.RowCheckbox')
        for (let i = 0; i < listNde.length; i++){ 
          listNde[i].classList.remove('is-checked')
        }
      }
    });
  }
  static addEventListener = (row: number, parent: HTMLElement) => { 
    let has = parent.querySelector('.RowCheckbox')!
    has.addEventListener("click", (e)=>{
      if (!this.selectArr[row]) { 
        has.classList.add('is-checked')
        this.selectArr[row]=true
        this.updateSelectRowChecked(true)
      }else{ 
        has.classList.remove('is-checked')
        this.selectArr[row] = false
        this.updateSelectRowChecked(false)
      }
      this.checkIsAllSelect()
    });
  }

  static getDom = (row: number): string => { 
    let _class = ""
    if (this.selectArr[row]) {
      _class = this.selectClass
      this.selectArr[row]=true
    } 
    return `<label class="jv-checkbox"><span id="my-rowIndex-${row}" class="RowCheckbox ${_class}"><input class="checkbox-input" type="checkbox"><span class="checkbox-inner"></span></span></label>`
  }

  static setHot = (e: HotTable,data:Array<any>  ) => { 
    this.hot = e
    for (let i = 0; i < data.length; i++) { 
      this.selectArr.push(false)
    }
  }

  static changeAll = (result:boolean) => { 
    for (let i = 0; i < this.selectArr.length; i++) { 
      this.selectArr[i]=result
    }
  }

  static checkIsAllSelect = () => { 
    let result=this.selectArr.findIndex(item=>item==false)
    if(result>-1){
      this.allCheckDom.querySelector('.all-RowCheckbox')!.classList.remove('is-checked')
    }else{
      this.allCheckDom.querySelector('.all-RowCheckbox')!.classList.add('is-checked')
    }
  }

  static updateSelectRowChecked=(e:boolean)=>{
    let selectArr:any = this.hot.__hotInstance!.getSelected()
    selectArr.forEach((item:Array<number>) => {
      if(item[1]==-1){
        for(let startRowIndex=item[0];startRowIndex<=item[2];startRowIndex++){
          let node = document.getElementById(`my-rowIndex-${startRowIndex}`)!
          if(e){
            node.classList.add('is-checked')
          }else{
            node.classList.remove('is-checked')
          }
          this.selectArr[startRowIndex] = e
        }
      }
    });
  }

  static getCheckRowData=()=>{
    let result=[]
    for(let i=0;i<this.selectArr.length;i++){
      if(this.selectArr[i]){
        result.push(this.hot.__hotInstance?.getDataAtRow(i))
      }
    }
    return result
  }
}