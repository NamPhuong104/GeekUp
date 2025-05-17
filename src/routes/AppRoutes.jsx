import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Albums from "../component/Albums/Albums"
import AlbumDetail from "../component/Albums/Detail/AlbumDetail"
import UserDetail from "../component/Users/Detail/UserDetail"
import Users from "../component/Users/Users"
import LayoutComponent from "../layout/Layout"

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutComponent />,
    children: [
      {
        index: true,
        element: <Albums />
      },
      {
        path: "albums",
        element: <Albums />
      },
      { path: "albums/:id", element: <AlbumDetail /> },
      {
        path: "users",
        element: <Users />
      },
      { path: "users/:id", element: <UserDetail /> },
      {
        path: "*",
        element: <div>404 Not Found</div>
      }
    ]
  }
])

const AppRouter = () => {
  return <RouterProvider router={router} />
}

export default AppRouter
