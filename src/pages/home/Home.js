//Style
import './Home.css'
//firestore import
import { projectFirestore } from '../../firebase/config'
import { useEffect, useState } from 'react'

//useFetch hook for Json Server
// import { useFetch } from '../../hooks/useFetch'

//Components
import RecipeList from '../../components/RecipeList'


export default function Home() {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        setIsPending(true)
        //get the database collection name and input into the connection method (async)
        //get the resupt as a snapshot which is an array of objects

        //Changed to a realtime data collection to monitor data using onSnashot method
        // projectFirestore.collection('recipes').get().then((snapshot) => {
       const unSub = projectFirestore.collection('recipes').onSnapshot((snapshot) => {
            // check if snapshot is empty and set the error message
            if(snapshot.empty){
                setError('no recipes to load')
                setIsPending(false)
            }else{
                //create an empty array, loop through the snapshot.docs object using the forEach method
                //and push the objects into the empty array using the spread operator.
                let results = []
                snapshot.docs.forEach(doc => {
                    results.push({ id: doc.id, ...doc.data() })
                })
                //after the forEach loop is completed set the new array to the data state.
                setData(results)
                setIsPending(false)
            }
          
        }, (err) => {
            setError(err.message)
            setIsPending(false)
        })

        return () => unSub()
    },[])

    //getting exported data from useFetch Hooks
    // const {data, isPending, error} = useFetch('http://localhost:3000/recipes')
    return (
        <div className='home'>
            {error && <p className='error'>{error}</p>}
            {isPending && <p className='loading'>Loading...</p>}
            {data && <RecipeList recipes = {data}/>}
        </div>
    )
}