import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.tsx'
import './scss/style.scss'
import './fonts/HelveticaNeueCyr.css'
import './fonts/Montserrat.css'
import './fonts/ProximaNova.css'
import './fonts/SFPro.css'
import UserManagement from "./pages/UserManagement.tsx";
import TaskManager from "./pages/TaskManager.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/task-manager",
    element: <TaskManager/>,
  },
  {
    path: "/user-management",
    element: <UserManagement/>,
  },
]);

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <RouterProvider router={router} />
  // </StrictMode>,
)
