import { form, h3, div } from '../../../utils/elements.js';
import { post, update } from '../../../actions/postActions.js';
import { getState, setState, subscribe } from '../../../state/state.js';
import * as validation from '../../../utils/validation.js';
import delay from '../../../utils/delay.js';
import TextBoxInput from '../../common/TextBoxInput.js';
import TextAreaInput from '../../common/TextAreaInput.js';
import ImageInput from '../../common/ImageInput.js';
import SubmitButton from '../../common/SubmitButton.js';
import Loader from '../../loader/Loader.js';
import { closeModal } from '../../modal/Modal.js';

const convertToBase64 = (file) => new Promise((resolve) => {
    let imgData = '';

    if (file) {
        const reader = new FileReader();

        reader.onload = () => {
            imgData = reader.result
            imgData = imgData.replace('data:image/png;base64,', '');
            resolve(imgData);
        }

        reader.readAsDataURL(file);
    } else {
        resolve(imgData);
    }
});

const sendPost = async () => {
    const form = document.postForm;

    const inputs = Array.from(form.querySelectorAll('input, textarea'));
    inputs.forEach(input => input.dispatchEvent(new Event('blur')))

    if (form.querySelector('.error')) return;

    const payload = {
        title: form.title.value,
        text: form.text.value,
        subseddit: form.subseddit.value ? form.subseddit.value : 'all',
        image: await convertToBase64(form.image.files[0])
    }
    
    setState({sendPostLoading: true});

    let response = {};
    try {
        getState().extendLoaders && await delay(800);
        response = await post(payload);
    } catch(error) {
        console.error(error);
        response.hasError = true;
    }
    
    if (response.hasError) {
        setState({sendPostLoading: false});
        if (typeof(response.data) !== 'undefined') {
            document.postForm.querySelector('#submit-error').textContent = response.data;
        }
    } else {
        const updatedState = {sendPostLoading: false};
        if (getState().publicPosts) {
            const newPost = {
                id: response.data,
                title: payload.title,
                text: payload.text,
                image: payload.image,
                comments: [],
                meta: {
                    author: getState().loggedInUsername,
                    published: new Date().getTime()/1000,
                    subseddit: payload.subseddit,
                    upvotes: []
                }
            };

            updatedState.posts = [newPost, ...getState().posts];
        }
        setState(updatedState);
        closeModal();
    }
}

const updatePost = async () => {
    const form = document.postForm;

    const inputs = Array.from(form.querySelectorAll('input, textarea'));
    inputs.forEach(input => input.dispatchEvent(new Event('blur')))

    if (form.querySelector('.error')) return;

    const updatedImage = await convertToBase64(form.image.files[0])

    const payload = {
        title: form.title.value,
        text: form.text.value
    }

    if (updatedImage) {
        payload.image = updatedImage;
    }
    
    setState({sendPostLoading: true});

    let response = {};
    try {
        getState().extendLoaders && await delay(800);
        response = await update(payload, getState().openPostId);
    } catch(error) {
        console.error(error);
        response.hasError = true;
    }
    
    if (response.hasError) {
        setState({sendPostLoading: false});
        if (typeof(response.data) !== 'undefined') {
            document.postForm.querySelector('#submit-error').textContent = response.data;
        }
    } else {
        const updatedPostDetails = {...getState().postDetails, ...payload};
        const updatedPosts = [...getState().posts];
        const inPostsIndex = updatedPosts.findIndex(post => post.id === getState().openPostId);
        if (inPostsIndex >= 0) {
            updatedPosts[inPostsIndex] = {...updatedPosts[inPostsIndex], ...payload};
            setState({sendPostLoading: false, posts: updatedPosts, postDetails: updatedPostDetails, openPostId: null});
        } else {
            setState({sendPostLoading: false, postDetails: updatedPostDetails, openPostId: null});
        }
        closeModal();
    }
}

const PostForm = (isEdit) => {
    const {title, text} = isEdit ? getState().postDetails : {title: "", text: ""};

    let bottomContent;
    if (getState().sendPostLoading) {
        bottomContent = Loader();
    } else {
        bottomContent = SubmitButton({text: isEdit ? 'Update' : 'Post'});
    }

    const subsedditInput =  isEdit ? null 
        : div({classes: ['center-content']},
            TextBoxInput({
                id: 'subseddit',
                placeholder: 'subseddit',
                type: 'text',
                label: 'optional (defaults to s/all)',
                name: 'subseddit',
                preText: 's/',
                disabled: getState().sendPostLoading,
                validation: [validation.allowedCharacters]
            })
        );

    const el = form({id: 'post-form', name: 'postForm'},
        div({classes: ['center-content']},
            h3({
                classes: ['form-title', 'alt-text'],
                text: isEdit ? 'Edit Post' : 'Post'
            })
        ),
        div({classes: ['center-content']},
            TextBoxInput({
                id: 'title',
                placeholder: 'title',
                type: 'text',
                name: 'title',
                disabled: getState().sendPostLoading,
                validation: [
                    validation.required,
                    validation.maxLength(50)
                ],
                value: title
            })
        ),
        div({classes: ['center-content']},
            TextAreaInput({
                id: 'text',
                placeholder: 'text',
                name: 'text',
                disabled: getState().sendPostLoading,
                validation: [validation.required],
                value: text
            })
        ),
        subsedditInput,
        div({classes: ['center-content']},
            ImageInput({
                id: 'image',
                name: 'image',
                label: 'optional (only png files accepted)',
                disabled: getState().sendPostLoading
            })
        ),
        div({classes: ['center-content']},
            div({
                id: 'submit-error'
            })
        ),
        div({classes: ['center-content']},
            bottomContent
        )
    );

    el.addEventListener('submit', (event) => {
        event.preventDefault();
        if (isEdit) {
            updatePost();
        } else {
            sendPost();
        }
    });

    return el;
}

subscribe('post-form', PostForm, ['sendPostLoading'], ['title.value', 'text.value', 'subseddit.value', 'image.files']);

export default PostForm;