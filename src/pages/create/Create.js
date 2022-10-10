import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { projectFirestore } from '../../firebase/config'

//Styles
import './Create.css'

export default function Create() {
    const [title, setTitle] = useState('')
    const [method, setMethod] = useState('')
    const [cookingTime, setCookingTime] = useState('')
    const [newIngredient, setNewIngredient] = useState('')
    const [ingredients, setIngredients] = useState([])
    const ingredientInput = useRef(null)

    // const {postData, data, error} = useFetch("http://localhost:3000/recipes", "POST")
    const navigate = useNavigate()




    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(title, method, cookingTime, ingredients)
        const doc = {title, ingredients, method, cookingTime: cookingTime + ' minutes'}      

        try{
            //add a new document object data to the firebase colection
            await projectFirestore.collection('recipes').add(doc)
            navigate('/')
        }catch(err){
            console.log(err)
        }
        
    }

    const handleAdd = (e) => {
        e.preventDefault()
        const ing = newIngredient.trim()

        if (ing && !ingredients.includes(ing)){
            setIngredients(prevIngredients => [...prevIngredients, ing])
        }
        setNewIngredient('')
        ingredientInput.current.focus()
    }

    //Redirect User when Data is received
    // useEffect(() => {
    //     if(data){
    //         navigate('/')
    //     }
    // }, [data])

    return(
        <div className='create'>
            <h2 className='page-title'>Add a New Recipe</h2>

            <form onSubmit={handleSubmit}>
               <label>
                <span>Recipe title:</span>
                <input 
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    required
                    />
               </label> 

               <label>
                <span>Recipe Ingredients:</span>
                <div className='ingredients'>
                    <input 
                        type="text" 
                        onChange={(e) => setNewIngredient(e.target.value)}
                        value={newIngredient}
                        ref={ingredientInput}
                        />
                    <button onClick={handleAdd} className="btn" >add</button>
                </div>
               </label>
               <p>Current ingredients: {ingredients.map(i => <em key={i}>{i}, </em>)} </p>
               
               <label>
                <span>Recipe method:</span>
                <textarea
                    onChange={(e) => setMethod(e.target.value)}
                    value={method}
                    required
                />
               </label>
               <label>
                    <span>Cooking time (minutes):</span>
                    <input
                        type="number"
                        onChange={(e) => setCookingTime(e.target.value)}
                        value={cookingTime}
                        required
                    />
                </label>
                <button>Submit</button>
            </form>
        </div>
    )
}
