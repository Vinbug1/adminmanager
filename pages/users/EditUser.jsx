import { Dialog, Transition } from "@headlessui/react";
import   React,{ useState, useEffect, Fragment } from "react";
import baseUrl from "../../pages/api/baseUrl";
import axios from 'axios'
import AsyncLocalStorage from '@createnextapp/async-local-storage';

const EditUser = ({ userId, setResponseUser }) => {
  const [tkn, setTkn] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [user, setUser] = useState({
      id: "",
      firstname: "",
    lastname: "",
    email: "",
    gender: "",
    department: "",
    role: "",
    phone: "",
    });

    const readData = async () => {
      let data = await AsyncLocalStorage.getItem('@key')
      if (data) {
        setTkn(data);
      }else{
        console.error("No token");
      }
    }
  
    useEffect(() => {
      readData();
      setLoading(true);
       axios({
            method: "GET",
            url:`${baseUrl} /users/${userId}`,
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + tkn,
            },
          }).then((res) =>{
            setUser(res.data);
              setResponseUser(res.data);
              reset(e);
              setIsOpen(true);
          }).catch ((error) => {
          (error);
        })
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
  
    const reset = (e) => {
      e.preventDefault();
      setIsOpen(false);
    };
  
    const updateUser = async (e) => {
      e.preventDefault();
    axios({
        method: "PUT",
        url:`${baseUrl}users/${id}`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }).then((responseJson) =>{
        if (responseJson === 200) {
          throw new Error("Something went wrong");
        }
        const _user =  response.json();
        setResponseUser(_user);
        reset(e);

      })
    };
  return (
    <Transition appear show={isOpen} as={Fragment}>
    <Dialog
      as="div"
      className="fixed inset-0 z-10 overflow-y-auto"
      onOpen={openModal}>
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
              Update User
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
                    name="lastName"
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
                    name="emailId"
                    value={user.email}
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
                      Role
                    </label>
                    <input
                      type="text"
                      name="role"
                      value={user.role}
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
                <div className="h-14 my-4 space-x-4 pt-4">
                  <button
                    onClick={updateUser}
                    className="rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-6">
                    Update
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
  )
}

export default EditUser