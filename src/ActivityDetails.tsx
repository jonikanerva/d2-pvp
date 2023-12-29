import './ActivityDetails.css'

import { DestinyPostGameCarnageReportData } from 'bungie-api-ts/destiny2'
import { useEffect, useState } from 'react'

import { getGameStats } from './bungieData'
import { groupBy } from './dateHandling'
import { getOrSet } from './localStorage'
import TeamDetails from './TeamDetails'

interface ActivityDetailsProps {
  activityId: string
  activityDate: string
  detailsVisible: boolean
}

const ActivityDetails: React.FC<ActivityDetailsProps> = ({
  activityId,
  activityDate,
  detailsVisible,
}: ActivityDetailsProps) => {
  const storageId = `${activityDate}-${activityId}`
  const [activity, setActivity] = useState<DestinyPostGameCarnageReportData>()

  useEffect(() => {
    getOrSet(storageId, () => getGameStats(activityId))
      .then((response) => {
        if (response !== null) {
          setActivity(response)
        }
      })
      .catch((error) => console.error('Activity details failed to load', error))
  }, [activityId, storageId])

  if (activity === undefined) {
    return null
  }

  const entries = activity.entries.sort((a, b) => {
    const one = a.values.efficiency.basic.value
    const two = b.values.efficiency.basic.value

    return one > two ? -1 : one < two ? 1 : 0
  })

  const teams = groupBy(entries, (entry) => entry.standing)
  const winners = teams[0]
  const losers = teams[1]

  return (
    <div className={detailsVisible ? 'team visible' : 'team hidden'}>
      {winners.map((activity, key) => (
        <TeamDetails activity={activity} key={key} />
      ))}
      {losers.map((activity, key) => (
        <TeamDetails activity={activity} key={key} />
      ))}
    </div>
  )
}

export default ActivityDetails
