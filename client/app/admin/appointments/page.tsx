'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { RootState } from '../../../store/store';
import { getAppointments, updateAppointmentStatus } from '../../../store/adminSlice';
import { 
  Building,
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
  User,
  Mail,
  Phone,
  ExternalLink,
  Edit3,
 
  ChevronLeft,
 
  X
} from 'lucide-react';


export default function AdminAppointmentsPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  
  const { admin } = useSelector((state: RootState) => state.auth);
  const { appointments, pagination, isLoading } = useSelector((state: RootState) => state.admin);
  
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(null);
  const [updateData, setUpdateData] = useState({
    status: '',
    scheduledAt: '',
    rejectionReason: ''
  });

  useEffect(() => {
    if (!admin) {
      router.push('/auth');
      return;
    }
    
    dispatch(getAppointments({ 
      status: statusFilter || undefined,
      page: currentPage.toString(),
      limit: '20'
    }) as any);
  }, [dispatch, admin, router, statusFilter, currentPage]);

  const handleStatusChange = (appointmentId: string, status: string) => {
    setSelectedAppointment(appointmentId);
    setUpdateData({
      status,
      scheduledAt: '',
      rejectionReason: ''
    });
  };


  const handleUpdate = async () => {
    if (!selectedAppointment) return;
    
    const updatePayload: any = {
      id: selectedAppointment,
      status: updateData.status
    };
    
    if (updateData.scheduledAt) {
      updatePayload.scheduledAt = updateData.scheduledAt;
    }
    
    if (updateData.rejectionReason) {
      updatePayload.rejectionReason = updateData.rejectionReason;
    }
    
    try {
      await dispatch(updateAppointmentStatus(updatePayload) as any).unwrap();
      setSelectedAppointment(null);
      setUpdateData({ status: '', scheduledAt: '', rejectionReason: '' });
    } catch (error) {
      console.error('Failed to update appointment:', error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'APPROVED': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'REJECTED': return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'COMPLETED': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'CANCELLED': return 'bg-slate-100 text-slate-800 border-slate-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };
  

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING': return <Clock className="w-3 h-3" />;
      case 'APPROVED': return <CheckCircle className="w-3 h-3" />;
      case 'REJECTED': return <XCircle className="w-3 h-3" />;
      case 'COMPLETED': return <CheckCircle className="w-3 h-3" />;
      case 'CANCELLED': return <XCircle className="w-3 h-3" />;
      default: return <AlertCircle className="w-3 h-3" />;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    router.push("/");
  };

  if (!admin) {
    return null;
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
              <ChevronRight className="w-4 h-4 ml-auto" />
            </Link>
            <Link href="/admin/properties" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors">
              <Building className="w-4 h-4" />
              <span>Properties</span>
              <ChevronRight className="w-4 h-4 ml-auto" />
            </Link>
            <Link href="/admin/appointments" className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-blue-50 text-blue-700 font-medium">
              <Calendar className="w-4 h-4" />
              <span>Appointments</span>
            </Link>
            <Link href="/admin/inquiries" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors">
              <MessageSquare className="w-4 h-4" />
              <span>Inquiries</span>
              <ChevronRight className="w-4 h-4 ml-auto" />
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
              <Link href="/admin" className="hover:text-blue-600 transition-colors">Admin</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-slate-900 font-medium">Appointments</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center space-x-3">
              <Calendar className="w-8 h-8 text-blue-600" />
              <span>Manage Appointments</span>
            </h1>
            <p className="text-slate-600 mt-2">View and manage user appointments</p>
          </div>

          {/* Filters */}
          {/* <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-slate-600" />
                <span className="text-sm font-medium text-slate-700">Filters</span>
              </div>
              <div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
                >
                  <option value="">All Status</option>
                  <option value="PENDING">Pending</option>
                  <option value="APPROVED">Approved</option>
                  <option value="REJECTED">Rejected</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>
            </div>
          </div> */}

          {/* Appointments List */}
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <div className="text-slate-600">Loading appointments...</div>
              </div>
            </div>
          ) : appointments.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
              <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">No appointments found</h3>
              <p className="text-slate-600">There are no appointments matching your current filters.</p>
            </div>
          ) : (
            <>
              <div className="space-y-6 mb-8">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-all duration-300">
                    <div className="grid lg:grid-cols-3 gap-6">
                      {/* Appointment Details */}
                      <div className="lg:col-span-2">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                              <div className="p-2 bg-blue-50 rounded-lg">
                                <User className="w-5 h-5 text-blue-600" />
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold text-slate-900">{appointment.name}</h3>
                                <div className="flex items-center space-x-4 mt-1">
                                  <div className="flex items-center space-x-1 text-slate-600">
                                    <Mail className="w-3 h-3" />
                                    <span className="text-sm">{appointment.email}</span>
                                  </div>
                                  <div className="flex items-center space-x-1 text-slate-600">
                                    <Phone className="w-3 h-3" />
                                    <span className="text-sm">{appointment.phone}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(appointment.status)}`}>
                            {getStatusIcon(appointment.status)}
                            <span>{appointment.status}</span>
                          </span>
                        </div>
                        
                        {appointment.message && (
                          <div className="mb-4 bg-slate-50 rounded-lg p-4">
                            <p className="text-sm font-medium text-slate-700 mb-1">Message:</p>
                            <p className="text-slate-600">{appointment.message}</p>
                          </div>
                        )}
                        
                        <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>Submitted: {new Date(appointment.createdAt).toLocaleString()}</span>
                          </div>
                          {appointment.scheduledAt && (
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>Scheduled: {new Date(appointment.scheduledAt).toLocaleString()}</span>
                            </div>
                          )}
                          {appointment.meetingLink && (
                            <div className="flex items-center space-x-1">
                              <ExternalLink className="w-3 h-3" />
                              <a href={appointment.meetingLink} className="text-blue-600 hover:text-blue-700 font-medium">
                                Join Meeting
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="space-y-3">
                        {appointment.status === 'PENDING' && (
                          <>
                            <button
                              onClick={() => handleStatusChange(appointment.id, 'APPROVED')}
                              className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors font-medium flex items-center justify-center space-x-2"
                            >
                              <CheckCircle className="w-4 h-4" />
                              <span>Approve</span>
                            </button>
                            <button
                              onClick={() => handleStatusChange(appointment.id, 'REJECTED')}
                              className="w-full bg-rose-600 text-white py-2 px-4 rounded-lg hover:bg-rose-700 transition-colors font-medium flex items-center justify-center space-x-2"
                            >
                              <XCircle className="w-4 h-4" />
                              <span>Reject</span>
                            </button>
                          </>
                        )}
                        
                        {appointment.status === 'APPROVED' && (
                          <button
                            onClick={() => handleStatusChange(appointment.id, 'COMPLETED')}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2"
                          >
                            <CheckCircle className="w-4 h-4" />
                            <span>Mark Complete</span>
                          </button>
                        )}
                        
                        <button
                          onClick={() => setSelectedAppointment(appointment.id)}
                          className="w-full bg-slate-100 text-slate-700 py-2 px-4 rounded-lg hover:bg-slate-200 transition-colors font-medium flex items-center justify-center space-x-2"
                        >
                          <Edit3 className="w-4 h-4" />
                          <span>Edit Status</span>
                        </button>
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
                      Page {pagination.currentPage} of {pagination.totalPages}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handlePageChange(pagination.currentPage - 1)}
                        disabled={!pagination.hasPrevPage}
                        className="flex items-center space-x-1 px-3 py-2 border border-slate-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Previous</span>
                      </button>
                      
                      <button
                        onClick={() => handlePageChange(pagination.currentPage + 1)}
                        disabled={!pagination.hasNextPage}
                        className="flex items-center space-x-1 px-3 py-2 border border-slate-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
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

          {/* Update Modal */}
          {selectedAppointment && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-xl p-6 w-full max-w-md border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-slate-900">
                    Update Appointment Status
                  </h2>
                  <button
                    onClick={() => setSelectedAppointment(null)}
                    className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-slate-500" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                    <select
                      value={updateData.status}
                      onChange={(e) => setUpdateData({...updateData, status: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    >
                      <option value="APPROVED">Approved</option>
                      <option value="REJECTED">Rejected</option>
                      <option value="COMPLETED">Completed</option>
                    </select>
                  </div>
                  
                  {updateData.status === 'APPROVED' && (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Scheduled Date & Time
                      </label>
                      <input
                        type="datetime-local"
                        value={updateData.scheduledAt}
                        onChange={(e) => setUpdateData({...updateData, scheduledAt: e.target.value})}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                    </div>
                  )}
                  
                  {updateData.status === 'REJECTED' && (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Rejection Reason
                      </label>
                      <textarea
                        value={updateData.rejectionReason}
                        onChange={(e) => setUpdateData({...updateData, rejectionReason: e.target.value})}
                        rows={3}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                        placeholder="Please provide a reason for rejection..."
                      />
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-3 mt-6">
                  <button
                    onClick={handleUpdate}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setSelectedAppointment(null)}
                    className="flex-1 bg-slate-100 text-slate-700 py-2 px-4 rounded-lg hover:bg-slate-200 transition-colors font-medium"
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