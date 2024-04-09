// project details page

import { useParams } from 'react-router-dom'
import { useDocumant } from '../../hooks/useDocument'
import ProjectSummary from './ProjectSummary'
import ProjectComments from './ProjectComments'

//styles
import './Project.css'






export default function Project() {
  const { id } = useParams()
  const { error, document } = useDocumant('projects', id)

  // return error if there is one
  if(error) {
    return <div className='error'>{error}</div>
  }
  //if there is no document yet
  if(!document) {
    return <div className='loading'>Loading...</div>
  }
  // if there is a document and no error
  return (
    <div className='project-details'>
        <ProjectSummary project={document}/>
        <ProjectComments project ={document}/>
    </div>
  )
}
