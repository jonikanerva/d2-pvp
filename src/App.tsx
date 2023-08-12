import Activities from './Activities'
import Search from './Search'

const App: React.FC = () => {
  const [, membershipType, membershipId] = window.location.pathname.split(
    '/',
    3,
  )

  if (membershipId === undefined || membershipType === undefined) {
    return <Search />
  }

  return (
    <Activities membershipType={membershipType} membershipId={membershipId} />
  )
}

export default App
