import HotTable from "@handsontable/react";

export default (hot:HotTable)=>{
  return (event) => {
    let selectArr: any = hot.hotInstance!.getSelected()
    let allArr =hot.hotInstance!.getData();
    if (allArr.length == (selectArr[0][0] + 1)) {
      hot.hotInstance!.alter('insert_row_below');
    }
    return { col: 0, row: 1 };
  }
}