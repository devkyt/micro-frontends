import Button from './Button'
import './App.css'
import { useCount } from './store';


function App() {
  const [count, setCount] = useCount();

  return (
    <div>
      <h1>Distant Mars</h1>
      <Button />
      <button onClick={() => setCount(count => count + 1)}>
          Population is count {count}
      </button>
    </div>
  )
}

export default App
