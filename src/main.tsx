import "./main.scss";
import { createRoot } from 'react-dom/client';
import MyTable from "@/handsontable"
createRoot(document.getElementById('root')!).render(<MyTable/>)