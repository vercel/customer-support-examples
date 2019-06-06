import React, { useState } from 'react'

const Textarea = ({ ...props }) => {
  const [focused, setFocused] = useState(false)
  const {
    disabled,
    maxLength,
    placeholder,
    type,
    value,
    onChange,
    onFocus,
    onBlur,
    autoFocus,
  } = props
  const handleChange = event => {
    onChange(event.target.value)
  }

  const handleFocus = event => {
    setFocused(true)
    if (onFocus) {
      onFocus(event)
    }
  }

  const handleBlur = event => {
    setFocused(false)
    if (onBlur) {
      onBlur(event)
    }
  }

  return (
    <div className={focused ? 'wrapper focused' : 'wrapper'}>
      <textarea
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        autoFocus={autoFocus}
        disabled={disabled}
        maxLength={maxLength}
        onBlur={handleBlur}
        onChange={onChange ? handleChange : null}
        onFocus={handleFocus}
        placeholder={placeholder}
        type={type || 'text'}
        value={value}
      />

      <style jsx>{`
        .wrapper {
          align-items: center;
          border-radius: 5px;
          border: 1px solid #e1e1e1;
          display: inline-flex;
          position: relative;
          transition: border 0.2s ease, color 0.2s ease;
          vertical-align: middle;
          width: 100%;
          margin-top: 10px;
        }

        .wrapper.focused {
          border: 1px solid #888;
        }

        .wrapper.errored {
          border: 1px solid red;
        }

        .wrapper.errored.focused {
          border: 1px solid red;
          color: red;
        }

        .wrapper.errored textarea {
          color: red;
        }

        textarea {
          background-color: transparent;
          border-radius: 0;
          border: 0;
          border: none;
          box-shadow: none;
          box-sizing: border-box;
          display: block;
          font-size: 14px;
          line-height: 1.7;
          height: 100%;
          min-height: 100px;
          outline: 0;
          padding: 10px;
          resize: none;
          width: 100%;
          color: #000;
        }

        .wrapper textarea:disabled {
          background: #fafafa;
          color: #999;
          border-radius: 5px;
        }

        .wrapper textarea::placeholder {
          color: #ccc;
        }

        .wrapper textarea:disabled::placeholder {
          color: #999;
        }
      `}</style>
    </div>
  )
}

export default Textarea
