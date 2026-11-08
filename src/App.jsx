import Surface from './sections/Surface'
import Sunlit from './sections/Sunlit'
import Twilight from './sections/Twilight'
import Midnight from './sections/Midnight'
import Abyss from './sections/Abyss'
import './App.css'

export default function App() {
  return (
    <main className="ocean">
      <Surface />
      <Sunlit />
      <Twilight />
      <Midnight />
      <Abyss />
    </main>
  )
}
