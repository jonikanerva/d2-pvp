import { DestinyPostGameCarnageReportEntry } from 'bungie-api-ts/destiny2'

import { playerDNF, playerStartedLate } from './bungieData'
import PlatformImage from './PlatformImage'

interface TeamDetails {
  activity: DestinyPostGameCarnageReportEntry
}

const TeamDetails: React.FC<TeamDetails> = ({ activity }: TeamDetails) => {
  const standingClass = activity.standing === 0 ? 'row winners' : 'row losers'

  return (
    <div className={standingClass}>
      <div className="cell matchType">
        {playerDNF(activity) && <span className="dnf">dnf</span>}
        {playerStartedLate(activity) && <span className="dnf">late</span>}
        {activity.player.destinyUserInfo.bungieGlobalDisplayName}
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
}

export default TeamDetails
