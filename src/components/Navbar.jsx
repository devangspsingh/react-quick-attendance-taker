import React from 'react'
import { FaHome, FaShare, FaShareAlt } from 'react-icons/fa';

const Navbar = () => {
    return (
        <nav id="navBar" className="max-w-md backdrop-blur-sm absolute shadow-sm shadow-slate-700 mx-auto z-10 top-0 right-0 left-0 transform transition-all ease-in-out w-full justify-between 
        bg-black/20 border-b border-slate-700 
        rounded-b-3xl flex text-white font-bold px-7">
            <div className="h-16 sm:mx-auto items-center rounded-full flex max-w-5xl w-full justify-between">
                <div className="p-1 sm:mx-8 mr-2 rounded-full"><a href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="overflow-visible w-5 fill-current hover:fill-yellow-400/80 active:fill-yellow-700">
                        <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z">
                        </path>
                    </svg></a>
                </div>

                <div className="px-2 rounded-full text-xl">
                    iAttendance</div>
                {/* 
                <div className="px-2 rounded-full text-white" id="share-button">
                    <FaShareAlt />
                </div> */}


                <div className="px-2 mr-2 rounded-full hover:text-black hover:bg-yellow-400/80 active:bg-yellow-700"><a href="https://devangspsingh.github.io">
                    Contact
                </a></div>
            </div>

        </nav>
    );
};

export default Navbar