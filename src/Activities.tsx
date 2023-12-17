import './Activities.css'

import { DestinyHistoricalStatsPeriodGroup } from 'bungie-api-ts/destiny2'
import { useEffect, useState } from 'react'

import ActivityList from './ActivityList'
import { fetchActivities, fetchCharacters } from './bungieData'
import { groupBy } from './dateHandling'
import Loading from './Loading'

type GroupedActivities = Record<string, DestinyHistoricalStatsPeriodGroup[]>
interface ActivitiesProps {
  membershipType: string
  membershipId: string
}
const clickHome = () => {
  window.location.pathname = '/'
}
const clickReload = () => {
  window.location.reload()
}

const Activities: React.FC<ActivitiesProps> = ({
  membershipType,
  membershipId,
}: ActivitiesProps) => {
  const [activities, setActivities] = useState<GroupedActivities>()
  const [name, setName] = useState<string>('')
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    fetchCharacters(membershipType, membershipId)
      .then(({ characterIds, characterName }) => {
        setName(characterName)
        return fetchActivities(membershipType, membershipId, characterIds)
      })
      .then((activities) => {
        if (activities.length === 0) {
          setError(true)
          console.error(activities)
        } else {
          const activitiesGrouped = groupBy(activities, (activity) =>
            activity.period.substring(0, 10),
          )

          setError(false)
          setActivities(activitiesGrouped)
        }
      })
      .catch((error) => {
        setError(true)
        console.error(error)
      })
  }, [membershipType, membershipId])

  if (error === true) {
    return (
      <div>
        <button onClick={clickHome}>Change user</button>
        <h1>No Activities Found! 😞</h1>
      </div>
    )
  }

  if (activities === undefined) {
    return <Loading />
  }

  return (
    <div className="activitiesContainer">
      <div>
        <h1>{name}&apos;s Activity</h1>
      </div>
      {Object.entries(activities).map(([date, items]) => (
        <ActivityList key={date} date={date} activities={items} />
      ))}
      <div className="naviContainer">
        <div className="buttonContainer">
          <button className="naviButton" onClick={clickHome}>
            Change user
          </button>
          <button className="naviButton" onClick={clickReload}>
            Reload
          </button>
        </div>
      </div>
    </div>
  )
}

export default Activities
