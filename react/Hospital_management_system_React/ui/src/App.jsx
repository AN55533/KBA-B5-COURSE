import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from './layouts/AuthLayout'
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import AddDoctor from "./pages/AddDoctor";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/admindashboard", element: <AdminDashboard /> },
      { path: "/adddoctor", element: <AddDoctor /> },
    ],
  },
  // {
  //   element: <Protected />, // any logged-in user
  //   children: [{ path: "/admindashboard", element: <Dashboard /> }],
  // },
  // {
  //   element: <Protected role="admin" />, // admin only
  //   children: [
  //     { path: "/admin/add-course", element: <AddCoursePage /> },
  //     { path: "/admin/edit-course/:courseName", element: <EditCoursePage /> },
  //   ],
  // },
  // { path: "*", element: <NotFoundPage /> },
]);
