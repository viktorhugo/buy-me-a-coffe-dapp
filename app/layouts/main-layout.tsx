import { Outlet } from 'react-router'
import { Navbar } from '~/components/ui/nabvar';

const HomeLayout = () => {
    return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
        <Navbar />
        <div className="pt-24 px-4 max-w-7xl mx-auto">
            <div className="h-screen flex flex-col items-center justify-center text-center">
                <Outlet />
            </div>
        </div>
    </main>

        
    )
}

export default HomeLayout;
