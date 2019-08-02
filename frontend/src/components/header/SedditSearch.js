import { input } from '../../utils/elements.js';

const SedditSearch = () => {
    const el = input({
        id: 'search',
        placeholder: 'Search Seddit',
        type: 'search',
        data: 'id-search'
    });

    return el;
}

export default SedditSearch;