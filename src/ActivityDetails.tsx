import { DestinyPostGameCarnageReportData } from 'bungie-api-ts/destiny2'

import { useEffect, useState } from 'react'
import { getOrSet } from './localStorage'
import { getGameStats } from './bungieData'

interface ActivityDetailsProps {
  activityId: string
  activityDate: string
}

const ActivityDetails: React.FC<ActivityDetailsProps> = ({
  activityId,
  activityDate,
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

  console.log('Activity', activityId, activity)

  return null
}

export default ActivityDetails
