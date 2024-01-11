import HotTable from "@handsontable/react";
import { createContext } from "react";

/**
 * @param hot 
 */
export interface IReactHandsontableContext { 
  hot?: HotTable|null,
}
export const ReactHandsontableContext = createContext<IReactHandsontableContext>({});
