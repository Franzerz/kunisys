import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {useSelector} from 'react-redux';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import Spinner from './components/Spinner';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import ApplyDoctor from './pages/ApplyDoctor';
import NotificationPage from './pages/NotificationPage';
import Users from './pages/admin/Users';
import Doctors from './pages/admin/Doctors';
import Profile from './pages/doctors/Profile';
import BookingPage from './pages/BookingPage';
import Appointment from './pages/Appointment';
import DoctorAppointment from './pages/doctors/DoctorAppointment';
import UserProfile from './pages/UserProfile';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import DoctorHomePage from './pages/doctors/DoctorHomePage';
import AdminHomePage from './pages/admin/AdminHomePage';

function App() {
  const {loading} = useSelector(state => state.alerts);
  return (
  <>
    <BrowserRouter>
    {loading ? <Spinner /> :
    <Routes>
      <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      <Route path="/recruitment" element={<ProtectedRoute><ApplyDoctor/></ProtectedRoute>} />
      <Route path="/notification" element={<ProtectedRoute><NotificationPage/></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute><Users/></ProtectedRoute>} />
      <Route path="/admin/doctors" element={<ProtectedRoute><Doctors/></ProtectedRoute>} />
      <Route path="/doctor/profile/" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
      <Route path="/doctor/appointment/:doctorId" element={<ProtectedRoute><BookingPage/></ProtectedRoute>} />
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
      <Route path="/appointment" element={<ProtectedRoute><Appointment /></ProtectedRoute>} />
      <Route path="/doctor/appointment" element={<ProtectedRoute><DoctorAppointment /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
      <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
      <Route path="/reset-password/:token" element={<PublicRoute><ResetPassword /></PublicRoute>} />
      <Route path="/doctor/home" element={<ProtectedRoute><DoctorHomePage /></ProtectedRoute>} />
      <Route path="/admin/home" element={<ProtectedRoute><AdminHomePage /></ProtectedRoute>} />
    </Routes>
    }
    </BrowserRouter>
  </>
  );
}

export default App;
