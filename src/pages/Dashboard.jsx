import Card from "../components/Card";
import {
   useFrappeCreateDoc,
   useFrappeGetDoc,
   useFrappeGetDocCount,
   useFrappeGetDocList,
} from "frappe-react-sdk";
import { useEffect, useState } from "react";
import { useRole } from "../context/RoleContext";

function Dashboard() {
   const [newlyPaid, setNewlyPaid] = useState({});
   const [existingStudent, setExistingStudent] = useState({});
   const [isLoading, setIsLoading] = useState(true);
   const { currentUser, roleProfile } = useRole();

   const { createDoc } = useFrappeCreateDoc();

   const trial = () => {
      createDoc("ToDo", {
         assigned_by: currentUser,
         reference_type: "Student",
         allocated_to: "counsellor@findr.study",
         reference_name: "STU-001",
         description: "Assigned to Counsellor",
      })
         .then((res) => console.log(res))
         .catch((err) => console.error(err));
   };

   const redirectLoginLink =
      "https://findrstudy.frappe.cloud/login?redirect-to=%2Fcounsellor#login";

   const cards = [
      {
         id: "1",
         image: (
            <span className="material-symbols-outlined text-green-800 text-9xl text-center flex h-full justify-center align-middle">
               group_add
            </span>
         ),
         title: "New Clients",
         description: `We have ${newlyPaid} new students. Assign them to counsellors`,
         location: "students/new",
         role: "Auditor",
      },
      {
         id: "2",
         image: (
            <span className="material-symbols-outlined text-green-800 text-9xl text-center flex h-full justify-center align-middle">
               partner_exchange
            </span>
         ),
         title: "Auditing",
         description: `Courses has been added for auditing`,
         location: "students/review",
         role: "Auditor",
      },
      {
         id: "3",
         image: (
            <span className="material-symbols-outlined text-green-800 text-9xl text-center flex h-full justify-center align-middle">
               partner_exchange
            </span>
         ),
         title: "Attended Students",
         description: `You have given courses to ${existingStudent} students`,
         location: "students/course-given",
         role: "Auditor",
      },
      {
         id: "4",
         image: (
            <span className="material-symbols-outlined text-green-800 text-9xl text-center flex h-full justify-center align-middle">
               partner_exchange
            </span>
         ),
         title: "Newly Assigned Clients",
         description: `You have new "n" assigned students to give course`,
         location: "students/new",
         role: "Counsellor",
      },
      {
         id: "5",
         image: (
            <span className="material-symbols-outlined text-green-800 text-9xl text-center flex h-full justify-center align-middle">
               partner_exchange
            </span>
         ),
         title: "Review Clients",
         description: `You have "m" client reviews`,
         location: "students/review",
         role: "Counsellor",
      },
   ];

   return (
      <div className="container lg:px-24 px-4 py-24 h-dvh">
         <>
            <GetNewStudentsCount
               setNewlyPaid={setNewlyPaid}
               setIsLoading={setIsLoading}
            />
            <GetExisitngStudentsCount
               setExistingStudent={setExistingStudent}
               setIsLoading={setIsLoading}
            />
            <div className="title">
               <p className="text-4xl lg:text-5xl  text-[#0f6990]">
                  Welcome back {roleProfile}
               </p>
            </div>
            {isLoading ? (
               <div className="h-dvh flex justify-center align-middle">
                  <div className="loader"></div>
               </div>
            ) : (
               <div className="cardLayout flex flex-wrap justify-evenly align-middle gap-2">
                  {/* students list */}
                  {cards.map(
                     (card) =>
                        card.role === roleProfile && (
                           <Card key={card.id} card={card} />
                        )
                  )}
               </div>
            )}
         </>
      </div>
   );

   // return (
   //   <div className="container lg:px-24 px-4 py-24 h-dvh">
   //     {currentUser ? (
   //       <>
   //         <GetNewStudentsCount
   //           setNewlyPaid={setNewlyPaid}
   //           setIsLoading={setIsLoading}
   //         />
   //         <GetExisitngStudentsCount
   //           setExistingStudent={setExistingStudent}
   //           setIsLoading={setIsLoading}
   //         />
   //         <div className="title">
   //           <p className="text-4xl lg:text-5xl  text-[#0f6990]">
   //             Welcome back Counsellor
   //           </p>
   //         </div>
   //         {isLoading ? (
   //           <div className="h-dvh flex justify-center align-middle">
   //             <div className="loader"></div>
   //           </div>
   //         ) : (
   //           <div className="cardLayout flex flex-wrap justify-evenly align-middle gap-8">
   //             {/* students list */}
   //             {cards.map((card) => (
   //               <Card key={card.id} card={card} />
   //             ))}
   //           </div>
   //         )}
   //       </>
   //     ) : (
   //       <div className="h-full flex justify-center items-center">
   //         <div className="card flex flex-col justify-center items-center bg-[#0f6990] w-full h-3/4 lg:w-2/6 rounded-2xl shadow-2xl p-8 lg:p-12 mt-12 cursor-pointer">
   //           <div className="cardHeading">
   //             <div className="h-30">
   //               <span className="material-symbols-outlined text-white text-9xl text-center flex h-full justify-center align-middle">
   //                 tv_signin
   //               </span>
   //             </div>
   //           </div>
   //           <div className="cardBody">
   //             <div className="cardContent">
   //               <div className="cardTitle py-2">
   //                 <h2 className="text-3xl text-white text-center">
   //                   Login to continue
   //                 </h2>
   //               </div>
   //             </div>
   //             <div className="cardAction flex justify-center">
   //               <button
   //                 className="text-[#0f6990] mt-2 px-5 py-2 shadow-lg rounded-xl bg-white hover:translate-x hover:scale-105 transition ease-in-out duration-300"
   //                 onClick={() => (location.href = redirectLoginLink)}
   //               >
   //                 Go to Login page
   //               </button>
   //             </div>
   //           </div>
   //         </div>
   //       </div>
   //     )}
   //   </div>
   // );
}

export default Dashboard;

const GetNewStudentsCount = ({ setNewlyPaid, setIsLoading }) => {
   const { data, isLoading } = useFrappeGetDocCount("Student", [
      ["registration_fee", "=", "1"],
      ["course_added", "=", "0"],
   ]);

   useEffect(() => {
      setIsLoading(isLoading);
      if (!isLoading) {
         setNewlyPaid(data);
      }
   }, [data, isLoading, setNewlyPaid, setIsLoading]); // Dependencies to track

   return null; // No UI needed
};

const GetExisitngStudentsCount = ({ setExistingStudent, setIsLoading }) => {
   const { data, isLoading } = useFrappeGetDocCount("Student", [
      ["registration_fee", "=", "1"],
      ["course_added", "=", "1"],
   ]);

   useEffect(() => {
      setIsLoading(isLoading);
      if (!isLoading) {
         setExistingStudent(data);
      }
   }, [data, isLoading, setExistingStudent, setIsLoading]); // Dependencies to track

   return null;
};
