import './Activities.css'

import { DestinyHistoricalStatsPeriodGroup } from 'bungie-api-ts/destiny2'
import { useEffect, useState } from 'react'

import { fetchActivities, fetchCharacters, modeName } from './bungieData'
import { dateFormat } from './dateHandling'

const Activities: React.FC = () => {
  const [activities, setActivities] =
    useState<DestinyHistoricalStatsPeriodGroup[]>()

  useEffect(() => {
    fetchCharacters('2', '4611686018433444841')
      .then((characters) => fetchActivities(characters))
      .then((activities) => {
        setActivities(activities)
        console.log(activities)
      })
  }, [])

  if (activities === undefined) {
    return <p>loading</p>
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
