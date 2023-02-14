const EXPLORER_MAINNET = 'https://explorer.meson.fi'
const EXPLORER_TESTNET = 'https://testnet-explorer.meson.fi'

export default function DefaultCompleted ({ isTestnet, appName, data }) {
  if (!data) {
    return
  }

  return (
    <a
      className='flex items-center hover:underline text-gray-500 text-sm'
      href={`${isTestnet ? EXPLORER_TESTNET : EXPLORER_MAINNET}/swap/${data.swapId}`}
      target='_blank'
      rel="noreferrer"
    >
      <span className='font-medium'>{data.amount / 1e6} {data.from.token} on {data.from.chain}</span>
      <span className='mx-1.5 text-gray-300'>{'>'}</span>
      <span className='font-medium'>{data.received / 1e6} {data.to.token} on {data.to.chain}</span>
      <span className='mx-1.5 text-gray-300'>{'>'}</span>
      <img className='h-4 mr-1' src='/icon192.png' alt='' />
      <span className='font-medium'>{appName}</span>
    </a>
  )
}