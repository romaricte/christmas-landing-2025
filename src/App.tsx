import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
  <div>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-950 to-blue-700">
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
    </div>
    <p>
      Edit <code>src/App.tsx</code> and save to test HMR
    </p>
    <div className="logos">
      <a href="https://vite.dev" target="_blank">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>
      <a href="https://react.dev" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
    </div>
  </div>
  )
}

export default App
