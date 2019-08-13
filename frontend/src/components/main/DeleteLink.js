import { p } from '../../utils/elements.js';
import { deletePost } from '../../actions/postActions.js';
import { closeModal } from '../modal/Modal.js';
import { getState, setState } from '../../state/state.js';

const DeleteLink = () => {
    if (!getState().loggedInUsername
        || getState().postDetails.meta.author !== getState().loggedInUsername) {
        return null;
    }
    const el = p({
        classes: ['edit-link'],
        text: 'delete post'
    });

    el.addEventListener('click', () => {
        closeModal();
        deletePost(getState().openPostId);
        const updatedPosts = [...getState().posts];
        const inPostsIndex = updatedPosts.findIndex(post => post.id === getState().openPostId);
        if (inPostsIndex >= 0) {
            updatedPosts.splice(inPostsIndex, 1);
            setState({posts: updatedPosts, postDetails: null, openPostId: null});
        } else {
            setState({postDetails: null, openPostId: null});
        }
    });

    return el;
}

export default DeleteLink;