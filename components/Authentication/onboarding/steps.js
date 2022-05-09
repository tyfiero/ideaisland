// import { useRouter } from "next/router";

// const router = useRouter();
// export const steps = [
//     {
//       id: 'intro',
//       attachTo: { element: '.step-1', on: 'bottom' },
//       beforeShowPromise: function () {
//         return new Promise(function (resolve) {
//           setTimeout(function () {
//             window.scrollTo(0, 0);
//             resolve();
//           }, 500);
//         });
//       },
//       buttons: [
//         {
//           classes: 'shepherd-button-secondary',
//           text: 'Exit',
//           type: 'cancel'
//         },
//         {
//           classes: 'shepherd-button-primary',
//           text: 'Back',
//           type: 'back'
//         },
//         {
//           classes: 'shepherd-button-primary',
//           text: 'Next',
//           type: 'next'
//         }
//       ],
//       classes: 'custom-class-name-1 custom-class-name-2',
//       highlightClass: 'highlight',
//       scrollTo: false,
//       cancelIcon: {
//         enabled: true,
//       },
//       title: 'Welcome to React-Shepherd!',
//       text: ['React-Shepherd is a JavaScript library for guiding users through your React app.'],
//       when: {
//         show: () => {
//           console.log('show step');
//         },
//         hide: () => {
//           console.log('hide step');
//         }
//       }
//     },
//     {
//       id: 'intro',
//       attachTo: { element: '.step-2', on: 'bottom' },
//       beforeShowPromise: function () {
//         return new Promise(function (resolve) {
//           router.push("/notes")
//           setTimeout(function () {
//             window.scrollTo(0, 0);
//             resolve();
//           }, 500);
//         });
//       },
//       buttons: [
//         {
//           classes: 'shepherd-button-secondary',
//           text: 'Exit',
//           type: 'cancel'
//         },
//         {
//           classes: 'shepherd-button-primary',
//           text: 'Back',
//           type: 'back'
//         },
//         {
//           classes: 'shepherd-button-primary',
//           text: 'Next',
//           type: 'next'
//         }
//       ],
//       classes: 'custom-class-name-1 custom-class-name-2',
//       highlightClass: 'highlight',
//       scrollTo: false,
//       cancelIcon: {
//         enabled: true,
//       },
//       title: 'Step 2',
//       text: ['React-Shepherd is a JavaScript library for guiding users through your React app.'],
//       when: {
//         show: () => {
//           console.log('show step');
//         },
//         hide: () => {
//           console.log('hide step');
//         }
//       }
//     },
//   ];