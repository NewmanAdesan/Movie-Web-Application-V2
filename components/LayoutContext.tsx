"use client"

import { layoutContextType } from "@/common.types";
import React, { useState } from "react";



let layoutContext = React.createContext<layoutContextType|null>(null);

const LayoutContext = ({children}: {children:React.ReactNode}) => {
  const [sidebarActive, setSidebarActive] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<string>("");
  const [searching, setSearching] = useState<boolean>(false);
  return (
    <layoutContext.Provider value={{searching, setSearching, searchText, setSearchText, sidebarActive, setSidebarActive}}>
        {children}
    </layoutContext.Provider>
  )
}

export const useLayoutContext = () => React.useContext(layoutContext);

export default LayoutContext;