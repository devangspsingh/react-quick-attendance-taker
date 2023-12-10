import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {

    return (
        <div className='bg-black text-white min-h-[100vh]'>
            <div className='max-w-md mx-auto pt-20 p-2'>
                <Navbar />
                <Outlet />
                <Footer />
            </div>
        </div >
    )
}

export default Layout