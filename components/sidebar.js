import ActiveLink from '../components/activeLink'
import MenuToggle from '../components/menu-toggle'
import { useState } from 'react'
const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState(false)
  const onHandleClick = () => {
    setOpenMenu(!openMenu)
  }
  return (
    <div className={openMenu ? 'sidebar open' : 'sidebar'}>
      <ul>
        <h3>Chat Platforms</h3>
        <ActiveLink href="/chatlio">Chatlio</ActiveLink>
        <ActiveLink href="/crisp">Crisp</ActiveLink>
        <ActiveLink href="/drift">Drift</ActiveLink>
        <ActiveLink href="/">Intercom</ActiveLink>
        <ActiveLink href="/zendesk">Zendesk</ActiveLink>
      </ul>
      <a href="https://zeit.co/blog/real-time-customer-support">Read the Blog Post →</a>
      <div className="hide-desktop" onClick={onHandleClick}>
        <MenuToggle expanded={openMenu} />
      </div>
      <style jsx>
        {`
          .sidebar {
            background: var(--grey-4);
            position: fixed;
            width: 270px;
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 30px 0;
          }

          a {
            margin-left: 30px;
            font-size: 13px;
            text-decoration: none;
            color: #0076FF;
          }

          a:hover {
            text-decoration :underline;
          }

          .sidebar ul h3 {
            padding-left: 30px;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 1.3px;
            font-weight: 400;
            color: #888;
          }

          .sidebar ul :global(li) {
            padding: 4px 10px 4px 30px;
            margin: 10px 0;
          }

          .sidebar ul :global(li a) {
            font-size: 14px;
            color: var(--black);
            box-sizing: border-box;
          }

          .sidebar ul :global(li a.selected) {
            font-weight: bold;
            color: var(--black);
          }

          .hide-desktop {
            display: none;
          }

          @media (max-width: 768px) {
            .sidebar {
              position: absolute;
              width: 100vw;
              height: 70px;
              background: #fff;
            }

            .sidebar.open {
              width: 100vw;
              height: 100vh;
              z-index: 100;
              background: var(--grey-4);
            }

            .sidebar ul {
              display: none;
            }

            .sidebar.open ul,
            .sidebar.open a {
              display: block;
            }

            a {
              display: none;
            }



            .sidebar ul :global(li) {
              border-bottom: 1px solid #eee;
              padding: 20px 10px 20px 30px;
              margin: 0;
            }

            .hide-desktop {
              position: absolute;
              right: 30px;
              top: 30px;
              display: block;
            }
          }
        `}
      </style>
    </div>
  )
}

export default Sidebar
