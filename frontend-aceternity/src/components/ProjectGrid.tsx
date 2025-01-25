import { useEffect, useState } from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { a } from "framer-motion/client";

export default function ProjectGrid() {
  const [projects, setProjects] = useState();
  const getProjects = async () => {
    try {
      const response = await fetch("http://localhost:8081/projects");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };
  const handleClick = (url: string) => {
    window.open(url, "_blank");
  };
  useEffect(() => {
    getProjects();
  }, []);
  return (
    <>
      <h2 className="pt-20 text-xl relative z-20 md:text-2xl lg:text-3xl font-bold text-center text-black dark:text-white font-sans tracking-tight">
        Some of my projects
      </h2>
      <div className="flex flex-wrap justify-around">
        {projects?.map((project) => {
          return (
            <CardContainer key={project?._id} className="inter-var">
              <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                <CardItem
                  translateZ="50"
                  className="text-xl font-bold text-neutral-600 dark:text-white"
                >
                  {project?.title}
                </CardItem>
                <CardItem
                  as="p"
                  translateZ="60"
                  className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                >
                  {project?.description}
                </CardItem>
                <CardItem translateZ="100" className="w-full mt-4">
                  <img
                    src={project?.thumbnail}
                    height="1000"
                    width="1000"
                    className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    alt="thumbnail"
                  />
                </CardItem>
                <div className="flex justify-between items-center mt-20">
                  {project?.readMore && (
                    <CardItem
                      translateZ={20}
                      as={a}
                      href={project?.readMore}
                      target="__blank"
                      className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white cursor-pointer"
                    >
                      Read more →
                    </CardItem>
                  )}
                  {project?.url && (
                    <CardItem
                      translateZ={20}
                      as="button"
                      className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                      onClick={() => {
                        handleClick(project?.url);
                      }}
                    >
                      Demo
                    </CardItem>
                  )}
                </div>
              </CardBody>
            </CardContainer>
          );
        })}
      </div>
    </>
  );
}
