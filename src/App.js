import React from 'react'
import { MesonToButton } from '@mesonfi/to'

import Completed from './Completed'

import { ReactComponent as MesonIcon } from './meson.svg'
import popup from './popup.png'
import apps from './apps.json'

export default function App() {
  const [to, appInfo, host, isTestnet] = React.useMemo(() => {
    if (window.location.pathname === '/cubic') {
      const appInfo = apps.find(app => app.id === 'cubic')
      return [{ id: 'cubic' }, appInfo, 'testnet', true]
    }

    if (window.location.pathname === '/myshell') {
      const appInfo = apps.find(app => app.id === 'myshell')
      return [{ id: 'myshell', addr: '0x666d6b8a44d226150ca9058bEEbafe0e3aC065A2' }, appInfo, 'https://t.alls.to']
    }

    if (window.location.pathname === '/sprintcheckout') {
      const appInfo = apps.find(app => app.id === 'sprintcheckout')
      return [{ id: 'sprintcheckout' }, appInfo, 'testnet', true]
    }

    if (window.location.pathname === '/hinkal') {
      const appInfo = apps.find(app => app.id === 'hinkal')
      return [{ id: 'hinkal' }, appInfo, 'testnet', true]
    }

    const appInfo = apps[0]
    if (window.location.pathname === '/goledo') {
      return [{ id: 'goledo' }, appInfo]
    } else {
      return [{ id: 'demo' }, appInfo]
    }
  }, [])

  const [data, setData] = React.useState(null)
  
  return (
    <div className='w-full min-h-full bg-indigo-50 flex flex-col'>
      <header className='flex flex-row items-center w-full px-4 sm:px-6 py-2'>
        <img className='h-8 mr-2' src={appInfo?.icon || '/icon192.png'} alt='' />
        <div>
          <div className='text-lg'>{appInfo?.title}</div>
          <div className='text-xs font-light text-gray'>
            {appInfo?.subtitle}
          </div>
        </div>
      </header>

      <div className='my-4 md:mt-6 mx-4 sm:mx-6 md:mx-8 max-w-[960px] self-center grid grid-flow-row-dense md:grid-cols-5'>
        <div className='md:col-span-3 md:mt-[64px] lg:mt-[108px] mb-3 md:pr-8'>
          <div className='font-semibold text-2xl mb-2'>
            {appInfo?.section_1_title}
          </div>
          {appInfo?.section_1_desc.split('\n').map((line, i) => <div key={`line-${i}`} className='block text-base'>{line}</div>)}
        </div>

        <div className='md:row-span-4 md:col-span-2 flex flex-col items-center p-5'>
          <img className='w-[320px] md:w-[280px] md:min-w-[280px] lg:w-[320px] border-[0.5px] border-[#d2d6d6] rounded-xl shadow-[0_5px_40px_-10px_rgba(0,0,0,0.2)]' src={popup} alt='meson.to popup' />
        </div>

        <div className='md:col-span-3 mt-3 md:mt-8 md:pr-8 flex flex-col items-start'>
          <div className='font-semibold text-2xl mb-2'>
            {appInfo?.section_2_title}
          </div>
          <ol className='list-decimal ml-6 mb-2'>
          {
            appInfo?.section_2_steps.map((step, i) => (
              <li key={`step-${i}`} dangerouslySetInnerHTML={{ __html: step }} />
            ))
          }
          </ol>
          <div>
            {appInfo?.section_2_desc}
          </div>
          <div>
            <MesonToButton
              type='iframe'
              to={to}
              host={host}
              onCompleted={setData}
              className='mt-4 lg:mt-6'
            >
              <ButtonText text={appInfo?.button} />
            </MesonToButton>
          </div>
          <div className='mt-3'>
            <Completed isTestnet={isTestnet} appId={to.id} appName={appInfo?.name} data={data} />
          </div>
        </div>
      </div>

      <div className='flex-1' />
      <div className='self-center my-4 flex items-center text-gray-400 text-sm'>
        Powered by
        <a className='opacity-50 hover:opacity-80' href='https://meson.fi' target='_blank' rel="noreferrer">
          <MesonIcon className='ml-1.5 w-[80px]' />
        </a>
      </div>
    </div>
  )
}

function ButtonText ({ text, pending }) {
  return pending ? 'Waiting for meson' : text
}
