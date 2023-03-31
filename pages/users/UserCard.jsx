import React, { useState, useEffect } from "react";
import { RxPerson } from 'react-icons/rx';
import baseUrl from "../api/baseUrl";
import axios from "axios";
import AsyncLocalStorage from '@createnextapp/async-local-storage';
const UserCard = () => {

    const [users, setUsers] = useState();
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);
    const [responseUser, setResponseUser] = useState(null);
    const [tkn, setTkn] = useState("")
    const readData = async () => {
        let data= await AsyncLocalStorage.getItem('@key')
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
                    url: `${baseUrl}users/student`,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + tkn,
                    },
                }).then((res) =>{
                    setUsers(res.data);
                    setLoading(false);
                }). catch ((error) =>{
                console.log(error);
            }) 
        });
    return (
        <div className="flex flex-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-4 gap-16 mt-8 w-full ">
            {/* {users.map((user,index)=> ( 
            <div  key={index} className="flex items-center relative p-8 w-full  border-gray-400 rounded-lg overflow-hidden shadow hover:shadow-md ml-5">
                <div className=" bg-green-100  justify-center w-25 h-25 rounded-full  border-2 border-green-200">
                    <RxPerson size={60} />
                </div>
                <div className="ml-3">
                    <p className="font-medium text-black">{user.firstName}</p>
                    <p className="font-medium text-black">{user.laststName}</p>
                    <p className="font-medium text-black">{user.DateOfBirth}</p>
                    <p className="font-medium text-black">{user.Course}</p>
                </div>
            </div>

            ))} */}

            <div className="flex items-center relative p-8 w-full bg-white rounded-lg overflow-hidden shadow hover:shadow-md ml-5">
                <div className="w-12 h-12 rounded-full bg-gray-100"></div>
                <div className="ml-3">
                    <p className="font-medium text-gray-800">John doe</p>
                    <p className="text-sm text-gray-600">Last online 4 hours ago</p>
                </div>
            </div>

            <div className="flex items-center relative p-8 w-full bg-white rounded-lg overflow-hidden shadow hover:shadow-md ml-5">
                <div className="w-12 h-12 rounded-full bg-gray-100"></div>
                <div className="ml-3">
                    <p className="font-medium text-gray-800">John doe</p>
                    <p className="text-sm text-gray-600">Last online 4 hours ago</p>
                </div>
            </div>

            <div className="flex items-center relative p-8 w-full bg-white rounded-lg overflow-hidden shadow hover:shadow-md mr-5">
                <div className="w-12 h-12 rounded-full bg-gray-100"></div>
                <div className="ml-3">
                    <p className="font-medium text-gray-800">John doe</p>
                    <p className="text-sm text-gray-600">Last online 4 hours ago</p>
                </div>
            </div>
        </div>

        // <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-green-100 dark:border-green-700 ml-48">
        //     <div className="flex justify-end px-4 pt-4 py-25">
        //         <button id="dropdownButton" data-dropdown-toggle="dropdown" className="inline-block text-green-500 dark:text-green-400 hover:bg-gray-100 dark:hover:bg-green-200 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-green-700 rounded-lg text-sm p-1.5" type="button">
        //             <span className="sr-only">Open dropdown</span>
        //             <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path></svg>
        //         </button>
        //         {/* <!-- Dropdown menu --> */}
        //         <div id="dropdown" className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-green-700">
        //             <ul className="py-2" aria-labelledby="dropdownButton">
        //                 <li>
        //                     <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit</a>
        //                 </li>
        //                 {/* <li>
        //                     <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Export Data</a>
        //                 </li> */}
        //                 <li>
        //                     <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
        //                 </li>
        //             </ul>
        //         </div>
        //     </div>
        //     <div className="flex flex-col items-center pb-9 ">
        //         <img className="w-45 h-28 mb-3 rounded-full shadow-lg" src="/docs/images/people/profile-picture-3.jpg" alt="Bonnie image" />
        //         <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Bonnie Green</h5>
        //         <span className="text-sm text-gray-500 dark:text-gray-400">Visual Designer</span>
        //         {/* <div className="flex mt-4 space-x-3 md:mt-6">
        //             <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add friend</a>
        //             <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Message</a>
        //         </div> */}
        //     </div>
        // </div>

        // <div className='grid lg:grid-cols-3 gap-4 p-4 justify-around space-x-50'>
        //     {users?.map((user) => (
        //         <div className='lg:col-span-1 col-span-1 bg-white flex justify-between w-50  h-40 border p-4  rounded-lg  space-x-50'>
        //             <div className='flex flex-col w-full pb-4'>
        //                 <p className='text-2xl font-bold'>{user.FirstName}</p>
        //                 <p className='text-gray-600'>{user.LastName}</p>
        //             </div>
        //             <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg'> <span className='text-green-700 text-lg'>+18%</span></p>
        //         </div>
        //     ))}

        //     <a href="#" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        //         <image className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="/docs/images/blog/image-4.jpg" alt="">
        //             <div className="flex flex-col justify-between p-4 leading-normal">
        //                 <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
        //                 <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
        //             </div>
        //     </a>

        // </div>
    )
}

export default UserCard