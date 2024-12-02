import React from "react";
import AreaProfitForm from "./components/AreaProfitForm";
import AreaProfitOutput from "./components/AreaProfitOutput";
import ShowAllOutput from "./components/ShowAllOutput";

const Page = () => {
  return (
    <div className="flex">
      <AreaProfitForm />
      <AreaProfitOutput />
      <ShowAllOutput />
    </div>
  );
};

export default Page;
