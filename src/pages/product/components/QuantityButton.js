import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import React from "react";

const QuantityButton = () => {
  return (
    <div className="amount">
      <button className="minus">
        <RemoveIcon />
      </button>
      <p>{0}</p>
      <button className="plus">
        <AddIcon />
      </button>
    </div>
  );
};

export default QuantityButton;
