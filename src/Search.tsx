import { searchUser } from './bungieData'

const Search: React.FC = () => {
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
      ></input>
      <button onClick={() => searchUser('donut#8611')}>Search</button>
    </div>
  )
}

export default Search
