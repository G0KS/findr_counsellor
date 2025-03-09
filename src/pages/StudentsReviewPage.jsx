import { useEffect, useState } from "react";
import StudentList from "../components/StudentList";
import { useFrappeGetDocList } from "frappe-react-sdk";
import { useNavigate } from "react-router-dom";
import { useRole } from "../context/RoleContext";

function StudentsReviewPage() {
   const navigate = useNavigate();
   const [pageIndex, setPageIndex] = useState(0);
   const { currentUser, roleProfile } = useRole();
   const [filters, setFilters] = useState([]);
   const [studentArray, setStudentArray] = useState([]);

   useEffect(() => {
      if (roleProfile) {
         if (roleProfile == "Auditor")
            setFilters([
               ["assigned_by", "=", currentUser],
               ["priority", "=", "Medium"],
            ]);
         else if (roleProfile == "Counsellor")
            setFilters([
               ["allocated_to", "=", currentUser],
               ["priority", "=", "High"],
            ]);
         else if (roleProfile == "Master Auditor")
            setFilters([
               ["allocated_to", "=", currentUser],
               ["priority", "=", "High"],
            ]);
      }
   }, [roleProfile]);

   const assignedTo = useFrappeGetDocList("ToDo", {
      fields: ["reference_name", "allocated_to", "assigned_by"],
      filters,
   });

   useEffect(() => {
      if (assignedTo.data) {
         if (assignedTo.data.length > 0) {
            const students = assignedTo.data.map(
               (student) => student.reference_name
            );
            setStudentArray(students);
         } else {
            setStudentArray([]);
         }
      }
   }, [assignedTo.data, roleProfile]);

   const { data, isLoading, mutate } = useFrappeGetDocList("Student", {
      fields: [
         "name",
         "first_name",
         "last_name",
         "education_program",
         "course_list",
      ],
      filters: [
         ["registration_fee", "=", "1"],
         ["course_added", "=", "0"],
         ["name", "in", studentArray],
      ],
      limit_start: pageIndex,
      limit: 18,
      orderBy: {
         field: "modified",
         order: "asc",
      },
   });

   useEffect(() => {
      mutate();
   }, [assignedTo.data, roleProfile, studentArray]);

   return (
      <div className="studentSection container lg:px-24 px-4 py-24">
         <button
            className="text-[#0f6990] text-lg shadow py-2 px-4 rounded-2xl hover:scale-110 hover:bg-[#0f6990] hover:text-white transition ease-in-out duration-300"
            onClick={() => navigate(-1)}
         >
            &lt; Go back
         </button>
         <h1 className="text-4xl text-[#0f6990] ">Students List</h1>
         {!assignedTo.isLoading && (
            <>
               {isLoading ? (
                  <div className="h-dvh flex justify-center align-middle">
                     <div className="loader"></div>
                  </div>
               ) : (
                  <>
                     <StudentList
                        data={data}
                        pageIndex={pageIndex}
                        setPageIndex={setPageIndex}
                     />
                  </>
               )}
            </>
         )}
      </div>
   );
}

export default StudentsReviewPage;
