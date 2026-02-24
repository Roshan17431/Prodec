import { useState } from 'react'
import Navbar from './components/Navbar.jsx'
import ForumPage from './components/ForumPage.jsx'
import './App.css'

export default function App() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="app">
      <Navbar searchQuery={searchQuery} onSearch={setSearchQuery} />
      <main className="main-content">
        <ForumPage searchQuery={searchQuery} />
      </main>
    </div>
  )
}
