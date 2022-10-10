import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages Component
import Navbar from './components/Navbar';
import Home from './pages/home/Home';
import Recipe from './pages/recipe/Recipe';
import Create from './pages/create/Create';
import Search from './pages/search/Search';

//Styles
import './App.css';
import ThemeSelector from './components/ThemeSelector';
import { useTheme } from './hooks/useTheme';

function App() {
const { mode } = useTheme()

  return (
    <div className={`App ${mode}`}>
      <BrowserRouter>
        <Navbar />
        <ThemeSelector />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/create' element={<Create />}></Route>
          <Route path='/search' element={<Search />}></Route>
          <Route path='/recipes/:id' element={<Recipe />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
