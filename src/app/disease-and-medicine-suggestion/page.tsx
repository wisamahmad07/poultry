import React from "react";
import { UploadImage } from "./components/UploadImage";
import { MedicineSuggestionTable } from "./components/MedicineSuggestionTable";

const DiseaseAndMedicine = () => {
  return (
    <div className="md:flex justify-evenly m-4 gap-7">
      <UploadImage />
      <MedicineSuggestionTable />
    </div>
  );
};

export default DiseaseAndMedicine;
