/*
  FILE: src/components/ui/Card.jsx
  WHAT THIS FILE CARRIES:
  - Reusable white rounded card (class "card-wrapper") that wraps screen content.
  - Accepts an extra className so each screen can add its own card style.
  - Pure UI component (same in static and dynamic versions).
*/
import React from 'react'
import clsx from "clsx"

const Card = ({ className, children }) => {
  return (
    <div className={clsx("card-wrapper", className)}>
      {children}
    </div>
  )
}

export default Card

