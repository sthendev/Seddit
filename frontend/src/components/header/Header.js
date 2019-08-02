import { header, ul, li } from '../../utils/elements.js';
import { TOKEN } from '../../api/initApi.js';
import Logo from './Logo.js';
import SedditSearch from './SedditSearch.js';
import LoginButton from './LoginButton.js';
import SignupButton from './SignupButton.js';
import UserTitle from './UserTitle.js'

const Header = () => {
    let navItems;
    if (TOKEN) {
        navItems = [
            li({classes: ['nav-item']},
                UserTitle()
            )
        ];
    } else {
        navItems = [
            li({classes: ['nav-item']},
                LoginButton()
            ),
            li({classes: ['nav-item']},
                SignupButton()
            )
        ];
    }

    const el = header({id: 'nav', classes: ['banner']},
        Logo(),
        ul({classes: ['nav']},
            li({classes: ['nav-item']},
                SedditSearch()
            ),
            ...navItems
        )
    );

    return el;
}

export default Header;