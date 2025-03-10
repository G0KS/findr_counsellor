import { useFrappeGetDocList } from "frappe-react-sdk";
import React, { useEffect } from "react";

function GetReviewData({ filters, setReviewData }) {
   const { data } = useFrappeGetDocList("ToDo", {
      fields: ["name", "reference_name"],
      filters,
   });

   useEffect(() => {
      if (data) setReviewData(data);
   }, [data]);

   return null;
}

export default GetReviewData;
