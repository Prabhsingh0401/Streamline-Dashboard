import { useState } from 'react';
import { Search, Plus, X } from 'lucide-react';

const dummyLeads = [
    {
        id: 1,
        client: 'John Doe',
        eventName: 'Wedding Photography',
        phone: '+1 (555) 123-4567',
        dateTime: '2024-02-15 10:30 AM',
        source: 'Website'
    },
    {
        id: 2,
        client: 'Sarah Johnson',
        eventName: 'Corporate Event',
        phone: '+1 (555) 987-6543',
        dateTime: '2024-02-20 2:00 PM',
        source: 'Referral'
    },
    {
        id: 3,
        client: 'Mike Wilson',
        eventName: 'Birthday Party',
        phone: '+1 (555) 456-7890',
        dateTime: '2024-02-25 6:00 PM',
        source: 'Social Media'
    }
];

const dummyForms = [
    {
        id: 1,
        name: 'Wedding Inquiry Form',
        submissions: 45,
        created: '2024-01-15',
        status: 'Active'
    },
    {
        id: 2,
        name: 'Corporate Event Form',
        submissions: 23,
        created: '2024-01-20',
        status: 'Active'
    },
    {
        id: 3,
        name: 'General Contact Form',
        submissions: 67,
        created: '2024-01-10',
        status: 'Draft'
    }
];

export default function LeadsAndForms() {
    const [activeTab, setActiveTab] = useState('leads');
    const [searchTerm, setSearchTerm] = useState('');
    const [showLeadModal, setShowLeadModal] = useState(false);
    const [showFormModal, setShowFormModal] = useState(false);
    const [leads, setLeads] = useState(dummyLeads);
    const [forms, setForms] = useState(dummyForms);
    const [newLead, setNewLead] = useState({
        client: '',
        email: '',
        phone: '',
        event: '',
        source: '',
        notes: ''
    });
    const [newForm, setNewForm] = useState({
        title: '',
        description: '',
        backgroundColor: '#D0D2FF',
        notifyTo: '',
        welcomeTitle: '',
        welcomeDescription: '',
        thankYouTitle: ''
    });

    const handleAddLead = (e) => {
        e.preventDefault();
        const lead = {
            id: leads.length + 1,
            client: newLead.client,
            eventName: newLead.event,
            phone: newLead.phone,
            dateTime: new Date().toLocaleString(),
            source: newLead.source
        };
        setLeads([...leads, lead]);
        setNewLead({ client: '', email: '', phone: '', event: '', source: '', notes: '' });
        setShowLeadModal(false);
    };

    const handleAddForm = (e) => {
        e.preventDefault();
        const form = {
            id: forms.length + 1,
            name: newForm.title,
            submissions: 0,
            created: new Date().toISOString().split('T')[0],
            status: 'Draft'
        };
        setForms([...forms, form]);
        setNewForm({ title: '', description: '', backgroundColor: '#D0D2FF', notifyTo: '', welcomeTitle: '', welcomeDescription: '', thankYouTitle: '' });
        setShowFormModal(false);
    };

    const filteredLeads = leads.filter(lead => 
        lead.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.eventName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredForms = forms.filter(form => 
        form.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4 sm:ml-72">
            <div className="p-6 mt-14">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Leads and Forms</h1>
                    
                    {/* Tabs */}
                    <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
                        <button
                            onClick={() => setActiveTab('leads')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                activeTab === 'leads'
                                    ? 'bg-[#4d55f5] text-white'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            Leads
                        </button>
                        <button
                            onClick={() => setActiveTab('forms')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                activeTab === 'forms'
                                    ? 'bg-[#4d55f5] text-white'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            Forms
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    {/* Header with search and add button */}
                    <div className="p-4 sm:p-6 border-b border-gray-200">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">
                                    {activeTab === 'leads' ? 'Lead' : 'Form'}
                                </h2>
                                <p className="text-sm text-gray-600">
                                    Total {activeTab === 'leads' ? filteredLeads.length : filteredForms.length}
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                                {/* Search */}
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full sm:w-auto pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d55f5] focus:border-transparent"
                                    />
                                </div>
                                {/* Add button */}
                                <button
                                    onClick={() => activeTab === 'leads' ? setShowLeadModal(true) : setShowFormModal(true)}
                                    className="flex items-center justify-center space-x-2 bg-[#4d55f5] text-white px-4 py-2 rounded-lg hover:bg-[#3d45e5] transition-colors"
                                >
                                    <Plus className="h-4 w-4" />
                                    <span>New {activeTab === 'leads' ? 'lead' : 'form'}</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Table - Desktop */}
                    <div className="hidden md:block overflow-x-auto">
                        {activeTab === 'leads' ? (
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CLIENT</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">EVENT NAME</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PHONE</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DATE/TIME</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SOURCE</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredLeads.length > 0 ? (
                                        filteredLeads.map((lead) => (
                                            <tr key={lead.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{lead.client}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.eventName}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.phone}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.dateTime}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.source}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <button className="text-[#4d55f5] hover:text-[#3d45e5]">View</button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                                No rows
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        ) : (
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FORM NAME</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SUBMISSIONS</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CREATED</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredForms.length > 0 ? (
                                        filteredForms.map((form) => (
                                            <tr key={form.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{form.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{form.submissions}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{form.created}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                                        form.status === 'Active' 
                                                            ? 'bg-green-100 text-green-800' 
                                                            : 'bg-gray-100 text-gray-800'
                                                    }`}>
                                                        {form.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <button className="text-[#4d55f5] hover:text-[#3d45e5]">Edit</button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                                No rows
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>

                    {/* Cards - Mobile/Tablet */}
                    <div className="md:hidden">
                        {activeTab === 'leads' ? (
                            <div className="space-y-4 p-4">
                                {filteredLeads.length > 0 ? (
                                    filteredLeads.map((lead) => (
                                        <div key={lead.id} className="bg-gray-50 rounded-lg p-4 space-y-2">
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-medium text-gray-900">{lead.client}</h3>
                                                <button className="text-[#4d55f5] hover:text-[#3d45e5] text-sm">View</button>
                                            </div>
                                            <p className="text-sm text-gray-600">{lead.eventName}</p>
                                            <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                                                <div><span className="font-medium">Phone:</span> {lead.phone}</div>
                                                <div><span className="font-medium">Source:</span> {lead.source}</div>
                                                <div className="col-span-2"><span className="font-medium">Date:</span> {lead.dateTime}</div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-12 text-gray-500">No rows</div>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-4 p-4">
                                {filteredForms.length > 0 ? (
                                    filteredForms.map((form) => (
                                        <div key={form.id} className="bg-gray-50 rounded-lg p-4 space-y-2">
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-medium text-gray-900">{form.name}</h3>
                                                <button className="text-[#4d55f5] hover:text-[#3d45e5] text-sm">Edit</button>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                                                <div><span className="font-medium">Submissions:</span> {form.submissions}</div>
                                                <div><span className="font-medium">Created:</span> {form.created}</div>
                                                <div className="col-span-2">
                                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                                        form.status === 'Active' 
                                                            ? 'bg-green-100 text-green-800' 
                                                            : 'bg-gray-100 text-gray-800'
                                                    }`}>
                                                        {form.status}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-12 text-gray-500">No rows</div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    <div className="px-6 py-3 border-t border-gray-200 flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                            Rows per page: 
                            <select className="ml-2 border border-gray-300 rounded px-2 py-1">
                                <option>25</option>
                                <option>50</option>
                                <option>100</option>
                            </select>
                        </div>
                        <div className="text-sm text-gray-700">
                            0-0 of 0
                        </div>
                    </div>
                </div>
            </div>

            {/* Lead Modal */}
            {showLeadModal && (
                <div className="fixed inset-0 bg-black/80 bg-opacity-20 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-4 sm:p-6 lg:p-8 w-full max-w-4xl max-h-[95vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Add New Lead</h3>
                            <button
                                onClick={() => setShowLeadModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        <form onSubmit={handleAddLead}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Client Name *</label>
                                    <input
                                        type="text"
                                        required
                                        value={newLead.client}
                                        onChange={(e) => setNewLead({...newLead, client: e.target.value})}
                                        placeholder="Enter client name"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4d55f5] focus:border-transparent"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                                    <input
                                        type="email"
                                        required
                                        value={newLead.email}
                                        onChange={(e) => setNewLead({...newLead, email: e.target.value})}
                                        placeholder="Enter email address"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4d55f5] focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Mobile No. *</label>
                                    <div className="flex">
                                        <div className="flex items-center px-3 py-3 border border-r-0 border-gray-300 rounded-l-xl bg-gray-50">
                                            <span className="text-sm">🇺🇸 +1</span>
                                        </div>
                                        <input
                                            type="tel"
                                            required
                                            value={newLead.phone}
                                            onChange={(e) => setNewLead({...newLead, phone: e.target.value})}
                                            placeholder="00000 00000"
                                            className="flex-1 px-4 py-3 border border-gray-300 rounded-r-xl focus:ring-2 focus:ring-[#4d55f5] focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Event *</label>
                                    <select
                                        required
                                        value={newLead.event}
                                        onChange={(e) => setNewLead({...newLead, event: e.target.value})}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4d55f5] focus:border-transparent appearance-none bg-white"
                                    >
                                        <option value="">For What?</option>
                                        <option value="Wedding Photography">Wedding Photography</option>
                                        <option value="Corporate Event">Corporate Event</option>
                                        <option value="Birthday Party">Birthday Party</option>
                                        <option value="Portrait Session">Portrait Session</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Lead Source *</label>
                                    <select
                                        required
                                        value={newLead.source}
                                        onChange={(e) => setNewLead({...newLead, source: e.target.value})}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4d55f5] focus:border-transparent appearance-none bg-white"
                                    >
                                        <option value="">Lead Source</option>
                                        <option value="Website">Website</option>
                                        <option value="Referral">Referral</option>
                                        <option value="Social Media">Social Media</option>
                                        <option value="Email">Email</option>
                                        <option value="Phone">Phone</option>
                                    </select>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Notes (500 character limit)</label>
                                    <textarea
                                        rows={3}
                                        maxLength={500}
                                        value={newLead.notes}
                                        onChange={(e) => setNewLead({...newLead, notes: e.target.value})}
                                        placeholder="Type your notes..."
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4d55f5] focus:border-transparent resize-none"
                                    />
                                </div>
                            </div>

                            <div className="mt-8">
                                <button
                                    type="submit"
                                    className="w-full px-6 py-3 bg-[#8B8FFF] text-white rounded-xl hover:bg-[#7B7FFF] transition-colors font-medium"
                                >
                                    Add Lead
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Form Modal */}
            {showFormModal && (
                <div className="fixed inset-0 bg-black/80 bg-opacity-20 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-5xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Add New Form</h3>
                            <button
                                onClick={() => setShowFormModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        <form onSubmit={handleAddForm}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Form title *</label>
                                    <input
                                        type="text"
                                        required
                                        value={newForm.title}
                                        onChange={(e) => setNewForm({...newForm, title: e.target.value})}
                                        placeholder="Enter form title"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4d55f5] focus:border-transparent"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Notify To</label>
                                    <input
                                        type="email"
                                        value={newForm.notifyTo}
                                        onChange={(e) => setNewForm({...newForm, notifyTo: e.target.value})}
                                        placeholder="Enter email address"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4d55f5] focus:border-transparent"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                                    <textarea
                                        rows={2}
                                        required
                                        value={newForm.description}
                                        onChange={(e) => setNewForm({...newForm, description: e.target.value})}
                                        placeholder="Type your description..."
                                        className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4d55f5] focus:border-transparent resize-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Background Color *</label>
                                    <div className="flex items-center space-x-3">
                                        <input
                                            type="text"
                                            value={newForm.backgroundColor}
                                            onChange={(e) => setNewForm({...newForm, backgroundColor: e.target.value})}
                                            placeholder="Background Color"
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4d55f5] focus:border-transparent"
                                        />
                                        <div 
                                            className="w-10 h-10 rounded-lg border border-gray-300 cursor-pointer"
                                            style={{ backgroundColor: newForm.backgroundColor }}
                                        ></div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Welcome title</label>
                                    <input
                                        type="text"
                                        value={newForm.welcomeTitle}
                                        onChange={(e) => setNewForm({...newForm, welcomeTitle: e.target.value})}
                                        placeholder="Welcome!"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4d55f5] focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Thank you title</label>
                                    <input
                                        type="text"
                                        value={newForm.thankYouTitle}
                                        onChange={(e) => setNewForm({...newForm, thankYouTitle: e.target.value})}
                                        placeholder="Thank you!"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4d55f5] focus:border-transparent"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Welcome description</label>
                                    <textarea
                                        rows={2}
                                        value={newForm.welcomeDescription}
                                        onChange={(e) => setNewForm({...newForm, welcomeDescription: e.target.value})}
                                        placeholder="We're excited to hear from you. Fill out this short form to get started."
                                        className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4d55f5] focus:border-transparent resize-none"
                                    />
                                </div>
                            </div>

                            <div className="mt-6">
                                <button
                                    type="submit"
                                    className="w-full px-6 py-2.5 bg-[#8B8FFF] text-white rounded-xl hover:bg-[#7B7FFF] transition-colors font-medium"
                                >
                                    Add Form
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}