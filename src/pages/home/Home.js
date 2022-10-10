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
    const [errir, setError] = useState(false)

    useEffect(() => {

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