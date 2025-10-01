'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { RootState } from '../../store/store';
import { getDashboard } from '../../store/adminSlice';
import { 
  Home, 
  Users, 
  Calendar, 
  MessageSquare, 
  Plus,
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
  Activity
} from 'lucide-react';

export default function AdminDashboardPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const { admin } = useSelector((state: RootState) => state.auth);
  const { dashboardData, isLoading } = useSelector((state: RootState) => state.admin);

  useEffect(() => {
    if (!admin) {
      router.push('/auth');
      return;
    }
    
    dispatch(getDashboard() as any);
  }, [dispatch, admin, router]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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
  // inside DashboardPage component

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("admin");
  router.push("/");
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

  if (!admin) {
    return null;
  }

  if (isLoading || !dashboardData.stats) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-slate-600">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  const stats = dashboardData.stats;
  const recentActivities = dashboardData.recentActivities;

  const adminStats = [
    {
      label: 'Total Properties',
      value: stats.totalProperties,
      subtitle: `${stats.availableProperties} Available • ${stats.soldProperties} Sold`,
      icon: Building,
      color: 'text-sky-600',
      bgColor: 'bg-sky-50',
      borderColor: 'border-sky-200'
    },
    {
      label: 'Total Users',
      value: stats.totalUsers,
      subtitle: 'Active Platform Users',
      icon: Users,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200'
    },
    {
      label: 'Appointments',
      value: stats.totalAppointments,
      subtitle: `${stats.pendingAppointments} Pending Review`,
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      label: 'Inquiries',
      value: stats.totalInquiries,
      subtitle: `${stats.pendingInquiries} Awaiting Response`,
      icon: MessageSquare,
      color: 'text-violet-600',
      bgColor: 'bg-violet-50',
      borderColor: 'border-violet-200'
    }
  ];

  const quickActions = [
    {
      title: 'Add New Property',
      href: '/admin/properties/new',
      icon: Plus,
      color: 'bg-blue-600 hover:bg-blue-700',
      description: 'List a new property'
    },
    {
      title: 'Manage Appointments',
      href: '/admin/appointments',
      icon: Calendar,
      color: 'bg-emerald-600 hover:bg-emerald-700',
      description: 'Review & schedule'
    },
    {
      title: 'Handle Inquiries',
      href: '/admin/inquiries',
      icon: MessageSquare,
      color: 'bg-violet-600 hover:bg-violet-700',
      description: 'Respond to queries'
    },
    {
      title: 'View Users',
      href: '/admin/users',
      icon: Users,
      color: 'bg-rose-600 hover:bg-rose-700',
      description: 'Manage user accounts'
    }
  ];

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
            <Link href="/admin" className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-blue-50 text-blue-700 font-medium">
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
          {/* Enhanced Welcome Section */}
          <div className="mb-8 bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-700 rounded-2xl p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2">
                  Welcome back, {admin.name}!
                </h2>
                <p className="text-white-300 text-lg font-semibold">Here's your platform overview</p>
                <p className="text-white-300 text-sm mt-2 font-semibold">
                  {currentTime.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
             
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {adminStats.map((stat, index) => (
              <div key={index} className={`bg-white rounded-xl p-6 border ${stat.borderColor} hover:shadow-lg transition-all duration-300`}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <Activity className="w-4 h-4 text-slate-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</p>
                  <p className="text-sm text-slate-600 mb-2">{stat.label}</p>
                  <p className="text-xs text-slate-500">{stat.subtitle}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-slate-200 mb-8">
            <div className="p-6 border-b border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <span>Quick Actions</span>
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    href={action.href}
                    className={`${action.color} text-white p-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg group`}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <action.icon className="w-6 h-6" />
                      <h4 className="font-medium">{action.title}</h4>
                    </div>
                    <p className="text-sm opacity-90">{action.description}</p>
                    <ChevronRight className="w-4 h-4 mt-3 group-hover:translate-x-1 transition-transform" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activities Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Recent Appointments */}
            <div className="bg-white rounded-xl border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-slate-900">Recent Appointments</h3>
                  </div>
                  <Link href="/admin/appointments" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View All
                  </Link>
                </div>
              </div>

              <div className="p-6">
                {recentActivities?.appointments && recentActivities.appointments.length > 0 ? (
                  <div className="space-y-4">
                    {recentActivities.appointments.map((appointment) => (
                      <div key={appointment.id} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-medium text-slate-900">{appointment.name}</h4>
                            <p className="text-sm text-slate-600">{appointment.email}</p>
                          </div>
                          <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(appointment.status)}`}>
                            {getStatusIcon(appointment.status)}
                            <span>{appointment.status}</span>
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-500">
                            {new Date(appointment.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="w-8 h-8 text-slate-400 mx-auto mb-3" />
                    <p className="text-slate-600">No recent appointments</p>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Inquiries */}
            <div className="bg-white rounded-xl border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <MessageSquare className="w-5 h-5 text-violet-600" />
                    <h3 className="text-lg font-semibold text-slate-900">Recent Inquiries</h3>
                  </div>
                  <Link href="/admin/inquiries" className="text-violet-600 hover:text-violet-700 text-sm font-medium">
                    View All
                  </Link>
                </div>
              </div>

              <div className="p-6">
                {recentActivities?.inquiries && recentActivities.inquiries.length > 0 ? (
                  <div className="space-y-4">
                    {recentActivities.inquiries.map((inquiry) => (
                      <div key={inquiry.id} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-medium text-slate-900">{inquiry.name}</h4>
                            <p className="text-sm text-slate-600">{inquiry.property?.title}</p>
                          </div>
                          <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(inquiry.status)}`}>
                            {getStatusIcon(inquiry.status)}
                            <span>{inquiry.status}</span>
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-500">
                            {new Date(inquiry.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MessageSquare className="w-8 h-8 text-slate-400 mx-auto mb-3" />
                    <p className="text-slate-600">No recent inquiries</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Recent Properties */}
          {recentActivities?.properties && recentActivities.properties.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Building className="w-5 h-5 text-sky-600" />
                    <h3 className="text-lg font-semibold text-slate-900">Recently Added Properties</h3>
                  </div>
                  <Link href="/admin/properties" className="text-sky-600 hover:text-sky-700 text-sm font-medium">
                    View All
                  </Link>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recentActivities.properties.map((property) => (
                    <div key={property.id} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-all duration-300">
                      <h4 className="font-medium text-slate-900 mb-2 line-clamp-1">{property.title}</h4>
                      <div className="flex items-center space-x-1 text-slate-600 mb-2">
                        <MapPin className="w-3 h-3" />
                        <span className="text-sm">{property.location}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-slate-900 mb-3">
                        <IndianRupee className="w-4 h-4" />
                        <span className="font-semibold">{property.price.toLocaleString()}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          property.category === 'FRESH_SALES' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {property.category.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}






// 'use client';

// import { useEffect, useState, useMemo } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import {
//   PieChart,
//   Pie,
//   Cell,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   LineChart,
//   Line
// } from 'recharts';
// import { RootState } from '../../store/store';
// import { getDashboard } from '../../store/adminSlice';
// import { 
//   Home, 
//   Users, 
//   Calendar, 
//   MessageSquare, 
//   Plus,
//   LogOut,
//   ChevronRight,
//   Clock,
//   CheckCircle,
//   XCircle,
//   AlertCircle,
//   Building,
//   TrendingUp,
//   MapPin,
//   IndianRupee,
//   Activity,
//   PieChart as PieChartIcon,
//   BarChart3
// } from 'lucide-react';

// export default function AdminDashboardPage() {
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const [currentTime, setCurrentTime] = useState(new Date());
  
//   const { admin } = useSelector((state: RootState) => state.auth);
//   const { dashboardData, isLoading } = useSelector((state: RootState) => state.admin);

//   // Move all hooks before any conditional logic
//   useEffect(() => {
//     const timer = setInterval(() => setCurrentTime(new Date()), 1000);
//     return () => clearInterval(timer);
//   }, []);

//   useEffect(() => {
//     if (!admin) {
//       router.push('/auth');
//       return;
//     }
    
//     dispatch(getDashboard() as any);
//   }, [dispatch, admin, router]);

//   // Memoize stats and activities data
//   const stats = useMemo(() => {
//     return dashboardData?.stats || {
//       totalProperties: 0,
//       availableProperties: 0,
//       soldProperties: 0,
//       totalUsers: 0,
//       totalAppointments: 0,
//       pendingAppointments: 0,
//       totalInquiries: 0,
//       pendingInquiries: 0
//     };
//   }, [dashboardData?.stats]);

//   const recentActivities = useMemo(() => {
//     return dashboardData?.recentActivities || {
//       appointments: [],
//       inquiries: [],
//       properties: []
//     };
//   }, [dashboardData?.recentActivities]);

//   // Memoize admin stats configuration
//   const adminStats = useMemo(() => [
//     {
//       label: 'Total Properties',
//       value: stats.totalProperties,
//       subtitle: `${stats.availableProperties} Available • ${stats.soldProperties} Sold`,
//       icon: Building,
//       color: 'text-sky-600',
//       bgColor: 'bg-sky-50',
//       borderColor: 'border-sky-200'
//     },
//     {
//       label: 'Total Users',
//       value: stats.totalUsers,
//       subtitle: 'Active Platform Users',
//       icon: Users,
//       color: 'text-emerald-600',
//       bgColor: 'bg-emerald-50',
//       borderColor: 'border-emerald-200'
//     },
//     {
//       label: 'Appointments',
//       value: stats.totalAppointments,
//       subtitle: `${stats.pendingAppointments} Pending Review`,
//       icon: Calendar,
//       color: 'text-blue-600',
//       bgColor: 'bg-blue-50',
//       borderColor: 'border-blue-200'
//     },
//     {
//       label: 'Inquiries',
//       value: stats.totalInquiries,
//       subtitle: `${stats.pendingInquiries} Awaiting Response`,
//       icon: MessageSquare,
//       color: 'text-violet-600',
//       bgColor: 'bg-violet-50',
//       borderColor: 'border-violet-200'
//     }
//   ], [stats]);

//   // Memoize quick actions configuration
//   const quickActions = useMemo(() => [
//     {
//       title: 'Add New Property',
//       href: '/admin/properties/new',
//       icon: Plus,
//       color: 'bg-blue-600 hover:bg-blue-700',
//       description: 'List a new property'
//     },
//     {
//       title: 'Manage Appointments',
//       href: '/admin/appointments',
//       icon: Calendar,
//       color: 'bg-emerald-600 hover:bg-emerald-700',
//       description: 'Review & schedule'
//     },
//     {
//       title: 'Handle Inquiries',
//       href: '/admin/inquiries',
//       icon: MessageSquare,
//       color: 'bg-violet-600 hover:bg-violet-700',
//       description: 'Respond to queries'
//     },
//     {
//       title: 'View Users',
//       href: '/admin/users',
//       icon: Users,
//       color: 'bg-rose-600 hover:bg-rose-700',
//       description: 'Manage user accounts'
//     }
//   ], []);

//   // Memoize chart data to prevent continuous re-renders
//   const propertyStatusData = useMemo(() => [
//     { name: 'Available', value: stats.availableProperties, color: '#10b981' },
//     { name: 'Sold', value: stats.soldProperties, color: '#6366f1' }
//   ], [stats.availableProperties, stats.soldProperties]);

//   const appointmentStatusData = useMemo(() => [
//     { name: 'Pending', value: stats.pendingAppointments, color: '#f59e0b' },
//     { name: 'Approved', value: stats.totalAppointments - stats.pendingAppointments, color: '#10b981' }
//   ], [stats.pendingAppointments, stats.totalAppointments]);

//   const inquiryStatusData = useMemo(() => [
//     { name: 'Pending', value: stats.pendingInquiries, color: '#f59e0b' },
//     { name: 'Responded', value: stats.totalInquiries - stats.pendingInquiries, color: '#8b5cf6' }
//   ], [stats.pendingInquiries, stats.totalInquiries]);

//   const overallStatsData = useMemo(() => [
//     { name: 'Properties', value: stats.totalProperties, color: '#0ea5e9' },
//     { name: 'Users', value: stats.totalUsers, color: '#10b981' },
//     { name: 'Appointments', value: stats.totalAppointments, color: '#3b82f6' },
//     { name: 'Inquiries', value: stats.totalInquiries, color: '#8b5cf6' }
//   ], [stats.totalProperties, stats.totalUsers, stats.totalAppointments, stats.totalInquiries]);

//   const activityTrendData = useMemo(() => [
//     { name: 'Jan', properties: 12, appointments: 25, inquiries: 18 },
//     { name: 'Feb', properties: 19, appointments: 32, inquiries: 24 },
//     { name: 'Mar', properties: 15, appointments: 28, inquiries: 21 },
//     { name: 'Apr', properties: 22, appointments: 35, inquiries: 29 },
//     { name: 'May', properties: stats.totalProperties, appointments: stats.totalAppointments, inquiries: stats.totalInquiries }
//   ], [stats.totalProperties, stats.totalAppointments, stats.totalInquiries]);

//   // Memoize utility functions
//   const getStatusColor = useMemo(() => (status: string) => {
//     switch (status) {
//       case 'PENDING': return 'bg-amber-100 text-amber-800 border-amber-200';
//       case 'APPROVED': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
//       case 'REJECTED': return 'bg-rose-100 text-rose-800 border-rose-200';
//       case 'COMPLETED': return 'bg-blue-100 text-blue-800 border-blue-200';
//       case 'RESPONDED': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
//       default: return 'bg-slate-100 text-slate-800 border-slate-200';
//     }
//   }, []);

//   const getStatusIcon = useMemo(() => (status: string) => {
//     switch (status) {
//       case 'PENDING': return <Clock className="w-3 h-3" />;
//       case 'APPROVED': return <CheckCircle className="w-3 h-3" />;
//       case 'REJECTED': return <XCircle className="w-3 h-3" />;
//       case 'COMPLETED': return <CheckCircle className="w-3 h-3" />;
//       case 'RESPONDED': return <CheckCircle className="w-3 h-3" />;
//       default: return <AlertCircle className="w-3 h-3" />;
//     }
//   }, []);

//   const handleLogout = useMemo(() => () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("admin");
//     router.push("/");
//   }, [router]);

//   // Memoize CustomTooltip component
//   const CustomTooltip = useMemo(() => ({ active, payload, label }: any) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="bg-white p-3 border border-slate-200 rounded-lg shadow-lg">
//           <p className="text-sm font-medium text-slate-900">{label}</p>
//           {payload.map((entry: any, index: number) => (
//             <p key={index} className="text-sm" style={{ color: entry.color }}>
//               {`${entry.name}: ${entry.value}`}
//             </p>
//           ))}
//         </div>
//       );
//     }
//     return null;
//   }, []);

//   // Handle loading and authentication states after all hooks
//   if (!admin) {
//     return null;
//   }

//   if (isLoading || !dashboardData?.stats) {
//     return (
//       <div className="min-h-screen bg-slate-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <div className="text-slate-600">Loading dashboard...</div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <div className="flex">
//         {/* Sidebar */}
//         <aside className="w-64 bg-white border-r border-slate-200 min-h-screen">
//           <div className="p-4">
//             <div className="flex items-center space-x-2 mb-8">
//               <Building className="w-8 h-8 text-blue-600" />
//               <h1 className="text-xl font-bold text-slate-900">Admin Panel</h1>
//             </div>
//           </div>
//           <nav className="px-4 space-y-2">
//             <Link href="/admin" className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-blue-50 text-blue-700 font-medium">
//               <Home className="w-4 h-4" />
//               <span>Dashboard</span>
//             </Link>
//             <Link href="/admin/properties" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors">
//               <Building className="w-4 h-4" />
//               <span>Properties</span>
//               <ChevronRight className="w-4 h-4 ml-auto" />
//             </Link>
//             <Link href="/admin/appointments" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors">
//               <Calendar className="w-4 h-4" />
//               <span>Appointments</span>
//               <ChevronRight className="w-4 h-4 ml-auto" />
//             </Link>
//             <Link href="/admin/inquiries" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors">
//               <MessageSquare className="w-4 h-4" />
//               <span>Inquiries</span>
//               <ChevronRight className="w-4 h-4 ml-auto" />
//             </Link>
//             <Link href="/admin/users" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors">
//               <Users className="w-4 h-4" />
//               <span>Users</span>
//               <ChevronRight className="w-4 h-4 ml-auto" />
//             </Link>
//             <div className="border-t border-slate-200 mt-4 pt-4">
//               <button
//                 onClick={handleLogout}
//                 className="flex items-center space-x-3 px-3 py-2 rounded-lg text-red-700 hover:bg-red-100 transition-colors w-full text-left"
//               >
//                 <LogOut className="w-4 h-4" />
//                 <span>LogOut</span>
//               </button>
//             </div>
//           </nav>
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 p-6">
//           {/* Enhanced Welcome Section */}
//           <motion.div 
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="mb-8 bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-700 rounded-2xl p-8 text-white"
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <h2 className="text-3xl font-bold mb-2">
//                   Welcome back, {admin.name}!
//                 </h2>
//                 <p className="text-white/90 text-lg font-semibold">Here's your platform overview</p>
//                 <p className="text-white/80 text-sm mt-2 font-semibold">
//                   {currentTime.toLocaleDateString('en-US', { 
//                     weekday: 'long', 
//                     year: 'numeric', 
//                     month: 'long', 
//                     day: 'numeric' 
//                   })}
//                 </p>
//               </div>
//             </div>
//           </motion.div>

//           {/* Stats Grid */}
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.1 }}
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
//           >
//             {adminStats.map((stat, index) => (
//               <motion.div 
//                 key={index} 
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 className={`bg-white rounded-xl p-6 border ${stat.borderColor} hover:shadow-lg transition-all duration-300`}
//               >
//                 <div className="flex items-center justify-between mb-4">
//                   <div className={`p-3 rounded-lg ${stat.bgColor}`}>
//                     <stat.icon className={`w-6 h-6 ${stat.color}`} />
//                   </div>
//                   <Activity className="w-4 h-4 text-slate-400" />
//                 </div>
//                 <div>
//                   <p className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</p>
//                   <p className="text-sm text-slate-600 mb-2">{stat.label}</p>
//                   <p className="text-xs text-slate-500">{stat.subtitle}</p>
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>

//           {/* Charts Section */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7, delay: 0.2 }}
//             className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
//           >
//             {/* Property Status Pie Chart */}
//             <div className="bg-white rounded-xl border border-slate-200 p-6">
//               <div className="flex items-center space-x-3 mb-6">
//                 <PieChartIcon className="w-5 h-5 text-sky-600" />
//                 <h3 className="text-lg font-semibold text-slate-900">Property Distribution</h3>
//               </div>
//               <div className="h-64">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <PieChart>
//                     <Pie
//                       data={propertyStatusData}
//                       cx="50%"
//                       cy="50%"
//                       innerRadius={60}
//                       outerRadius={100}
//                       paddingAngle={5}
//                       dataKey="value"
//                     >
//                       {propertyStatusData.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={entry.color} />
//                       ))}
//                     </Pie>
//                     <Tooltip content={<CustomTooltip />} />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
//               <div className="flex justify-center space-x-6 mt-4">
//                 {propertyStatusData.map((item, index) => (
//                   <div key={index} className="flex items-center space-x-2">
//                     <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
//                     <span className="text-sm text-slate-600">{item.name} ({item.value})</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Overall Stats Bar Chart */}
//             <div className="bg-white rounded-xl border border-slate-200 p-6">
//               <div className="flex items-center space-x-3 mb-6">
//                 <BarChart3 className="w-5 h-5 text-blue-600" />
//                 <h3 className="text-lg font-semibold text-slate-900">Platform Overview</h3>
//               </div>
//               <div className="h-64">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart data={overallStatsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
//                     <XAxis 
//                       dataKey="name" 
//                       axisLine={false}
//                       tickLine={false}
//                       tick={{ fontSize: 12, fill: '#64748b' }}
//                     />
//                     <YAxis 
//                       axisLine={false}
//                       tickLine={false}
//                       tick={{ fontSize: 12, fill: '#64748b' }}
//                     />
//                     <Tooltip content={<CustomTooltip />} />
//                     <Bar dataKey="value" radius={[4, 4, 0, 0]}>
//                       {overallStatsData.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={entry.color} />
//                       ))}
//                     </Bar>
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//           </motion.div>

//           {/* Additional Charts Row */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7, delay: 0.3 }}
//             className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
//           >
//             {/* Appointments Status */}
//             <div className="bg-white rounded-xl border border-slate-200 p-6">
//               <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center space-x-2">
//                 <Calendar className="w-5 h-5 text-blue-600" />
//                 <span>Appointments</span>
//               </h3>
//               <div className="h-48">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <PieChart>
//                     <Pie
//                       data={appointmentStatusData}
//                       cx="50%"
//                       cy="50%"
//                       innerRadius={40}
//                       outerRadius={80}
//                       paddingAngle={5}
//                       dataKey="value"
//                     >
//                       {appointmentStatusData.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={entry.color} />
//                       ))}
//                     </Pie>
//                     <Tooltip content={<CustomTooltip />} />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
//               <div className="space-y-2 mt-4">
//                 {appointmentStatusData.map((item, index) => (
//                   <div key={index} className="flex items-center justify-between">
//                     <div className="flex items-center space-x-2">
//                       <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
//                       <span className="text-xs text-slate-600">{item.name}</span>
//                     </div>
//                     <span className="text-xs font-medium text-slate-900">{item.value}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Inquiries Status */}
//             <div className="bg-white rounded-xl border border-slate-200 p-6">
//               <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center space-x-2">
//                 <MessageSquare className="w-5 h-5 text-violet-600" />
//                 <span>Inquiries</span>
//               </h3>
//               <div className="h-48">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <PieChart>
//                     <Pie
//                       data={inquiryStatusData}
//                       cx="50%"
//                       cy="50%"
//                       innerRadius={40}
//                       outerRadius={80}
//                       paddingAngle={5}
//                       dataKey="value"
//                     >
//                       {inquiryStatusData.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={entry.color} />
//                       ))}
//                     </Pie>
//                     <Tooltip content={<CustomTooltip />} />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
//               <div className="space-y-2 mt-4">
//                 {inquiryStatusData.map((item, index) => (
//                   <div key={index} className="flex items-center justify-between">
//                     <div className="flex items-center space-x-2">
//                       <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
//                       <span className="text-xs text-slate-600">{item.name}</span>
//                     </div>
//                     <span className="text-xs font-medium text-slate-900">{item.value}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Activity Trend */}
//             <div className="bg-white rounded-xl border border-slate-200 p-6">
//               <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center space-x-2">
//                 <TrendingUp className="w-5 h-5 text-emerald-600" />
//                 <span>Activity Trend</span>
//               </h3>
//               <div className="h-48">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <LineChart data={activityTrendData}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
//                     <XAxis 
//                       dataKey="name" 
//                       axisLine={false}
//                       tickLine={false}
//                       tick={{ fontSize: 10, fill: '#64748b' }}
//                     />
//                     <YAxis 
//                       axisLine={false}
//                       tickLine={false}
//                       tick={{ fontSize: 10, fill: '#64748b' }}
//                     />
//                     <Tooltip content={<CustomTooltip />} />
//                     <Line 
//                       type="monotone" 
//                       dataKey="properties" 
//                       stroke="#0ea5e9" 
//                       strokeWidth={2}
//                       dot={{ fill: '#0ea5e9', strokeWidth: 2 }}
//                     />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//           </motion.div>

//           {/* Quick Actions */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.4 }}
//             className="bg-white rounded-xl border border-slate-200 mb-8"
//           >
//             <div className="p-6 border-b border-slate-200">
//               <h3 className="text-lg font-semibold text-slate-900 flex items-center space-x-2">
//                 <TrendingUp className="w-5 h-5 text-blue-600" />
//                 <span>Quick Actions</span>
//               </h3>
//             </div>
//             <div className="p-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                 {quickActions.map((action, index) => (
//                   <motion.div
//                     key={index}
//                     whileHover={{ scale: 1.05 }}
//                     transition={{ duration: 0.2 }}
//                   >
//                     <Link
//                       href={action.href}
//                       className={`${action.color} text-white p-6 rounded-xl transition-all duration-300 hover:shadow-lg group block`}
//                     >
//                       <div className="flex items-center space-x-3 mb-3">
//                         <action.icon className="w-6 h-6" />
//                         <h4 className="font-medium">{action.title}</h4>
//                       </div>
//                       <p className="text-sm opacity-90">{action.description}</p>
//                       <ChevronRight className="w-4 h-4 mt-3 group-hover:translate-x-1 transition-transform" />
//                     </Link>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
//           </motion.div>

//           {/* Recent Activities Grid */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7, delay: 0.5 }}
//             className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
//           >
//             {/* Recent Appointments */}
//             <div className="bg-white rounded-xl border border-slate-200">
//               <div className="p-6 border-b border-slate-200">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-3">
//                     <Calendar className="w-5 h-5 text-blue-600" />
//                     <h3 className="text-lg font-semibold text-slate-900">Recent Appointments</h3>
//                   </div>
//                   <Link href="/admin/appointments" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
//                     View All
//                   </Link>
//                 </div>
//               </div>

//               <div className="p-6">
//                 {recentActivities?.appointments && recentActivities.appointments.length > 0 ? (
//                   <div className="space-y-4">
//                     {recentActivities.appointments.map((appointment, index) => (
//                       <motion.div
//                         key={appointment.id}
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ duration: 0.4, delay: index * 0.1 }}
//                         className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors"
//                       >
//                         <div className="flex items-start justify-between mb-2">
//                           <div>
//                             <h4 className="font-medium text-slate-900">{appointment.name}</h4>
//                             <p className="text-sm text-slate-600">{appointment.email}</p>
//                           </div>
//                           <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(appointment.status)}`}>
//                             {getStatusIcon(appointment.status)}
//                             <span>{appointment.status}</span>
//                           </span>
//                         </div>
//                         <div className="flex items-center justify-between">
//                           <span className="text-xs text-slate-500">
//                             {new Date(appointment.createdAt).toLocaleDateString()}
//                           </span>
//                         </div>
//                       </motion.div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="text-center py-8">
//                     <Calendar className="w-8 h-8 text-slate-400 mx-auto mb-3" />
//                     <p className="text-slate-600">No recent appointments</p>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Recent Inquiries */}
//             <div className="bg-white rounded-xl border border-slate-200">
//               <div className="p-6 border-b border-slate-200">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-3">
//                     <MessageSquare className="w-5 h-5 text-violet-600" />
//                     <h3 className="text-lg font-semibold text-slate-900">Recent Inquiries</h3>
//                   </div>
//                   <Link href="/admin/inquiries" className="text-violet-600 hover:text-violet-700 text-sm font-medium">
//                     View All
//                   </Link>
//                 </div>
//               </div>

//               <div className="p-6">
//                 {recentActivities?.inquiries && recentActivities.inquiries.length > 0 ? (
//                   <div className="space-y-4">
//                     {recentActivities.inquiries.map((inquiry, index) => (
//                       <motion.div
//                         key={inquiry.id}
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ duration: 0.4, delay: index * 0.1 }}
//                         className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors"
//                       >
//                         <div className="flex items-start justify-between mb-2">
//                           <div>
//                             <h4 className="font-medium text-slate-900">{inquiry.name}</h4>
//                             <p className="text-sm text-slate-600">{inquiry.property?.title}</p>
//                           </div>
//                           <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(inquiry.status)}`}>
//                             {getStatusIcon(inquiry.status)}
//                             <span>{inquiry.status}</span>
//                           </span>
//                         </div>
//                         <div className="flex items-center justify-between">
//                           <span className="text-xs text-slate-500">
//                             {new Date(inquiry.createdAt).toLocaleDateString()}
//                           </span>
//                         </div>
//                       </motion.div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="text-center py-8">
//                     <MessageSquare className="w-8 h-8 text-slate-400 mx-auto mb-3" />
//                     <p className="text-slate-600">No recent inquiries</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </motion.div>

//           {/* Recent Properties */}
//           {recentActivities?.properties && recentActivities.properties.length > 0 && (
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.7, delay: 0.6 }}
//               className="bg-white rounded-xl border border-slate-200"
//             >
//               <div className="p-6 border-b border-slate-200">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-3">
//                     <Building className="w-5 h-5 text-sky-600" />
//                     <h3 className="text-lg font-semibold text-slate-900">Recently Added Properties</h3>
//                   </div>
//                   <Link href="/admin/properties" className="text-sky-600 hover:text-sky-700 text-sm font-medium">
//                     View All
//                   </Link>
//                 </div>
//               </div>

//               <div className="p-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {recentActivities.properties.map((property, index) => (
//                     <motion.div
//                       key={property.id}
//                       initial={{ opacity: 0, scale: 0.9 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       transition={{ duration: 0.4, delay: index * 0.1 }}
//                       whileHover={{ scale: 1.02 }}
//                       className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-all duration-300"
//                     >
//                       <h4 className="font-medium text-slate-900 mb-2 line-clamp-1">{property.title}</h4>
//                       <div className="flex items-center space-x-1 text-slate-600 mb-2">
//                         <MapPin className="w-3 h-3" />
//                         <span className="text-sm">{property.location}</span>
//                       </div>
//                       <div className="flex items-center space-x-1 text-slate-900 mb-3">
//                         <IndianRupee className="w-4 h-4" />
//                         <span className="font-semibold">{property.price.toLocaleString()}</span>
//                       </div>
//                       <div className="flex flex-wrap gap-2">
//                         <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                           property.category === 'FRESH_SALES' 
//                             ? 'bg-emerald-100 text-emerald-800' 
//                             : 'bg-blue-100 text-blue-800'
//                         }`}>
//                           {property.category.replace('_', ' ')}
//                         </span>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }