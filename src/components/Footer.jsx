
import React from 'react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
    return (
        <footer className='mt-20 rounded-t-3xl bg-gradient-to-t backdrop-blur border-top from-black via-black to-stone-950 py-20 mx-auto border-t-slate-700 border-t'>
            <div className='justify-center container max-w-6xl mx-auto min-h-[4rem] px-4 flex flex-col gap-10 pt-20'>

                <div className='text-slate-300 text-sm'>
                    <ul className='flex flex-wrap gap-10 mx-auto justify-center items-center text-lg'>

                        <li className='border-b-2 border-transparent hover:border-slate-300 text-center'><a href={"https://github.com/devangspsingh"}><FaGithub /> <span className='sr-only'>Github</span></a></li>
                        <li className='border-b-2 border-transparent hover:border-slate-300 text-center'><a href={"https://devangspsingh.github.io"}>@devangspsingh</a></li>
                        <li className='border-b-2 border-transparent hover:border-slate-300 text-center'><a href={"https://linkedin.com/in/devangspsingh"}><FaLinkedin /> <span className='sr-only'>LinkedIn</span></a></li>
                    </ul>
                </div>

                <div className='font-bold text-xl text-center'>&copy; Quick Attendance Taker</div>

            </div>
        </footer >
    )
}

export default Footer