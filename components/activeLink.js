import { withRouter } from 'next/router'
const ActiveLink = ({ children, router, href }) => {
  const className = router.pathname === href ? 'selected' : ''
  const handleClick = e => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  )
}

export default withRouter(ActiveLink)
