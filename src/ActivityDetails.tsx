import './ActivityDetails.css'

import { DestinyPostGameCarnageReportData } from 'bungie-api-ts/destiny2'
import { useEffect, useState } from 'react'

import { getGameStats } from './bungieData'
import { groupBy } from './dateHandling'
import { getOrSet } from './localStorage'
import TeamDetails from './TeamDetails'
import { useAppContext } from './useAppContext'

interface ActivityDetailsProps {
  activityId: string
  activityDate: string
  detailsVisible: boolean
}

const validCompGame = (activity: DestinyPostGameCarnageReportData): boolean => {
  // not comp match
  if (activity.activityDetails.modes.includes(69) === false) {
    return false
  }

  // somebody joined late or quit early
  if (
    activity.entries.filter(
      (entry) =>
        entry.values.completed.basic.value === 0 ||
        entry.values.startSeconds.basic.value > 10,
    ).length > 0
  ) {
    return false
  }

  return true
}

const ActivityDetails: React.FC<ActivityDetailsProps> = ({
  activityId,
  activityDate,
  detailsVisible,
}: ActivityDetailsProps) => {
  const storageId = `${activityDate}-${activityId}`
  const [activity, setActivity] = useState<DestinyPostGameCarnageReportData>()
  const { compActivities, setCompActivities } = useAppContext()

  useEffect(() => {
    getOrSet(storageId, () => getGameStats(activityId))
      .then((response) => {
        if (response !== null) {
          setActivity(response)
        }
      })
      .catch((error) => console.error('Activity details failed to load', error))
  }, [activityId, storageId])

  useEffect(() => {
    if (activity !== undefined && validCompGame(activity)) {
      const id = activity.activityDetails.instanceId
      const ids = compActivities === undefined ? [id] : [...compActivities, id]

      if (
        compActivities === undefined ||
        compActivities?.includes(id) === false
      ) {
        setCompActivities(ids)
      }
    }
  }, [activity, compActivities, setCompActivities])

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
