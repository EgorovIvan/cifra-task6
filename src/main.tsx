import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.tsx'
import './scss/style.scss'
// import UserManagement from "./pages/UserManagement.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  // {
  //   path: "/user-management",
  //   element: <UserManagement/>,
  // },
]);

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <RouterProvider router={router} />
  // </StrictMode>,
)
