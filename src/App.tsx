import Activities from './Activities'
import Search from './Search'
import { AppProvider } from './AppContext'

const App: React.FC = () => {
  const [, membershipType, membershipId] = window.location.pathname.split(
    '/',
    3,
  )

  if (membershipId === undefined || membershipType === undefined) {
    return <Search />
  }

  return (
    <AppProvider>
      <Activities membershipType={membershipType} membershipId={membershipId} />
    </AppProvider>
  )
}

export default App
