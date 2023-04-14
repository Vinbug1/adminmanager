//import a from 'next/link';
import React, { useState, useEffect } from 'react';
import { RxSketchLogo, RxPerson} from 'react-icons/rx';
import { FaChalkboardTeacher, FaMoneyCheckAlt } from "react-icons/fa";
import { TbReport } from "react-icons/tb";
import { FiSettings } from 'react-icons/fi';
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion'
//import Nav from './sidebar/Nav';

const Sidebar = ({ children, ...props }: any) => {
    const [active, setActive] = useState(false)
    const controls = useAnimation()
    const controlText = useAnimation()
    const controlTitleText = useAnimation()

    const showMore = () => {
        controls.start({
            width: '250px',
            transition: { duration: 0.001 }
        })
        controlText.start({
            opacity: 1,
            display: 'block',
            transition: { delay: 0.3 }
        })
        controlTitleText.start({
            opacity: 1,
            transition: { delay: 0.3 }
        })

        setActive(true)
    }

    const showLess = () => {
        controls.start({
            width: '55px',
            transition: { duration: 0.001 }
        })

        controlText.start({
            opacity: 20,
            display: 'none',
        })

        controlTitleText.start({
            opacity: 0,
        })

        setActive(false)

    }

    useEffect(() => {
        showLess()
    }, [])

    return (
        <div className='fixed flex max-h-screen'>
            <motion.aside animate={controls} className='max-w-[350px] h-screen p-12 bg-green-600 animate duration-300 flex flex-col  py-3 min-h-screen group'>
                <div className='flex flex-col items-center'>
                    <div className="inline-flex items-center justify-center ">
                        {!active ? (
                            <div className='bg-green-500 hover:bg-green-200 hover:text-green-500  text-white p-3 rounded-lg inline-block' onClick={showMore}>
                                <RxSketchLogo
                                    className="inline-block h-8 cursor-pointer"
                                    size={30}
                                />

                            </div>
                        ) : (
                            <div className='flex bg-green-500  hover:bg-green-200 hover:text-green-500  text-white p-3 rounded-lg ' onClick={showLess}>
                                <RxSketchLogo
                                    className="inline-block h-8 cursor-pointer"
                                    size={30}
                                />
                                <motion.p animate={controlText} className='ml-2 text-sm font-bold text-white mt-1' >Dashboard</motion.p>
                            </div>
                        )}
                    </div>
                    <span className='border-b-[1px] border-green-500 w-full p-1 mt-5'></span>
                    <Link href='/users/AddUser'>
                        <div className=' flex bg-green-500 text-white hover:bg-green-200 hover:text-green-500 my-4 p-3 rounded-lg'>
                            <RxPerson size={20} />
                            <motion.p animate={controlText} className='ml-4 text-sm font-bold text-white' > NewUser</motion.p>
                        </div>
                    </Link>
                    <Link href='/employee/AddEmployee'>
                        <div className='flex bg-green-500  text-white   hover:bg-green-200 hover:text-green-500 my-4 p-3 rounded-lg'>
                            <FaChalkboardTeacher size={20} />
                            <motion.p animate={controlText} className='ml-3 text-sm font-bold text-white' >Employee</motion.p>
                        </div>
                    </Link>
                    {/* <Link href="/school/PayFees" >
                        <div className='flex bg-green-500 text-white   hover:bg-green-200 hover:text-green-500 my-4 p-3 rounded-lg'>
                            <FaSchool size={20} />
                            <motion.p animate={controlText} className='ml-1 text-sm font-bold text-white' >SchoolFees</motion.p>
                        </div>
                    </Link> */}
                    <Link href="/expenditures/AddExpenditure" >
                        <div className='flex bg-green-500 text-white  hover:bg-green-200 hover:text-green-500 my-4 p-3 rounded-lg'>
                            <FaMoneyCheckAlt size={20} />
                            <motion.p animate={controlText} className='ml-2 text-sm font-bold text-white'>Expenses</motion.p>
                        </div>
                    </Link>
                    <Link href="/reports/Report" >
                        <div className='flex bg-green-500 text-white   hover:bg-green-200 hover:text-green-500 my-4 p-3 rounded-lg'>
                            <TbReport size={20} />

                            <motion.p animate={controlText} className='ml-6 text-sm font-bold text-white' >Report</motion.p>
                        </div>
                    </Link>
                    <Link href="/" >
                        <div className='flex bg-green-500 text-white   hover:bg-green-200 hover:text-green-500 my-4 p-3 rounded-lg'>
                            <FiSettings size={20} />
                            <motion.p animate={controlText} className='ml-3 text-sm font-bold text-white' >Settings</motion.p>
                        </div>
                    </Link>
                </div>
            </motion.aside>
            <main className=' w-full'>
                {children}
            </main>
        </div >
    )
}
export default Sidebar;
