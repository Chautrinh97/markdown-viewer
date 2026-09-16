
var Plantuml = () => {
  var defaults = {
    server: '',
    timeout: null,
  }

  var state = Object.assign({}, defaults)

  chrome.runtime.sendMessage({message: 'plantuml.get'}, (res) => {
    Object.assign(state, res)
    m.redraw()
  })

  var events = {
    server: (e) => {
      state.server = e.target.value
      clearTimeout(state.timeout)
      state.timeout = setTimeout(() => {
        chrome.runtime.sendMessage({
          message: 'plantuml.set',
          plantuml: {server: state.server},
        })
      }, 750)
    }
  }

  var oncreate = {
    textfield: (vnode) => {
      mdc.textfield.MDCTextField.attachTo(vnode.dom)
    }
  }

  var render = () =>
    m('.bs-callout m-plantuml',
      m('.row',
        m('.col-xxl-6.col-xl-6.col-lg-6.col-md-6.col-sm-12',
          m('span.m-label',
            'PlantUML Server'
          )
        ),
        m('.col-xxl-6.col-xl-6.col-lg-6.col-md-6.col-sm-12',
          m('.mdc-text-field m-textfield', {
            oncreate: oncreate.textfield,
            },
            m('input.mdc-text-field__input', {
              type: 'text',
              onkeyup: events.server,
              value: state.server,
            }),
            m('.mdc-line-ripple')
          )
        ),
      ),
    )

  return {state, render}
}
