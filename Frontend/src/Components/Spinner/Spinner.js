import React from "react";

const Spinner = () => {
  return (
    <div className="text-center  justify-center mx-auto items-center align-middle">
      <img
        className="text-center py-20 justify-center mx-auto items-center align-middle"
        src={require(`./../../assets/Loder.gif`)}
        alt=""
      />
    </div>
  );
};

export default Spinner;
