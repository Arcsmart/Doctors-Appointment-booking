import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import AdmincontexProvider from './context/AdminContex.jsx';
import DoctorcontexProvider from './context/DoctorContex.jsx';
import AppcontexProvider from './context/AppContex.jsx';
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AdmincontexProvider>
      <DoctorcontexProvider>
        <AppcontexProvider>
          <App />
        </AppcontexProvider>
      </DoctorcontexProvider>
    </AdmincontexProvider>
  </BrowserRouter>
);
