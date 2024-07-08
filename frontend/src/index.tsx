import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Root from './components/Root/Root';
import './shared/styles/index.scss'
import 'react-toastify/scss/main.scss'
import { ToastContainer } from 'react-toastify';
import Auth from './components/Auth/Auth';
import { AuthContextProvider } from './contexts/AuthContext/AuthContext';
import Projects from './components/Projects/Projects';
import { ModalContextProvider } from './contexts/ModalContext/ModalContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Root/>}>
    <Route path="login" element={<Auth/>}/>
    <Route path="projects" element={<Projects/>}/>
  </Route>)
)

root.render(
  <>
    <AuthContextProvider>
      <ModalContextProvider>
        <RouterProvider router={router}></RouterProvider>
        <ToastContainer position='bottom-center' theme='dark' style={{fontSize: '.8em'}}/>
      </ModalContextProvider>
    </AuthContextProvider>
  </>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
