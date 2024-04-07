import React from "react";

function ResDashboard() {
  const host = "http://localhost:5000";

  const token = localStorage.getItem("token");
  
  return (
    <div className="main-page">
      <div>
        <div>
          <div>Hello Res Dashboard</div>
        </div>
      </div>
    </div>
  );
}

export default ResDashboard;
