import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import FeesCard from "./FeesCard";
import baseUrl from "../../pages/api/baseUrl";
import axios from 'axios';
import IndexLayout from "../layout/index"

const PayFees = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenDep, setIsOpenDep] = useState(false);
    const [department, setDepartment] = useState({name: ""});

    const [fees, setFees] = useState({
      studentFullName: "",
      department: "",
      phone: "",
      amount: "",
      paymentType: "",
      paymentDate: ""
    });
   const [responseFees, setResponseFees] = useState({
    studentName: "",
    studentId:"",
    department: "",
    phone: "",
    amount: "",
    paymentType: "",
    paymentDate: ""
   });

  function closeModal() {
    setIsOpen(false);
  }

  function closeModalDep() {
    setIsOpenDep(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function openModalDep() {
    setIsOpenDep(true);
  }

  const handleChange = (event) => {
    const value = event.target.value;
    setUser({ ...fees, [event.target.name]: value });
  };

  const handleChangeDep = (event) => {
    const value = event.target.value;
    setDepartment({ ...department, [event.target.name]: value });
  };

  const saveFees = async (e) => {
    e.preventDefault();
 axios({
      method: "POST",
      url:`${baseUrl}fees`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fees),
    }).then((responseJson) =>{
        if (responseJson === 200) {
          toast.notify("fees payment was successfully")
        }
          setResponseFees(responseJson);
          reset(e);
      }).catch((error) =>{
        toast.notify(error.message);
      })};

      const saveDepartment = async (e) => {
        e.preventDefault();
     axios({
          method: "POST",
          url:`${baseUrl}/departments`,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(department),
        }).then((responseJson) =>{
            if (responseJson === 200) {
              console.log("Department created successfully")
              //toast.notify("Department created successfully")
            }
              setResponseDepartment(responseJson);
              reset(e);
          }).catch((error) =>{
            console.log(error.message);
            //toast.notify(error.message);
          })};

  const reset = (e) => {
    e.preventDefault();
    setFees({
      studentName: "",
      department: "",
      phone: "",
      amount: "",
      paymentType: "",
      paymentDate: ""
    });
    setIsOpen(false);
  };
  const resetDep = (e) => {
    e.preventDefault();
    setDepartment({
      name: "",
    });
    setIsOpenDep(false);
  };
  return (
    <IndexLayout>
    <div className="container mx-auto my-8">
      <div className=" flex flex-col-5  justify-between px-4 pt-2 h-12">
        <button
          onClick={openModal}
          className="rounded bg-green-600 text-white px-6 py-2 font-semibold">
          Make payment
        </button>
        <button
          onClick={openModalDep}
          className="rounded bg-green-600 text-white px-6 py-2 font-semibold">
          Department
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
                Pay Fees
              </Dialog.Title>
              <div className="flex max-w-md max-auto">
                <div className="py-2">
                  <div className="h-14 my-4">
                    <label className="block text-gray-600 text-sm font-normal">
                      StudentFullName
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={fees.studentFullName}
                      onChange={(e) => handleChange(e)}
                      className="h-10 w-96 border mt-2 px-2 py-2"></input>
                  </div>
                 
                  <div className="h-14 my-4">
                    <label className="block text-gray-600 text-sm font-normal">
                      Department
                    </label>
                    <input
                      type="text"
                      name="department"
                      value={fees.department}
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
                      value={fees.phone}
                      onChange={(e) => handleChange(e)}
                      className="h-10 w-96 border mt-2 px-2 py-2"></input>
                  </div>
                  <div className="h-14 my-4">
                    <label className="block text-gray-600 text-sm font-normal">
                      Amount
                    </label>
                    <input
                      type="text"
                      name="amount"
                      value={fees.amount}
                      onChange={(e) => handleChange(e)}
                      className="h-10 w-96 border mt-2 px-2 py-2"></input>
                  </div>
                  <div className="h-14 my-4">
                    <label className="block text-gray-600 text-sm font-normal">
                      PaymentType
                    </label>
                    <input
                      type="text"
                      name="paymentType"
                      value={fees.paymentType}
                      onChange={(e) => handleChange(e)}
                      className="h-10 w-96 border mt-2 px-2 py-2"></input>
                  </div>
                  <div className="h-14 my-4">
                    <label className="block text-gray-600 text-sm font-normal">
                      paymentDate
                    </label>
                    <input
                      type="text"
                      name="payment date "
                      value={fees.paymentDate}
                      onChange={(e) => handleChange(e)}
                      className="h-10 w-96 border mt-2 px-2 py-2"></input>
                  </div>
                  
                  <div className="h-14 my-4 space-x-4 pt-4">
                    <button
                      onClick={saveFees}
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
      <Transition  appear show={isOpenDep} as={Fragment}>
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
                Create New Department
              </Dialog.Title>
              <div className="flex max-w-md max-auto">
                <div className="py-2">
                  <div className="h-14 my-4">
                    <label className="block text-gray-600 text-sm font-normal">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={department.name}
                      onChange={(e) => handleChangeDep(e)}
                      className="h-10 w-96 border mt-2 px-2 py-2"></input>
                  </div>
                
                  <div className="h-14 my-4 space-x-4 pt-4">
                    <button
                      onClick={saveDepartment}
                      className="rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-6">
                      Save
                    </button>
                    <button
                      onClick={resetDep}
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
    <FeesCard  fee={responseFees}/>
    {/* <UserList user={responseUser} /> */}
  </IndexLayout>
  )
}

export default PayFees