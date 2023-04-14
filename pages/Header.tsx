import React,{useState, useEffect} from 'react'
// import  secureLocalStorage  from  "react-secure-storage";

const Header = () => {
    const [userdetail, setUserDetail] = useState("");
    // const readData =  () => {
    //     let data =  secureLocalStorage.getItem("user");
    //     if (data) {
    //         setUserDetail(data);
    //        // console.log(data);
    //     }else{
    //       console.error("No data found ");
    //     }
    //   }
    //   useEffect(() => {
    //     readData();
    //   }, []);
    //console.log("Welcome Vincent", userdetail);
    return (
        <div className='flex w-full justify-between bg-green-600 h-20 p-2 fixed '>
            <div className='text-white font-bold p-2'>AdminManager</div>
                <div className='text-white font-bold  pr-45'>
                    Welcome: {userdetail}
                </div>
        </div>
    )
}

export default Header