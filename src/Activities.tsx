import './Activities.css'

import { DestinyHistoricalStatsPeriodGroup } from 'bungie-api-ts/destiny2'
import { useEffect, useState } from 'react'

import { fetchActivities, fetchCharacters, modeName } from './bungieData'
import { dateFormat } from './dateHandling'

interface ActivitiesProps {
  membershipType: string
  membershipId: string
}
const clickHome = () => (window.location.pathname = '/')
const clickReload = () => window.location.reload()

const Activities: React.FC<ActivitiesProps> = ({
  membershipType,
  membershipId,
}: ActivitiesProps) => {
  const [activities, setActivities] =
    useState<DestinyHistoricalStatsPeriodGroup[]>()
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
          setError(false)
          setActivities(activities)
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
        <div className="changeUser">
          <button onClick={clickHome}>Change user</button>
        </div>
        <h1>No Activities Found! 😞</h1>
      </div>
    )
  }

  if (activities === undefined) {
    return (
      <div className="loadingContainer">
        <h1>Loading... ⏳</h1>
      </div>
    )
  }

  return (
    <div className="activitiesContainer">
      <div className="headerContainer">
        <button className="naviButton" onClick={clickHome}>
          Change user
        </button>
        <button className="naviButton" onClick={clickReload}>
          Reload
        </button>
      </div>
      <div className="headerText">
        <h1>{name}'s Activity</h1>
      </div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Mode</th>
            <th className="alignCenter">K</th>
            <th className="alignCenter">A</th>
            <th className="alignCenter">D</th>
            <th className="alignCenter">K/D</th>
            <th className="alignCenter">O</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity, key) => {
            return (
              <tr key={key}>
                <td>{dateFormat(activity.period)}</td>
                <td>{modeName(activity.activityDetails.mode.toString())}</td>
                <td className="alignCenter">
                  {activity.values.opponentsDefeated.basic.displayValue}
                </td>
                <td className="alignCenter">
                  {activity.values.assists.basic.displayValue}
                </td>
                <td className="alignCenter">
                  {activity.values.deaths.basic.displayValue}
                </td>
                <td className="alignCenter">
                  {activity.values.efficiency.basic.displayValue}
                </td>
                <td className="alignCenter">
                  {activity.values.standing.basic.displayValue === 'Victory'
                    ? 'W'
                    : 'L'}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Activities
