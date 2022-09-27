import { useCallback, useEffect, useState } from "react";
import { htmlDecode } from "../global/functions";
import { Comment } from "../global/interfaces";
import styles from "../styles/Comment.module.scss";

const Comment = (props: any) => {
  const { commentId } = props;
  const [comment, setComment] = useState<Comment | undefined>();

  const getCommentData = useCallback(async () => {
    const data = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${commentId}.json?print=pretty`
    ).then((res) => res.json());
    setComment(data);
  }, []);

  useEffect(() => {
    if (!comment) {
      getCommentData();
    }
  }, []);

  return (
    <>
      {comment && (
        <li
          key={commentId}
          id={`comment-${commentId}`}
          className={styles.comment}
        >
          <div className={styles.text}>
            {comment.text && htmlDecode(comment.text)}
          </div>
          <div className={styles.author}>{comment.by}</div>
        </li>
      )}
    </>
  );
};

export default Comment;
