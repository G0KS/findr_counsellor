// get studentList number

import Card from "../components/Card";
import cardImg1 from "../assets/cardImg1.png";
import cardImg2 from "../assets/cardImg2.png";
import { useFrappeGetDocCount } from "frappe-react-sdk";

function Dashboard() {
   const { data, isLoading } = useFrappeGetDocCount("Student");
   const cards = [
      {
         id: "1",
         image: cardImg1,
         title: "Students List",
         description: `We have ${data} new students`,
         place: "students/new",
      },
      {
         id: "2",
         image: cardImg2,
         title: "Attended Students",
         description: `You have attended ${data} new students`,
         place: "students",
      },
   ];

   return (
      <div className="container lg:px-24 px-4 py-24 h-dvh">
         <div className="title">
            <p className="text-4xl lg:text-5xl  text-[#0f6990]">
               Welcome back Counsellor
            </p>
         </div>
         {isLoading ? (
            <div className="h-dvh flex justify-center align-middle">
               <div className="loader"></div>
            </div>
         ) : (
            <div className="cardLayout flex flex-wrap justify-evenly align-middle gap-8">
               {/* students list */}
               {cards.map((card) => (
                  <Card key={card.id} card={card} />
               ))}
            </div>
         )}
      </div>
   );
}

export default Dashboard;
