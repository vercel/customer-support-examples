import { useState } from 'react'
import dynamic from 'next/dynamic'

import useLazyComps from './is-preload'
import Drift from 'react-driftjs'
const TIMEOUT = 5500

export const DynamicLoadedNote = dynamic(
  import('../components/note')
    .then(comp => comp)
    .catch(err => {
      // eslint-disable-next-line no-console
      console.error(err)
    }),
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
      // eslint-disable-next-line no-console
      console.error(err)
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
      // eslint-disable-next-line no-console
      console.error(err)
      return <DynamicLoadedNote>Drift module is not loaded.</DynamicLoadedNote>
    }),
  {
    loading: function Loading() {
      return <span />
    },
    ssr: false,
  }
)

// lib
const useTalkToUs = ({ appName }) => {
  const [loading, setLoading] = useState(false)
  const [showIntercom, setShowIntercom] = useState(false)
  const [showFallback, setShowFallback] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

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

  const intercomController = () => {
    if (window.Intercom) {
      setShowIntercom(true)
      window.Intercom('show')
      window.Intercom('onShow', () => {
        setShowFallback(false)
        setLoading(false)
      })
      window.Intercom('onHide', () => {
        setShowIntercom(false)
      })
    }
  }

  const driftController = () => {
    drift.on('ready', api => {
      api.widget.show()
      api.sidebar.open()
      setLoading(false)
      setShowIntercom(true)
      setShowFallback(false)
      drift.on('sidebarClose', () => {
        api.widget.hide()
        setShowIntercom(false)
      })
    })
  }

  const installationFail = () => {
    setShowFallback(true)
    setLoading(false)
    setErrorMessage('Installation failed.')
  }

  const installationTimeout = () => {
    setShowFallback(true)
    setShowIntercom(false)
    setLoading(false)
    setErrorMessage(
      `Please check your network connection and disable Adblockers.`
    )
  }
  const show = () => {
    let didShowSth = false
    // When the Talk To Us button is clicked, we must respond
    // with either Intercom or the fallback form
    if (!showFallback && !showIntercom) {
      setLoading(true)
      // After TIMEOUT we must have shown something
      setTimeout(() => {
        if (!didShowSth) {
          installationTimeout()
          didShowSth = true
        }
      }, TIMEOUT)
      //Intercom is successfully installed
      switch (appName) {
        case 'intercom':
          if (window.Intercom) {
            intercomController()
            didShowSth = true
          } else {
            installationFail()
            didShowSth = true
          }
          break
        case 'drift':
          if (window.drift) {
            driftController()
            didShowSth = true
          } else {
            installationFail()
            didShowSth = true
          }
          break
        default:
          console.error('no app is defined')
          break
      }
      showComp()
    }
  }

  const component = (
    <>
      {showFallback ? (
        <DynamicLoadedNote>{errorMessage}</DynamicLoadedNote>
      ) : (
        chatPlatform
      )}
      <style jsx global>{`
        .intercom-namespace .intercom-pdrvem,
        .intercom-app {
          opacity: ${showIntercom ? 1 : 0} !important;
          visibility: ${showIntercom ? 'visible' : 'hidden'};
          transition: all 0.2s ease;
          transition-delay: 0.2s;
        }

        #drift-widget {
          opacity: ${showIntercom ? 1 : 0} !important;
          visibility: ${showIntercom ? 'visible' : 'hidden'};
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
