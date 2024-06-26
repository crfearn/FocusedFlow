// to fetch realtime data for a document

import { useEffect, useState } from "react"
import { projectFirestore } from "../firebase/config"


export const useDocumant = (collection, id) => {
    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)

    // realtime data for the document
    useEffect(() => {
        const ref = projectFirestore.collection(collection).doc(id)

        const unsubscribe = ref.onSnapshot((snapshot) => {
            if(snapshot.data()){
               setDocument({...snapshot.data(), id: snapshot.id})
            //incase of error, reset back to null
            setError(null) 
            }
            else{
                setError('That Document Does Not Exist')
            }
        }, (err) =>{
            console.log(err.message)
            setError('Failed to get document')
        })

        return () => unsubscribe()

    },[collection, id])

    return { document, error }
}