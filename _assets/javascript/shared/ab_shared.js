const YassssShared = {
  init: () => {
    YassssShared.setURLs()
    return YassssShared.doAThing()
  },
  watchBackButton: () => {
    window.onpopstate = () => {
      if (history.pushState) {
        const currentPath = location.pathname
        const pageName = currentPath.replace(/\//g, '')

        return YassssShared.loadPage(pageName)
      }
      window.location = location.pathname
      return null
    }
  },
  setURLs: () => {
    document.addEventListener('click', (e) => {
      // if the click is not on a link with the `follow` class, bail
      // if a modifier key is being pressed, bail (allows cmd/ctrl-click for a new tab)
      if ((e.target.tagName === 'A' && e.target.classList.contains('follow')) &&
        (!e.metaKey && !e.ctrlKey)) {
        const pageLinkElement = e.target
        const pageName = pageLinkElement.getAttribute('data-page')

        if (history.pushState) {
          let baseTitle, fullTitle, pagePath, pageTitle

          // determine page title
          if (pageLinkElement.hasAttribute('data-page-title')) {
            pageTitle = pageLinkElement.getAttribute('data-page-title')
            baseTitle = document.body.getAttribute('data-base-site-title')
            fullTitle = `${pageTitle} | ${baseTitle}`
          } else if (pageLinkElement.hasAttribute('title')) {
            pageTitle = pageLinkElement.getAttribute('title')
            baseTitle = document.body.getAttribute('data-base-site-title')
            fullTitle = `${pageTitle} | ${baseTitle}`
          } else {
            fullTitle = document.body.getAttribute('data-base-site-title')
          }
          fullTitle = fullTitle.replace('Home | ', '')

          // determine page path
          if (pageLinkElement.hasAttribute('data-page-path')) {
            pagePath = `/${pageLinkElement.getAttribute('data-page-path').replace('?page=1', '')}`
          } else {
            pagePath = pageLinkElement.getAttribute('href').replace('?page=1', '')
          }

          // update browser history
          window.history.pushState(fullTitle, fullTitle, pagePath)

          // update title tag
          document.title = fullTitle

          // save new info
          document.body.setAttribute('data-title-return', fullTitle)
          document.body.setAttribute('data-path-return', pagePath)

          // load page
          YassssShared.loadPage(pageName)
          YassssShared.watchBackButton()

          return e.preventDefault()
        }
        window.location = pageLinkElement.getAttribute('href')
        return null
      }
      return null
    }, false)
    return null
  },
  loadPage: (pageName) => {
    // scroll to page top
    document.body.scrollTop = document.documentElement.scrollTop = 0 // eslint-disable-line no-multi-assign

    const updateClassList = pageName.replace('home', 'index')
    document.body.removeAttribute('class')
    document.body.setAttribute('class', updateClassList)

    const setSharedBits = () => { // eslint-disable-line arrow-body-style
      // add shared things here
      // remove eslint disables
      return console.log('shared stuff') // eslint-disable-line no-console
    }

    let element, formElement, formHolderElement, holderElement, messageElements
    switch (pageName) {
      // case 'home' :
      case 'about' :
        return setSharedBits()
      case 'contact' :
        formElement = document.getElementById('contact_form')
        formHolderElement = formElement.closest('.form-holder')
        holderElement = formElement.closest('.holder')
        messageElements = holderElement.querySelectorAll('.message')
        if (formHolderElement) {
          formHolderElement.removeAttribute('style')
        }
        if (messageElements) {
          Array.prototype.forEach.call(messageElements, (el) => {
            element = el
            element.style.display = 'none'
          })
        }
        return setSharedBits()
      case 'sign-up' :
        return setSharedBits()
      default :
        return null
    }
  },
  doAThing: () => { // eslint-disable-line arrow-body-style
    // placeholder
    return console.log('a thing!') // eslint-disable-line no-console
  },
}

ready(YassssShared.init) // eslint-disable-line no-undef
