import { Route, Routes } from 'react-router-dom'
import Surface from './sections/Surface'
import Sunlit from './sections/Sunlit'
import Twilight from './sections/Twilight'
import Midnight from './sections/Midnight'
import Abyss from './sections/Abyss'
import SectionNav from './components/SectionNav'
import Lists from './pages/Lists'
import './App.css'

function Home() {
  return (
    <>
      <main className="ocean">
        <Surface />
        <Sunlit />
        <Twilight />
        <Midnight />
        <Abyss />
      </main>
      <SectionNav />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/lists/:slug?" element={<Lists />} />
    </Routes>
  )
}
