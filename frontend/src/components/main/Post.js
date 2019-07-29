import { li, div, h4, p } from '../../utils/elements.js';

const Post = () => {
    return li({classes: ['post'], data: 'id-post'},
        div({classes: ['vote'], data: 'id-upvotes'}),
        div({classes: ['content']},
            h4({
                classes: ['post-title', 'alt-text'],
                text: 'Avenger’s Endgame Officially Passes Avatar To Become The Highest Grossing Movie Of All Time',
                data: 'id-title'
            }),
            p({
                classes: ['post-author'],
                text: 'Posted by @some_dude69',
                data: 'id-author'
            })
        )
    );
};

export default Post;