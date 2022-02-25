//if (document.location.origin.endsWith('weeblr.com')) {
window.addEventListener("DOMContentLoaded", function (e) {
    var tagsList = ['h2', 'h3', 'h4']
    var tags = []
    tagsList.map(function (tag) {
        tags[tag] = document.getElementsByTagName(tag)
    })
    let current = document.location.origin + document.location.pathname + document.location.search
    let copyInput = document.createElement('input')
    copyInput.type = 'text'
    copyInput.id = 'wb-copy-input'
    copyInput.setAttribute('aria-hidden', true)
    copyInput.setAttribute('tabindex', -1)
    copyInput.classList.add('wb-sr-only')
    document.body.appendChild(copyInput)

    let copyLink = function (e) {
        e.preventDefault()
        e.stopPropagation()
        var copyEl = this
        copyInput.value = e.target.dataset.link
        copyInput.select()
        document.execCommand("copy")
        copyInput.value = ''
        copyEl.textContent = 'Copied!'
        setTimeout(function () {
            copyEl.textContent = 'Copy link'
        }, 3000)
        e.target.focus()
    }

    let processTag = function (tag) {
        if (!tag.id) {
            return
        }
        let copyEl = document.createElement('button')
        copyEl.textContent = 'Copy link'
        copyEl.dataset.link = current + '#' + tag.id
        copyEl.classList.add('wb-copy-link')
        copyEl.addEventListener("click", copyLink)
        tag.appendChild(copyEl)
    }
    tagsList.map(function (tag) {
        for (let i = 0; i < tags[tag].length; i++) {
            processTag(tags[tag][i])
        }
    })
})

var wbModal = (function () {
    var wbModalContainer
    var wbModalClose
    var wbModalImage
    var current

    const initModal = function () {
        if (!wbModalContainer) {
            let containerEl = document.createElement('div')
            containerEl.classList.add('wb-modal-container')
            wbModalContainer = document.body.appendChild(containerEl)
            let modalWrapperEl = document.createElement('div')
            modalWrapperEl.classList.add('wb-modal-wrapper')
            modalWrapperEl = wbModalContainer.appendChild(modalWrapperEl)
            let closeEl = document.createElement('button')
            closeEl.classList.add('wb-modal-close')
            closeEl.innerHTML = '&times;'
            closeEl.setAttribute('aria-label', 'Press Enter or Space to close enlarged image.')
            closeEl.addEventListener('click', wbModal.close)
            wbModalClose = modalWrapperEl.appendChild(closeEl)
            let imgEl = document.createElement('img')
            imgEl.classList.add('wb-modal-img')
            wbModalImage = modalWrapperEl.appendChild(imgEl)
        }
    }

    const keyboardHandler = function (e) {
        if (wbModal.isEscape(e)) {
            e.preventDefault()
            e.stopPropagation()
            wbModal.close()
        }
        if (!wbModal.isEnterOrSpace(e)) {
            e.preventDefault()
            e.stopPropagation()
        }
    }

    const clickHandler = function (e) {
        if (e.target !== wbModalClose) {
            e.preventDefault()
            e.stopPropagation()
            wbModalClose.focus()
        }
    }

    return {
        open: function (img) {
            if (current) {
                return
            }
            initModal()
            wbModalImage.setAttribute(
                'src',
                img.getAttribute('src')
            )
            let alt = img.getAttribute('alt')
            alt && wbModalImage.setAttribute('alt', alt)
            let title = img.getAttribute('title')
            title && wbModalImage.setAttribute('title', title)
            current = img
            wbModalContainer.style.display = 'flex'
            setTimeout(wbModal.focus, 200)
        },

        close: function () {
            if (!current) {
                return
            }
            current.focus()
            current = null
            initModal()
            wbModalContainer.removeEventListener('keydown', keyboardHandler)
            wbModalContainer.removeEventListener('click', clickHandler)
            wbModalContainer.style.display = 'none'
        },

        focus: function () {
            if (current) {
                wbModalClose.focus()
                wbModalContainer.addEventListener('keydown', keyboardHandler)
                wbModalContainer.addEventListener('click', clickHandler)
            }
        },

        isEscape: function (e) {
            return e.key === 'Escape' || e.keyCode === 27
        },
        isEnterOrSpace: function (e) {
            return e.key === 'Enter' || e.keyCode === 13 || e.key === 'Space' || e.keyCode === 32
        }
    }

}());

window.addEventListener("DOMContentLoaded", function (e) {
    if (
        document.documentElement.clientWidth < 768
        ||
        document.documentElement.clientHeight < 600
    ) {
        return
    }

    var tagsList = ['img']
    var tags = []
    tagsList.map(function (tag) {
        tags[tag] = document.getElementsByTagName(tag)
    })

    let openOnKey = function (e) {
        if (wbModal.isEnterOrSpace(e)) {
            e.preventDefault()
            e.stopPropagation()
            wbModal.open(e.target)
        }
    }

    let modalImage = function (e) {
        e.preventDefault()
        e.stopPropagation()
        wbModal.open(e.target)
    }

    let processTag = function (tag) {
        tag.setAttribute('tabindex', '0')
        tag.setAttribute('aria-label', 'Press Enter or Space to enlarge image.')
        tag.addEventListener("keydown", openOnKey)
        tag.addEventListener("click", modalImage)
    }

    tagsList.map(function (tag) {
        for (let i = 0; i < tags[tag].length; i++) {
            processTag(tags[tag][i])
        }
    })
})
// }
