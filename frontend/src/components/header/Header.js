import { header, ul, li } from '../../utils/elements.js';
import Logo from './Logo.js';
import SedditSearch from './SedditSearch.js';
import LoginButton from './LoginButton.js';
import SignupButton from './SignupButton.js';

const Header = header({id: 'nav', classes: ['banner']},
    Logo,
    ul({classes: ['nav']},
        li({classes: ['nav-item']},
            SedditSearch
        ),
        li({classes: ['nav-item']},
            LoginButton
        ),
        li({classes: ['nav-item']},
            SignupButton
        )
    )
);

export default Header;