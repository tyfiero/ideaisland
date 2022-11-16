
import React from 'react'
import dynamic from 'next/dynamic';
const SettingsPageNoSSR = dynamic(() => import('../components/MainPage/SettingsPage'), {
  ssr: false
})
function Settings() {
  return (
    <SettingsPageNoSSR/>
  )
}

export default Settings;