import { useState } from 'react'
import dynamic from 'next/dynamic'

import useLazyComps from './is-preload'

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

// lib
const useTalkToUs = () => {
  const INTERCOM_ID = process.env.INTERCOM_ID
  const [loading, setLoading] = useState(false)
  const [showIntercom, setShowIntercom] = useState(false)
  const [showFallback, setShowFallback] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const { component: Intercom, loadComp, showComp } = useLazyComps(
    'intercom',
    <DynamicLoadedIntercom appID={INTERCOM_ID} />
  )

  const show = e => {
    let didShowSth = false
    // When the Talk To Us button is clicked, we must respond
    // with either Intercom or the fallback form
    if (!showFallback && !showIntercom) {
      setLoading(true)
      // After TIMEOUT we must have shown something
      setTimeout(() => {
        // time is up, must show something!
        // Looks like Intercom didn't load during this time, show the form
        if (!didShowSth) {
          setShowFallback(true)
          setShowIntercom(false)
          didShowSth = true
          setLoading(false)
          setErrorMessage(
            `Please check your network connection and disable Adblockers.`
          )
        }
      }, TIMEOUT)

      //Intercom is successfully installed
      if (window.Intercom) {
        setShowIntercom(true)
        window.Intercom('show')
        window.Intercom('onShow', () => {
          didShowSth = true
          setShowFallback(false)
          setLoading(false)
        })
        window.Intercom('onHide', () => {
          setShowIntercom(false)
        })
      } else {
        //Intercom failed at installation
        setShowFallback(true)
        didShowSth = true
        setLoading(false)
        setErrorMessage(`Installation failed.`)
      }

      showComp()
    }
  }

  const component = (
    <>
      {showFallback ? (
        <DynamicLoadedNote>{errorMessage}</DynamicLoadedNote>
      ) : (
        Intercom
      )}
      <style jsx global>{`
        .intercom-namespace .intercom-pdrvem,
        .intercom-app {
          opacity: ${showIntercom ? 1 : 0};
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
