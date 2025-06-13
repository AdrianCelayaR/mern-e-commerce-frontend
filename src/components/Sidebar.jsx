import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';

const Sidebar = () => {
    let { visible, setVisible } = useContext(ShopContext);
    return (
        <div className={`fixed top-0 right-0 h-full w-2/3 bg-white z-50 transform transition-transform ${visible ? 'translate-x-0' : 'translate-x-full'} border-l border-gray-200`}>
            <button onClick={() => setVisible(false)} className='absolute top-4 right-4'>
                    <img src={assets.close_menu_icon} alt='close' className='w-8' />
            </button>
            <ul className='flex flex-col items-center gap-5 mt-20 text-sm text-gray-700'>
                    <NavLink to='/' id='sidebar_element' className='flex flex-col items-center gap-1 py-2' onClick={() => setVisible(false)}>
                        <p>HOME</p>
                        <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                    </NavLink>
                    <NavLink to='/collection' id='sidebar_element' className='flex flex-col items-center gap-1 py-2' onClick={() => setVisible(false)}>
                        <p>COLLECTION</p>
                        <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                    </NavLink>
                    <NavLink to='/about' id='sidebar_element' className='flex flex-col items-center gap-1 py-2' onClick={() => setVisible(false)}>
                        <p>ABOUT</p>
                        <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                    </NavLink>
                    <NavLink to='/contact' id='sidebar_element' className='flex flex-col items-center gap-1 py-2' onClick={() => setVisible(false)}>
                        <p>CONTACT</p>
                        <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                    </NavLink>
            </ul>
        </div>
    )
}

export default Sidebar