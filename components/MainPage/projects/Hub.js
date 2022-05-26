import { useRouter } from "next/router";
import React from "react";
import { FaArrowRight, FaPlus } from "react-icons/fa";
import ProjectModal from "./ProjectModal";

function Hub() {
  const [projects, setProjects] = React.useState([]);
  const [modalOpen, setModalOpen] = React.useState(false);

  React.useEffect(() => {
    // fetch("http://localhost:3000/projects")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setProjects(data);
    //   })
    //   .catch((err) => console.log(err));
  }, []);

  let project = {
    title: "",
    description: "",
    imgSrc:
      "https://images.unsplash.com/photo-1453872302360-eed3c5f8ff66?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170",
    route: "",
    color: "",
    bColor: "",
    textColor: "",
  };

  return (
    <div className="implementation-page fade-effect-quick">
      <h1 className="text-3xl text-t-bd dark:text-blues-100">Project Hub</h1>
      {modalOpen && (
        <ProjectModal
          setModalOpen={setModalOpen}
          className=" !py-2"
          projects={projects}
          setProjects={setProjects}
        />
      )}
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-wrap items-center w-[90%]  px-5 pb-5 rounded-2xl">
          <div className="flex w-full"></div>


          <div className="relative flex flex-wrap items-center justify-center w-full gap-3 px-5 pt-5 pb-5 border-8 border-t-bl rounded-2xl bg-clear-bl2">
            <div className="absolute right-0 -top-1">
              <div className="relative mt-2 group">
                <div className="absolute transition duration-1000 rounded-full opacity-25 -inset-1 bg-gradient-to-r from-t-pl via-t-bl to-t-bpop blur-sm group-hover:opacity-100 group-hover:duration-200 animate-gradient-xy"></div>
                {/* <div className="relative flex justify-start rounded-lg ring-1 items-top"> */}

                <button
                  onClick={() => {
                    setModalOpen(!modalOpen);
                    // setSelectedKr(null);
                  }}
                  className=" px-2 h-[2em] m-2 rounded-3xl bg-t-bl flex items-center justify-center text-slate-100 gap-4 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer md:hover:shadow-xl shadow-clear-bd3 step-2"
                >
                  <FaPlus className="text-[20px]" />
                </button>
              </div>
            </div>
            {projects.length === 0 && !modalOpen && <p>No Projects yet</p>}

            {projects.map((prjct, i) => {
              return (
                <ProjectCard
                  key={i}
                  color={prjct.color}
                  bColor={prjct.bColor}
                  imgSrc={prjct.imgSrc}
                  title={prjct.title}
                  description={prjct.description}
                  textColor={prjct.textColor}
                  route={prjct.route}
                />
              );
            })}
            <ProjectCard
              route="/projects/test-project"
              color={"bg-t-bl"}
              bColor="md:hover:ring-t-bl"
              textColor=" text-t-bd"
              title="Bookmark Donut"
              description="A chrome extension for bookmarks."
              imgSrc="https://images.unsplash.com/photo-1585653621032-a5fec164ee92?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            />
            {/* <ProjectCard
              route="/next-steps/mrr-calculator"
              color={"bg-t-bl"}
              bColor="md:hover:ring-t-bl"
              textColor=" text-t-bd"
              title="Bookmark Donut"
              description="A chrome extension for bookmarks."
              imgSrc="https://images.unsplash.com/photo-1585653621032-a5fec164ee92?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hub;

const ProjectCard = ({
  color,
  bColor,
  imgSrc,
  title,
  description,
  textColor,
  route,
}) => {
  const router = useRouter();

  return (
    <div
      className={
        "flex flex-col items-center justify-center w-[15em] h-[20em] p-1 bg-white/80 dark:bg-slate-800 rounded-xl md:hover:scale-105 transition duration-500 md:hover:ring-8  ring-clear-bd3 mx-2 " +
        bColor
      }
    >
      <div className="w-full h-[10em] bg-white/40  ">
        <img
          src={imgSrc}
          alt="logo"
          className="object-cover  h-[10em] w-full rounded-lg"
        />
      </div>

      <div className="flex flex-col justify-between items-center h-[15em] px-5 py-2">
        <h3 className={"m-0 text-2xl dark:text-blue-100" + textColor}>
          {title}
        </h3>

        <p className="text-sm text-left">{description}</p>
        <button
          onClick={() => {
            router.push(route);
          }}
          className={
            " flex gap-1 items-center rounded-full justify-center p-1 border-2  md:hover:scale-105 md:active:scale-95 whitespace-nowrap transition cursor-pointer h-[3em] w-[90%] " +
            color +
            " " +
            bColor
          }
        >
          <p className="m-0">Launch</p> <FaArrowRight className={textColor} />
        </button>
      </div>
    </div>
  );
};
