
var pu = (() => {
  return {
    render: () => {
      Array.from(document.querySelectorAll('pre code.plantuml')).forEach((diagram) => {
        var source = diagram.textContent
        var server = (state.plantuml.server || 'https://www.plantuml.com/plantuml').replace(/\/+$/, '')
        var img = document.createElement('img')
        img.className = 'plantuml'
        img.alt = 'plantuml diagram'
        img.src = server + '/svg/' + plantumlEncoder.encode(source)
        diagram.textContent = ''
        diagram.appendChild(img)
      })
    }
  }
})()
