import DefaultCompleted from './DefaultCompleted'

export default function Completed ({ isTestnet, appId, appName, data }) {
  return <DefaultCompleted isTestnet={isTestnet} appName={appName} data={data} />
}
