import { div } from '../../utils/elements.js';
import OpenPostVoter from './OpenPostVoter.js';
import OpenPostContent from './OpenPostContent.js';
import Loader from '../loader/Loader.js';
import { getPostFromId } from '../../actions/postActions.js';
import { getUsernameFromId } from '../../actions/userActions.js';
import { getState, setState, subscribe } from '../../state/state.js';

const getPostDetails = async (postId) => {
    setState({postLoading: true});

    let response = {};
    try {
        getState().extendLoaders && await delay(800);
        response = await getPostFromId(postId);
    } catch(error) {
        console.error(error);
        response.hasError = true;
    }

    if (response.hasError) {
        setState({postLoading: false});
        return;
    }

    const postDetails = response;

    const upvoters = [];
    for (let userId of postDetails.meta.upvotes) {
        const username = await getUsernameFromId(userId);
        upvoters.push(username);
    }
    postDetails.meta.upvotes = upvoters;

    setState({postLoading: false, postDetails: postDetails});
}

const OpenPost = () => {
    const mounted  = document.getElementById('open-post');

    !mounted && getPostDetails(getState().openPostId);

    if (getState().postLoading) {
        return div({id: 'open-post'},
            Loader()
        );
    }

    const el = div({id: 'open-post', classes: ['post']},
        OpenPostVoter(),
        OpenPostContent()
    );

    return el;
}

subscribe('open-post', OpenPost, ['postLoading'], ['style.maxHeight']);

export default OpenPost;