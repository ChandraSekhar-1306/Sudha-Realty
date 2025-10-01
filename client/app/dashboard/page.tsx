'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Playfair_Display } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';
import { RootState } from '../../store/store';
import { getUserAppointments, cancelAppointment } from '../../store/appointmentSlice';
import { getUserInquiries } from '../../store/inquirySlice';
import { getUserFavorites } from '../../store/propertySlice';
import { 
  Calendar, 
  MessageSquare, 
  Heart, 
  Home, 
  LogOut, 
  ChevronRight,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Menu,
  X,
  Bell,
  Search,
  
} from 'lucide-react';

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display', 
});

export default function DashboardPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { user } = useSelector((state: RootState) => state.auth);
  const { appointments } = useSelector((state: RootState) => state.appointments);
  const { inquiries } = useSelector((state: RootState) => state.inquiries);
  const { favorites } = useSelector((state: RootState) => state.properties);

  useEffect(() => {
    if (!user) {
      router.push('/auth');
      return;
    }
    dispatch(getUserAppointments() as any);
    dispatch(getUserInquiries({ limit: '5' }) as any);
    dispatch(getUserFavorites({ limit: '5' }) as any);
  }, [dispatch, user, router]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCancelAppointment = (appointmentId: string) => {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      dispatch(cancelAppointment(appointmentId) as any);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'APPROVED': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'REJECTED': return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'COMPLETED': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'RESPONDED': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

 const handleLogout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/'); // redirect after logout
  }
};


  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING': return <Clock className="w-3 h-3" />;
      case 'APPROVED': return <CheckCircle className="w-3 h-3" />;
      case 'REJECTED': return <XCircle className="w-3 h-3" />;
      case 'COMPLETED': return <CheckCircle className="w-3 h-3" />;
      case 'RESPONDED': return <CheckCircle className="w-3 h-3" />;
      default: return <AlertCircle className="w-3 h-3" />;
    }
  };



  const pendingAppointments = appointments.filter(a => a.status === 'PENDING').length;
  const respondedInquiries = inquiries.filter(i => i.status === 'RESPONDED').length;

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white/95 border-b border-slate-200 sticky top-0 z-40 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          <div className="flex items-center space-x-0.5">
              <Image 
                src="/logofinal1.png" 
                alt="Logo" 
                width={220} 
                height={200} 
                className="object-contain"
              />
             
            </div>


          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors relative">
              <Bell className="w-5 h-5 text-slate-600" />
              {(pendingAppointments + respondedInquiries) > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                  {pendingAppointments + respondedInquiries}
                </span>
              )}
            </button>
            <div className="flex items-center space-x-3 pl-4 border-l border-slate-200">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-slate-900">{user.name}</p>
                <p className="text-xs text-slate-500">{user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:sticky top-0 left-0 w-64 bg-white border-r border-slate-200 h-screen transition-transform duration-300 ease-in-out z-30 lg:z-0`}>
          <div className="p-6 pt-24 lg:pt-6">
            <nav className="space-y-2">
              <Link href="/dashboard" className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium shadow-lg shadow-blue-500/30">
                <Home className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
              <Link href="/properties" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-100 transition-all group">
                <MapPin className="w-5 h-5 group-hover:text-blue-600 transition-colors" />
                <span>Properties</span>
                <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link href="/my-inquiries" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-100 transition-all group">
                <MessageSquare className="w-5 h-5 group-hover:text-emerald-600 transition-colors" />
                <span>My Inquiries</span>
                {/* {respondedInquiries > 0 && (
                  <span className="ml-auto w-5 h-5 bg-emerald-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {respondedInquiries}
                  </span>
                )} */}
                <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link href="/book-appointment" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-100 transition-all group">
                <Calendar className="w-5 h-5 group-hover:text-purple-600 transition-colors" />
                <span>Appointment</span>
                <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link href="/favorites" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-100 transition-all group">
                <Heart className="w-5 h-5 group-hover:text-rose-600 transition-colors" />
                <span>My Favorites</span>
                <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </nav>

            <div className="mt-8 pt-8 border-t border-slate-200">
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 px-4 py-3 rounded-xl text-rose-700 hover:bg-rose-50 transition-all w-full group"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-x-hidden">
          {/* Welcome Section with Stats */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
                  Good {currentTime.getHours() < 12 ? 'morning' : currentTime.getHours() < 16 ? 'afternoon' : 'evening'}, <span className='bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 bg-clip-text text-transparent font-bold'>{user.name}!</span>
                </h2>
                <p className="text-slate-600">
                  {currentTime.toLocaleDateString('en-IN', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
              <div className="mt-4 lg:mt-0">
                <Link href="/properties">
                  <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center space-x-2">
                    <Search className="w-5 h-5" />
                    <span>Browse Properties</span>
                  </button>
                </Link>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-xl transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    Active
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-1">{appointments.length}</h3>
                <p className="text-slate-600 text-sm">Total Appointments</p>
                <div className="mt-4 flex items-center text-xs text-emerald-600">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>{pendingAppointments} pending</span>
                </div>
              </div> */}

              {/* <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-xl transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-6 h-6 text-emerald-600" />
                  </div>
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                    Updated
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-1">{inquiries.length}</h3>
                <p className="text-slate-600 text-sm">Active Inquiries</p>
                <div className="mt-4 flex items-center text-xs text-emerald-600">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  <span>{respondedInquiries} responded</span>
                </div>
              </div> */}

              {/* <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-xl transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Heart className="w-6 h-6 text-rose-600" />
                  </div>
                  <span className="text-xs font-medium text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
                    Saved
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-1">{favorites.length}</h3>
                <p className="text-slate-600 text-sm">Favorite Properties</p>
                <div className="mt-4 flex items-center text-xs text-slate-600">
                  <Eye className="w-4 h-4 mr-1" />
                  <span>View collection</span>
                </div>
              </div> */}

              {/* <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 text-white hover:shadow-xl transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold mb-1">{appointments.length + inquiries.length}</h3>
                <p className="text-indigo-100 text-sm">Total Activities</p>
                <div className="mt-4 flex items-center text-xs text-white/80">
                  <span>All interactions</span>
                </div>
              </div> */}
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Appointments - Larger Section */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">Upcoming Appointments</h3>
                    <p className="text-sm text-slate-600">Manage your scheduled visits</p>
                  </div>
                  <Link href="/book-appointment">
                        <button className="hidden sm:flex px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all items-center space-x-2">
                          <Plus className="w-4 h-4" />
                          <span>Schedule New Appointment</span>
                        </button>
                      </Link>

                </div>
              </div>

              <div className="p-6">
                {appointments.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="w-10 h-10 text-blue-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-slate-900 mb-2">No appointments scheduled</h4>
                    <p className="text-slate-600 mb-6">Start by booking your first property consultation</p>
                    <Link href="/book-appointment">
                      <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors">
                        Schedule Appointment
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {appointments.slice(0, 3).map((appointment) => (
                      <div key={appointment.id} className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition-all bg-gradient-to-r from-white to-slate-50">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h4 className="font-semibold text-slate-900 text-lg">{appointment.name}</h4>
                              <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(appointment.status)}`}>
                                {getStatusIcon(appointment.status)}
                                <span>{appointment.status}</span>
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-3 text-sm text-slate-600">
                              <div className="flex items-center space-x-1">
                                <Mail className="w-4 h-4" />
                                <span>{appointment.email}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Phone className="w-4 h-4" />
                                <span>{appointment.phone}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {appointment.scheduledAt && (
                          <div className="flex items-center space-x-2 mb-3 p-3 bg-blue-50 rounded-lg">
                            <Clock className="w-5 h-5 text-blue-600" />
                            <span className="text-sm font-medium text-blue-900">
                              {new Date(appointment.scheduledAt).toLocaleString('en-US', {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                        )}

                        {appointment.message && (
                          <p className="text-sm text-slate-600 mb-3 p-3 bg-slate-50 rounded-lg italic">"{appointment.message}"</p>
                        )}

                        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                          <span className="text-xs text-slate-500">
                            Created {new Date(appointment.createdAt).toLocaleDateString()}
                          </span>
                          <div className="flex items-center space-x-3">
                            {appointment.meetingLink && (
                              <a
                                href={appointment.meetingLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center space-x-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                              >
                                <ExternalLink className="w-3 h-3" />
                                <span>Join</span>
                              </a>
                            )}
                            {(appointment.status === 'PENDING' || appointment.status === 'APPROVED') && (
                              <button
                                onClick={() => handleCancelAppointment(appointment.id)}
                                className="px-3 py-1.5 text-rose-600 hover:bg-rose-50 rounded-lg text-sm font-medium transition-colors"
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Recent Inquiries - Sidebar */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-emerald-50 to-teal-50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-slate-900">Recent Inquiries</h3>
                  <Link href="/my-inquiries" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                    View All →
                  </Link>
                </div>
                <p className="text-sm text-slate-600">Track your property questions</p>
              </div>

              <div className="p-6">
                {inquiries.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <MessageSquare className="w-8 h-8 text-emerald-600" />
                    </div>
                    <p className="text-slate-600 text-sm mb-4">No inquiries yet</p>
                    <Link href="/properties">
                      <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                        Browse Properties →
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {inquiries.slice(0, 4).map((inquiry) => (
                      <div key={inquiry.id} className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-all">
                        <div className="flex items-start justify-between mb-2">
                          {inquiry.property && (
                            <h4 className="font-medium text-slate-900 text-sm flex-1 pr-2">{inquiry.property.title}</h4>
                          )}
                          <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border shrink-0 ${getStatusColor(inquiry.status)}`}>
                            {getStatusIcon(inquiry.status)}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mb-2 line-clamp-2">{inquiry.message}</p>
                        <span className="text-xs text-slate-500">
                          {new Date(inquiry.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Favorite Properties Section */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-rose-50 to-pink-50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">Your Favorite Properties</h3>
                  <p className="text-sm text-slate-600">Properties you've saved for later</p>
                </div>
                <Link href="/favorites" className="text-rose-600 hover:text-rose-700 text-sm font-medium flex items-center space-x-1">
                  <span>View All</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="p-6">
              {favorites.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-10 h-10 text-rose-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">No favorites yet</h4>
                  <p className="text-slate-600 mb-6">Start building your dream property collection</p>
                  <Link href="/properties">
                    <button className="px-6 py-3 bg-rose-600 text-white rounded-xl font-medium hover:bg-rose-700 transition-colors">
                      Explore Properties
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {favorites.slice(0, 4).map((property) => (
                    <Link key={property.id} href={`/properties/${property.id}`}>
                      <div className="group border border-slate-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300">
                        {property.images.length > 0 && (
                          <div className="h-48 relative overflow-hidden">
                            <Image
                              src={property.images[0]}
                              alt={property.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                              <Heart className="w-5 h-5 text-rose-500 fill-current" />
                            </div>
                          </div>
                        )}
                        <div className="p-4">
                          <h4 className="font-semibold text-slate-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">{property.title}</h4>
                          <div className="flex items-center space-x-1 text-slate-600 mb-3">
                            <MapPin className="w-4 h-4 shrink-0" />
                            <span className="text-sm line-clamp-1">{property.location}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-xl font-bold text-slate-900">
                              ₹{property.price.toLocaleString()}
                            </p>
                            <ChevronRight className="w-5 h-5 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}