import { div } from '../utils/elements.js';
import Header from './header/Header.js';
import Main from './main/Main.js';
import Footer from './footer/Footer.js';

const App = div({id: 'app'},
    Header,
    Main,
    Footer
);

export default App;