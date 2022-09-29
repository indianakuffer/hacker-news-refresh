import { Comment as CommentInterface, Story } from "../global/interfaces";
import Comment from "./Comment";
import styles from "../styles/Content.module.scss";
import { useEffect, useState } from "react";

const Content = (props: any) => {
  const { story }: { story: Story } = props;
  const [commentData, setCommentData] = useState<{
    [commentId: number]: CommentInterface;
  }>({});

  const renderStory = () => {
    const { title, time, by, url } = story;
    return (
      <>
        <div className={styles.storyHeader}>
          <a href={url} target="_blank" rel="noreferrer">
            <h1>{title}</h1>
          </a>
          <div className={styles.author}>{by}</div>
          {renderTime(time)}
        </div>

        <ul className={styles.commentsWrapper}>
          {story.kids.map((comment) => (
            <Comment
              key={comment}
              commentId={comment}
              depth={0}
              firstInSeries={true}
              commentData={commentData}
              setCommentData={setCommentData}
            />
          ))}
        </ul>
      </>
    );
  };

  const renderTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const formattedDate = date.toLocaleString([], {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    const formattedTime = date.toLocaleString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return (
      <span
        className={styles.time}
      >{`${formattedTime} - ${formattedDate}`}</span>
    );
  };

  return <>{renderStory()}</>;
};

export default Content;
