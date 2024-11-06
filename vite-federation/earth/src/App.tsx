import { lazy } from 'react'
import './App.css'
import useCount from "mars/store"

const Button = lazy(() => import("mars/Button"))


function App() {
  const [count, setCount] = useCount();

  return (
      <div>
        <h1>Beloved Earth</h1>
        <Button />
        <button onClick={() => setCount((count: number) => count + 1)}>
          Population is {count}
        </button>
      </div>
   
  )
}

export default App
