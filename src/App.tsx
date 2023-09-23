import Router from "./Router"
import { Header } from "./components"

function App() {
  return (
    <>
      <Header />
      <main className="app-container">
        <Router />
      </main>
    </>
  )
}

export default App
