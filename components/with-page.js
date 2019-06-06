import React from 'react'
import Sidebar from './sidebar'

const withPage = Comp => props => {
  return (
    <>
      <Sidebar />
      <Comp {...props} />
      <style jsx global>
        {`
          :root {
            --black: #000;
            --white: #fff;
            --blue: #0076ff;
            --red: #ff001f;
            --grey-1: #ccc;
            --grey-2: #b1b1b1;
            --grey-3: #eaeaea;
            --grey-4: #fafafa;
          }

          html {
            height: 100%;
            box-sizing: border-box;
          }

          *,
          *:before,
          *:after {
            box-sizing: inherit;
          }

          a {
            text-decoration: none;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          }

          body {
            position: relative;
            min-height: 100%;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
              'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
              'Helvetica Neue', sans-serif;
            text-rendering: optimizeLegibility;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          html,
          body {
            background-color: var(--white);
            color: var(--black);
          }

          svg {
            shape-rendering: crispEdges;
          }

          svg path,
          svg circle,
          svg polygon,
          svg rect,
          svg line {
            shape-rendering: geometricprecision;
          }

          ul,
          li {
            list-style: none;
            padding: 0;
          }
        `}
      </style>
    </>
  )
}

export default withPage
