declare module '*.tsx' {
  const content: any;
  export default content;
}

declare module './pages/EventDetails';
declare module './pages/Dashboard';
declare module './pages/admin/CreateEvent';
declare module './pages/admin/EditEvent';
declare module './pages/admin/Dashboard';
declare module './pages/auth/Login';
declare module './pages/auth/Register';
declare module './components/layout/Navbar';
declare module './components/auth/PrivateRoute';
declare module './components/events/EventCard'; 