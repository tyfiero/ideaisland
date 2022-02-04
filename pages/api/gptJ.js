// OLD GPTJ 


// useEffect(() => {
//     if (GPTJStatus) {
//       const jFunc = () => {
//         console.log("redux input" + gptJInputRedux);
//         var data = JSON.stringify({
//           prompt: `${gptJInputRedux}:`,
//         });

//         //MUST BE UPDATED. THIS WILL NOT WORK IN PRODUCTION!!!!!
//         var config = {
//           method: "post",
//           // url: "https://cors-anywhere.herokuapp.com/https://api.textsynth.com/v1/engines/gptj_6B/completions",
//           // "Access-Control-Allow-Origin" : *,
//           url: "https://api.textsynth.com/v1/engines/gptj_6B/completions",
//           // url: "/api/cors?url=https://api.textsynth.com/v1/engines/gptj_6B/completions",

//           headers: {
//             Authorization: process.env.NEXT_PUBLIC__GPTJ_API_KEY,

//             "Content-Type": "application/json",
//           },
//           data: data,
//         };

//         axios(config)
//           .then(function (response) {
//             console.log(JSON.stringify(response.data));
//             let gptjResponse = response.data.text;
//             // console.log(gptjResponse);
//             dispatch(gptJOutputAction(gptjResponse));
//           })
//           .catch(function (error) {
//             console.log(error);
//           });
//       };
//       jFunc();
//       setGPTJStatus(false);
//     }
//   }, [GPTJStatus]);
