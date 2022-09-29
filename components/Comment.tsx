import { useCallback, useEffect, useState } from "react";
import { htmlDecode } from "../global/functions";
import { Comment } from "../global/interfaces";
import styles from "../styles/Comment.module.scss";

const Comment = (props: any) => {
  const { commentId, depth, firstInSeries, commentData, setCommentData } =
    props;
  const [comment, setComment] = useState<Comment>(commentData[commentId]);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const liClasses = `${styles.comment} ${depth > 0 ? styles.subcomment : ""}`;

  const getCommentData = useCallback(async () => {
    const newComment = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${commentId}.json?print=pretty`
    ).then((res) => res.json());

    let newCommentData = commentData;
    newCommentData[commentId] = newComment;
    setCommentData(newCommentData);
    setComment(newComment);
  }, []);

  useEffect(() => {
    if (!comment) {
      getCommentData();
    }
  }, []);

  const handleCollapseBtnClick = (isCollapsed: boolean) => {
    setCollapsed(!isCollapsed);
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const formattedDate = date.toLocaleString([], {
      month: "numeric",
      day: "numeric",
      year: "2-digit",
    });
    const formattedTime = date.toLocaleString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return `${formattedTime} - ${formattedDate}`;
  };

  const renderSubcomments = () =>
    comment &&
    !collapsed &&
    comment.kids &&
    comment.kids.map((commentId, idx) => (
      <Comment
        key={commentId}
        commentId={commentId}
        depth={depth + 1}
        firstInSeries={!idx}
        commentData={commentData}
        setCommentData={setCommentData}
      />
    ));

  const renderBorders = (depth: number) => {
    return [...Array(depth)].map((x, idx) => (
      <div
        key={`border-${commentId}-${idx}`}
        className={`${styles.border} ${
          firstInSeries && idx == 0 ? styles.short : ""
        }`}
        // @ts-ignore custom css variable
        style={{ "--depth-offset": (idx + 1) * -20 + "px" }}
      ></div>
    ));
  };

  return (
    <>
      {comment && (
        <li
          key={commentId}
          id={`comment-${commentId}`}
          className={liClasses}
          // @ts-ignore custom css variable
          style={{ "--comment-depth": depth + "px" }}
        >
          <div
            className={styles.commentHeader}
            onClick={() => handleCollapseBtnClick(collapsed)}
          >
            <span className={styles.author}>{comment.by}</span>
            <span className={styles.timestamp}>{formatTime(comment.time)}</span>
            <span className={styles.collapsedText}>
              {collapsed ? "(collapsed)" : ""}
            </span>
          </div>
          {!collapsed && (
            <div className={styles.text}>
              {comment.text && htmlDecode(comment.text)}
            </div>
          )}
          {renderBorders(depth)}
        </li>
      )}
      {renderSubcomments()}
    </>
  );
};

export default Comment;
