"use client";
export default function Stripe() {
  function handleCheckout() {
    fetch("http://localhost:3002/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [
          { id: 1, quantity: 3 },
          { id: 2, quantity: 1 },
        ],
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then(({ url }) => {
        console.log(url)
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <h1>hello</h1>
      <button onClick={handleCheckout}>checkout</button>
    </>
  );
}
