import { main, ul, div, h3 } from '../../utils/elements.js';
import PostButton from './PostButton.js';
import Post from './Post.js';

const Main = main({role: 'main'},
    ul({id: 'feed', data: 'id-feed'},
        div({classes: ['feed-header']},
            h3({classes: ['feed-title', 'alt-text'], text: 'Popular posts'}),
            PostButton
        ),
        Post(),
        Post(),
        Post(),
        Post(),
        Post(),
        Post(),
        Post(),
        Post(),
        Post(),
        Post(),
        Post(),
        Post()
    )
);

export default Main;