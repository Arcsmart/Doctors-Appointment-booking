import { useState } from "react";
import { createContext } from "react";


export const AdminContex = createContext()

const AdmincontexProvider=(props)=>{
   const [aToken,setToken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'') 
   const backendUrl = import.meta.env.VITE_BACKEND;     
  const value = { aToken, setToken,backendUrl, }; 
  
  
  return (
     <AdminContex.Provider value={value}>
      {props.children}
     </AdminContex.Provider>     
  )
} 

export default AdmincontexProvider
