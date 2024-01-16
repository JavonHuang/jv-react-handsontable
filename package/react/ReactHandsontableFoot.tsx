import BigNumber from "bignumber.js"
import React,{ useEffect, useState } from "react"

const ReactHandsontableFoot = (props) => { 
  useEffect(() => { 
    if (props.hotInstance) { 
      props.hotInstance.addHook('afterSelectionEnd', afterSelectionEnd);
    }
  },[props])
    //for foot-tool
  const [selectRowCount,setSelectRowCount]=useState<number>(0)
  const [selectColCount, setSelectColCount] = useState<number>(0)
  const [selectSum,setSelectSum]=useState<number>(0)
  const [selectMean,setSelectMean]=useState<number>(0)
  const [selectMax,setSelectMax]=useState<number|undefined>(0)
  const [selectMin, setSelectMin] = useState<number | undefined>(0)


      // 计算大小
      const calculateNumberFun =(num1, num2)=>{
        if(Number(num1)>Number(num2)){
            return Number(num1-num2 +1);
        }
         return Number(num2-num1 +1);
      }; 
  
    const afterSelectionEnd = (row, column, row2, column2) => {
      setSelectColCount(calculateNumberFun(column,column2));
      setSelectRowCount(calculateNumberFun(row,row2));   
      
      // selectMultipleRowsFun(row, column, row2, column2); // 选择多行整理勾选
      const res=props.hotInstance.getSourceData(row, column, row2, column2);
      if(res && Array.isArray(res)){
        let result=0; // 总和
        const arrayRegExp = [];
        const regExp=/^[0-9]+(\.[0-9]+)?$/; // 正则过滤数字类型数据
        for(const key in res){
          for(const obj in res[key]){
            if(regExp.test(res[key][obj]) && typeof res[key][obj] ==='number'){
              arrayRegExp.push(res[key][obj]);
              result=new BigNumber(result).plus(res[key][obj]);    
            }
          }
        }
        setSelectSum(result.toString());
        if(result.toString() >0 || Array.isArray(arrayRegExp) && arrayRegExp.length){
          setSelectMean(new BigNumber(result).dividedBy(arrayRegExp.length).toNumber());
          setSelectMax(BigNumber.max(...arrayRegExp).toNumber());
          setSelectMin(BigNumber.min(...arrayRegExp).toNumber());
        }else{
          setSelectMean(0);
          setSelectMax(0);
          setSelectMin(0);
        }
      }
    };
  
  return <div className='foot-tool'>选中[行数:{selectRowCount} 列数:{selectColCount} 求和:{selectSum} 平均:{selectMean} 最大:{selectMax} 最小:{ selectMin}]</div>
}

export default ReactHandsontableFoot