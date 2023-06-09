import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import EmpCard from "./EmpCard";
import baseUrl from "../api/baseUrl";
import axios from 'axios';
import toast from '../utils/IndexToast';

const AddFaculty = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [department, setDepartment] = useState({
      name: "",
    });
    // const notify = React.useCallback((type, message) => {
    //     toast({ type, message });
    //   }, []);
  const [responseDepartment, setResponseDepartment] = useState({
    name: "",
  });

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleChangeDep = (event) => {
    const value = event.target.value;
    setDepartment({ ...department, [event.target.name]: value });
  };

  const saveDepartment = async (e) => {
    e.preventDefault();
 axios({
      method: "POST",
      url:`${baseUrl}departments`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(department),
    }).then((responseJson) =>{
        if (responseJson === 200) {
          toast.notify("Department created successfully")
        }
          setResponseDepartment(responseJson);
          reset(e);
      }).catch((error) =>{
        toast.notify(error.message);
      })};

  const reset = (e) => {
    e.preventDefault();
    setUser({
      name: "",
    });
    setIsOpen(false);
  };
  return (
    <>
    {/* <div className="container mx-auto my-8 p-3">
      <div className="h-12">
        <button
          onClick={openModal}
          className="rounded bg-green-600 text-white px-6 py-2 font-semibold">
          Department
        </button>
      </div>
    </div> */}
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
                      value={user.name}
                      onChange={(e) => handleChange(e)}
                      className="h-10 w-96 border mt-2 px-2 py-2"></input>
                  </div>
                
                  <div className="h-14 my-4 space-x-4 pt-4">
                    <button
                      onClick={saveDepartment}
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
  </>
  )
}

export default AddFaculty