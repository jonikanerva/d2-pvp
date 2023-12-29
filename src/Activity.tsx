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

  return (
    <Fragment>
      <div className="row" onClick={() => setDetailsVisible(!detailsVisible)}>
        <div className="cell matchType">
          {modeName(activity.activityDetails.mode.toString())}{' '}
          <span className="detailInfo">({timeFormat(activity.period)})</span>
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
        <div className="cell result">
          {activity.values.standing.basic.displayValue === 'Victory'
            ? 'W'
            : 'L'}
        </div>
      </div>
      <div className="row">
        <ActivityDetails
          activityDate={date}
          activityId={activity.activityDetails.instanceId}
          detailsVisible={detailsVisible}
        />
      </div>
    </Fragment>
  )
}

export default Activity
