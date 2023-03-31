import React, { useState, useEffect } from "react";
import baseUrl from "../api/baseUrl";
import axios from "axios";

const EmpCard = () => {
    const [users, setUsers] = useState();
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);
    const [responseUser, setResponseUser] = useState(null);

    useEffect(() => {
      
                axios({
                    method: "GET",
                    url: `${baseUrl}employees`,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }).then((res) =>{
                    setUsers(res.data);
                }). catch ((error) =>{
                console.log(error);
            }) 
            //setLoading(false);
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
  )
}

export default EmpCard