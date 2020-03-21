import React from "react";
import Registration from "../components/Registration";
import Login from "../components/Login";

function Home() {
  return (
    <section className="home">
      <h1>Homepage</h1>
      <Registration></Registration>
      <Login></Login>
    </section>
  );
}

export default Home;
