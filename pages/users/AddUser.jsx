import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState,useEffect } from "react";
import UserCard from "./UserCard";
import baseUrl from "../api/baseUrl";
import axios from 'axios';
import IndexLayout from "../layout/index";
import AsyncLocalStorage from '@createnextapp/async-local-storage';
import  FormData from 'form-data';

const Adduser =() =>{
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

  const [user, setUser] = useState({
   // image:"",
    firstname: "",
    lastname: "",
    email: "",
    gender: "",
    department: "",
    role: "",
    password: "",
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
    password: "",
    phone: "",
  });

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

//   const previewImage = (event) => {
//     const imageFiles = event.target.files;
//     const imageFilesLength = imageFiles.length;
//     if (imageFilesLength > 0) {
//         const  imageSrc = URL.createObjectURL(imageFiles[0]);
//        const imagePreviewElement = document.querySelector("#preview-selected-image");
//       imagePreviewElement.src = imageSrc;
//        imagePreviewElement.style.display = "block";
//     }
// };
// const pickImage = async (event) => {
//   const imageFiles = event.target.files;
//   const imageFilesLength = imageFiles.length;
//   let result = URL.createObjectURL(imageFiles[0]);
//   user.image.push(result);
//   //  await ImagePicker.launchImageLibraryAsync({
//   //   mediaTypes: ImagePicker.MediaTypeOptions.All,
//   //   allowsEditing: true,
//   //   aspect: [4, 3],
//   //   quality: 1,
//   // });

//   if (!result.cancelled) {
//    console.log("Somewhere in the journey",result)
//   }
// };

// const addProduct = () => {
//   if (
//     name == "" ||
//     brand == "" ||
//     price == "" ||
//     description == "" ||
//     category == "" ||
//     countInStock == ""
//   ) {
//     setError("Please fill in the form correctly");
//   }

 
//   const config = {
//     headers: {
//       "Content-Type": "multipart/form-data",
//       Authorization: `Bearer ${tkn}`,
//     },
//   };

//   if (item !== null) {
//     axios
//       .put(`${baseURL}products/${item.id}`, formData, config)
//       .then((res) => {
//         if (res.status == 200 || res.status == 201) {
//           Toast.show({
//             topOffset: 60,
//             type: "success",
//             text1: "Product successfuly updated",
//             text2: "",
//           });
//           setTimeout(() => {
//             props.navigation.navigate("Products");
//           }, 500);
//         }
//       })
//       .catch((error) => {
//         Toast.show({
//           topOffset: 60,
//           type: "error",
//           text1: "Something went wrong",
//           text2: "Please try again",
//         });
//       });
//   } else {
//     axios
//       .post(`${baseURL}products`, formData, config)
//       .then((res) => {
//         if (res.status == 200 || res.status == 201) {
//           Toast.show({
//             topOffset: 60,
//             type: "success",
//             text1: "New Product added",
//             text2: "",
//           });
//           setTimeout(() => {
//             props.navigation.navigate("Products");
//           }, 500);
//         }
//       })
//       .catch((error) => {
//         Toast.show({
//           topOffset: 60,
//           type: "error",
//           text1: "Something went wrong",
//           text2: "Please try again",
//         });
//       });
//   }
// };

  const handleChange = (event) => {
    const value = event.target.value;
    setUser({ ...user, [event.target.name]: value });
  };
  // const pickImage = async (event) => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   if (!result.cancelled) {
  //     //user.image =result.uri;
  //     setUser(image = result.uri);
  //   }
  // };

  const saveUser = () => {
    
    let data = new FormData();
    //const fs = require('fs')
    //const newImageUri = "file:///" + user.image.split("file:/").join("");
    
   // data.append('image', fs.createReadStream(newImageUri));
    //fs.createReadStream(newImageUri)
    //  data.append('firstname', user.firstName);
    //  data.append('lastname', user.lastName);
    //  data.append('department', user.department);
    //  data.append('role', user.role); 
    //  data.append('passwordHash', user.password); 
    //  data.append('email', user.email); 
    //  data.append('phone', user.phone);
     
     console.log("trying things2",user);
     // e.preventDefault();
     axios({
       method: "POST",
      url:`${baseUrl}users/register`,
      headers: {
        Authorization: "Bearer " + tkn,
         "Content-Type": "application/json",
      },
      data: JSON.stringify(user),
    }).then((responseJson) =>{
      if (responseJson === 200) {
        console.log("User created successfully")
      }
        setResponseUser(responseJson);
        closeModal();
        reset(e);

    }).catch((error) =>{
      console.log(error.message);
    })
  };

  const reset = (e) => {
    e.preventDefault();
    setUser({
      //image:"",
      firstname: "",
      lastname: "",
      email: "",
      gender: "",
      department: "",
      role: "",
      password: "",
      phone: "",
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
          Student
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
                  <div className="h-14 my-4">
                    <label className="block text-gray-600 text-sm font-normal">
                      password
                    </label>
                    <input
                      type="text"
                      name="password"
                      value={user.password}
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
    {/* <UserCard  user={responseUser}/> */}
      </IndexLayout>

  )
}
//Adduser.Layout = SidebarLayout
export default Adduser