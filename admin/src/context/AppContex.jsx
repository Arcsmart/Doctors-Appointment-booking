import { createContext } from "react";


export const AppContex = createContext()

const AppcontexProvider=(props)=>{
  const value ={} 
  
  
  return (
     <AppContex.Provider value={value}>
      {props.children}
     </AppContex.Provider>     
  )
}

export default AppcontexProvider
