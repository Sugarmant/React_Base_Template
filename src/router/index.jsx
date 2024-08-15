import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import App from '@/App'
import Home from '@/views/Home'
import Test from '@/views/Test'


const router = createBrowserRouter([    
    {path:"/",element:<App />,children:[
        { path: "/", element: <Home /> },
        { path: "/Test", element: <Test /> }
    ]}
]);

export default <RouterProvider router={router} />