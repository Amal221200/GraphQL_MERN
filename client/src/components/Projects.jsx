import { useQuery } from "@apollo/client"
import { GET_PROJECTS } from "../query/projectQueries"
import ProjectCard from "./ProjectCard"
import Spinner from './Spinner'

const Projects = () => {
    const { loading, error, data } = useQuery(GET_PROJECTS)

    if(loading) return <Spinner />
    if(error) return <h1>Something went wrong</h1>
    return (
        <>
           {data.projects.length > 0? (
               <div className="row mt-4">
                   {data.projects.map(project => (
                       <ProjectCard key={project.id} project={project} />
                   ))}
               </div>
           ): <p>No Projects</p>}
        </>
    )
}

export default Projects