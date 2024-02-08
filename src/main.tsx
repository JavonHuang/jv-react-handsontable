import "./main.scss";
import { createRoot } from 'react-dom/client';
// import MyTable from "@/handsontable"
import MyTable from "@/reactHandsontable"
import PromotionRenderer from "@/demo";
import ExampleComponentjs from "@/js";


createRoot(document.getElementById('root')!).render(<MyTable />)

// createRoot(document.getElementById('root')!).render(<PromotionRenderer />)
// createRoot(document.getElementById('root')!).render(<ExampleComponentjs />)


