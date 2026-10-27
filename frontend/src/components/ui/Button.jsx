/*
  FILE: src/components/ui/Button.jsx
  WHAT THIS FILE CARRIES:
  - Reusable button used on every screen.
  - Props: size ("small"/"large"), loading, disabled, onClick, loadingText, icon, iconPosition.
  - Builds CSS classes with clsx, e.g. size="large" + loading => "btn large loading".
  - Pure UI component (same in static and dynamic versions).
*/
import React from 'react'
import clsx from "clsx"

const Button = (props) => {
  const {
    children,
    size,
    loading,
    disabled,
    onClick = () => {},
    loadingText = "Loading...",
    icon,
    iconPosition
  } = props;

  const buttonClass = clsx("btn", size, { loading, disabled })

  return (
    <button onClick={onClick} className={buttonClass}>
      {loading ? loadingText : children}
      {/* hide icon while loading, show it on the right otherwise */}
      {!loading && iconPosition === "right" && icon}
    </button>
  )
}

export default Button

