import React from 'react'
import { useSelector } from 'react-redux'; // updated
import { selectUser } from '../pages/redux/slices/userSlice'; //updated
const Header = () => {
    const userdetail = useSelector(selectUser)
    //console.log("Welcome Vincent", userdetail);
    return (
        <div className='flex w-full justify-between bg-green-600 h-20 p-4 '>
            <div className='text-white font-bold p-2'>AdminManager</div>
            {userdetail?.map((item: any) => (
                <div className='text-white font-bold p-2'>

                    Welcome{item.fullName}

                </div>
            ))}
        </div>
    )
}

export default Header