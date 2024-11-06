import { lazy, useState } from 'react'
import './App.css'

const Button = lazy(() => import("mars/Button"))
const { countAtom } = import("mars/store").then(obj => obj.countAtom);

function App() {
  const [count, setCount] = useState(0);

  return (
      <div>
        <h1>Beloved Earth</h1>
        <Button />
        <button onClick={() => setCount((count: number) => count + 1)}>
          Population is {count} - {countAtom}
        </button>
      </div>
   
  )
}

export default App
