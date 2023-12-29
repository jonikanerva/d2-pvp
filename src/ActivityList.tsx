import './ActivityList.css'

import { DestinyHistoricalStatsPeriodGroup } from 'bungie-api-ts/destiny2'

import Activity from './Activity'
import { dateFormat } from './dateHandling'

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
    {activities.map((activity, key) => (
      <Activity activity={activity} date={date} key={key} />
    ))}
  </div>
)

export default ActivityList
