import React from "react";
import Card from "@material-ui/core/Card";

function Test({ getCardData }) {
  return (
    <div>
      {getCardData.map((data) => (
        <img src={data.imageurl} width="150" />
      ))}
    </div>
  );
}

{
}
export default Test;
