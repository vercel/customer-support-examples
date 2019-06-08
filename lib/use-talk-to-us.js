import { useState } from 'react'
import dynamic from 'next/dynamic'

import useLazyComps from './use-preload'
import Textarea from '../components/textarea'
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

export const DynamicLoadedZendesk = dynamic(
  import('./zendesk')
    .then(comp => comp)
    .catch(err => {
      return (
        <DynamicLoadedNote>Zendesk module is not loaded.</DynamicLoadedNote>
      )
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
  const [showFallbackMessage, setShowFallbackMessage] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const comp = appName => {
    if (appName === 'intercom') {
      return useLazyComps(
        'intercom',
        <DynamicLoadedIntercom appID={INTERCOM_ID} />
      )
    } else if (appName === 'drift') {
      return useLazyComps('drift', <DynamicLoadedDrift appId={DRIFT_ID} />)
    } else {
      return useLazyComps('zendesk', <DynamicLoadedZendesk />)
    }
  }

  const { component: chatPlatform, loadComp, showComp } = comp(appName)

  const installationFail = () => {
    setShowFallbackMessage(true)
    setLoading(false)
    setErrorMessage('Installation failed.')
  }

  const installationTimeout = () => {
    setShowFallbackMessage(true)
    setShowChat(false)
    setLoading(false)
    setErrorMessage(
      `Please check your network connection and disable Adblockers.`
    )
  }

  const showIntercom = () => {
    let didShowSth = false
    // When the Talk To Us button is clicked, we must respond
    // with either Intercom or the fallback form
    if (!showFallbackMessage && !showChat) {
      setLoading(true)
      // After TIMEOUT we must have shown something
      setTimeout(() => {
        if (!didShowSth) {
          installationTimeout()
          didShowSth = true
        }
      }, TIMEOUT)

      if (window.Intercom) {
        window.Intercom('show')
        window.Intercom('onShow', () => {
          setShowFallbackMessage(false)
          setLoading(false)
          setShowChat(true)
          didShowSth = true
        })
        window.Intercom('onHide', () => {
          setShowChat(false)
        })
      } else {
        installationFail()
        didShowSth = true
      }
    }
  }

  const showDrift = () => {
    let didShowSth = false
    // When the Talk To Us button is clicked, we must respond
    // with either Intercom or the fallback form
    if (!showFallbackMessage && !showChat) {
      setLoading(true)
      // After TIMEOUT we must have shown something
      setTimeout(() => {
        if (!didShowSth) {
          installationTimeout()
          didShowSth = true
        }
      }, TIMEOUT)

      if (window.drift) {
        drift.on('ready', api => {
          api.widget.show()
          api.sidebar.open()
          api.hideWelcomeMessage()
          setLoading(false)
          setShowChat(true)
          setShowFallbackMessage(false)
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
    }
  }

  const showZendesk = () => {
    let didShowSth = false
    // When the Talk To Us button is clicked, we must respond
    // with either Intercom or the fallback form
    if (!showFallbackMessage && !showChat) {
      setLoading(true)
      // After TIMEOUT we must have shown something
      setTimeout(() => {
        if (!didShowSth) {
          installationTimeout()
          didShowSth = true
        }
      }, TIMEOUT)

      if (window.zE && zE) {
        // As current Zendesk onOpen event only links interaction on Zendesk widget,
        // we show the badge instead of open the conversation
        zE('webWidget', 'show')
        setShowChat(true)
        setLoading(false)
        didShowSth = true
        zE('webWidget:on', 'close', () => {
          setShowChat(false)
        })
      } else {
        installationFail()
        didShowSth = true
      }
    }
  }

  const show = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    const mobileLoadingTimout = isMobile ? 500 : 0
    setTimeout(() => {
      switch (appName) {
        case 'intercom':
          showIntercom()
          break
        case 'drift':
          showDrift()
          break
        case 'zendesk':
          showZendesk()
          break
        default:
          return
      }
    }, mobileLoadingTimout)

    showComp()
  }

  const component = (
    <>
      {showFallbackMessage ? (
        <div className="fallback-wrapper">
          <DynamicLoadedNote>
            {errorMessage}
            <Textarea placeholder="Leave your feedback here" />
          </DynamicLoadedNote>
        </div>
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

        .intercom-namespace .intercom-borderless-frame,
        .intercom-namespace .intercom-launcher-badge-frame {
          opacity: 0;
        }

        #drift-widget {
          opacity: ${showChat ? 1 : 0} !important;
          visibility: ${showChat ? 'visible' : 'hidden'};
          transition: all 0.2s ease;
          transition-delay: 0.2s;
        }

        .zEWidget-launcher {
          opacity: ${showChat ? 1 : 0} !important;
          visibility: ${showChat ? 'visible' : 'hidden'};
          transition: all 0.2s ease;
          transition-delay: 0.2s;
        }

        .fallback-wrapper {
          margin: 20px 15px;
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
