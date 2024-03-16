import { DestinyHistoricalStatsPeriodGroup } from 'bungie-api-ts/destiny2'
import { Fragment, useState } from 'react'

import ActivityDetails from './ActivityDetails'
import { modeName } from './bungieData'
import { timeFormat } from './dateHandling'

interface ActivityProps {
  activity: DestinyHistoricalStatsPeriodGroup
  date: string
}

const Activity: React.FC<ActivityProps> = ({
  activity,
  date,
}: ActivityProps) => {
  const [detailsVisible, setDetailsVisible] = useState<boolean>(false)

  const matchType = modeName(activity.activityDetails.mode.toString())
  const matchTime = timeFormat(activity.period)
  const ka = activity?.values?.opponentsDefeated?.basic?.displayValue
  const kills = activity?.values?.kills?.basic?.displayValue
  const assists = activity?.values?.assists?.basic?.displayValue
  const deaths = activity?.values?.deaths?.basic?.displayValue
  const kd = activity?.values?.efficiency?.basic?.displayValue
  const kda = `${kills}+${assists}`
  const result =
    activity?.values?.standing?.basic?.displayValue === 'Victory' ? 'W' : 'L'
  const instanseId = activity?.activityDetails?.instanceId

  return (
    <Fragment>
      <div className="row" onClick={() => setDetailsVisible(!detailsVisible)}>
        <div className="cell matchType">
          {matchType} <span className="detailInfo">({matchTime})</span>
        </div>
        <div className="cell kills">
          {ka} <span className="detailInfo">({kda})</span>
        </div>
        <div className="cell deaths">{deaths}</div>
        <div className="cell kd">{kd}</div>
        <div className="cell result">{result}</div>
      </div>
      <div className="row">
        <ActivityDetails
          activityDate={date}
          activityId={instanseId}
          detailsVisible={detailsVisible}
        />
      </div>
    </Fragment>
  )
}

export default Activity
