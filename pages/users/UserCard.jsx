import React, {Fragment, useState,useEffect  } from 'react';
// import EditUser from './EditUser';
import { RxPerson } from 'react-icons/rx';
import { MdOutlineCancel, MdDelete} from 'react-icons/md';
import { FiEdit} from 'react-icons/fi';
import baseUrl from '../api/baseUrl';
import axios from 'axios';
import AsyncLocalStorage from '@createnextapp/async-local-storage';
import { Dialog, Transition } from '@headlessui/react'
import User from './User';
import { useRouter } from 'next/router';
// import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

const UserCard = ({user}) => {
    let router = useRouter()
    const [users, setUsers] = useState();
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState(null);
    const [tkn, setTkn] = useState("");
    const [responseUser, setResponseUser] = useState(null);

    
    const readData = async () => {
        let data = await AsyncLocalStorage.getItem('@key')
        if (data) {
          setTkn(data);
        }else{
          console.error("No token");
        }
      }

     function closeModal() {
        setIsOpen(false);
      }
    
      function openModal() {
        setIsOpen(true);
      }

    useEffect(() => {
        readData();
        setLoading(true);
       axios({
              method: "GET",
                url: `${baseUrl}users`,
                    headers: {
                        Authorization: "Bearer " + tkn,
                        "Content-Type": "application/json",
                    },
                }).then((res) =>{
                    setUsers(res.data);
                    //setLoading(false);
                }). catch ((error) =>{
                    console.log(error);
                }) 
     },[user,responseUser]);
 

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

const editUser = ( e,id) => {
    //e.preventDefault();
   setUserId(user.id);
   closeModal();
};

    return (
        <div className=' pl-8 overflow-y-auto max-h-95  scrollbar-hide rounded-lg w-full'>
            <div className='grid gap-4 grid-cols-4 grid-rows-4  p-14 '>
                {users?.map((user,index)=> ( 
                    <div  key={index} className='flex items-center p-1 h-39 w-25  bg-white rounded-lg  shadow hover:shadow-md '>
                        <div className='flex'>
                            <div className=' bg-green-100 p-2  w-50 justify-center border-5 border-radius-5 border-green-200'>
                            <RxPerson size={80} />
                            </div>
                            <div className='pl-2'>
                            <div className='flex gap-2  p-2'>
                                <p className='font-medium text-gray-800'>{user.firstname}</p>
                                <p className='font-medium text-gray-800'>{user.lastname}</p>
                            </div>
                                <p className='text-sm text-gray-800'>{user.department}</p>
                                <p className='text-sm text-gray-800'>{user.phone}</p>
                            </div>
                        </div>
                      {/* <div className='relative h-32 w-30 ml-1 mt-5'>
                        <div className='top-5 right-0 h-16 w-16'>
                            <button onClick={() => openModal()} className='inline-block bg-green-300 text-green-500 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-700 rounded-lg text-sm p-1.5' type='button'>
                                <span className='sr-only'>Open dropdown</span>
                                <svg className='w-6 h-6' aria-hidden='true' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path d='M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z'></path></svg>
                            </button>
                            <Transition appear show={isOpen} as={Fragment}>
                                <Dialog
                                    as='div'
                                    className='fixed inset-20 z-15 '
                                    onClose={closeModal}>
                                    <div className='min-h-screen px-2 text-center'>
                                    <Transition.Child
                                        as={Fragment}
                                        enter='ease-out duration-300'
                                        enterFrom='opacity-0 scale-75'
                                        enterTo='opacity-70 scale-100'
                                        leave='ease-in duration-200'
                                        leaveFrom='opacity-40 scale-100'
                                        leaveTo='opacity-0 scale-75'>
                                        <div className='inline-block w-50 max-w-md p-6 my-4 overflow-hidden  align-middle transition-all transform bg-white shadow-sm rounded-md'>
                                        <Dialog.Title>
                                        <div onClick={() => closeModal()} className='rounded-full'>
                                                    <MdOutlineCancel  size={30}/>
                                                </div>
                                        </Dialog.Title>
                                        <div className='flex max-w-md max-auto'>
                                            <div className='py-2'>
                                            <div className=' flex h-14 my-2 gap-4'>
                                                <div className='rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-6'>
                                                  <div onClick={() => editUser(user.id)} className=' flex  gap-4 px-4 py-2 text-sm text-white dark:text-white dark:hover:text-white'>

                                                    {/* <div onClick={()  => closeModal()}></div> 
                                                       <FiEdit size={30} />        
                                                         Edit
                                                  </div>
                                                </div>
                                                <div  className='rounded text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6'>
                                            <div onClick={() => deleteUser()} className='flex gap-4 px-4 py-2 text-sm text-white  dark:text-white dark:hover:text-white'>
                                               <MdDelete size={30} />   
                                                Delete
                                                </div>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    </Transition.Child>
                                    </div>
                                </Dialog>
                                </Transition>
                        </div>
                    </div> */}
                </div>
                ))}
            </div>
            <div>
                {/* <>
                    <Button
                        color='primary'
                        type='button'
                        onClick={() => setModalOpen(!modalOpen)}
                    >
                        Launch demo modal
                    </Button>
                    <Modal toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen}>
                        <div className=' modal-header'>
                        <h5 className=' modal-title' id='exampleModalLabel'>
                            Modal title
                        </h5>
                        <button
                            aria-label='Close'
                            className=' close'
                            type='button'
                            onClick={() => setModalOpen(!modalOpen)}
                        >
                            <span aria-hidden={true}>×</span>
                        </button>
                        </div>
                        <ModalBody>...</ModalBody>
                        <ModalFooter>
                        <Button
                            color='secondary'
                            type='button'
                            onClick={() => setModalOpen(!modalOpen)}
                        >
                            Close
                        </Button>
                        <Button color='primary' type='button'>
                            Save changes
                        </Button>
                        </ModalFooter>
                    </Modal>
                </> */}
                 {/* <EditUser userId={userId} setResponseUser={setResponseUser} /> */}
            </div>
        </div> 
    )
}

export default UserCard