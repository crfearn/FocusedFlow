import Avatar from "../../components/Avatar"

export default function ProjectSummary({ project }) {
  return (
    <div>
        <div className="project-summary">
            <h2 className="page-title">{project.name}</h2>
            <p className="due_date">
                Project Due By: {project.dueDate.toDate().toDateString()}
            </p>
            <p className="details">
                {project.details}
            </p>
            <h4>Project Assigned To:</h4>
            <div className="assigned-users">
               {project.assignedUsersList.map(user =>(
                <div key={user.id}>
                    <Avatar src={user.photoURL} />
                </div>
            ))} 
            </div>
            
        </div>
    </div>
  )
}
