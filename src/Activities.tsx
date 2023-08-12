import './Activities.css'

import { DestinyHistoricalStatsPeriodGroup } from 'bungie-api-ts/destiny2'
import { useEffect, useState } from 'react'

import { fetchActivities, fetchCharacters, modeName } from './bungieData'
import { dateFormat } from './dateHandling'

interface ActivitiesProps {
  membershipType: string
  membershipId: string
}

const Activities: React.FC<ActivitiesProps> = ({
  membershipType,
  membershipId,
}: ActivitiesProps) => {
  const [activities, setActivities] =
    useState<DestinyHistoricalStatsPeriodGroup[]>()
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    fetchCharacters(membershipType, membershipId)
      .then((characters) => fetchActivities(characters))
      .then((activities) => {
        setError(false)
        setActivities(activities)
      })
      .catch((error) => {
        setError(true)
        console.log(error)
      })
  }, [membershipType, membershipId])

  if (error === true) {
    return <h1>User Not Found! 😞</h1>
  }

  if (activities === undefined) {
    return <h1>Loading... ⏳</h1>
  }

  return (
    <div>
      <h1>Activites</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Mode</th>
            <th className="alignCenter">Kills</th>
            <th className="alignCenter">Assists</th>
            <th className="alignCenter">Deaths</th>
            <th className="alignCenter">Efficiency</th>
            <th className="alignCenter">Result</th>
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
                  {activity.values.standing.basic.displayValue}
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
