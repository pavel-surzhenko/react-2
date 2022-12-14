// Core
import { formatDistance } from 'date-fns';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../hooks';

// Components
import { CommentIcon } from '../../theme/assets/comment';
import { LikeIcon } from '../../theme/assets/like';
import { Comment } from '../Comment';
import { CommentsForm } from '../forms/CommentsForm';

// mock


export const Post = observer((props) => {
    const { commentsFormStore } = useStore();
    const { selectedComment, setSelectedComment } = commentsFormStore;
    console.log(selectedComment);


    const {
        body, author, created, hash, comments,
    } = props;

    const relatedDate = formatDistance(
        new Date(created),
        new Date(), {
            addSuffix:      true,
            includeSeconds: true,
        },
    );

    const handleClick = () => {
        setSelectedComment(hash);
    };

    const commentsJSX = comments.map((comment) => (
        <Comment key = { comment.hash } { ...comment } />
    ));

    return (
        <section className = 'post'>
            <img src = 'https://placeimg.com/256/256/animals' alt = 'avatar'></img>
            <a>{ author.name }</a>
            <time> { relatedDate }</time>
            <p>{ body }</p>
            <div className = 'reaction-controls'>
                <section className = 'like'>
                    <div>
                        <span>0</span>
                    </div>
                    <span className = 'icon'>
                        <LikeIcon />
                        Like
                    </span>
                </section>
                <span className = 'comment'  onClick = { handleClick }>
                    <CommentIcon className = { 'comment-icon' } />
                    { `${comments.length}  comment${comments.length > 0 ? '' : 's'}` }
                </span>
            </div>
            { selectedComment === hash && <><CommentsForm /> { commentsJSX }</> }
        </section>
    );
});
