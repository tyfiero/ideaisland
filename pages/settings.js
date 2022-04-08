
import React from 'react'
import dynamic from 'next/dynamic';
// import SettingsPage from '../components/MainPage/SettingsPage';
const SettingsPageNoSSR = dynamic(() => import('../components/MainPage/SettingsPage'), {
  ssr: false
})
function Settings() {
  return (
    <SettingsPageNoSSR/>
  )
}

export default Settings;