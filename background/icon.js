
md.icon = ({storage: {state}}) => () => {

  setTimeout(() => {
    chrome.action.setIcon({
      path: [16, 19, 38, 48, 128].reduce((all, size) => (
        all[size] = `/icons/${state.settings.icon}/${size}x${size}.png`,
        all
      ), {})
    })
    chrome.action.setBadgeText({text: state.enabled ? '' : 'OFF'})
    chrome.action.setBadgeBackgroundColor({color: '#607d8b'})
  }, 100)
}
