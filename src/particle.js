import React from 'react'
import { ParticleNetwork, WalletEntryPosition } from '@particle-network/auth'
import { ParticleProvider } from '@particle-network/provider'

const {
  REACT_APP_PARTICLE_PROJECT_ID,
  REACT_APP_PARTICLE_CLIENT_KEY,
  REACT_APP_PARTICLE_APP_ID,
} = process.env

export default function ParticleButton ({ userInfo, login }) {
  if (!userInfo) {
    return (
      <button onClick={login}>Login with Particle</button>
    )
  }
  
  return (
    <div>{userInfo.email}</div>
  )
}

export function useParticle() {
  const _particle = React.useMemo(() => {
    return new ParticleNetwork({
      projectId: REACT_APP_PARTICLE_PROJECT_ID,
      clientKey: REACT_APP_PARTICLE_CLIENT_KEY,
      appId: REACT_APP_PARTICLE_APP_ID,
      chainName: 'Ethereum',
      chainId: 1,
      wallet: {
        displayWalletEntry: true,
        defaultWalletEntryPosition: WalletEntryPosition.BR,
        supportChains: [{ id: 1, name: 'Ethereum' }, { id: 42161, name: 'Arbitrum' }],
        customStyle: {},
      }
    })
  }, [])

  const [userInfo, setUserInfo] = React.useState(null)

  React.useEffect(() => {
    if (_particle.auth.isLogin()) {
      setUserInfo(_particle.auth.getUserInfo())
    }
  }, [_particle])

  const login = React.useCallback(async () => {
    if (userInfo) {
      return
    }
    setUserInfo(
      await _particle.auth.login({
        preferredAuthType: 'email',
        socialLoginPrompt: 'consent'
      })
    )
  }, [_particle, userInfo])

  const particleProvider = React.useMemo(() => new ParticleProvider(_particle.auth), [_particle])

  return { _particle, userInfo, login, particleProvider }
}
