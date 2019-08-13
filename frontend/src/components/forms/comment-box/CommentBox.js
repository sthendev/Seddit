import { form } from '../../../utils/elements.js';
import TextAreaInput from '../../common/TextAreaInput.js';
import SubmitButton from '../../common/SubmitButton.js';
import * as validation from '../../../utils/validation.js';
import { getState, setState } from '../../../state/state.js';
import { comment } from '../../../actions/postActions.js';

const CommentBox = () => {
    if (!getState().loggedInUsername) return null;

    const el = form({id: 'comment-box', name: 'commentBox'},
        TextAreaInput({
            id: 'comment-text',
            placeholder: 'comment',
            name: 'commentText',
            validation: [validation.required]
        }),
        SubmitButton({
            text: 'Post Comment'
        })
    )

    el.addEventListener('submit', (event) => {
        event.preventDefault();

        const form = document.commentBox;

        form.commentText.dispatchEvent(new Event('blur'));

        if (form.querySelector('.error')) return;
        const commentText = form.commentText.value;

        const updatedPostDetails = {...getState().postDetails};
        updatedPostDetails.comments.splice(0, 0, {
            author: getState().loggedInUsername,
            comment: commentText,
            published: new Date().getTime()/1000
        });

        const updatedPosts = [...getState().posts];
        const inPostsIndex = updatedPosts.findIndex(post => post.id === getState().openPostId);
        if (inPostsIndex >= 0) {
            updatedPosts[inPostsIndex].comments.splice(0, 0, {
                author: getState().loggedInUsername,
                comment: commentText,
                published: new Date().getTime()/1000
            });
            setState({posts: updatedPosts, postDetails: updatedPostDetails});
        } else {
            setState({postDetails: updatedPostDetails});
        }
        comment(commentText, getState().openPostId);
        const openPostContent = document.getElementById('open-post-content');
        openPostContent.scrollTo({top: openPostContent.scrollHeight, behavior: 'smooth'});
    })

    return el;
}

export default CommentBox;