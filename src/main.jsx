import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './Store/store.js'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Cart from './Pages/Cart.jsx'
import Login from './Pages/Login.jsx'
import SignUp from './Pages/SignUp.jsx'
import Products from './Pages/Products.jsx'
import Contact from './Pages/Contact.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element : <App/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/signup',
        element: <SignUp/>
      },
      {
        path: '/contact',
        element: <Contact/>
      },
      {
        path:'/products',
        element:<Products/>
      },
      {
        path:'/cart',
        element: <Cart/>
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
