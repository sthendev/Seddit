import { div } from '../utils/elements.js';
import Header from './header/Header.js';
import Main from './main/Main.js';

const App = div({id: 'app'},
    Header,
    Main
);

export default App;