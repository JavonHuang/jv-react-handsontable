import HotTable from "@handsontable/react";

const setDropdownMenu=(hot:HotTable,props:any)=>{
  const hidden=(key:any)=>{
    return ()=>{
      let result=props.children[hot.hotInstance!.getSelectedRangeLast()!.to.col]!.props[key]!;
      return typeof result!='undefined' && !result
    }
  }
  return {
    items: {
      row_above:{
        hidden:hidden('row_above')
      },
      row_below:{
        hidden:hidden('row_below')
      },
      col_left:{
        hidden:hidden('col_left')
      },
      col_right:{
        hidden:hidden('col_right')
      },
      '---------':{
        hidden:hidden('---------')
      },
      remove_row:{
        hidden:hidden('remove_row')
      },
      remove_col:{
        hidden:hidden('remove_col')
      },
      clear_column:{
        hidden:hidden('clear_column')
      },
      undo:{
        hidden:hidden('undo')
      },
      redo:{
        hidden:hidden('redo')
      },
      copy_with_column_group_headers:{
        hidden:hidden('copy_with_column_group_headers')
      },
      copy_with_column_headers:{
        hidden:hidden('copy_with_column_headers')
      },
      freeze_column:{
        hidden:hidden('freeze_column')
      },
      unfreeze_column:{
        hidden:hidden('unfreeze_column')
      },
      borders:{
        hidden:hidden('borders')
      },
      commentsAddEdit:{
        hidden:hidden('commentsAddEdit')
      },
      commentsRemove:{
        hidden:hidden('commentsRemove')
      },
      commentsReadOnly:{
        hidden:hidden('commentsReadOnly')
      },
      hidden_rows_hide:{
        hidden:hidden('hidden_rows_hide')
      },
      hidden_rows_show:{
        hidden:hidden('hidden_rows_show')
      },
      filter_by_condition:{
        hidden:hidden('filter_by_condition')
      },
      filter_operators: {
        hidden:hidden('filter_operators')
      },
      filter_by_condition2: {
        hidden:hidden('filter_by_condition2')
      },
      filter_by_value: {
        hidden:hidden('filter_by_value')
      },
      filter_action_bar: {
        hidden:hidden('filter_action_bar')
      },
    },
  }
}

export default setDropdownMenu