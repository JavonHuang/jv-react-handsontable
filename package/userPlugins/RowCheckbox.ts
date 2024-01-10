import Handsontable from "handsontable";

export default class RowCheckbox { 
  static hot: Handsontable;
  static selectMap: any = {}
  static selectClass:any = "ant-checkbox-checked"
  
  static data:Array<boolean>=[]
  static createCheckbox = (row: number, parent: Element) => { 
    let dom: HTMLElement = document.createElement("div")
    let _class = ""
    if (RowCheckbox.selectMap[row]) { 
      _class=RowCheckbox.selectClass
    }
    dom.innerHTML=`<label class="ant-checkbox-wrapper css-dev-only-do-not-override-2rgkd4"><span class="all-RowCheckbox ant-checkbox ant-wave-target css-dev-only-do-not-override-2rgkd4 ${_class}"><input class="ant-checkbox-input" type="checkbox"><span class="ant-checkbox-inner"></span></span></label>`
    // let has = parent.querySelector('.all-RowCheckbox')!
    // if (!has) { 
    //   RowCheckbox.data[row]=false
    //   parent.appendChild(dom)
    //   has = parent.querySelector('.all-RowCheckbox')!
    // }
    RowCheckbox.data[row]=false
    parent.appendChild(dom)
    let  has = parent.querySelector('.all-RowCheckbox')!

    has.addEventListener("click", function(e){
      if (!RowCheckbox.selectMap[row]) { 
        has.classList.add('ant-checkbox-checked')
        RowCheckbox.selectMap[row] = true
        RowCheckbox.changeAll(true)

        let listNde = document.querySelectorAll('.RowCheckbox')
        for (let i = 0; i < listNde.length; i++){ 
          listNde[i].classList.add('ant-checkbox-checked')
        }
      }else{ 
        has.classList.remove('ant-checkbox-checked')
        RowCheckbox.selectMap[row] = false
        RowCheckbox.changeAll(false)

        let listNde = document.querySelectorAll('.RowCheckbox')
        for (let i = 0; i < listNde.length; i++){ 
          listNde[i].classList.remove('ant-checkbox-checked')
        }
      }
    });
  }
  static addEventListener = (row: number, parent: HTMLElement) => { 
    let has = parent.querySelector('.RowCheckbox')!
    has.addEventListener("click", function(e){
      if (!RowCheckbox.selectMap[row]) { 
        has.classList.add('ant-checkbox-checked')
        RowCheckbox.selectMap[row]=true
      }else{ 
        has.classList.remove('ant-checkbox-checked')
        RowCheckbox.selectMap[row] = false
        RowCheckbox.removeAllChecked()
      }
    });
  }

  static getDom = (row: number): string => { 
    let _class = ""
    if (RowCheckbox.selectMap[row] || RowCheckbox.selectMap[-1]) {
      _class = RowCheckbox.selectClass
      RowCheckbox.selectMap[row]=true
    } 
    return `<label class="ant-checkbox-wrapper css-dev-only-do-not-override-2rgkd4"><span class="RowCheckbox ant-checkbox ant-wave-target css-dev-only-do-not-override-2rgkd4 ${_class}"><input class="ant-checkbox-input" type="checkbox"><span class="ant-checkbox-inner"></span></span></label>`
  }

  static setHot = (e: Handsontable) => { 
    RowCheckbox.hot = e
    let data = RowCheckbox.hot.getData()
    for (let i = 0; i < data.length; i++) { 
      RowCheckbox.selectMap[i]=false
    }
  }

  static changeAll = (result:boolean) => { 
    Object.keys(RowCheckbox.selectMap).map(key => { 
      RowCheckbox.selectMap[key]=result
    })
  }

  static removeAllChecked = () => { 
    RowCheckbox.selectMap['-1']=false
    let allCheckedNode = document.querySelector('.all-RowCheckbox')!
    allCheckedNode.click()
  }
}