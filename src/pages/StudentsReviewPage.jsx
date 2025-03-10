import { useEffect, useState } from "react";
import StudentList from "../components/StudentList";
import { useFrappeGetDocList } from "frappe-react-sdk";
import { useNavigate } from "react-router-dom";
import { useRole } from "../context/RoleContext";
import GetReviewData from "../api/GetReviewData";

function StudentsReviewPage() {
   const navigate = useNavigate();
   const [pageIndex, setPageIndex] = useState(0);
   const { currentUser, roleProfile } = useRole();

   const [filters, setFilters] = useState([]);
   const [reviewFilters, setReviewFilters] = useState([]);

   const [fetchReview, setFetchReview] = useState(false);
   const [fetchStudentList, setFetchStudentList] = useState(false);
   const [data, setData] = useState([]);
   const [reviewData, setReviewData] = useState([]);
   const [studentList, setStudentList] = useState([]);

   useEffect(() => {
      if (roleProfile == "Auditor") {
         setFilters([
            ["assigned_by", "=", currentUser],
            ["priority", "=", "Medium"],
         ]);
         setFetchReview(true);
      } else if (roleProfile == "Counsellor") {
         setFilters([
            ["allocated_to", "=", currentUser],
            ["priority", "=", "High"],
         ]);
         setFetchReview(true);
      } else if (roleProfile == "Master Auditor") {
         setFilters([
            ["allocated_to", "=", currentUser],
            ["priority", "=", "High"],
         ]);
         setFetchReview(true);
      }
   }, [roleProfile]);

   useEffect(() => {
      if (reviewData) {
         const filteredData = reviewData.map((review) => review.reference_name);
         console.log(filteredData);
      }
   }, [reviewData]);

   // const { data, isLoading, mutate } = useFrappeGetDocList("Student", {
   //    fields: [
   //       "name",
   //       "first_name",
   //       "last_name",
   //       "education_program",
   //       "course_list",
   //    ],
   //    filters: [
   //       ["registration_fee", "=", "1"],
   //       ["course_added", "=", "0"],
   //       ["name", "in", studentArray],
   //    ],
   //    limit_start: pageIndex,
   //    limit: 18,
   //    orderBy: {
   //       field: "modified",
   //       order: "asc",
   //    },
   // });

   return (
      <div className="studentSection container lg:px-24 px-4 py-24">
         <button
            className="text-[#0f6990] text-lg shadow py-2 px-4 rounded-2xl hover:scale-110 hover:bg-[#0f6990] hover:text-white transition ease-in-out duration-300"
            onClick={() => navigate(-1)}
         >
            &lt; Go back
         </button>
         <h1 className="text-4xl text-[#0f6990] ">Students List</h1>

         <>
            <StudentList
               data={data}
               pageIndex={pageIndex}
               setPageIndex={setPageIndex}
            />
            {fetchReview && (
               <GetReviewData
                  filters={reviewFilters}
                  setReviewData={setReviewData}
               />
            )}
         </>
      </div>
   );
}

export default StudentsReviewPage;
