import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import { UPDATE_PROJECT } from "../mutations/projectMutation";
import Project from "../pages/Project";

const EditProjectForm = ({project}) => {

    const [name, setName] = useState(project.name);
    const [description, setDescription] = useState(project.description);
    const [status, setStatus] = useState("");

    const [updateProject] = useMutation(UPDATE_PROJECT, {
        variables: {id: project.id, name, description, status},
        refetchQueries: [{ query: GET_PROJECT, variables: {id: project.id}}]
    })

    const onSubmit = (e) => {
        e.preventDefault();

        if(!name || !description || !status){
            alert('Please fill out all fields')
        }

        updateProject(name, description, status)
    }

  return (
    <div className="mt-5">
      <h3>Update Project Details</h3>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            className="form-control"
            id="name"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="form-control"
            id="description"
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            id="status"
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="new">Not Started</option>
            <option value="progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <button type="submit" className="btn-primary btn">Submit</button>
      </form>
    </div>
  );
};

export default EditProjectForm;
