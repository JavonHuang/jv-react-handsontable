import "./main.scss";
import { createRoot } from 'react-dom/client';
// import MyTable from "@/handsontable"
import MyTable from "@/reactHandsontable"

createRoot(document.getElementById('root')!).render(<MyTable/>)