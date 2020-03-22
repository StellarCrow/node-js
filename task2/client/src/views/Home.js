import React from "react";
import Registration from "../components/Registration";
import Login from "../components/Login";
import './Home.css';

function Home() {
  return (
    <main className="home">
      <h1>Homepage</h1>
      <div className="home__forms">
      <Registration className="home__form"></Registration>
      <Login className="home__form"></Login>
      </div>
      
    </main>
  );
}

export default Home;
