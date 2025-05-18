import React from "react";
import SearchParams from "../components/SearchParams";
import Header from "../components/Header";
function Home() {
  return (
    <>
      <Header />
      <h1>Adopt</h1>

      <div>
        <SearchParams />
      </div>
    </>
  );
}

export default Home;
