import HotTable from "@handsontable/react";

export default (hot:HotTable)=>{
  return {
    callback(key, selection, clickEvent) {
      let filtersPlugin = hot.hotInstance?.getPlugin('filters')!;
      let to=hot.hotInstance?.getSelectedRangeLast()!.to

      // Common callback for all options
      switch (key) {
        case 'downLoad':
          const exportPlugin = hot.hotInstance!.getPlugin('exportFile');
          exportPlugin.downloadFile('csv', {
            bom: false,
            columnDelimiter: ',',
            columnHeaders: true,
            exportHiddenColumns: true,
            exportHiddenRows: true,
            fileExtension: 'csv',
            filename: 'Handsontable-CSV-file_[YYYY]-[MM]-[DD]',
            mimeType: 'text/csv',
            rowDelimiter: '\r\n',
            rowHeaders: true
          });
          break;
        case 'filter':
          let cellValue=hot.hotInstance?.getDataAtCell(to?.row!,to?.col!)
          filtersPlugin.addCondition(to?.col!, 'by_value', [[cellValue]]);
          filtersPlugin.filter();
          break;
        case "cearfilter":
            filtersPlugin.clearConditions(to?.col!);
            filtersPlugin.filter();
            break;
      }
    },
    items: {
      'downLoad': {
        name: '保存到本地'
      },
      'filter': {
        name: '过滤'
      },
      'cearfilter':{
        name:"清除过滤"
      }
    }
  }
}