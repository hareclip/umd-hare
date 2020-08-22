import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faSortDown, faBars, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { } from '@fortawesome/free-regular-svg-icons'
import { faTwitter, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons'

const icons = [
    faSearch, faSortDown, faBars, faEnvelope,
    faTwitter, faInstagram, faFacebook,
]

export default {
    add: () => icons.forEach(icon => library.add(icon))
}
