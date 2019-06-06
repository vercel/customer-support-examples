import { useState } from 'react'
import dynamic from 'next/dynamic'

import useLazyComps from './is-preload'
import Drift from 'react-driftjs'
const TIMEOUT = 5500

export const DynamicLoadedNote = dynamic(
  import('../components/note')
    .then(comp => comp)
    .catch(err => {}),
  {
    loading: function Loading() {
      return <span />
    },
    ssr: false,
  }
)

export const DynamicLoadedIntercom = dynamic(
  import('react-intercom')
    .then(comp => comp)
    .catch(err => {
      return (
        <DynamicLoadedNote>Intercom module is not loaded.</DynamicLoadedNote>
      )
    }),
  {
    loading: function Loading() {
      return <span />
    },
    ssr: false,
  }
)

export const DynamicLoadedDrift = dynamic(
  import('react-driftjs')
    .then(comp => comp)
    .catch(err => {
      return <DynamicLoadedNote>Drift module is not loaded.</DynamicLoadedNote>
    }),
  {
    loading: function Loading() {
      return <span />
    },
    ssr: false,
  }
)

const useTalkToUs = appName => {
  const [loading, setLoading] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [showFallback, setShowFallback] = useState(false)
  const [message, setMessage] = useState('')

  const comp = appName => {
    if (appName === 'intercom') {
      return useLazyComps(
        'intercom',
        <DynamicLoadedIntercom appID={INTERCOM_ID} />
      )
    } else {
      return useLazyComps('drift', <DynamicLoadedDrift appId="rd5pzbf9dbc9" />)
    }
  }

  const { component: chatPlatform, loadComp, showComp } = comp(appName)

  const installationFail = () => {
    setShowFallback(true)
    setLoading(false)
    setMessage('Installation failed.')
  }

  const installationTimeout = () => {
    setShowFallback(true)
    setShowChat(false)
    setLoading(false)
    setMessage(
      `Please check your network connection and disable Adblockers.`
    )
  }

  const show = () => {
    let didShowSth = false
    // When the Talk To Us button is clicked, we must respond
    // with either Intercom or the fallback form
    if (!showFallback && !showChat) {
      setLoading(true)
      // After TIMEOUT we must have shown something
      setTimeout(() => {
        if (!didShowSth) {
          installationTimeout()
          didShowSth = true
        }
      }, 5000)
      //Intercom is successfully installed
      switch (appName) {
        case 'intercom':
          if (window.Intercom) {
            window.Intercom('show')
            didShowSth = true
            window.Intercom('onShow', () => {
              setShowFallback(false)
              setLoading(false)
              setShowChat(true)
            })
            window.Intercom('onHide', () => {
              setShowChat(false)
            })
          } else {
            installationFail()
            didShowSth = true
          }
          break
        case 'drift':
          if (window.drift) {
            drift.on('ready', api => {
              api.widget.show()
              api.sidebar.open()
              setLoading(false)
              setShowChat(true)
              setShowFallback(false)
              didShowSth = true
              drift.on('sidebarClose', () => {
                api.widget.hide()
                setShowChat(false)
              })
            })
          } else {
            installationFail()
            didShowSth = true
          }
          break
        default:
          return
          break
      }
      showComp()
    }
  }

  const component = (
    <>
      {showFallback ? (
        <DynamicLoadedNote>{message}</DynamicLoadedNote>
      ) : (
        chatPlatform
      )}
      <style jsx global>{`
        .intercom-namespace .intercom-pdrvem,
        .intercom-app {
          opacity: ${showChat ? 1 : 0} !important;
          visibility: ${showChat ? 'visible' : 'hidden'};
          transition: all 0.2s ease;
          transition-delay: 0.2s;
        }

        #drift-widget {
          opacity: ${showChat ? 1 : 0} !important;
          visibility: ${showChat ? 'visible' : 'hidden'};
          transition: all 0.2s ease;
          transition-delay: 0.2s;
        }

        .intercom-namespace .intercom-borderless-frame,
        .intercom-namespace .intercom-launcher-badge-frame {
          opacity: 0;
        }
      `}</style>
    </>
  )

  return {
    preload: loadComp,
    show,
    loading,
    component,
  }
}

export default useTalkToUs
