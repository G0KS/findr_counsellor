import { useFrappeGetDoc } from "frappe-react-sdk";
import React from "react";

function GetStudentData({ id }) {
   const { data, isLoading, mutate } = useFrappeGetDoc("Student", id);

   return <div>GetStudentData</div>;
}

export default GetStudentData;
