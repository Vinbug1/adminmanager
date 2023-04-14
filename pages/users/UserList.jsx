import React, { useState, useEffect } from "react";
import EditUser from "./EditUser";
import User from "./User";
import axios from "axios";
import baseUrl from "../api/baseUrl";
import AsyncLocalStorage from '@createnextapp/async-local-storage';
import { toast } from "react-toastify";

const UserList = ({user}) => {
    const [users, setUsers] = useState();
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState(null);
    const [responseUser, setResponseUser] = useState(null);
    const [tkn, setTkn] = useState();

    let readData = async () => {
        let data= await AsyncLocalStorage.getItem('@key')
        if (data) {
          setTkn(data);
        }else{
          toast("No token", { autoClose: 3000, type: 'error',position:'bottom-right' });
        }
      }

    useEffect(() => {
        readData();
           // setLoading(true);
            axios({
                method: "GET",
                url:`${baseUrl}users`,
                    headers: {
                        Authorization: "Bearer " + tkn,
                        "Content-Type": "application/json",
                    },

                }).then((res) =>{
                    setUsers(res.data); 
                }).catch ((error) => {
                    toast(error.message, { autoClose: 3000, type: 'error',position:'bottom-right' })
                }) 
        },[user, responseUser]);

    const deleteUser = (e, id) => {
        e.preventDefault();
        axios({
            method: "DELETE",
            url:`${baseUrl} /users/${id}`,
        }).then((res) => {
            if (users) {
                setUsers((prevElement) => {
                    return prevElement.filter((user) => user.id !== id);
                });
            }
        });
    };

    const editUser = (e, id) => {
        e.preventDefault();
        setUserId(id);
    };

    return (
        <>
            <div className="container mx-auto my-2">
                <div className="flex shadow border-b">
                    <table className="min-w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                                    First Name
                                </th>
                                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                                    Last Name
                                </th>
                                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                                    EmailId
                                </th>
                                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                                    Role
                                </th>
                                <th className="text-right font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        {!loading && (
                            <tbody className="bg-white">
                                {users?.map((user,index) => {
                                    <div key={index}>
                                        <p>
                                          {user.firstname}
                                        </p>
                                        </div>
                                    // <User
                                    //     user={user}
                                    //     key={user.id}
                                    //     deleteUser={deleteUser}
                                    //     editUser={editUser}
                                    // />
                                })}
                            </tbody>
                        )}
                    </table>
                </div>
            </div>
            <EditUser userId={userId} setResponseUser={setResponseUser} />
        </>
    )
}

export default UserList