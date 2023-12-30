/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
import {
  DestinyActivityHistoryResults,
  DestinyPlayer,
  DestinyPostGameCarnageReportData,
  DestinyPostGameCarnageReportEntry,
  DestinyProfileResponse,
  DestinyProfileUserInfoCard,
  ServerResponse,
} from 'bungie-api-ts/destiny2'

import { isInLastMonth } from './dateHandling'

const apiKey = import.meta.env.VITE_BUNGIE_KEY as string

const fetchUrl = (url: string, init?: RequestInit): Promise<unknown> => {
  console.log('Downloading:', url)

  const headers = { headers: { 'X-API-Key': apiKey } }
  const options = { ...init, ...headers }

  return fetch(url, options).then((res) => {
    if (res.ok === true) {
      return res.json()
    } else {
      console.error(res.json())
      throw new Error('Network response was not ok')
    }
  })
}

interface CharacterInfo {
  characterIds: string[]
  characterName: string
}

export const fetchCharacters = (
  membershipType: string,
  membershipId: string,
): Promise<CharacterInfo> =>
  (
    fetchUrl(
      `https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${membershipId}/?components=100,200`,
    ) as Promise<ServerResponse<DestinyProfileResponse>>
  ).then((response) => {
    const data = response?.Response?.profile?.data
    return {
      characterName: data?.userInfo?.bungieGlobalDisplayName || '',
      characterIds: data?.characterIds || [],
    }
  })

export const fetchActivities = (
  membershipType: string,
  membershipId: string,
  characterIDs: string[],
) =>
  Promise.all(
    characterIDs.map(
      (characterID) =>
        fetchUrl(
          `https://www.bungie.net/Platform/Destiny2/${membershipType}/Account/${membershipId}/Character/${characterID}/Stats/Activities/?mode=5&page=0&count=250`,
        ) as Promise<ServerResponse<DestinyActivityHistoryResults>>,
    ),
  )
    .then((responses) =>
      responses
        .flatMap((activities) => activities?.Response?.activities)
        .filter((activities) => activities !== undefined)
        .filter((activities) => isInLastMonth(activities?.period) === true)
        .filter(
          (activities) => activities?.activityDetails?.isPrivate === false,
        ),
    )
    .then((response) =>
      response.sort((a, b) =>
        a?.period > b?.period ? -1 : a?.period < b?.period ? 1 : 0,
      ),
    )

export const searchUser = (name: string) => {
  const [displayName, nameCode] = name.split('#')

  return (
    fetchUrl(
      'https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayerByBungieName/All/',
      {
        method: 'post',
        headers: { 'X-API-Key': apiKey },
        body: JSON.stringify({
          displayName: displayName,
          displayNameCode: nameCode,
        }),
      },
    ) as Promise<ServerResponse<DestinyProfileUserInfoCard[]>>
  ).then((response) => response.Response)
}

export const modeName = (mode: string) => {
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
      return 'IB'
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
      return 'IB Control'
    case '44':
      return 'IB Clash'
    case '45':
      return 'IB Supremacy'
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
      return 'IB Salvage'
    case '69':
      return 'PvPCompetitive'
    case '70':
      return 'PvPQuickplay'
    case '71':
      return 'Clash'
    case '72':
      return 'Clash Comp'
    case '73':
      return 'Control'
    case '74':
      return 'Control Comp'
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
      return 'Trials'
    case '85':
      return 'Dares'
    case '86':
      return 'Offensive'
    case '87':
      return 'LostSector'
    case '88':
      return 'Rift'
    case '89':
      return 'Zone Control'
    case '90':
      return 'IB Rift'
    case '91':
      return 'IB Fortress'
    default:
      return 'Unknown'
  }
}

export const validCompGame = (
  activity: DestinyPostGameCarnageReportData,
): boolean => {
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

export const playerDNF = (
  userInfo: DestinyPostGameCarnageReportEntry,
): boolean => (userInfo.values.completed.basic.value === 0 ? true : false)

export const playerStartedLate = (
  userInfo: DestinyPostGameCarnageReportEntry,
): boolean => (userInfo.values.startSeconds.basic.value > 10 ? true : false)

export const playerPlatform = (userInfo: DestinyPlayer): string => {
  const user = userInfo.destinyUserInfo
  const platform =
    user.crossSaveOverride !== 0 ? user.crossSaveOverride : user.membershipType

  /*
  None = 0,
  TigerXbox = 1,
  TigerPsn = 2,
  TigerSteam = 3,
  TigerBlizzard = 4,
  TigerStadia = 5,
  TigerEgs = 6,
  TigerDemon = 10,
  BungieNext = 254,
*/

  switch (platform) {
    case 1:
      return 'xb'
    case 2:
      return 'ps'
    case 3:
    case 4:
    case 6:
      return 'pc'
    default:
      return 'n/a'
  }
}

export const getGameStats = (activityID: string) =>
  (
    fetchUrl(
      `https://stats.bungie.net/Platform/Destiny2/Stats/PostGameCarnageReport/${activityID}/`,
    ) as Promise<ServerResponse<DestinyPostGameCarnageReportData>>
  )
    .then((response) => {
      return response.Response
    })
    .catch((error) => {
      console.error('Carnage report failed to load', error)

      return null
    })
