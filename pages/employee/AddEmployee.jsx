import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import EmpCard from "./EmpCard";
import baseUrl from "../api/baseUrl";
import axios from 'axios';
import IndexLayout from "../layout/index";
//import toast from '../../pages/utils/IndexToast';

const AddEmployee = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState({
      image: "",
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      dateOfBirth: "",
      phone: "",
      userNames:"",
      password: "",
    });
    // const notify = React.useCallback((type, message) => {
    //     toast({ type, message });
    //   }, []);
  const [responseUser, setResponseUser] = useState({
    image:"",
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    dateOfBirth: "",
    phone: "",
    userName:"",
    password: "",
  });

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleChange = (event) => {
    const value = event.target.value;
    setUser({ ...user, [event.target.name]: value });
  };

  const saveUser = async (e) => {
    e.preventDefault();
 axios({
      method: "POST",
      url:`${baseUrl}employees`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((responseJson) =>{
        if (responseJson === 200) {
          console.log("Employee created successfully")
          //toast.notify("Employee created successfully")
        }
          setResponseUser(responseJson);
          reset(e);
      }).catch((error) =>{
        console.log(error.message);
        //toast.notify(error.message);
      })};

  const reset = (e) => {
    e.preventDefault();
    setUser({
      image:"",
      firstName: "",
    lastName: "",
    email: "",
    gender: "",
    dateOfBirth: "",
    phone: "",
    userName:"",
    password: "",
    });
    setIsOpen(false);
  };
  return (
    <IndexLayout>
    <div className="container mx-auto my-8 p-3">
      <div className="h-12">
        <button
          onClick={openModal}
          className="rounded bg-green-600 text-white px-6 py-2 font-semibold">
          NewStaff
        </button>
      </div>
    </div>
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeModal}>
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95">
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-md">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900">
                Add new Employee
              </Dialog.Title>
              <div className="flex max-w-md max-auto">
                <div className="py-2">
                  <div className="h-14 my-4">
                    <label className="block text-gray-600 text-sm font-normal">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={user.firstName}
                      onChange={(e) => handleChange(e)}
                      className="h-10 w-96 border mt-2 px-2 py-2"></input>
                  </div>
                  <div className="h-14 my-4">
                    <label className="block text-gray-600 text-sm font-normal">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={user.lastName}
                      onChange={(e) => handleChange(e)}
                      className="h-10 w-96 border mt-2 px-2 py-2"></input>
                  </div>
                  <div className="h-14 my-4">
                    <label className="block text-gray-600 text-sm font-normal">
                      Email
                    </label>
                    <input
                      type="text"
                      name="email"
                      value={user.email}
                      onChange={(e) => handleChange(e)}
                      className="h-10 w-96 border mt-2 px-2 py-2"></input>
                  </div>
                  <div className="h-14 my-4">
                    <label className="block text-gray-600 text-sm font-normal">
                      Gender
                    </label>
                    <input
                      type="text"
                      name="gender"
                      value={user.gender}
                      onChange={(e) => handleChange(e)}
                      className="h-10 w-96 border mt-2 px-2 py-2"></input>
                  </div>
                  <div className="h-14 my-4">
                    <label className="block text-gray-600 text-sm font-normal">
                      DateOfBirth
                    </label>
                    <input
                      type="text"
                      name="dateOfBirth"
                      value={user.dateOfBirth}
                      onChange={(e) => handleChange(e)}
                      className="h-10 w-96 border mt-2 px-2 py-2"></input>
                  </div>
                  <div className="h-14 my-4">
                    <label className="block text-gray-600 text-sm font-normal">
                      Phone
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={user.phone}
                      onChange={(e) => handleChange(e)}
                      className="h-10 w-96 border mt-2 px-2 py-2"></input>
                  </div>
                  <div className="h-14 my-4">
                    <label className="block text-gray-600 text-sm font-normal">
                      UserName
                    </label>
                    <input
                      type="text"
                      name="userName"
                      value={user.userName}
                      onChange={(e) => handleChange(e)}
                      className="h-10 w-96 border mt-2 px-2 py-2"></input>
                  </div>
                  <div className="h-14 my-4">
                    <label className="block text-gray-600 text-sm font-normal">
                      Password
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={user.phone}
                      onChange={(e) => handleChange(e)}
                      className="h-10 w-96 border mt-2 px-2 py-2"></input>
                  </div>
                  <div className="h-14 my-4 space-x-4 pt-4">
                    <button
                      onClick={saveUser}
                      className="rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-6">
                      Save
                    </button>
                    <button
                      onClick={reset}
                      className="rounded text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6">
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
    <EmpCard  user={responseUser}/>
    {/* <UserList user={responseUser} /> */}
  </IndexLayout>
  )
}

export default AddEmployee
