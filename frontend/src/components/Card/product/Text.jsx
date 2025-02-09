import React from "react";

const Text = ({ title, description, price }) => {
  return (
    <div className="text">
      <h3>{title}</h3>
      <p>{description}</p>
      <p className="price">{price}</p>
    </div>
  );
};

export default Text;