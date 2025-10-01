'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { RootState } from '../../../store/store';
import { getInquiries, respondToInquiry } from '../../../store/adminSlice';
import { 
  Home, 
  Users, 
  Calendar, 
  MessageSquare, 
  
  LogOut,
  ChevronRight,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Building,
  TrendingUp,
  Eye,
  UserCheck,
  MapPin,
  IndianRupee,
  Activity,
  Filter,
  Send,
  X,
  Mail,
  Phone,
  User,
  ChevronLeft,
  ChevronDown
} from 'lucide-react';

export default function AdminInquiriesPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  
  const { admin } = useSelector((state: RootState) => state.auth);
  const { inquiries, pagination, isLoading } = useSelector((state: RootState) => state.admin);
  
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedInquiry, setSelectedInquiry] = useState<string | null>(null);
  const [responseText, setResponseText] = useState('');

  useEffect(() => {
    if (!admin) {
      router.push('/auth');
      return;
    }
    
    dispatch(getInquiries({ 
      status: statusFilter || undefined,
      page: currentPage.toString(),
      limit: '20'
    }) as any);
  }, [dispatch, admin, router, statusFilter, currentPage]);

  const handleRespond = async (inquiryId: string) => {
    if (!responseText.trim()) {
      alert('Please enter a response message');
      return;
    }
    
    try {
      await dispatch(respondToInquiry({
        id: inquiryId,
        response: responseText,
        status: 'RESPONDED'
      }) as any).unwrap();
      
      setSelectedInquiry(null);
      setResponseText('');
    } catch (error) {
      console.error('Failed to respond to inquiry:', error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleLogout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    router.push('/'); // redirect after logout
  }
};


  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'RESPONDED': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'CLOSED': return 'bg-slate-100 text-slate-800 border-slate-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING': return <Clock className="w-3 h-3" />;
      case 'RESPONDED': return <CheckCircle className="w-3 h-3" />;
      case 'CLOSED': return <XCircle className="w-3 h-3" />;
      default: return <AlertCircle className="w-3 h-3" />;
    }
  };

  if (!admin) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto mb-4"></div>
          <div className="text-slate-600">Loading inquiries...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-slate-200 min-h-screen">
          <div className="p-4">
            <div className="flex items-center space-x-2 mb-8">
              <Building className="w-8 h-8 text-blue-600" />
              <h1 className="text-xl font-bold text-slate-900">Admin Panel</h1>
            </div>
          </div>
          <nav className="px-4 space-y-2">
            <Link href="/admin" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors">
              <Home className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
            <Link href="/admin/properties" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors">
              <Building className="w-4 h-4" />
              <span>Properties</span>
              <ChevronRight className="w-4 h-4 ml-auto" />
            </Link>
            <Link href="/admin/appointments" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors">
              <Calendar className="w-4 h-4" />
              <span>Appointments</span>
              <ChevronRight className="w-4 h-4 ml-auto" />
            </Link>
            <Link href="/admin/inquiries" className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-violet-50 text-violet-700 font-medium">
              <MessageSquare className="w-4 h-4" />
              <span>Inquiries</span>
            </Link>
            <Link href="/admin/users" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors">
              <Users className="w-4 h-4" />
              <span>Users</span>
              <ChevronRight className="w-4 h-4 ml-auto" />
            </Link>
            <div className="border-t border-slate-200 mt-4 pt-4">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-red-700 hover:bg-red-100 transition-colors w-full text-left">
              <LogOut className="w-4 h-4" />
              <span>LogOut</span>
             </button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-slate-600 mb-2">
              <Link href="/admin" className="hover:text-violet-600 transition-colors">Admin</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-slate-900 font-medium">Inquiries</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center space-x-3">
              <MessageSquare className="w-8 h-8 text-violet-600" />
              <span>Manage Inquiries</span>
            </h1>
            <p className="text-slate-600 mt-2">Review and respond to customer inquiries</p>
          </div>

          {/* Filters */}
          {/* <div className="bg-white rounded-xl border border-slate-200 mb-8">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center space-x-3">
                <Filter className="w-5 h-5 text-slate-600" />
                <h3 className="text-lg font-semibold text-slate-900">Filters</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Filter by Status</label>
                  <div className="relative">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="appearance-none bg-white border border-slate-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors"
                    >
                      <option value="">All Status</option>
                      <option value="PENDING">Pending</option>
                      <option value="RESPONDED">Responded</option>
                      <option value="CLOSED">Closed</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2 top-3 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          {/* Inquiries List */}
          {inquiries.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
              <MessageSquare className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">No inquiries found</h3>
              <p className="text-slate-600">There are no inquiries matching your current filters.</p>
            </div>
          ) : (
            <>
              <div className="space-y-6 mb-8">
                {inquiries.map((inquiry) => (
                  <div key={inquiry.id} className="bg-white rounded-xl border border-slate-200 hover:shadow-lg transition-all duration-300">
                    <div className="p-6">
                      <div className="grid lg:grid-cols-3 gap-6">
                        {/* Inquiry Details */}
                        <div className="lg:col-span-2">
                          <div className="flex justify-between items-start mb-6">
                            <div className="space-y-3">
                              <div className="flex items-center space-x-3">
                                <div className="p-2 bg-violet-50 rounded-lg">
                                  <User className="w-5 h-5 text-violet-600" />
                                </div>
                                <div>
                                  <h3 className="text-lg font-semibold text-slate-900">{inquiry.name}</h3>
                                  <div className="flex items-center space-x-4 mt-1">
                                    <div className="flex items-center space-x-1 text-slate-600">
                                      <Mail className="w-3 h-3" />
                                      <span className="text-sm">{inquiry.email}</span>
                                    </div>
                                    <div className="flex items-center space-x-1 text-slate-600">
                                      <Phone className="w-3 h-3" />
                                      <span className="text-sm">{inquiry.phone}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(inquiry.status)}`}>
                              {getStatusIcon(inquiry.status)}
                              <span>{inquiry.status}</span>
                            </span>
                          </div>
                          
                          {/* Property Details */}
                          {inquiry.property && (
                            <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                              <div className="flex items-start space-x-4">
                                {inquiry.property.images && inquiry.property.images.length > 0 && (
                                  <div className="h-16 w-16 relative flex-shrink-0">
                                    <Image
                                      src={inquiry.property.images[0]}
                                      alt={inquiry.property.title}
                                      fill
                                      className="object-cover rounded-lg"
                                    />
                                  </div>
                                )}
                                <div className="flex-1">
                                  <h4 className="font-semibold text-slate-900 mb-1">{inquiry.property.title}</h4>
                                  <div className="flex items-center space-x-1 text-slate-600 mb-2">
                                    <MapPin className="w-3 h-3" />
                                    <span className="text-sm">{inquiry.property.location}</span>
                                  </div>
                                  <div className="flex items-center space-x-1 text-slate-900">
                                    <IndianRupee className="w-4 h-4" />
                                    <span className="font-bold text-lg">{inquiry.property.price.toLocaleString()}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          <div className="mb-4">
                            <p className="text-sm font-medium text-slate-700 mb-3">Customer Message:</p>
                            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                              <p className="text-slate-700 leading-relaxed">{inquiry.message}</p>
                            </div>
                          </div>
                          
                          <div className="text-sm text-slate-500 flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>Submitted: {new Date(inquiry.createdAt).toLocaleString()}</span>
                          </div>
                        </div>
                        
                        {/* Actions */}
                        <div className="lg:border-l lg:border-slate-200 lg:pl-6">
                          <div className="space-y-3">
                            {inquiry.status === 'PENDING' && (
                              <button
                                onClick={() => setSelectedInquiry(inquiry.id)}
                                className="w-full bg-violet-600 text-white py-3 px-4 rounded-lg hover:bg-violet-700 transition-colors flex items-center justify-center space-x-2 font-medium"
                              >
                                <Send className="w-4 h-4" />
                                <span>Respond</span>
                              </button>
                            )}
                            
                            {inquiry.status === 'RESPONDED' && (
                              <button
                                onClick={() => dispatch(respondToInquiry({
                                  id: inquiry.id,
                                  response: 'Inquiry marked as closed.',
                                  status: 'CLOSED'
                                }) as any)}
                                className="w-full bg-slate-600 text-white py-3 px-4 rounded-lg hover:bg-slate-700 transition-colors flex items-center justify-center space-x-2 font-medium"
                              >
                                <XCircle className="w-4 h-4" />
                                <span>Mark Closed</span>
                              </button>
                            )}

                            {inquiry.status === 'CLOSED' && (
                              <div className="w-full bg-slate-100 text-slate-600 py-3 px-4 rounded-lg text-center font-medium">
                                <CheckCircle className="w-4 h-4 inline mr-2" />
                                Closed
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-600">
                      Showing page {pagination.currentPage} of {pagination.totalPages}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handlePageChange(pagination.currentPage - 1)}
                        disabled={!pagination.hasPrevPage}
                        className="flex items-center space-x-1 px-4 py-2 border border-slate-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Previous</span>
                      </button>
                      
                      <button
                        onClick={() => handlePageChange(pagination.currentPage + 1)}
                        disabled={!pagination.hasNextPage}
                        className="flex items-center space-x-1 px-4 py-2 border border-slate-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
                      >
                        <span>Next</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Response Modal */}
          {selectedInquiry && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-violet-50 rounded-lg">
                      <MessageSquare className="w-5 h-5 text-blue-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-slate-900">
                      Respond to Inquiry
                    </h2>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedInquiry(null);
                      setResponseText('');
                    }}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-slate-400" />
                  </button>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-3">Response Message</label>
                  <textarea
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    rows={6}
                    className="w-full p-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:blue-violet-500 transition-colors resize-none"
                    placeholder="Enter your response to the customer..."
                    required
                  />
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleRespond(selectedInquiry)}
                    className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 font-medium"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Response</span>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedInquiry(null);
                      setResponseText('');
                    }}
                    className="flex-1 bg-slate-600 text-white py-3 px-4 rounded-xl hover:bg-slate-700 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}