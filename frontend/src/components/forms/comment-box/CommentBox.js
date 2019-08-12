import { form } from '../../../utils/elements.js';
import TextAreaInput from '../../common/TextAreaInput.js';
import SubmitButton from '../../common/SubmitButton.js';
import * as validation from '../../../utils/validation.js';
import { getState, setState } from '../../../state/state.js';
import { comment } from '../../../actions/postActions.js';

const CommentBox = () => {
    if (!getState().loggedInUser) return null;

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
        
        const postIndex = getState().openPostIndex;
        const commentText = form.commentText.value;
        
        const updatedPosts = [...getState().posts];
        updatedPosts[postIndex].comments.splice(0, 0, {
            author: getState().loggedInUser.username,
            comment: commentText,
            published: new Date().getTime()
        });
        comment(commentText, getState().posts[postIndex].id);
        setState({posts: updatedPosts});
    })

    return el;
}

export default CommentBox;