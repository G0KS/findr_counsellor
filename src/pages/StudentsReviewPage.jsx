import { useEffect, useState } from "react";
import StudentList from "../components/StudentList";
import { useFrappeGetDocList } from "frappe-react-sdk";
import {  useNavigate } from "react-router-dom";
import { useRole } from "../context/RoleContext";

function StudentsReviewPage() {
    const navigate = useNavigate();
    const [pageIndex, setPageIndex] = useState(0);
    const { currentUser } = useRole();
 
    const assignedTo = useFrappeGetDocList("ToDo", {
       fields: ["reference_name"],
       filters: [["allocated_to", "=", currentUser]],
    });
 
    const [studentArray, setStudentArray] = useState([]);
    useEffect(() => {
       if (!assignedTo.isLoading && assignedTo.data) {
          const updatedArray = assignedTo.data.map(
             (item) => item.reference_name
          );
          setStudentArray(updatedArray);
       }
    }, [assignedTo.isLoading]);
 
    const { data, isLoading } = useFrappeGetDocList("Student", {
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
        ["course_added_for_review", "=", "1"],
          ["name", "in", studentArray],
       ],
       limit_start: pageIndex,
       limit: 18,
       orderBy: {
          field: "modified",
          order: "asc",
       },
    });
    
    return (
      <div className="studentSection container lg:px-24 px-4 py-24">
      <button
         className="text-[#0f6990] text-lg shadow py-2 px-4 rounded-2xl hover:scale-110 hover:bg-[#0f6990] hover:text-white transition ease-in-out duration-300"
         onClick={() => navigate(-1)}
      >
         &lt; Go back
      </button>
      <h1 className="text-4xl text-[#0f6990] ">Students List</h1>
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
   </div>
);
}

export default StudentsReviewPage