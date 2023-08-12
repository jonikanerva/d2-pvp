import './Search.css'
import { useState } from 'react'
import { searchUser } from './bungieData'

type Event = React.ChangeEvent<HTMLInputElement>

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [error, setError] = useState<string>()

  const clickHandler = () => {
    setError('')

    if (searchTerm.includes('#') === false) {
      setError('Incorrect format! Enter username in format username#id')

      return
    }

    return searchUser(searchTerm).then((data) => {
      if (data.length === 0) {
        setError(`User ${searchTerm} not found!`)
      } else {
        const membershipId = data[0].membershipId
        const membershipType = data[0].membershipType
        const pathname = `/${membershipType}/${membershipId}`

        window.location.pathname = pathname
      }
    })
  }

  return (
    <div>
      <h1>Enter Bungie Name</h1>

      <input
        id="bungieNameSearch"
        type="text"
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        placeholder="donut#8611"
        onChange={(event: Event) => setSearchTerm(event.target.value)}
      ></input>

      <button id="searchButton" onClick={() => clickHandler()}>
        Search
      </button>

      <div className="searchError">{error}&nbsp;</div>
    </div>
  )
}

export default Search
