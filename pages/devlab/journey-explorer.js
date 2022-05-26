import React from "react";
import Journey from "../../components/Devlab/Journey";

function JourneyExplorer() {
  return (
    <div className="implementation-page fade-effect-quick">
      <h1 className="text-3xl text-t-bd dark:text-blues-100">
        Guided Ideation Journeys
      </h1>
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-wrap items-center w-[90%]  px-5 pb-5 rounded-2xl">
          <div className="flex w-full"></div>

          <div className="relative flex flex-wrap items-center justify-center w-full gap-3 px-5 pt-5 pb-5 border-8 border-t-bl rounded-2xl bg-clear-bl1">
            <Journey
              img={
                "https://images.unsplash.com/photo-1600859343572-566b5ee12973?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzR8fGFwcHN8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=500"
              }
              link={"/devlab/network-effects"}
              title={"Leverage Network Effects"}
              description="Utilize the users of large platforms and ideate complementary products and services."
              bColor=" ring-clear-bl4"
              color=" bg-clear-bl4"
              textColor=" text-t-bd dark:text-blue-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default JourneyExplorer;
