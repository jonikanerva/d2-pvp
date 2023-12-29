import './ActivityDetails.css'

import {
  DestinyPlayer,
  DestinyPostGameCarnageReportData,
} from 'bungie-api-ts/destiny2'
import { useEffect, useState } from 'react'

import { getGameStats, playerDNF, playerPlatform } from './bungieData'
import { groupBy } from './dateHandling'
import { getOrSet } from './localStorage'

interface ActivityDetailsProps {
  activityId: string
  activityDate: string
  detailsVisible: boolean
}

interface PlatformImageProps {
  userInfo: DestinyPlayer
}

const PlatformImage: React.FC<PlatformImageProps> = ({
  userInfo,
}: PlatformImageProps) => {
  const platform = playerPlatform(userInfo)

  if (platform == 'xb') {
    return <img src="/xb.png" width="20px" height="20px" alt="Xbox logo" />
  } else if (platform == 'ps') {
    return (
      <img src="/ps.png" width="20px" height="20px" alt="Playstation logo" />
    )
  } else if (platform == 'pc') {
    return <img src="/pc.png" width="20px" height="20px" alt="PC logo" />
  } else {
    return '?'
  }
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
      {winners.map((activity, key) => {
        return (
          <div className="row winners" key={key}>
            <div className="cell matchType">
              {activity.player.destinyUserInfo.bungieGlobalDisplayName}
              {playerDNF(activity) && ' (DNF)'}
            </div>
            <div className="cell kills">
              {activity.values.opponentsDefeated.basic.displayValue}{' '}
              <span className="detailInfo">
                ({activity.values.kills.basic.displayValue}+
                {activity.values.assists.basic.displayValue})
              </span>
            </div>
            <div className="cell deaths">
              {activity.values.deaths.basic.displayValue}
            </div>
            <div className="cell kd">
              {activity.values.efficiency.basic.displayValue}
            </div>
            <div className="cell">
              <PlatformImage userInfo={activity.player} />
            </div>
          </div>
        )
      })}
      {losers.map((activity, key) => {
        return (
          <div className="row losers" key={key}>
            <div className="cell matchType">
              {activity.player.destinyUserInfo.bungieGlobalDisplayName}
              {playerDNF(activity) && <span className="dnf">dnf</span>}
            </div>
            <div className="cell kills">
              {activity.values.opponentsDefeated.basic.displayValue}{' '}
              <span className="detailInfo">
                ({activity.values.kills.basic.displayValue}+
                {activity.values.assists.basic.displayValue})
              </span>
            </div>
            <div className="cell deaths">
              {activity.values.deaths.basic.displayValue}
            </div>
            <div className="cell kd">
              {activity.values.efficiency.basic.displayValue}
            </div>
            <div className="cell">
              <PlatformImage userInfo={activity.player} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ActivityDetails
