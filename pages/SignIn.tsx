import React, { useState, useEffect } from 'react';
import { FaFacebook, FaLinkedinIn, FaGoogle, FaRegEnvelope } from 'react-icons/fa'
import { MdLockOutline } from 'react-icons/md'
import baseUrl from "./api/baseUrl";
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router'
import axios from 'axios';
import { getUseData } from './redux/slices/userSlice';
import AsyncLocalStorage from '@createnextapp/async-local-storage';


const SignIn = () => {
    const dispatch = useDispatch();
    let router = useRouter()
    const [user, setUser] = useState({ email: "", password: "" });

    const handleChange = (event: any) => {
        const value = event.target.value;
        setUser({ ...user, [event.target.name]: value });
    };
    const saveUser = () => {
        axios({
            method: "POST",
            url: `${baseUrl}users/login`,
            data: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((responseJson) => {
            // console.log("something new", dispatch);
            if (responseJson.status === 200) {
                const accessToken = responseJson.data.token;
                let userData = {
                    fullName: responseJson.data.user,
                    token: accessToken
                }
                router.push('/users/AddUser');
                AsyncLocalStorage.setItem('@key', 'accessToken');
                dispatch(getUseData(userData))
            }
        }).catch((error) => {
            console.log(error.message);
        });
    };

    return (
        <>
            <div className='flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100'>
                <div className='flex flex-col items-center justify-center w-full flex-1 px-20 text-center'>
                    <div className='bg-white rounded-2xl shadow-4xl flex w-2/3 max-w-4xl'>
                        <div className='w-2/5 bg-green-500 text-white rounded-tl-2xl rounded-bl-2xl py-36 px-12'>
                            <h2 className="text-3xl font-bold mb-2"> Hello Friend!</h2>
                            <div className='border-2 w-10 border-white inline-block mb-2'></div>
                            <p className='mb-10'>Welcome to green vision, We believe in your dreams </p>
                            <a href="#" className='border-2  border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-green-500'>SignUp</a>
                        </div>
                        <div className='w-3/5 p-5'>
                            <div className="text-left font-bold"><span className='text-green-500'>Green</span>Vision</div>
                            <div className='py-2'>
                                <h2 className='text-3xl font-bold text-green-500 mb-2'>SignIn in to Account</h2>
                                <div className='border-2 w-10 border-green-500 inline-block mb-2'></div>
                                <div className='flex justify-center my-2'>
                                    <a href="#" className='border-2 border-green-500 rounded-full p-3 mx-1 hover:bg-green-500 hover:text-white'>
                                        <FaFacebook className='text-sm  text-green-500  hover:bg-green-500 hover:text-white' />
                                    </a>
                                    <a href="#" className='border-2 border-green-500 rounded-full p-3 mx-1  hover:bg-green-500 hover:text-white'>
                                        <FaLinkedinIn className='text-sm   text-green-500  hover:bg-green-500 hover:text-white' />
                                    </a>
                                    <a href="#" className='border-2 border-green-500 rounded-full p-3 mx-1  hover:bg-green-500 hover:text-white'>
                                        <FaGoogle className='text-sm   text-green-500  hover:bg-green-500 hover:text-white' />
                                    </a>
                                </div>
                                <p className='text-green-500 mb-3'> Or use your email account</p>
                                <div className="flex flex-col items-center ">
                                    <div className="flex flex-col  p-2 items-center mb-2">
                                        <div className="bg-gray-100 w-64 p-2 flex items-center  ">
                                            <FaRegEnvelope className="text-green-500 m-2" />
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Email"
                                                className='bg-gray-100  outline-none text-sm flex-1'
                                                value={user.email} onChange={(e) => handleChange(e)} />
                                        </div>
                                    </div>
                                    <div className="flex flex-col  p-2 items-center mb-2">
                                        <div className="bg-gray-100 w-64 p-2 flex items-center  ">
                                            <MdLockOutline className="text-green-500 m-2" />
                                            <input type="password" value={user.password} onChange={(e) => handleChange(e)} name="password" placeholder="Password" className='bg-gray-100  outline-none text-sm flex-1' />
                                        </div>
                                    </div>
                                    <div className='flex justify-between w-64 mb-5'>
                                        <label className='flex items-center text-xs'><input type="checkbox" name="remember" className='mr-1' />Remember me</label>
                                        <a href='#' className='text-xs'> Forgot Password?</a>
                                    </div>
                                    <div className='border-2  border-green-500 text-green-400 rounded-full px-12 py-2 font-semibold hover:bg-green-600 hover:text-white'>
                                        <button type='button' onClick={() => saveUser()} >SignIn</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default SignIn