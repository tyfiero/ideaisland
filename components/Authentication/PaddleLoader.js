// import Script from "next/script";

// import React from "react";

// function PaddleLoader() {
//   return (
//     <Script
//       src="https://cdn.paddle.com/paddle/paddle.js"
//       // strategy="beforeInteractive"
//       onLoad={(e) => {
//         // eslint-disable-next-line
//         Paddle.Setup({
//           vendor: Number(process.env.NEXT_PUBLIC_PADDLE_VENDOR_ID),
//           eventCallback: function (data) {
//             console.log(data)
//             // The data.event will specify the event type
//             if (data.event === "Checkout.Complete") {
//               console.log(data.eventData.product.id); // Data specifics on the event
//             } else if (data.event === "Checkout.Close") {
//               console.log(data.eventData); // Data specifics on the event
//             }
//           },
//         });
//         console.log("Loaded paddle");
//       }}
//     />
//   );
// }

// export default PaddleLoader;
