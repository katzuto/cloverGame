import React from 'react'
import WebView from 'react-native-webview'

const Rules = () => {
  return (
    <WebView source={require('./rules.html')} />
  )
}

export default Rules
