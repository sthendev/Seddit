import { button } from '../../utils/elements.js';
import {follow} from '../../actions/userActions.js';
import { getState, setState } from '../../state/state.js';

const FollowButton = () => {
    if (getState().openUsername === getState().loggedInUsername) return null;
    const userDetails = getState().userDetails;

    const followClasses = ['button'];
    if (userDetails.followed) {
        followClasses.push('button-primary');
    } else {
        followClasses.push('button-secondary');
    }

    const el = button({
        classes: followClasses,
        text: userDetails.followed ? 'Unfollow': 'Follow'
    })

    el.addEventListener('click', () => {
        const userDetails = getState().userDetails;
        const updatedUserDetails = {...userDetails, followed: !userDetails.followed};
        follow(getState().openUsername, !userDetails.followed);
        setState({userDetails: updatedUserDetails});
    });

    return el;
}

export default FollowButton;