/**
 * Written by A. Hinds with Z. Afzal 2018 for UNSW CSE.
 * 
 * Updated 2019.
 */

// import your own scripts here.
import App from './components/App.js';
import initApi from './api/initApi.js';


// your app must take an apiUrl as an argument --
// this will allow us to verify your apps behaviour with 
// different datasets.
function initApp(apiUrl) {
    initApi(apiUrl);
    document.getElementById('root').appendChild(App());
}

export default initApp;
