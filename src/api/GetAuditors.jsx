import { useFrappeGetDocList } from "frappe-react-sdk";
import React from "react";

function GetAuditors() {
   const { data } = useFrappeGetDocList("User", {
      fields: ["name", "full_name"],
      filters: [["role_profile_name", "=", "Counsellor"]],
   });
   return <div>GetAuditors</div>;
}

export default GetAuditors;
