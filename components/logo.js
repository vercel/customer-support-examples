const Logo = ({ height, width }) => (
  <svg
    viewBox="0 0 226 200"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="zeit"
    height={height || '65px'}
    width={width || '71.5px'}
  >
    <defs>
      <linearGradient x1="196.572%" y1="228.815%" x2="50%" y2="50%" id="a">
        <stop offset="0%" />
        <stop offset="100%" />
      </linearGradient>
    </defs>
    <path
      fill="url(#a)"
      d="M254 156.46L367 356H141z"
      transform="translate(-141 -156)"
    />
  </svg>
)

export default Logo
