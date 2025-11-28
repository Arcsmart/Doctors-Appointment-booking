import React from 'react'
import { useContext } from 'react'
import { AdminContex } from '../../context/AdminContex'
import { useEffect } from 'react'

const DoctorList = () => {
  const { doctors, aToken, getAllDoctors, changeAvilablity } =
    useContext(AdminContex);
    useEffect(() => {
      if(aToken){
        getAllDoctors()
      }
    },[aToken])
    return (
      <div className='m-5 max-h-[90vh] overflow-y-scroll'>
        <h1 className='text-lg font-medium'>All Doctors</h1>
        <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
          {
            
            doctors?.map((item) => {
            
              return (
                
                <div className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={item._id}>
                  <img className='bg-indigo-50 group-hover:bg-blue-400 transition-all duration-500' src={item.image} alt={''} /> 
                  <div className='p-4'>
                    <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
                    <p className='text-zinc-600 text-sm'>{item.spaciality}</p>
                    <div className='mt-2 flex items-center gap-1 text-sm'>
                    
                      <input onChange = {()=> changeAvilablity(item._id)} type="checkbox" checked = {item.available}  />
                      <p>Available</p>
                    </div>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    );
}

export default DoctorList