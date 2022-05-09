import React, { useContext, useState } from 'react'
// import { steps } from './steps';
import {  ShepherdTourContext, ShepherdTour } from 'react-shepherd'
import { useRouter } from 'next/router';
function ShephardLogic({children}) {
    const [shepherdTour, setShepherdTour] = useState(null);


    const tour = useContext(ShepherdTourContext);
    console.log(tour)

    const tourOptions = {
        defaultStepOptions: {
          cancelIcon: {
            enabled: true
          }
        },
        useModalOverlay: true
      };


const router = useRouter();
const steps = [
    {
      id: 'intro',
      attachTo: { element: '.step-1', on: 'bottom' },
      beforeShowPromise: function () {
        router.push("/")

        return new Promise(function (resolve) {
          setTimeout(function () {
            window.scrollTo(0, 0);
            resolve();
          }, 500);
        });
      },
      buttons: [
        {
          classes: 'shepherd-button-secondary',
          text: 'Exit',
          type: 'cancel'
        },
        {
          classes: 'shepherd-button-primary',
          text: 'Back',
          type: 'back'
        },
        {
          classes: 'shepherd-button-primary',
          text: 'Next',
          type: 'next'
        }
      ],
      classes: 'custom-class-name-1 custom-class-name-2',
      highlightClass: 'highlight',
      scrollTo: false,
      cancelIcon: {
        enabled: true,
      },
      title: 'Welcome to React-Shepherd!',
      text: ['React-Shepherd is a JavaScript library for guiding users through your React app.'],
      when: {
        show: () => {
          console.log('show step');
        },
        hide: () => {
          console.log('hide step');
        }
      }
    },
    {
      id: 'new-idea',
      attachTo: { element: '.step-2', on: 'bottom' },
      beforeShowPromise: function () {
        router.push("/notes")
        return new Promise(function (resolve) {
          setTimeout(function () {
            window.scrollTo(0, 0);
            resolve();
          }, 500);
        });
      },
      buttons: [
        {
          classes: 'shepherd-button-secondary',
          text: 'Exit',
          type: 'cancel'
        },
        {
          classes: 'shepherd-button-primary',
          text: 'Back',
          type: 'back'
        },
        {
          classes: 'shepherd-button-primary',
          text: 'Next',
          type: 'next'
        }
      ],
      classes: 'custom-class-name-1 custom-class-name-2 bg-white/70',
      highlightClass: 'highlight',
      scrollTo: false,
      cancelIcon: {
        enabled: true,
      },
      title: 'New Idea',
      text: ['Create a new idea.'],
      when: {
        show: () => {
          console.log('show step');
        },
        hide: () => {
          console.log('hide step');
        }
      }
    },
    {
        id: 'finder',
        attachTo: { element: '.step-2', on: 'bottom' },
        beforeShowPromise: function () {
            router.push("/solutions/finder")

            // router.events.on('routeChangeStart', handleRouteChange)

          return new Promise(function (resolve) {
            setTimeout(function () {
              window.scrollTo(0, 0);
              resolve();
            }, 500);
          });
        },
        buttons: [
          {
            classes: 'shepherd-button-secondary',
            text: 'Exit',
            type: 'cancel'
          },
          {
            classes: 'shepherd-button-primary',
            text: 'Back',
            type: 'back'
          },
          {
            classes: 'shepherd-button-primary',
            text: 'Next',
            type: 'next'
          }
        ],
        classes: 'custom-class-name-1 custom-class-name-2 bg-white/70',
        highlightClass: 'highlight',
        scrollTo: false,
        cancelIcon: {
          enabled: true,
        },
        title: 'New Idea',
        text: ['Create a new idea.'],
        when: {
          show: () => {
            console.log('show step');
          },
          hide: () => {
            console.log('hide step');
          }
        }
      },
  ];


  
  return (
    <ShepherdTour steps={steps} tourOptions={tourOptions}>
    <Button  />

{children}

</ShepherdTour>

  )
}

export default ShephardLogic



function Button() {
    const tour = useContext(ShepherdTourContext);
  
    return (
      <button className="hidden p-3 bg-t-bl rounded-xl step-1" onClick={tour.start}>
        Start Tour
      </button>
    );
  }