import { withRouter } from 'next/router'
const ActiveLink = ({ children, router, href }) => {
  const className = router.pathname === href ? 'selected' : ''
  const handleClick = () => {
    router.push(href)
  }

  return (
    <li onClick={handleClick}>
      <a href={href} className={className}>
        {children}
      </a>
    </li>
  )
}

export default withRouter(ActiveLink)
