import { useCallback, useEffect, useState } from "react";
import NavbarItem from "./NavbarItem";
import { BsChevronDown } from "react-icons/bs";
import { TbSearch } from "react-icons/tb";
import { FaBell } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import AccountMenu from "./AccountMenu";
import MobileMenu from "./MobileMenu";
import { MdOutlineCastConnected } from "react-icons/md";

const TOP_OFFSET = 66;

const Navbar = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showBackground, setShowBackground] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= TOP_OFFSET) {
                setShowBackground(true);
            } else {
                setShowBackground(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const toggleAccountMenu = () => {
        setShowAccountMenu(prev => !prev);
    };

    const toggleMobile = useCallback(() => {
        setShowMobileMenu(prev => !prev);
    }, []);

    // Detect mobile size
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768); // <768px = mobile
        };
        handleResize(); // run on mount
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <nav className="w-full fixed z-40">
            <div className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}`}>
                {isMobile ? (
                    <>
                        <div className="w-full px-4 pt-4">
                            <div className="flex flex-row justify-between items-center">

                                <img className="h-7 lg:h-7" src="/images/netflix.png" alt="" />
                                {/* <div onClick={toggleMobile} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
                            <p className="text-white text-sm">Browse</p>
                            <BsChevronDown className={`text-white text-sm ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`} />
                            <MobileMenu isMobile={showMobileMenu} />
                        </div> */}
                                <div className="flex flex-row ml-auto gap-7 items-center">
                                    <div className="text-gray-200 cursor-pointer hover:text-gray-300">
                                        <MdOutlineCastConnected size={25} />
                                    </div>
                                    <div onClick={toggleAccountMenu} className="flex flex-row items-center gap-2 cursor-pointer relative">
                                        <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                                            <img src="/images/Netflix-avatar.png" alt="Profile" />
                                        </div>
                                        {/* <IoMdArrowDropdown className={`text-white transition lg:w-5 lg:h-5 ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`} />
                                <AccountMenu visible={showAccountMenu} /> */}
                                        {/* </div> */}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-4 mt-4 justify-center">
                                <NavbarItem label="TV Shows" />
                                <NavbarItem label="Movies" />
                                <div onClick={toggleMobile} className="lg:hidden flex flex-row items-center gap-2 cursor-pointer relative">
                                <p className="text-white text-sm">Categorie</p>
                                <IoMdArrowDropdown className={`text-white text-sm ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`} />
                                <MobileMenu isMobile={showMobileMenu} />
                            </div>
                            </div>
                            
                        </div>
                    </>
                ) : (
                    <>
                        <img className="h-4 lg:h-7" src="/images/logo.png" alt="" />
                        <div className="flex-row ml-8 gap-7 hidden lg:flex">
                            <NavbarItem label="Home" />
                            <NavbarItem label="TV Shows" />
                            <NavbarItem label="Movies" />
                            <NavbarItem label="New & Popular" />
                            <NavbarItem label="My List" />
                            <NavbarItem label="Browse by Languages" />
                        </div>
                        <div onClick={toggleMobile} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
                            <p className="text-white text-sm">Browse</p>
                            <BsChevronDown className={`text-white text-sm ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`} />
                            <MobileMenu isMobile={showMobileMenu} />
                        </div>
                        <div className="flex flex-row ml-auto gap-7 items-center">
                            <div className="text-gray-200 cursor-pointer hover:text-gray-300">
                                <TbSearch className="w-4 h-4 lg:w-5 lg:h-5" />
                            </div>
                            <div className="text-gray-200 cursor-pointer hover:text-gray-300">
                                <p>Kids</p>
                            </div>
                            <div className="text-gray-200 cursor-pointer hover:text-gray-300">
                                <FaBell className="w-4 h-4 lg:w-5 lg:h-5" />
                            </div>
                            <div onClick={toggleAccountMenu} className="flex flex-row items-center gap-2 cursor-pointer relative">
                                <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                                    <img src="/images/Netflix-avatar.png" alt="Profile" />
                                </div>
                                <IoMdArrowDropdown className={`text-white transition lg:w-5 lg:h-5 ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`} />
                                <AccountMenu visible={showAccountMenu} />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </nav >
    );
}
export default Navbar;