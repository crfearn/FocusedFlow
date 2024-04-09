import { useEffect, useState } from 'react'
import Select from 'react-select'
import { useCollection } from '../../hooks/useCollection'
import { timestamp} from '../../firebase/config'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import { useHistory } from 'react-router-dom'
//styles

import './Create.css'



export default function Create() {
  const history = useHistory()
  const { addDocument, response } = useFirestore('projects')
  const { documents } = useCollection('users')
  const [ users, setUsers] = useState([])
  const { user } = useAuthContext()

  //form fields
  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [dueDate, setDuedate] = useState('')
  const [category, setCategory] = useState('') //homework, website, database, 
  const [assignedUsers, setAssignedUsers] = useState([])
  const [formError, setFormError] = useState(null)

  // array of category objects
  const categories = [
    {value: 'development', label: 'Development'},
    {value: 'website', label: 'Website'},
    {value: 'design', label: 'Design'},
    {value: 'ui', label: 'UI'},
    {value: 'database', label: 'Database'},
    {value: 'homework', label: 'Homework'},
  ]

  useEffect(() => {
    if(documents) {
      const options = documents.map(user => {
        return { value: user, label: user.displayName}
      })
      setUsers(options)
    }
  }, [documents])
  // check to see if fields were filled
  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError(null)

    if(!category) {
      setFormError('Please select a category')
      return
    }
    if(assignedUsers.length < 1) {
      setFormError('Please assign the project to at least 1 user')
      return
    }
    // the user that created the project
    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid
    }
    // getting assigned users to a project
    const assignedUsersList = assignedUsers.map((u) => {
      return {
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id
      }
    })
    // project details
    const project = {
      name,
      details,
      category: category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: [],
      createdBy,
      assignedUsersList
    }
    // create firestore document
    await addDocument(project)
    if(!response.error) {
      history.push('/')
    }
  }

  return (
    <div className='create-form'>
        <h2 className='page-title'>Create a new project</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Project Name:</span>
            <input 
            required
            type='text'
            onChange = {(e) => setName(e.target.value)}
            value = {name}
             />
          </label>
          <label>
            <span>Project details:</span>
            <textarea 
            required
            type='text'
            onChange = {(e) => setDetails(e.target.value)}
            value = {details}
             ></textarea>
          </label>
          <label>
            <span>Project Due Date:</span>
            <input 
            required
            type='date'
            onChange = {(e) => setDuedate(e.target.value)}
            value = {dueDate}
             />
          </label>
          {/* category selection */}
          <label>
            <span>Pick a project category:</span>
            <Select 
              onChange={(option) => setCategory(option)}
              options={categories}
             />
          </label>
          <label>
            <span>Assign this project to:</span>
            <Select 
              onChange={(option) => setAssignedUsers(option)}
              options={users}
              isMulti
             />
          </label>
          <button className='btn'>Add Project</button>
          {formError && <p className='error'>{formError}</p>}
        </form>
    </div>
  )
}
