/* eslint-disable react/prop-types */
import React from 'react'

const ComponentName = 'Spinner'

const Component = ({ className }) => (
  <div className={`lds-roller ${className}`}>
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
  </div>
)

Component.displayName = ComponentName

export default Component
