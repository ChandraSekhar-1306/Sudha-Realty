'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { RootState } from '../../../store/store';
import { getUsers } from '../../../store/adminSlice';
import { 
  Home, 
  Users, 
  Calendar, 
  MessageSquare, 
  LogOut,
  ChevronRight,
  Building,
  Filter,
  User,
  Mail,
  Phone,
  Clock,
  ChevronLeft,
  ChevronDown,
  UserCheck,
  Heart,
  Search,
  Settings
} from 'lucide-react';



export default function AdminUsersPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  
  const { admin } = useSelector((state: RootState) => state.auth);
  const { users, pagination, isLoading } = useSelector((state: RootState) => state.admin);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!admin) {
      router.push('/auth');
      return;
    }
    
    dispatch(getUsers({ 
      page: currentPage.toString(),
      limit: '20'
    }) as any);
  }, [dispatch, admin, router, currentPage]);

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

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.phone && user.phone.includes(searchTerm))
  );

  if (!admin) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <div className="text-slate-600">Loading users...</div>
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
            <Link href="/admin/inquiries" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors">
              <MessageSquare className="w-4 h-4" />
              <span>Inquiries</span>
              <ChevronRight className="w-4 h-4 ml-auto" />
            </Link>
            <Link href="/admin/users" className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-emerald-50 text-emerald-700 font-medium">
              <Users className="w-4 h-4" />
              <span>Users</span>
            </Link>
            <div className="border-t border-slate-200 mt-4 pt-4">
             
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-red-700 hover:bg-red-100 transition-colors w-full text-left mt-2">
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
              <Link href="/admin" className="hover:text-emerald-600 transition-colors">Admin</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-slate-900 font-medium">Users</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center space-x-3">
              <Users className="w-8 h-8 text-emerald-600" />
              <span>Manage Users</span>
            </h1>
            <p className="text-slate-600 mt-2">View and manage platform users</p>
          </div>

          {/* Search and Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Search className="w-5 h-5 text-slate-600" />
                  <h3 className="text-lg font-semibold text-slate-900">Search Users</h3>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by name, email, or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="lg:col-span-2 grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl border border-emerald-200 p-4">
                <div className="flex items-center justify-between mb-2">
                  <Users className="w-5 h-5 text-emerald-600" />
                  <span className="text-xs text-slate-500">TOTAL</span>
                </div>
                <div className="text-2xl font-bold text-slate-900">
                  {pagination?.totalCount || users.length}
                </div>
                <div className="text-xs text-slate-600">Registered Users</div>
              </div>
              
              <div className="bg-white rounded-xl border border-blue-200 p-4">
                <div className="flex items-center justify-between mb-2">
                  <UserCheck className="w-5 h-5 text-blue-600" />
                  <span className="text-xs text-slate-500">ACTIVE</span>
                </div>
                <div className="text-2xl font-bold text-slate-900">
                  {users.filter(user => user._count.appointments > 0 || user._count.inquiries > 0).length}
                </div>
                <div className="text-xs text-slate-600">Active Users</div>
              </div>
            </div>
          </div>

          {/* Users List */}
          {filteredUsers.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
              <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">
                {searchTerm ? 'No users found' : 'No users registered'}
              </h3>
              <p className="text-slate-600">
                {searchTerm 
                  ? 'Try adjusting your search criteria.' 
                  : 'There are no users registered on the platform yet.'
                }
              </p>
            </div>
          ) : (
            <>
              <div className="bg-white rounded-xl border border-slate-200 mb-8">
                <div className="p-6 border-b border-slate-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-emerald-600" />
                      <h3 className="text-lg font-semibold text-slate-900">
                        Users ({filteredUsers.length})
                      </h3>
                    </div>
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm('')}
                        className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
                      >
                        Clear search
                      </button>
                    )}
                  </div>
                </div>

                <div className="divide-y divide-slate-200">
                  {filteredUsers.map((user) => (
                    <div key={user.id} className="p-6 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-emerald-50 rounded-lg">
                            <User className="w-6 h-6 text-emerald-600" />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h4 className="text-lg font-semibold text-slate-900">{user.name}</h4>
                              {(user._count.appointments > 0 || user._count.inquiries > 0) && (
                                <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full">
                                  Active
                                </span>
                              )}
                            </div>
                            
                            <div className="flex items-center space-x-6 text-sm text-slate-600">
                              <div className="flex items-center space-x-1">
                                <Mail className="w-3 h-3" />
                                <span>{user.email}</span>
                              </div>
                              
                              {user.phone && (
                                <div className="flex items-center space-x-1">
                                  <Phone className="w-3 h-3" />
                                  <span>{user.phone}</span>
                                </div>
                              )}
                              
                              <div className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* User Activity Stats */}
                        <div className="flex items-center space-x-6">
                          <div className="text-center">
                            <div className="flex items-center space-x-1 text-violet-600 mb-1">
                              <Calendar className="w-3 h-3" />
                              <span className="text-sm font-semibold">{user._count.appointments}</span>
                            </div>
                            <span className="text-xs text-slate-500">Appointments</span>
                          </div>
                          
                          <div className="text-center">
                            <div className="flex items-center space-x-1 text-rose-600 mb-1">
                              <MessageSquare className="w-3 h-3" />
                              <span className="text-sm font-semibold">{user._count.inquiries}</span>
                            </div>
                            <span className="text-xs text-slate-500">Inquiries</span>
                          </div>
                          
                          <div className="text-center">
                            <div className="flex items-center space-x-1 text-pink-600 mb-1">
                              <Heart className="w-3 h-3" />
                              <span className="text-sm font-semibold">{user._count.favorites}</span>
                            </div>
                            <span className="text-xs text-slate-500">Favorites</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-600">
                      Showing page {pagination.currentPage} of {pagination.totalPages} 
                      ({pagination.totalCount} total users)
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
        </main>
      </div>
    </div>
  );
}