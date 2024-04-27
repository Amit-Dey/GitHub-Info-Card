import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import './App.css'


function App() {
  // Gighub API
  const API = 'https://api.github.com/users/{username}'

  // State
  const [username, setUsername] = useState('')
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(false)

  // Event Handlers
  // Wrap the definition of 'handleSearch' in useCallback() Hook
  const handleSearch = useCallback(() => {
    // If the username is empty, return
    if (!username) return

    // Fetch data from the API
    axios.get(API.replace('{username}', username))
      .then(response => {
        setUserData(response.data)
      })
      .catch(error => {
        console.error(error)
        setLoading(false)
      })
  }, [username])

  // Effects
  useEffect(() => {
    if (username && username.length > 2) {
      setLoading(true)
      handleSearch()
      setLoading(false)
    }
  }, [handleSearch, username])

  return (
    <div className='container'>
      <h1 className='title'>Github User Search</h1>
      <input className='input' placeholder='Enter The Username' name='search' type="text" value={username} onChange={e => setUsername(e.target.value)} />
      {loading && <p>Loading...</p>}
      {userData && username && (
        <div className='card'>
          <img src={userData.avatar_url} alt={userData.login} />
          <div className='cardInfo'>
            <h2>{userData.login}</h2>
            <p>{userData.bio}</p>
            <p>{userData.location}</p>
            <a href={userData && userData.html_url} target="_blank" rel="noreferrer">View Profile</a>
          </div>

        </div>
      )}
    </div>
  )
}

export default App
