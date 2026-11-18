import { createBrowserRouter,RouterProvider} from 'react-router-dom'
import App from '../src/App.jsx'
import Home from '../src/pages/Home.jsx'
import CreateNew from '../src/pages/CreateNew.jsx'
import Register from '../src/pages/Register.jsx'
import Login from '../src/pages/Login.jsx'
import NewsDetail from '../src/pages/NewsDetail.jsx'
import NotFound from '../src/pages/NotFound.jsx'


export default function Router() {

   const router = createBrowserRouter([
     { 
       path: "/",
       element: <App />,
       errorElement: <NotFound />,
       children: [
         {
           path: "/",
           element: <Home />
         },
         
         {
           path:"/create-news",
           element:<CreateNew />
         },
         {
           path:"/update/:id",
           element:<CreateNew />
         },
         {
           path:"/register",
           element:<Register />
         },
         {
           path:"/login",
           element:<Login />
         },
         {
           path:"/news/:id",
           element:<NewsDetail />
         },
         {
           path:"*",
           element:<NotFound />
         }
         
         
       ]
     }
     
   
   ]);
   

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}   
