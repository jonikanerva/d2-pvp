import { DestinyPlayer } from 'bungie-api-ts/destiny2'

import { playerPlatform } from './bungieData'

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

export default PlatformImage
