import { useState } from 'react'

const componentPreloaded = new Map()

const useLazyComps = (key, comp) => {
  const [preloaded, setPreloaded] = useState(componentPreloaded[key])
  const [isShow, setIsShow] = useState(false)

  const loadComp = () => {
    componentPreloaded[key] = true
    setPreloaded(true)
  }
  const showComp = () => {
    setIsShow(true)
  }

  let component = null
  if (isShow) {
    component = { comp }
  }
  if (preloaded) {
    component = <span style={{ display: 'none' }}>{comp}</span>
  } else {
    component = null
  }

  return { component, loadComp, showComp }
}

export default useLazyComps
