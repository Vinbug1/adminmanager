import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState,useEffect } from "react";
import ExpenCard from "./ExpenCard";
import baseUrl from "../api/baseUrl";
import AsyncLocalStorage from '@createnextapp/async-local-storage';
import axios from 'axios';
import IndexLayout from "../layout/index"
//import toast from '../utils/IndexToast';

const AddExpenditure = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [tkn, setTkn] = useState("");

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
    }, []);

    const [expense, setExpense] = useState({
      amount: "",
      employee: "",
      purpose: "",
      approved: "",
      approvedBy: "",
      approvedDate:""
    });
   
  const [responseExpen, setResponseExpen] = useState({
    amount: "",
      employee: "",
      purpose: "",
      approved: "",
      approvedBy: "",
      approvedDate:""
  });

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleChange = (event) => {
    const value = event.target.value;
    setExpense({ ...expense, [event.target.name]: value });
  };

  const saveExpnse =  () => {
   // e.preventDefault();
 axios({
      method: "POST",
      url:`${baseUrl}expenditures`,
      headers: {
        Authorization: "Bearer " + tkn,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expense),
    }).then((responseJson) =>{
        if (responseJson === 200) {
          toast.notify("Expenditure created successfully")
        }
          setExpense(responseJson);
          closeModal();
          reset(e);
      }).catch((error) =>{
        toast.notify(error.message);
      })};

  const reset = (e) => {
    e.preventDefault();
    setExpense({
        amount: "",
        employee: "",
        purpose: "",
        approved: "",
        approvedBy: "",
        approvedDate:""
    });
    setIsOpen(false);
  };
  return (
    <IndexLayout>
    <div className="item-center mx-4 my-4 pt-20 h-50">
      <div className="h-12">
        <button
          onClick={openModal}
          className="rounded bg-green-600 text-white px-6 py-2 font-semibold">
          NewExpenditure
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
                Add new Expenditure
              </Dialog.Title>
              <div className="flex max-w-md max-auto">
                <div className="py-2">
                  <div className="h-14 my-4">
                    <label className="block text-gray-600 text-sm font-normal">
                      Amount
                    </label>
                    <input
                      type="text"
                      name="amount"
                      value={expense.amount}
                      onChange={(e) => handleChange(e)}
                      className="h-10 w-96 border mt-2 px-2 py-2"></input>
                  </div>
                  <div className="h-14 my-4">
                    <label className="block text-gray-600 text-sm font-normal">
                      Staff Incharge
                    </label>
                    <input
                      type="text"
                      name="employee"
                      value={expense.employee}
                      onChange={(e) => handleChange(e)}
                      className="h-10 w-96 border mt-2 px-2 py-2"></input>
                  </div>
                  <div className="h-14 my-4">
                    <label className="block text-gray-600 text-sm font-normal">
                      Purpose
                    </label>
                    <input
                      type="text"
                      name="purpose"
                      value={expense.purpose}
                      onChange={(e) => handleChange(e)}
                      className="h-10 w-96 border mt-2 px-2 py-2"></input>
                  </div>
                  <div className="h-14 my-4">
                    <label className="block text-gray-600 text-sm font-normal">
                      Approved
                    </label>
                    <input
                      type="text"
                      name="approved"
                      value={expense.approved}
                      onChange={(e) => handleChange(e)}
                      className="h-10 w-96 border mt-2 px-2 py-2"></input>
                  </div>
                  <div className="h-14 my-4">
                    <label className="block text-gray-600 text-sm font-normal">
                      ApprovedBy
                    </label>
                    <input
                      type="text"
                      name="approvedBy"
                      value={expense.employee}
                      onChange={(e) => handleChange(e)}
                      className="h-10 w-96 border mt-2 px-2 py-2"></input>
                  </div>
                  <div className="h-14 my-4">
                    <label className="block text-gray-600 text-sm font-normal">
                      ApprovedDate
                    </label>
                    <input
                      type="text"
                      name="approvedDate"
                      value={expense.approvedDate}
                      onChange={(e) => handleChange(e)}
                      className="h-10 w-96 border mt-2 px-2 py-2"></input>
                  </div>
                  
                  <div className="h-14 my-4 space-x-4 pt-4">
                    <button
                      onClick={saveExpnse}
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
    <div >
    <ExpenCard  expenses={responseExpen}/>
    </div>
    {/* <UserList user={responseUser} /> */}
  </IndexLayout>
  )
}

export default AddExpenditure