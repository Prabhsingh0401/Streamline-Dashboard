import { useState } from 'react';
import { Search, Plus, X } from 'lucide-react';

const dummyProposals = [
    {
        id: 1,
        client: 'ABC Company',
        proposalName: 'Website Redesign Project',
        dateTime: '2024-02-15 10:30 AM',
        source: 'Website',
        status: 'Pending'
    },
    {
        id: 2,
        client: 'XYZ Corp',
        proposalName: 'Mobile App Development',
        dateTime: '2024-02-20 2:00 PM',
        source: 'Referral',
        status: 'Approved'
    },
    {
        id: 3,
        client: 'Tech Solutions',
        proposalName: 'E-commerce Platform',
        dateTime: '2024-02-25 6:00 PM',
        source: 'Social Media',
        status: 'Rejected'
    },
    {
        id: 4,
        client: 'StartupCo',
        proposalName: 'Brand Identity Package',
        dateTime: '2024-02-28 11:00 AM',
        source: 'Email',
        status: 'In Draft'
    }
];

const statusTabs = [
    { key: 'all', label: 'All', count: 4 },
    { key: 'draft', label: 'In Draft', count: 1 },
    { key: 'sent', label: 'Sent', count: 0 },
    { key: 'accepted', label: 'Accepted', count: 1 },
    { key: 'rejected', label: 'Rejected', count: 1 },
    { key: 'expired', label: 'Expired', count: 0 }
];

export default function Proposals() {
    const [activeTab, setActiveTab] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [showProposalModal, setShowProposalModal] = useState(false);
    const [proposals, setProposals] = useState(dummyProposals);
    const [newProposal, setNewProposal] = useState({
        client: '',
        proposalName: '',
        description: '',
        amount: '',
        validUntil: '',
        source: '',
        notes: ''
    });

    const handleAddProposal = (e) => {
        e.preventDefault();
        const proposal = {
            id: proposals.length + 1,
            client: newProposal.client,
            proposalName: newProposal.proposalName,
            dateTime: new Date().toLocaleString(),
            source: newProposal.source,
            status: 'In Draft'
        };
        setProposals([...proposals, proposal]);
        setNewProposal({ client: '', proposalName: '', description: '', amount: '', validUntil: '', source: '', notes: '' });
        setShowProposalModal(false);
    };

    const filteredProposals = proposals.filter(proposal => {
        const matchesSearch = proposal.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            proposal.proposalName.toLowerCase().includes(searchTerm.toLowerCase());
        
        if (activeTab === 'all') return matchesSearch;
        if (activeTab === 'draft') return matchesSearch && proposal.status === 'In Draft';
        if (activeTab === 'sent') return matchesSearch && proposal.status === 'Sent';
        if (activeTab === 'accepted') return matchesSearch && proposal.status === 'Approved';
        if (activeTab === 'rejected') return matchesSearch && proposal.status === 'Rejected';
        if (activeTab === 'expired') return matchesSearch && proposal.status === 'Expired';
        return matchesSearch;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'Approved': return 'bg-green-100 text-green-800';
            case 'Rejected': return 'bg-red-100 text-red-800';
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'In Draft': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="p-4 sm:ml-72">
            <div className="p-6 mt-14">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Proposals</h1>
                    
                    {/* Status Tabs */}
                    <div className="grid grid-cols-3 sm:flex sm:space-x-1 gap-1 sm:gap-0 bg-gray-100 p-1 rounded-lg w-full sm:w-fit">
                        {statusTabs.map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`px-1 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors text-center ${
                                    activeTab === tab.key
                                        ? 'bg-[#4d55f5] text-white'
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                <span className="block sm:inline">{tab.label}</span>
                                <span className="block sm:inline">({tab.count})</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    {/* Header with search and add button */}
                    <div className="p-4 sm:p-6 border-b border-gray-200">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">Proposal</h2>
                                <p className="text-sm text-gray-600">Total {filteredProposals.length}</p>
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
                                    onClick={() => setShowProposalModal(true)}
                                    className="flex items-center justify-center space-x-2 bg-[#4d55f5] text-white px-4 py-2 rounded-lg hover:bg-[#3d45e5] transition-colors"
                                >
                                    <Plus className="h-4 w-4" />
                                    <span>New Proposal</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Table - Desktop */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CLIENT</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PROPOSAL NAME</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DATE/TIME</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SOURCE</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredProposals.length > 0 ? (
                                    filteredProposals.map((proposal) => (
                                        <tr key={proposal.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{proposal.client}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{proposal.proposalName}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{proposal.dateTime}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{proposal.source}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(proposal.status)}`}>
                                                    {proposal.status}
                                                </span>
                                            </td>
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
                    </div>

                    {/* Cards - Mobile/Tablet */}
                    <div className="md:hidden">
                        <div className="space-y-4 p-4">
                            {filteredProposals.length > 0 ? (
                                filteredProposals.map((proposal) => (
                                    <div key={proposal.id} className="bg-gray-50 rounded-lg p-4 space-y-2">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-medium text-gray-900">{proposal.client}</h3>
                                            <button className="text-[#4d55f5] hover:text-[#3d45e5] text-sm">View</button>
                                        </div>
                                        <p className="text-sm text-gray-600">{proposal.proposalName}</p>
                                        <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                                            <div><span className="font-medium">Source:</span> {proposal.source}</div>
                                            <div><span className="font-medium">Date:</span> {proposal.dateTime}</div>
                                            <div className="col-span-2">
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(proposal.status)}`}>
                                                    {proposal.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12 text-gray-500">No rows</div>
                            )}
                        </div>
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

            {/* Proposal Modal */}
            {showProposalModal && (
                <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Add New Proposal</h3>
                            <button
                                onClick={() => setShowProposalModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        <form onSubmit={handleAddProposal}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Client Name *</label>
                                    <input
                                        type="text"
                                        required
                                        value={newProposal.client}
                                        onChange={(e) => setNewProposal({...newProposal, client: e.target.value})}
                                        placeholder="Enter client name"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4d55f5] focus:border-transparent"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Proposal Name *</label>
                                    <input
                                        type="text"
                                        required
                                        value={newProposal.proposalName}
                                        onChange={(e) => setNewProposal({...newProposal, proposalName: e.target.value})}
                                        placeholder="Enter proposal name"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4d55f5] focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount *</label>
                                    <input
                                        type="number"
                                        required
                                        value={newProposal.amount}
                                        onChange={(e) => setNewProposal({...newProposal, amount: e.target.value})}
                                        placeholder="Enter amount"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4d55f5] focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Valid Until *</label>
                                    <input
                                        type="date"
                                        required
                                        value={newProposal.validUntil}
                                        onChange={(e) => setNewProposal({...newProposal, validUntil: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4d55f5] focus:border-transparent"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Source *</label>
                                    <select
                                        required
                                        value={newProposal.source}
                                        onChange={(e) => setNewProposal({...newProposal, source: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4d55f5] focus:border-transparent appearance-none bg-white"
                                    >
                                        <option value="">Select source</option>
                                        <option value="Website">Website</option>
                                        <option value="Referral">Referral</option>
                                        <option value="Social Media">Social Media</option>
                                        <option value="Email">Email</option>
                                        <option value="Phone">Phone</option>
                                    </select>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                                    <textarea
                                        rows={2}
                                        required
                                        value={newProposal.description}
                                        onChange={(e) => setNewProposal({...newProposal, description: e.target.value})}
                                        placeholder="Enter proposal description"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4d55f5] focus:border-transparent resize-none"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                                    <textarea
                                        rows={2}
                                        value={newProposal.notes}
                                        onChange={(e) => setNewProposal({...newProposal, notes: e.target.value})}
                                        placeholder="Additional notes..."
                                        className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4d55f5] focus:border-transparent resize-none"
                                    />
                                </div>
                            </div>

                            <div className="mt-6">
                                <button
                                    type="submit"
                                    className="w-full px-6 py-2.5 bg-[#8B8FFF] text-white rounded-xl hover:bg-[#7B7FFF] transition-colors font-medium"
                                >
                                    Add Proposal
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}