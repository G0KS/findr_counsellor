import { useFrappeGetDocList } from "frappe-react-sdk";
import React from "react";

function GetCounsellors() {
   const { data } = useFrappeGetDocList("User", {
    fields: ["name", "full_name"],
    filters: [["role_profile_name", "=", "Counsellor"]],
 });

   return <div>GetCounsellors</div>;
}

export default GetCounsellors;
