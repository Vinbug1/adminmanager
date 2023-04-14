import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState,useEffect } from "react";
import UserCard from "./UserCard";
import baseUrl from "../api/baseUrl";
import axios from 'axios';
import IndexLayout from "../layout/index";
import AsyncLocalStorage from '@createnextapp/async-local-storage';
import { toast } from "react-toastify";
//import Select from "react-select";

const Adduser =() =>{
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDep, setIsOpenDep] = useState(false);
  const [tkn, setTkn] = useState();
  const [userStudents, setUserStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState();
 

  const [user, setUser] = useState({
   // image:"",
    firstname: "",
    lastname: "",
    email: "",
    gender: "",
    department: "",
    role: "",
    phone: "",
  });

  const [responseUser, setResponseUser] = useState({
    //image:"",
    firstname: "",
    lastname: "",
    email: "",
    gender: "",
    department: "",
    role: "",
    phone: "",
  });

  function closeModal() {
    setIsOpen(false);
  };

  function openModal() {
    setIsOpen(true);
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setUser({ ...user, [event.target.name]: value });
  };

  const saveUser = () => {
       if ( user.firstname == "" ||user.lastname == "" ||user.department == "" ||user.email == "" ||user.password == "" ||user.phone == "" || user.role == "" ) {
       toast('All field is required', { hideProgressBar: true, autoClose: 2000, type: 'error' ,position:'bottom-right' })
  }else{
    axios({
      method: "POST",
     url:`${baseUrl}users`,
     headers: {
       Authorization: "Bearer " + tkn,
        "Content-Type": "application/json",
     },
     data: JSON.stringify(user),
   }).then((responseJson) =>{
     if (responseJson === 200) {
       toast('User created successfully', { hideProgressBar: true, autoClose: 2000, type: 'success' })
     }
     setResponseUser(responseJson);
     closeModal();
     reset();
     
   }).catch((error) =>{
    toast(error.message, { hideProgressBar: false, autoClose: 3000, type: 'error',position:'bottom-right' })
   })
  }
  };

  const reset = () => {
   // e.preventDefault();
    setUser({
      //image:"",
      firstname: "",
      lastname: "",
      email: "",
      gender: "",
      department: "",
      role: "",
      phone: "",
    });
    setIsOpen(false);
  };

  let readData = async () => {
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
      url:`${baseUrl}users`,
      headers: {
        Authorization: "Bearer " + tkn,
        "Content-Type": "application/json",
      },
    }).then((res) =>{
        setUserStudents(res.data);
      }).catch((error) =>{
        toast(error.message, { autoClose: 3000, type: 'error',position:'bottom-right' })

      })
  },[]);

  const [fees, setFees] = useState({
    student: "",
    department: "",
    phone: "",
    amount: "",
    paymentType: "",
    status: ""
  });

  // const [responseFees, setResponseFees] = useState({ 
  //   student: "",
  //   department: "",
  //   phone: "",
  //   amount: "",
  //   paymentType: "",
  //   status: ""
  // });

  let options = userStudents.map(function (userdata) {
    return { value: userdata.firstname + " " + userdata.lastname, label: userdata.firstname + " " + userdata.lastname };
  });

  function handleSelect(data) {
    setSelectedStudent(data);
  }


  function closeModalDep() {
    setIsOpenDep(false);
  }

  
  function openModalDep() {
    setIsOpenDep(true);
  }

  const handleChangeFee = (event) => {
    const value = event.target.value;
    setFees({ ...fees,[event.target.name]: value });
    // setSelectedStudent({data});
  };

  const saveFees = async (e) => {
      //let studentdata ={ fees,selectedStudent}
      axios({
      method: "POST",
      url:`${baseUrl}payments`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + tkn,
      },
      data: JSON.stringify(fees),
    }).then((responseJson) =>{
        if (responseJson === 200) {
          toast('Fees created successfully', { autoClose: 2000, type: 'success' })
        }
         // setResponseFees(responseJson);
          resetFee(e);
      }).catch((error) =>{
        toast(error.message, { autoClose: 3000, type: 'error',position:'bottom-right' })

      }) 
  };

  const resetFee = (e) => {
    //e.preventDefault();
    setFees({
      student: "",
      department: "",
      phone: "",
      amount: "",
      paymentType: "",
      status: ""
    });
    setIsOpenDep(false);
    };

  return (
      <IndexLayout>
      <div className="item-center mx-4 my-4 pt-20 h-50">
        <div className="flex   justify-between px-4 pt-2 h-12">
          <button
            onClick={openModal}
            className="rounded bg-green-600 text-white px-6 py-2 font-semibold">
            Student
          </button>
          <button
            onClick={openModalDep}
            className="rounded bg-green-600 text-white px-6 py-2 font-semibold">
            Pay fees
          </button>
        </div>
      </div>
      {!isOpenDep ? (
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
                  NewUser
                </Dialog.Title>
                <div className="flex max-w-md max-auto">
                  <div className="py-2">
                  {/* <div className="h-14 my-4">
                      <label className="block text-gray-600 text-sm font-normal">
                        Image
                      </label>
                      <input
                      type="file"
                        id="file-upload"
                        //value={user.image}
                        accept="image/*"
                        onchange={(event) => pickImage(event)}></input>
                    </div> */}
                    <div className="h-14 my-4">
                      <label className="block text-gray-600 text-sm font-normal">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstname"
                        value={user.firstname}
                        onChange={(e) => handleChange(e)}
                        className="h-10 w-96 border mt-2 px-2 py-2"></input>
                    </div>
                    <div className="h-14 my-4">
                      <label className="block text-gray-600 text-sm font-normal">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastname"
                        value={user.lastname}
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
                        Role
                      </label>
                      <input
                        type="text"
                        name="role"
                        value={user.role}
                        onChange={(e) => handleChange(e)}
                        className="h-10 w-96 border mt-2 px-2 py-2"></input>
                    </div> <div className="h-14 my-4">
                      <label className="block text-gray-600 text-sm font-normal">
                        Department
                      </label>
                      <input
                        type="text"
                        name="department"
                        value={user.department}
                        onChange={(e) => handleChange(e)}
                        className="h-10 w-96 border mt-2 px-2 py-2"></input>
                    </div>
                    <div className="h-14 my-4">
                      <label className="block text-gray-600 text-sm font-normal">
                        phone
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
                        onClick={() => saveUser()}
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
    ):(
      <Transition appear show={isOpenDep} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModalDep}>
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
                  Pay Fees
                </Dialog.Title>
                <div className="flex max-w-md max-auto">
                  <div className="py-2">
                      {/* <div>
                        <label className="block text-gray-600 text-sm font-normal">
                          Student
                        </label>
                        <Select
                        placeholder="Student"
                        options={options}
                          value={selectedStudent} 
                          onChange={handleSelect} 
                          isClearable={true}
                          />
                      </div> */}
                      <div className="h-14 my-4">
                      <label className="block text-gray-600 text-sm font-normal">
                        Student
                      </label>
                      <input
                        type="text"
                        name="student"
                        value={fees.student}
                        onChange={(e) => handleChangeFee(e)}
                        className="h-10 w-96 border mt-2 px-2 py-2"/>
                    </div>
                  
                    <div className="h-14 my-4">
                      <label className="block text-gray-600 text-sm font-normal">
                        Department
                      </label>
                      <input
                        type="text"
                        name="department"
                        value={fees.department}
                        onChange={(e) => handleChangeFee(e)}
                        className="h-10 w-96 border mt-2 px-2 py-2"/>
                    </div>
                    <div className="h-14 my-4">
                      <label className="block text-gray-600 text-sm font-normal">
                        Phone
                      </label>
                      <input
                        type="text"
                        name="phone"
                        value={fees.phone}
                        onChange={(e) => handleChangeFee(e)}
                        className="h-10 w-96 border mt-2 px-2 py-2"/>
                    </div>
                    <div className="h-14 my-4">
                      <label className="block text-gray-600 text-sm font-normal">
                        Amount
                      </label>
                      <input
                        type="text"
                        name="amount"
                        value={fees.amount}
                        onChange={(e) => handleChangeFee(e)}
                        className="h-10 w-96 border mt-2 px-2 py-2"/>
                    </div>
                    <div className="h-14 my-4">
                      <label className="block text-gray-600 text-sm font-normal">
                        PaymentType
                      </label>
                      <input
                        type="text"
                        name="paymentType"
                        value={fees.paymentType}
                        onChange={(e) => handleChangeFee(e)}
                        className="h-10 w-96 border mt-2 px-2 py-2"/>
                    </div>
                    <div className="h-14 my-4">
                      <label className="block text-gray-600 text-sm font-normal">
                        Status
                      </label>
                      <input
                        type="text"
                        name="status"
                        value={fees.status}
                        onChange={(e) => handleChangeFee(e)}
                        className="h-10 w-96 border mt-2 px-2 py-2"/>
                    </div>
                    
                    <div className="h-14 my-4 space-x-4 pt-4">
                      <button
                        onClick={() => saveFees()}
                        className="rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-6">
                        Save
                      </button>
                      <button
                        onClick={resetFee}
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
    )}
    {/* <div className=" items-center"> */}
      <UserCard  user={responseUser}/>
    {/* </div> */}
      </IndexLayout>
  )
}
//Adduser.Layout = SidebarLayout
export default Adduser