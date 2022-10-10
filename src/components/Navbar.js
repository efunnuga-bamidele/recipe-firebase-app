import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'

//components
import Searchbar from './Searchbar'
// Style
import './Navbar.css'


export default function Navbar(){
    const { color } = useTheme()

    return(
        <div className='navbar' style={{ background: color }}>
            <nav>
                <Link to="/" className='brand'>
                    <h1>Cooking Recipe App</h1>
                </Link>
                <Searchbar />
                <Link to='/create'>Create Recipe</Link>

            </nav>
        </div>
    )
}