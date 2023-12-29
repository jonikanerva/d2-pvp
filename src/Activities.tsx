import './Activities.css'

import { DestinyHistoricalStatsPeriodGroup } from 'bungie-api-ts/destiny2'
import { useEffect, useState } from 'react'

import ActivityList from './ActivityList'
import { fetchActivities, fetchCharacters } from './bungieData'
import { groupBy } from './dateHandling'
import Loading from './Loading'
import { cleanStorage } from './localStorage'

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

const calculateAverage = (arr: number[]): number => {
  if (arr.length === 0) {
    return 0
  }

  const sum = arr.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  )
  const average = sum / arr.length

  return parseFloat(average.toFixed(2))
}

const calculateCompKD = (activities: GroupedActivities): number => {
  const kds = Object.values(activities)
    .flatMap((items) => items.map((item) => item))
    .filter(
      (entry) =>
        entry.values.completed.basic.value === 1 &&
        entry.values.startSeconds.basic.value < 11 &&
        entry.activityDetails.modes.includes(69),
    )
    .map((entry) => entry.values.efficiency.basic.value)

  return calculateAverage(kds)
}

const Activities: React.FC<ActivitiesProps> = ({
  membershipType,
  membershipId,
}: ActivitiesProps) => {
  const [activities, setActivities] = useState<GroupedActivities>()
  const [name, setName] = useState<string>('')
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    cleanStorage()
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
      <div className="header">{name}&apos;s activity</div>
      <div className="compKD">
        avg comp k/d: <b>{calculateCompKD(activities)}</b>
      </div>
      {Object.entries(activities).map(([date, items]) => (
        <ActivityList key={date} date={date} activities={items} />
      ))}
      <div className="footer">&copy;donut {new Date().getFullYear()}</div>
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
