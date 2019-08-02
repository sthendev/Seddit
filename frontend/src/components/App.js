import Header from './header/Header.js';
import Main from './main/Main.js';
import Loader from './loader/Loader.js'
import { div } from '../utils/elements.js';
import { getState, setState, subscribe } from '../state/state.js';
import { TOKEN } from '../api/initApi.js';
import { getLoggedInUser } from '../actions/userActions.js';


const getUserFromToken = async () => {
    setState({appLoading: true});

    if (!TOKEN) {
        setState({appLoading: false});
        return;
    }

    let response = {};
    try {
        response = await getLoggedInUser();
    } catch(error) {
        response.hasError = true;
    }

    if (response.hasError) {
        localStorage.clear();
        location.reload();
    } else {
        setState({
            appLoading: false,
            loggedInUser: response.data
        });
    }
}

const App = () => {
    !document.getElementById('app') && getUserFromToken();

    let appContent;
    if (getState().appLoading) {
        appContent = [
            Loader()
        ]
    } else {
        appContent = [
            Header(),
            Main()
        ];
    }

    const el = div({id: 'app'},
        ...appContent
    );

    return el;
}

subscribe('app', App, ['appLoading', 'loggedInUser']);

export default App;