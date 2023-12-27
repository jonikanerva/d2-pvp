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
    <table>
      <thead>
        <tr>
          <th>{dateFormat(date)}</th>
          <th className="alignCenter">K</th>
          <th className="alignCenter">D</th>
          <th className="alignCenter">K/D</th>
          <th className="alignCenter">R</th>
        </tr>
      </thead>
      <tbody>
        {activities.map((activity, key) => {
          return (
            <tr key={key}>
              <td>
                <ActivityDetails
                  activityDate={date}
                  activityId={activity.activityDetails.instanceId}
                />
                {modeName(activity.activityDetails.mode.toString())}{' '}
                <span className="detailInfo">
                  ({timeFormat(activity.period)})
                </span>
              </td>
              <td className="alignCenter noWrap">
                {activity.values.opponentsDefeated.basic.displayValue}{' '}
                <span className="detailInfo">
                  ({activity.values.kills.basic.displayValue}+
                  {activity.values.assists.basic.displayValue})
                </span>
              </td>
              <td className="alignCenter">
                {activity.values.deaths.basic.displayValue}
              </td>
              <td className="alignCenter">
                {activity.values.efficiency.basic.displayValue}
              </td>
              <td className="alignCenter">
                {activity.values.standing.basic.displayValue === 'Victory'
                  ? 'W'
                  : 'L'}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  </div>
)

export default ActivityList
