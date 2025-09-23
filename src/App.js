import React from 'react'
import { MesonToButton } from '@mesonfi/to/react'

import Completed from './Completed'

import { ReactComponent as MesonIcon } from './meson.svg'
import popup_pc from './popup_pc.png'
import popup_mobile from './popup_mobile.png'
import apps from './apps.json'

import ParticleButton, { useParticle } from './particle'

export default function App() {
  const withParticle = window.location.pathname === '/particle'
  const { userInfo, login } = useParticle()

  const [options, appInfo] = React.useMemo(() => {
    const pathName = window.location.pathname.replace('/', '');
    const search = window.location.search;
    const params = new URLSearchParams(search);

    const to = pathName || params.get('to') || 'demo';
    const from = params.get('from') ? params.get('from').split(',') : undefined;
    const recipient = params.get('recipient');
    const amount = params.get('amount');
    const tokens = params.get('token') ? params.get('token').split(',') : undefined;

    return [{
      to,
      from,
      recipient,
      amount,
      tokens
    }, apps.find(app => app.id === to) || apps[0]]
  }, [])

  const [data, setData] = React.useState(null)

  return (
    <div className='w-full min-h-full bg-indigo-50 flex flex-col'>
      <header className='flex flex-row w-full items-center justify-between px-4 sm:px-6 py-2'>
        <div className='flex flex-row items-center'>
          <img className='h-8 mr-2' src={appInfo?.icon || '/icon192.png'} alt='' />
          <div>
            <div className='text-lg'>{appInfo?.title}</div>
            <div className='text-xs font-light text-gray'>
              {appInfo?.subtitle}
            </div>
          </div>
        </div>

        {withParticle && <ParticleButton userInfo={userInfo} login={login} />}
      </header>

      <div className='my-4 md:mt-[94px] mx-4 sm:mx-6 md:mx-8 max-w-[960px] self-center grid grid-flow-row-dense md:grid-cols-5'>
        <div className='md:col-span-3 mb-3 md:pr-8'>
          <div className='font-semibold text-2xl mb-2'>
            {appInfo?.section_1_title}
          </div>
          {appInfo?.section_1_desc.split('\n').map((line, i) => <div key={`line-${i}`} className='block text-base'>{line}</div>)}
        </div>

        <div className='md:row-span-4 md:col-span-2 flex flex-col items-center py-3 md:py-0'>
          <img className='hidden md:block border border-[#DDF3EA] rounded-2xl shadow-[0_0_16px_0_rgba(31,190,158,0.04)]' src={popup_pc} alt='meson.to popup' />
          <img className='md:hidden border border-[#DDF3EA] rounded-2xl shadow-[0_0_16px_0_rgba(31,190,158,0.04)]' src={popup_mobile} alt='meson.to popup' />
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
          <div className='mt-4 lg:mt-6'>
            <MesonToButton
              options={options}
              __host={'https://v2.meson.to'}
              // __host={'https://beta2.meson.fi'}
              // __host={'http://localhost:3001'}
              onCompleted={setData}
              className='flex items-center'
            >
              <ButtonText text={appInfo?.button} />
            </MesonToButton>
          </div>
          <div className='mt-3'>
            <Completed isTestnet={false} appId={options.to} appName={appInfo?.name} data={data} />
          </div>
        </div>
      </div>

      <div className='flex-1' />
      <div className='self-center my-4 flex items-center text-[#75807B] text-sm cursor-pointer group hover:text-[#25372E]'>
        Powered by
        <div className="pl-1 opacity-60 group-hover:opacity-100">
          <MesonIcon />
        </div>
      </div>
    </div>
  )
}

function ButtonText ({ text, pending }) {
  return pending ? 'Waiting for meson' : text
}
