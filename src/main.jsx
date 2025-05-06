import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { createBrowserRouter, RouterProvider,} from "react-router-dom";

const router = createBrowserRouter([
  {
  path: "/",
  element: <App/>,
  },
  {
    path: "/login",
    element: <div>login page</div>,
  },
  {
    path: "/register",
    element: <div>register page</div>,
  },
  {
    path: "/users",
    element: <div>User page</div>,
  },
  {
    path: "/products",
    element: <div>Products page</div>,
  },
 ]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
)
