import './ActivityList.css'

import { DestinyHistoricalStatsPeriodGroup } from 'bungie-api-ts/destiny2'

import ActivityDetails from './ActivityDetails'
import { modeName } from './bungieData'
import { dateFormat, timeFormat } from './dateHandling'

interface ActivityListProps {
  date: string
  activities: DestinyHistoricalStatsPeriodGroup[]
}

const ActivityList: React.FC<ActivityListProps> = ({
  date,
  activities,
}: ActivityListProps) => (
  <div className="activityList">
    <div className="row underline">
      <div className="cell matchType">{dateFormat(date)}</div>
      <div className="cell kills">K</div>
      <div className="cell deaths">D</div>
      <div className="cell kd ">K/D</div>
      <div className="cell result">R</div>
    </div>
    {activities.map((activity, key) => {
      return (
        <div className="row" key={key}>
          <div className="cell matchType">
            <ActivityDetails
              activityDate={date}
              activityId={activity.activityDetails.instanceId}
            />
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
      )
    })}
  </div>
)

export default ActivityList
