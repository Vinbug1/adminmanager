import React, { useState, useEffect } from "react";
import baseUrl from "../api/baseUrl";
import axios from "axios";
// import AsyncLocalStorage from '@createnextapp/async-local-storage';
import { FaMoneyCheckAlt } from "react-icons/fa";
const ExpenCard = () => {
    const [expenses, setExpenses] = useState();
    const [tkn, setTkn] = useState("");
    const readData =  () => {
        let data =  localStorage.getItem('@key')
        if (data) {
          setTkn(data);
        }else{
          console.error("No token");
        }
      }
    useEffect(() => {
        readData();
        axios({
                    method: "GET",
                    url: `${baseUrl}expenditures`,
                    headers: {
                        Authorization: "Bearer " + tkn,
                        "Content-Type": "application/json",
                    },
                }).then((res) =>{
                    setExpenses(res.data);
                }). catch ((error) =>{
                console.log(error);
            }) 
            //setLoading(false);
        });
  return (
    <div className=' pl-8 overflow-y-auto max-h-95  scrollbar-hide rounded-lg w-full'>
    <div className='grid gap-4 grid-cols-4 grid-rows-4  p-14 '>
        {expenses?.map((expense,index)=> ( 
            <div  key={index} className='flex items-center p-1 h-39 w-25  bg-white rounded-lg  shadow hover:shadow-md '>
                <div className='flex'>
                    <div className=' bg-green-100 p-2  w-50 justify-center border-5 border-radius-5 border-green-200'>
                    <FaMoneyCheckAlt size={80} color="green" />
                    </div>
                    <div className='pl-2'>
                    <div className='flex gap-2  p-2'>
                        <p className='font-medium text-gray-800'>{expense.staff}</p>
                    </div>
                        <p className='font-medium text-gray-800'>{expense.department}</p>
                        <p className='text-sm text-gray-800'>{expense.purpose}</p>
                        {/* <p className='text-sm text-gray-800'>{expense.phone}</p> */}
                    </div>
                </div>
             
        </div>
        ))}
    </div>
   
</div> 
  )
}

export default ExpenCard