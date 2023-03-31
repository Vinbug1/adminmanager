import React, { useState, useEffect } from "react";
import EditUser from "./EditUser";
import User from "./User";

const UserList = () => {
    const [users, setUsers] = useState();
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState(null);
    const [responseUser, setResponseUser] = useState(null);

    useEffect(() => {
            setLoading(true);
            axios({
                method: "GET",
                    url:`${baseUrl}users/${id}`,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }).then((res) =>{
                    setUsers(res.data);
                    setLoading(false);
                }).catch ((error) => {
                    console.log(error);
                }) 
        });

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
            <div className="container mx-auto my-8">
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
                                <th className="text-right font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        {!loading && (
                            <tbody className="bg-white">
                                {users?.map((user) => {
                                    <User
                                        user={user}
                                        key={user.id}
                                        deleteUser={deleteUser}
                                        editUser={editUser}
                                    />
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