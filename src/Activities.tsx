import './Activities.css'
import {
  DestinyActivityHistoryResults,
  DestinyHistoricalStatsPeriodGroup,
  ServerResponse,
} from 'bungie-api-ts/destiny2'
import { useEffect, useState } from 'react'

const fetchUrl = (url: string, init?: RequestInit): Promise<unknown> => {
  console.log('Downloading: ', url)

  return fetch(url, init).then((res) => {
    if (res.ok === true) {
      return res.json()
    } else {
      console.error(res.json())
      throw new Error('Network response was not ok')
    }
  })
}

const modeName = (mode: string) => {
  switch (mode) {
    case '0':
      return 'None'
    case '2':
      return 'Story'
    case '3':
      return 'Strike'
    case '4':
      return 'Raid'
    case '5':
      return 'AllPvP'
    case '6':
      return 'Patrol'
    case '7':
      return 'AllPvE'
    case '9':
      return 'Reserved9'
    case '10':
      return 'Control'
    case '11':
      return 'Reserved11'
    case '12':
      return 'Clash'
    case '13':
      return 'Reserved13'
    case '15':
      return 'CrimsonDoubles'
    case '16':
      return 'Nightfall'
    case '17':
      return 'HeroicNightfall'
    case '18':
      return 'AllStrikes'
    case '19':
      return 'IronBanner'
    case '20':
      return 'Reserved20'
    case '21':
      return 'Reserved21'
    case '22':
      return 'Reserved22'
    case '24':
      return 'Reserved24'
    case '25':
      return 'AllMayhem'
    case '26':
      return 'Reserved26'
    case '27':
      return 'Reserved27'
    case '28':
      return 'Reserved28'
    case '29':
      return 'Reserved29'
    case '30':
      return 'Reserved30'
    case '31':
      return 'Supremacy'
    case '32':
      return 'PrivateMatchesAll'
    case '37':
      return 'Survival'
    case '38':
      return 'Countdown'
    case '39':
      return 'TrialsOfTheNine'
    case '40':
      return 'Social'
    case '41':
      return 'TrialsCountdown'
    case '42':
      return 'TrialsSurvival'
    case '43':
      return 'IronBannerControl'
    case '44':
      return 'IronBannerClash'
    case '45':
      return 'IronBannerSupremacy'
    case '46':
      return 'ScoredNightfall'
    case '47':
      return 'ScoredHeroicNightfall'
    case '48':
      return 'Rumble'
    case '49':
      return 'AllDoubles'
    case '50':
      return 'Doubles'
    case '51':
      return 'PrivateMatchesClash'
    case '52':
      return 'PrivateMatchesControl'
    case '53':
      return 'PrivateMatchesSupremacy'
    case '54':
      return 'PrivateMatchesCountdown'
    case '55':
      return 'PrivateMatchesSurvival'
    case '56':
      return 'PrivateMatchesMayhem'
    case '57':
      return 'PrivateMatchesRumble'
    case '58':
      return 'HeroicAdventure'
    case '59':
      return 'Showdown'
    case '60':
      return 'Lockdown'
    case '61':
      return 'Scorched'
    case '62':
      return 'ScorchedTeam'
    case '63':
      return 'Gambit'
    case '64':
      return 'AllPvECompetitive'
    case '65':
      return 'Breakthrough'
    case '66':
      return 'BlackArmoryRun'
    case '67':
      return 'Salvage'
    case '68':
      return 'IronBannerSalvage'
    case '69':
      return 'PvPCompetitive'
    case '70':
      return 'PvPQuickplay'
    case '71':
      return 'ClashQuickplay'
    case '72':
      return 'ClashCompetitive'
    case '73':
      return 'ControlQuickplay'
    case '74':
      return 'ControlCompetitive'
    case '75':
      return 'GambitPrime'
    case '76':
      return 'Reckoning'
    case '77':
      return 'Menagerie'
    case '78':
      return 'VexOffensive'
    case '79':
      return 'NightmareHunt'
    case '80':
      return 'Elimination'
    case '81':
      return 'Momentum'
    case '82':
      return 'Dungeon'
    case '83':
      return 'Sundial'
    case '84':
      return 'TrialsOfOsiris'
    case '85':
      return 'Dares'
    case '86':
      return 'Offensive'
    case '87':
      return 'LostSector'
    case '88':
      return 'Rift'
    case '89':
      return 'ZoneControl'
    case '90':
      return 'IronBannerRift'
    case '91':
      return 'IronBannerZoneControl'
    default:
      return 'Unknown'
  }
}

const fetchActivities = (characterIDs: string[]) =>
  Promise.all(
    characterIDs.map(
      (characterID) =>
        fetchUrl(
          `https://www.bungie.net/Platform/Destiny2/2/Account/4611686018433444841/Character/${characterID}/Stats/Activities/?mode=5`,
          { headers: { 'X-API-Key': '7a3f258f808c4e16a2d96c7339a9cea3' } },
        ) as Promise<ServerResponse<DestinyActivityHistoryResults>>,
    ),
  )
    .then((responses) =>
      responses.flatMap((activities) => activities?.Response?.activities),
    )
    .then((response) =>
      response.sort((a, b) =>
        a.period > b.period ? -1 : a.period < b.period ? 1 : 0,
      ),
    )

const Activities: React.FC = () => {
  const [activities, setActivities] =
    useState<DestinyHistoricalStatsPeriodGroup[]>()

  useEffect(() => {
    fetchActivities([
      '2305843009261085010',
      '2305843009261085011',
      '2305843009266556415',
    ]).then((activities) => {
      setActivities(activities)
      console.log(activities)
    })
  }, [])

  if (activities === undefined) {
    return <p>loading</p>
  }

  return (
    <div>
      <h1>Activites</h1>
      <table>
        <thead>
          <tr>
            <th>period</th>
            <th>mode</th>
            <th>kills</th>
            <th>assists</th>
            <th>ka</th>
            <th>deaths</th>
            <th>kd</th>
            <th>kda</th>
            <th>efficiency</th>
            <th>result</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity, key) => {
            return (
              <tr key={key}>
                <td>
                  {new Date(activity.period).toLocaleDateString('fi-fi')}{' '}
                  {new Date(activity.period).toLocaleTimeString('fi-fi', {
                    timeStyle: 'short',
                  })}
                </td>
                <td>{modeName(activity.activityDetails.mode.toString())}</td>
                <td>{activity.values.kills.basic.displayValue}</td>
                <td>{activity.values.assists.basic.displayValue}</td>
                <td>{activity.values.opponentsDefeated.basic.displayValue}</td>
                <td>{activity.values.deaths.basic.displayValue}</td>
                <td>{activity.values.killsDeathsRatio.basic.displayValue}</td>
                <td>{activity.values.killsDeathsAssists.basic.displayValue}</td>
                <td>{activity.values.efficiency.basic.displayValue}</td>
                <td>{activity.values.standing.basic.displayValue}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Activities
