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
        <ActiveLink href="/">Intercom</ActiveLink>
        <ActiveLink href="/drift">Drift</ActiveLink>
        <ActiveLink href="/zendesk">Zendesk</ActiveLink>
      </ul>
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
          }

          .sidebar {
            padding-top: 70px;
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
            font-weight: 600;
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

            .sidebar.open ul {
              display: block;
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
