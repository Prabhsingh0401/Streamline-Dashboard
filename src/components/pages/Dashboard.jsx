import { useState } from 'react';
import { Zap, FileText, BarChart3, Star, Plus, Search, Filter, TrendingUp, TrendingDown, Calendar, Users } from 'lucide-react';

export default function Dashboard() {
    const [activeReport, setActiveReport] = useState('Lead');
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    
    const chartData = {
        Lead: {
            months: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            values: [12, 19, 8, 25, 32, 18, 45, 38, 29, 41, 35, 28]
        },
        Project: {
            months: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            values: [8, 15, 22, 18, 25, 30, 35, 28, 32, 38, 42, 36]
        },
        Shoot: {
            months: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            values: [5, 12, 18, 15, 20, 25, 22, 28, 24, 30, 26, 32]
        }
    };

    const systemReports = [
        { icon: Zap, label: 'Lead' },
        { icon: FileText, label: 'Project' },
        { icon: BarChart3, label: 'Shoot' }
    ];

    const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

    const shootsData = [
        { id: 1, client: 'ABC Corp', type: 'Product Shoot', date: '2024-01-15', status: 'Scheduled' },
        { id: 2, client: 'XYZ Ltd', type: 'Event Coverage', date: '2024-01-22', status: 'Confirmed' },
        { id: 3, client: 'Tech Solutions', type: 'Corporate Headshots', date: '2024-01-28', status: 'Pending' }
    ];

    const tasksData = [
        { id: 1, name: 'Edit Wedding Photos', assignee: 'John Doe', status: 'In Progress', priority: 'High' },
        { id: 2, name: 'Client Consultation', assignee: 'Jane Smith', status: 'Completed', priority: 'Medium' },
        { id: 3, name: 'Equipment Setup', assignee: 'Mike Johnson', status: 'Pending', priority: 'Low' },
        { id: 4, name: 'Location Scouting', assignee: 'Sarah Wilson', status: 'In Progress', priority: 'High' }
    ];

    const projectsData = [
        {
            id: 1,
            clientName: 'Sharma Wedding',
            projectName: 'Wedding Photography',
            shoots: 3,
            deliverables: 250,
            tasks: 8,
            eventDate: '2024-02-14',
            projectCost: '₹85,000',
            collaborators: 4
        },
        {
            id: 2,
            clientName: 'TechStart Inc',
            projectName: 'Product Launch',
            shoots: 2,
            deliverables: 150,
            tasks: 12,
            eventDate: '2024-01-30',
            projectCost: '₹1,20,000',
            collaborators: 6
        },
        {
            id: 3,
            clientName: 'Fashion Brand',
            projectName: 'Catalog Shoot',
            shoots: 5,
            deliverables: 400,
            tasks: 15,
            eventDate: '2024-02-05',
            projectCost: '₹2,50,000',
            collaborators: 8
        }
    ];

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'completed': return 'bg-green-100 text-green-800';
            case 'in progress': return 'bg-[#4d55f5]/10 text-[#4d55f5]';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'scheduled': return 'bg-blue-100 text-blue-800';
            case 'confirmed': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority.toLowerCase()) {
            case 'high': return 'bg-red-100 text-red-800';
            case 'medium': return 'bg-yellow-100 text-yellow-800';
            case 'low': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="p-4 sm:ml-72 bg-gray-50 min-h-screen">
            <div className="p-3 sm:p-6 mt-14">
                {/* Quick Stats Bar */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-sm text-gray-600">3 Active Projects</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-[#4d55f5] rounded-full"></div>
                                <span className="text-sm text-gray-600">4 Pending Tasks</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                <span className="text-sm text-gray-600">3 Upcoming Shoots</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4d55f5]/20 focus:border-[#4d55f5]"
                                />
                            </div>
                            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                <Filter className="w-4 h-4 text-gray-500" />
                            </button>
                        </div>
                    </div>
                </div>
                {/* Header Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                    {/* Profile Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 hover:shadow-md transition-all duration-200 cursor-pointer group">
                        <div className="flex items-center mb-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#4d55f5] rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-lg">
                                PS
                            </div>
                            <div className="ml-3 sm:ml-4">
                                <p className="text-xs sm:text-sm text-gray-600">Hey,</p>
                                <div className="flex items-center">
                                    <h3 className="text-sm sm:text-base font-semibold text-gray-900">Prableen Singh</h3>
                                    <Star className="w-4 h-4 text-yellow-500 ml-1" fill="currentColor" />
                                </div>
                                <p className="text-xs text-gray-500">Designation: Founder</p>
                            </div>
                        </div>
                        <button className="w-full bg-[#4d55f5] text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-[#4d55f5]/90 transition-colors">
                            View Profile
                        </button>
                    </div>

                    {/* Generated Leads */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 hover:shadow-md transition-all duration-200 cursor-pointer group relative overflow-hidden">
                        <div className="absolute top-4 right-4">
                            <TrendingUp className="w-4 h-4 text-green-500" />
                        </div>
                        <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">Generated Leads</h3>
                        <p className="text-xs sm:text-sm text-gray-500 mb-4">Monthly Report</p>
                        <div className="text-2xl sm:text-4xl font-bold text-gray-900 group-hover:text-[#4d55f5] transition-colors">247</div>
                        <div className="text-xs text-green-600 mt-1">+12% from last month</div>
                    </div>

                    {/* Average Daily Sale */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 md:col-span-2 lg:col-span-1 hover:shadow-md transition-all duration-200 cursor-pointer group relative overflow-hidden">
                        <div className="absolute top-4 right-4">
                            <TrendingUp className="w-4 h-4 text-green-500" />
                        </div>
                        <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">Average Daily Sale</h3>
                        <p className="text-xs sm:text-sm text-gray-500 mb-4">Total sale this year</p>
                        <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#4d55f5] transition-colors">₹45,280</div>
                        <div className="text-xs text-green-600 mb-2">+8% from last month</div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{width: '68%'}}></div>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
                    {/* System Reports */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 hover:shadow-md transition-all duration-200">
                        <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">System Reports</h3>
                        <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">Overview System Reports</p>
                        
                        {/* Report Types */}
                        <div className="flex gap-2 sm:gap-4 mb-6 sm:mb-8">
                            {systemReports.map((report, index) => {
                                const IconComponent = report.icon;
                                const isActive = activeReport === report.label;
                                return (
                                    <button 
                                        key={index} 
                                        onClick={() => setActiveReport(report.label)}
                                        className={`flex flex-col items-center p-3 sm:p-4 rounded-lg border-2 transition-all flex-1 hover:border-gray-300 ${
                                            isActive 
                                                ? 'border-[#4d55f5] bg-[#4d55f5]/5' 
                                                : 'border-gray-200'
                                        }`}
                                    >
                                        <IconComponent className={`w-5 h-5 sm:w-6 sm:h-6 mb-2 ${
                                            isActive ? 'text-[#4d55f5]' : 'text-gray-500'
                                        }`} />
                                        <span className={`text-xs sm:text-sm font-medium ${
                                            isActive ? 'text-[#4d55f5]' : 'text-gray-600'
                                        }`}>{report.label}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Chart */}
                        <div className="relative h-40 sm:h-48">
                            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
                                <span>2</span>
                                <span>1.5</span>
                                <span>1</span>
                                <span>.5</span>
                                <span>0</span>
                            </div>
                            <div className="ml-6 sm:ml-8 h-full flex items-end justify-between">
                                {chartData[activeReport].months.map((month, index) => (
                                    <div key={index} className="flex flex-col items-center group cursor-pointer">
                                        <div className="w-4 sm:w-6 h-24 sm:h-32 bg-gray-100 rounded-t mb-2 relative hover:bg-gray-200 transition-colors">
                                            <div className="absolute bottom-0 w-full bg-[#4d55f5] rounded-t group-hover:bg-[#4d55f5]/80 transition-colors" style={{height: `${(chartData[activeReport].values[index] / 50) * 100}%`}}></div>
                                        </div>
                                        <span className="text-xs text-gray-500 group-hover:text-gray-700 transition-colors">{month}</span>
                                        <span className="text-xs text-gray-400 group-hover:text-[#4d55f5] transition-colors font-medium">{chartData[activeReport].values[index]}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4 sm:space-y-6">
                        {/* CRM Overview */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 hover:shadow-md transition-all duration-200 cursor-pointer group">
                            <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-4">CRM Overview</h3>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                                    <span className="text-xs sm:text-sm text-gray-600">Won</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-xs sm:text-sm text-gray-600 mr-2">vs</span>
                                    <div className="w-3 h-3 bg-red-400 rounded-full mr-2"></div>
                                    <span className="text-xs sm:text-sm text-gray-600">Loss</span>
                                </div>
                            </div>
                            <div className="text-center mb-4">
                                <div className="text-xl sm:text-2xl font-bold text-gray-900">72%</div>
                                <div className="text-xs sm:text-sm text-gray-500">₹1,24,500</div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div className="bg-green-500 h-3 rounded-full" style={{width: '72%'}}></div>
                            </div>
                            <div className="flex justify-between text-xs text-gray-500 mt-2">
                                <span>72%</span>
                                <span>28%</span>
                            </div>
                        </div>

                        {/* Deliverable Growth */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 hover:shadow-md transition-all duration-200 cursor-pointer group">
                            <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">Deliverable Growth</h3>
                            <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">Weekly Report</p>
                            <div className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">18</div>
                            <div className="grid grid-cols-7 gap-1">
                                {weekDays.map((day, index) => (
                                    <div key={index} className="text-center">
                                        <div className="text-xs text-gray-500 mb-1">{day}</div>
                                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400">
                                            {index + 1}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
                    {/* Shoots For This Month */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 hover:shadow-md transition-all duration-200">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">Shoots For This Month</h3>
                                <p className="text-xs sm:text-sm text-gray-500">Total {shootsData.length}</p>
                            </div>
                            <button className="p-2 bg-[#4d55f5] text-white rounded-lg hover:bg-[#4d55f5]/90 transition-colors">
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="space-y-3">
                            {shootsData.map((shoot) => (
                                <div key={shoot.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900">{shoot.client}</h4>
                                        <p className="text-xs text-gray-600">{shoot.type}</p>
                                        <p className="text-xs text-gray-500">{shoot.date}</p>
                                    </div>
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(shoot.status)}`}>
                                        {shoot.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Task For This Month */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 hover:shadow-md transition-all duration-200">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                            <div>
                                <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">Task For This Month</h3>
                                <p className="text-xs sm:text-sm text-gray-500">Total {tasksData.length}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <select 
                                    value={statusFilter} 
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="text-xs border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#4d55f5]/20 flex-1 sm:flex-none"
                                >
                                    <option value="All">All</option>
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">Progress</option>
                                    <option value="Completed">Done</option>
                                </select>
                                <button className="p-2 bg-[#4d55f5] text-white rounded-lg hover:bg-[#4d55f5]/90 transition-colors flex-shrink-0">
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Mobile Card View */}
                        <div className="block sm:hidden space-y-3">
                            {tasksData.filter(task => statusFilter === 'All' || task.status === statusFilter).map((task) => (
                                <div key={task.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                                    <div className="flex items-start justify-between mb-2">
                                        <h4 className="font-medium text-gray-900 text-sm">{task.name}</h4>
                                        <div className="flex gap-1 flex-shrink-0 ml-2">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(task.status)}`}>
                                                {task.status === 'In Progress' ? 'Progress' : task.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-xs text-gray-600">{task.assignee}</p>
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                                            {task.priority}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {/* Desktop Table View */}
                        <div className="hidden sm:block">
                            {/* Table Header */}
                            <div className="grid grid-cols-3 gap-4 py-3 border-b border-gray-200 text-xs sm:text-sm font-medium text-gray-600">
                                <div>TASK NAME</div>
                                <div>ASSIGNEE</div>
                                <div>STATUS / PRIORITY</div>
                            </div>
                            
                            {/* Task Rows */}
                            <div className="space-y-2 mt-4">
                                {tasksData.filter(task => statusFilter === 'All' || task.status === statusFilter).map((task) => (
                                    <div key={task.id} className="grid grid-cols-3 gap-4 py-3 text-sm hover:bg-gray-50 rounded-lg px-2 transition-colors cursor-pointer group">
                                        <div className="font-medium text-gray-900">{task.name}</div>
                                        <div className="text-gray-600">{task.assignee}</div>
                                        <div className="flex gap-2">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(task.status)}`}>
                                                {task.status}
                                            </span>
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                                                {task.priority}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Projects Section */}
                <div className="mt-6 sm:mt-8">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 hover:shadow-md transition-all duration-200">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">Projects</h3>
                                <p className="text-xs sm:text-sm text-gray-500">Total {projectsData.length}</p>
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2 bg-[#4d55f5] text-white rounded-lg hover:bg-[#4d55f5]/90 transition-colors">
                                <Plus className="w-4 h-4" />
                                <span className="text-sm font-medium">New Project</span>
                            </button>
                        </div>

                        
                        {/* Table Header */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-4 py-3 border-b border-gray-200 text-xs font-medium text-gray-600">
                            <div>CLIENT NAME</div>
                            <div>PROJECT NAME</div>
                            <div className="hidden sm:block">SHOOTS</div>
                            <div className="hidden sm:block">DELIVERABLES</div>
                            <div className="hidden lg:block">TASKS</div>
                            <div className="hidden lg:block">EVENT DATE</div>
                            <div className="hidden lg:block">PROJECT COST</div>
                            <div className="hidden lg:block">COLLABORATORS</div>
                        </div>
                        
                        {/* Project Rows */}
                        <div className="space-y-3 mt-4">
                            {projectsData.map((project) => (
                                <div key={project.id} className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-4 py-3 text-sm border-b border-gray-100 last:border-b-0 hover:bg-gray-50 rounded-lg px-2 transition-colors cursor-pointer group">
                                    <div className="font-medium text-gray-900">{project.clientName}</div>
                                    <div className="text-gray-600">{project.projectName}</div>
                                    <div className="hidden sm:block text-gray-600">{project.shoots}</div>
                                    <div className="hidden sm:block text-gray-600">{project.deliverables}</div>
                                    <div className="hidden lg:block text-gray-600">{project.tasks}</div>
                                    <div className="hidden lg:block text-gray-600">{project.eventDate}</div>
                                    <div className="hidden lg:block font-medium text-[#4d55f5]">{project.projectCost}</div>
                                    <div className="hidden lg:block text-gray-600">{project.collaborators}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Floating Action Button */}
                <div className="fixed bottom-6 right-6 z-50">
                    <div className="relative group">
                        <button className="w-14 h-14 bg-[#4d55f5] text-white rounded-full shadow-lg hover:shadow-xl hover:bg-[#4d55f5]/90 transition-all duration-200 flex items-center justify-center">
                            <Plus className="w-6 h-6" />
                        </button>
                        <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg border border-gray-200 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[150px]">
                            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                New Shoot
                            </button>
                            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                New Task
                            </button>
                            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                New Project
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}