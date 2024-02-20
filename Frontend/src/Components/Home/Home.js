import React from "react";
import { useEffect } from "react";

function Home() {
  useEffect(() => {
    document.title = "Home | Foodly";
  }, []);

  return <div>Home Page</div>;
}

export default Home;
