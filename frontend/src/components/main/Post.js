import { li, div, h4, p } from '../../utils/elements.js';
import { getTimeLapsedString } from '../../utils/timeUtils.js'

const Post = ({id, text, title, meta: {author, subseddit, published, upvotes}, thumbnail, image, comments}) => {
    const timeLapsed = getTimeLapsedString(new Date(), new Date(parseInt(published)));

    const el = li({classes: ['post'], data: 'id-post'},
        div({classes: ['vote'], data: 'id-upvotes'}),
        div({classes: ['content']},
            h4({
                classes: ['post-title', 'alt-text'],
                text: `${title}...`,
                data: 'id-title'
            }),
            div({classes: ['post-info']},
                p({
                    text: 'Posted by ',
                }),
                p({
                    classes: ['post-author'],
                    text: author,
                    data: 'id-author'
                }),
                p({
                    text: ` ${timeLapsed}`
                })
            ),
            p({
                classes: ['post-text'],
                text: text,
                data: 'id-text'
            }),
        )
    );

    return el;
} 

export default Post;