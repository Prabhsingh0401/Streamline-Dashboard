import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export function SideBar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [crmOpen, setCrmOpen] = useState(false);
    const location = useLocation();

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const toggleCrm = () => {
        setCrmOpen(!crmOpen);
    };

    const isActive = (path) => location.pathname === path;

    return( 
    <>
    <nav className="fixed top-0 z-50 w-full bg-white shadow-sm border-b border-gray-100">
    <div className="px-4 py-4 lg:px-6">
        <div className="flex items-center justify-between">
        <div className="flex items-center justify-start">
            <button 
                onClick={toggleSidebar}
                type="button" 
                className="inline-flex items-center p-2 text-gray-600 rounded-xl sm:hidden hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#4d55f5] transition-all duration-200"
            >
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
            <div className="flex items-center ml-4">
                <img src="/thesteamline_logo.jpeg" alt="Streamline Logo" className="w-8 h-8 rounded-lg object-cover" />
                <span className="ml-3 text-xl font-bold text-gray-900">Streamline</span>
            </div>
        </div>
        <div className="flex items-center">
            <button type="button" className="flex text-sm bg-gray-100 rounded-full focus:ring-4 focus:ring-[#4d55f5]/30 transition-all duration-200 hover:bg-gray-200">
                <span className="sr-only">Open user menu</span>
                <img className="w-9 h-9 rounded-full" src="/Prableen Profesional.jpg" alt="user photo" />
            </button>
        </div>
        </div>
    </div>
    </nav>

    <aside className={`fixed top-0 left-0 z-40 w-72 h-screen pt-20 transition-transform duration-300 ease-in-out bg-white border-r border-gray-100 shadow-lg ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`} aria-label="Sidebar">
    <div className="h-full px-4 pb-4 overflow-y-auto bg-gradient-to-b from-white to-gray-50">
        <ul className="space-y-3 font-medium mt-4">
            <li>
                <Link to="/" className={`flex items-center p-3 rounded-xl group transition-all duration-200 ${
                    isActive('/') 
                        ? 'bg-[#4d55f5]/10 text-[#4d55f5]' 
                        : 'text-gray-700 hover:bg-[#4d55f5]/5 hover:text-[#4d55f5]'
                }`}>
                    <div className={`p-2 rounded-lg transition-colors duration-200 ${
                        isActive('/') 
                            ? 'bg-[#4d55f5]/20' 
                            : 'bg-[#4d55f5]/10 group-hover:bg-[#4d55f5]/20'
                    }`}>
                        <svg className={`w-5 h-5 ${
                            isActive('/') ? 'text-[#4d55f5]' : 'text-[#4d55f5]/70'
                        }`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                        </svg>
                    </div>
                    <span className="ml-4 font-medium">Dashboard</span>
                </Link>
            </li>
            <li>
                <button 
                    onClick={toggleCrm}
                    type="button" 
                    className="flex items-center w-full p-3 text-gray-700 rounded-xl hover:bg-[#4d55f5]/5 hover:text-[#4d55f5] group transition-all duration-200"
                >
                    <div className="p-2 bg-[#4d55f5]/10 rounded-lg group-hover:bg-[#4d55f5]/20 transition-colors duration-200">
                        <svg className="w-5 h-5 text-[#4d55f5]/70" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                        </svg>
                    </div>
                    <span className="flex-1 ml-4 text-left font-medium">CRM</span>
                    <svg className={`w-4 h-4 transition-transform duration-200 ${crmOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                <ul className={`mt-2 space-y-2 transition-all duration-300 overflow-hidden ${crmOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <li>
                        <Link to="/leads-forms" className={`flex items-center w-full p-3 transition duration-200 rounded-lg pl-12 ${
                            isActive('/leads-forms')
                                ? 'bg-[#4d55f5]/10 text-[#4d55f5]'
                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`}>
                            <div className={`w-2 h-2 rounded-full mr-3 ${
                                isActive('/leads-forms') ? 'bg-[#4d55f5]' : 'bg-gray-400'
                            }`}></div>
                            Leads and Forms
                        </Link>
                    </li>
                    <li>
                        <Link to="/proposals" className={`flex items-center w-full p-3 transition duration-200 rounded-lg pl-12 ${
                            isActive('/proposals')
                                ? 'bg-[#4d55f5]/10 text-[#4d55f5]'
                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`}>
                            <div className={`w-2 h-2 rounded-full mr-3 ${
                                isActive('/proposals') ? 'bg-[#4d55f5]' : 'bg-gray-400'
                            }`}></div>
                            Proposals
                        </Link>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
    </aside>

    {sidebarOpen && (
        <div 
            className="fixed inset-0 z-30 bg-black/80 bg-opacity-50 sm:hidden" 
            onClick={toggleSidebar}
        ></div>
    )}
    </>
    )
}