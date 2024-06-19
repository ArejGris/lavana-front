"use client";
import { useEffect } from "react";

const Shipment = () => {
  async function fetchData() {
    const res = await fetch("http://localhost:4000/item");
    const data = await res.json();
    console.log(data, "data");
  }
  async function sendData() {
    const res = await fetch(
      "http://localhost:4000/item/c67a",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "23ba3fccc642a478c192e823f7c3d413:a51a45a8abf84994a19a1dfb0f044c4e",
          'Password': "C175120",
        },
        body: JSON.stringify({id:1}),
        mode: "cors",
      }
    );
    const data = await res.json();
    console.log(data, "data");
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <h1>Shipment</h1>
      <button onClick={sendData}>add shipment</button>
    </>
  );
};

export default Shipment;
