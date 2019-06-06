const Note = ({ children, ...props }) => {
  return (
    <div className="note warning" {...props}>
      Fallback: {children}
      <style jsx>{`
        .note {
          padding: 16px 24px;
          border-radius: 4px;
          background: var(--white);
          border: 1px solid var(--grey-3);
          font-size: 14px;
          line-height: 1.8;
          color: var(--black);
        }
        .note.warning {
          border-color: var(--red);
        }
        .note.warning .type {
          color: var(--red);
        }
      `}</style>
    </div>
  )
}

export default Note
