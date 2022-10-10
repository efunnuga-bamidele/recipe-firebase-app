import { useParams } from 'react-router-dom'
import { projectFirestore } from '../../firebase/config'
import { useEffect, useState } from 'react'

// Style
import './Recipe.css'

//Hooks
import { useTheme } from '../../hooks/useTheme'

export default function Recipe() {
    const {id} = useParams()
    const {mode} = useTheme()
    const [recipe, setRecipe] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(false)
    // const url = 'http://localhost:3000/recipes/' + id
    // const {error, isPending, data: recipe} = useFetch(url)

    useEffect(() => {
        setIsPending(true)
        //use doc method with the recipe id as argument to fetch the data object from firestore
        projectFirestore.collection('recipes').doc(id).get().then((doc) => {
            if(doc.exists){
                setIsPending(false)
                setRecipe(doc.data())
            }else{
                setIsPending(false)
                setError("Could not find that recipe")
                
            }
        })
    }, [id])

    return(
        <div className={`recipe ${mode}`}>
            {error && <p className='error'>{error}</p>}
            {isPending && <p className='loading'>Loading...</p>}
            {recipe && (
                <>
                    <h2 className='page-title'>{recipe.title}</h2>
                    <p>Takes {recipe.cookingTime} to cook.</p>
                    <ul>
                        {recipe.ingredients.map(ing => <li key={ing}>{ing}</li>)}
                    </ul>
                    <p className='method'>{recipe.method}</p>
                </>
            )}
        </div>
    )
}