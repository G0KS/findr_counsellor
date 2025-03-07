import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import { FrappeProvider } from "frappe-react-sdk";
import StudentsPage from "./pages/StudentsPage";
import Student from "./pages/Student";
import ScrollToTop from "./components/ScrollToTop";
import Course from "./pages/Course";

import { ToastContainer } from "react-toastify";
import { RoleProvider } from "./context/RoleContext";

function App() {
   const api_key = import.meta.env.VITE_FRAPPE_STUDENT_KEY;
   const api_secret = import.meta.env.VITE_FRAPPE_STUDENT_SECRET;

   return (
      <>
         <FrappeProvider
            url="http://127.0.0.1:8000"
            // url="https://findrstudy.frappe.cloud"
            tokenParams={{
               type: "token",
               useToken: "true",
               token: () => `${api_key}:${api_secret}`,
            }}
            enableSocket={false}
         >
            <RoleProvider>
               <Navbar />
               <ScrollToTop />
               <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/students" element={<StudentsPage />} />
                  <Route path="/students/new" element={<StudentsPage />} />
                  <Route path="/students/review" element={<StudentsPage />} />
                  <Route path="/students/course-given" element={<StudentsPage />} />
                  <Route path="/students/:id" element={<Student />} />
                  <Route path="/course/:id" element={<Course />} />
               </Routes>
            </RoleProvider>
            <ToastContainer
               position="top-right"
               autoClose={3500}
               hideProgressBar
               newestOnTop={false}
               closeOnClick
               rtl={false}
               pauseOnFocusLoss
               draggable
               pauseOnHover
               theme="colored"
            />
         </FrappeProvider>
      </>
   );
}

export default App;
