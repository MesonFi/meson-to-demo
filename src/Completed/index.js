import DefaultCompleted from './DefaultCompleted'

export default function Completed ({ isTestnet, appId, appName, data }) {
  if (appId === 'hinkal') {
    const Hinkal = require('./Hinkal').default
    return <Hinkal isTestnet={isTestnet} appName={appName} data={data} />
  }

  return <DefaultCompleted isTestnet={isTestnet} appName={appName} data={data} />
}