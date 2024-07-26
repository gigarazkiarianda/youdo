import React, { useEffect, useState } from "react";
import { getProjects } from '../../services/projectService';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            const projectList = await getProjects();
            setProjects(projectList);
        };

        fetchProjects();
    },[]);

    return(
        <div className="project-list">
            <h1>Projects</h1>
            <ul>
            {projects.map((project) => (
                <li key={projects.id}>
                    <h2>{project.title}</h2>
                    <p>{project.description}</p>
                </li>
            ))}
            </ul>
        </div>
    );
};

export default ProjectList;