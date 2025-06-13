import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {

    // const [visible, setVisible] = React.useState(false);
    const { setShowSearch, getCartCount, visible, setVisible } = useContext(ShopContext);

return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white/40 backdrop-blur-md shadow-md py-3 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] flex items-center justify-between font-medium">
        <NavLink to='/' className='flex flex-col items-center gap-1'>
            <img src={assets.logo_g} alt="" className='w-10' />
        </NavLink>

        <ul className='hidden sm:flex gap-3 text-sm text-gray-700'>
            <NavLink to='/' className='flex flex-col items-center gap-1'>
                <p>HOME</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>

            <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                <p>COLLECTION</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>

            <NavLink to='/about' className='flex flex-col items-center gap-1'>
                <p>ABOUT</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>

            <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                <p>CONTACT</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
        </ul>

        <div className='flex items-center gap-4'>
            <img onClick={() => setShowSearch(true)} src={assets.search_icon} alt='search' className='w-8 cursor-pointer' />

            <div className='group relative'>
                <img src={assets.user_icon} alt='profile' className='w-10 cursor-pointer' />
                <div className='group-hover:block hidden absolute dropdown-menu top-10 right-0 pt-4 bg-white shadow-md p-4 rounded-lg z-10'>
                    <div className='flex flex-col gap-2 w-36 py-3 px-5 text-gray-500 rounded'>
                        <NavLink to='/login' className='block py-1 cursor-pointer hover:text-black'>My Profile</NavLink>
                        <NavLink to='/orders' className='block py-1 cursor-pointer hover:text-black'>My Orders</NavLink>
                        <NavLink to='/cart' className='block py-1 cursor-pointer hover:text-black'>Logout</NavLink>
                                    </div>
                            </div>
                    </div>
                    <Link to='/cart' className='relative'>
                            <img src={assets.cart_icon} alt='cart' className='w-8 min-w-5' />
                            <p className='absolute right-[-5px] bottom-[-5px] w-5 text-center leading-5 bg-black text-white aspect-square rounded-full text-[-8px]'>{getCartCount()}</p>
                    </Link>
                    <img onClick={() => setVisible(true)} src={assets.menu_icon} alt='menu' className='w-8 cursor-pointer sm:hidden' />
            </div>

            {/* Sidebar menu for small
                <p className='absolute right-[-5px] bottom-[-5px] w-5 text-center leading-5 bg-black text-white aspect-square rounded-full text-[-8px]'>10</p>
            </Link>
            <img onClick={() => setVisible(true)} src={assets.menu_icon} alt='menu' className='w-8 cursor-pointer sm:hidden' />
        </div>

        {/* Sidebar menu for small screens */}
        {/* <div className={`fixed top-0 right-0 h-full w-2/3 bg-white z-50 transform transition-transform ${visible ? 'translate-x-0' : 'translate-x-full'} border-l border-gray-200`}>
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
        </div> */}
    </div>
  )
}

export default Navbar