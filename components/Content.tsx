import { useEffect, useState } from "react";
import { Story } from "../global/interfaces";
import Comment from "./Comment";
import styles from "../styles/Content.module.scss";

const Content = (props: any) => {
  const { story }: { story: Story } = props;
  const [iframeVisible, setIframeVisible] = useState(false);

  useEffect(() => {
    setIframeVisible(false);
  }, [props]);

  const handleIframeLoad = () => {
    const iframeEl = document.querySelector("#preview-frame");
    setTimeout(() => {
      if (iframeEl.contentWindow.window.length > 0) {
        setIframeVisible(true);
      }
    }, 500);
  };

  const renderStory = () => {
    const { title, url, time, by } = story;
    return (
      <>
        <a href={url} target="_blank">
          <h1>{title}</h1>
        </a>
        <div className={styles.author}>{by}</div>
        {renderTime(time)}

        <ul className={styles.commentsWrapper}>
          {story.kids.map((comment) => (
            <Comment key={comment} commentId={comment} />
          ))}
        </ul>
        <iframe
          className={`${styles.iframe} ${iframeVisible ? styles.visible : ""}`}
          id="preview-frame"
          src={url}
          width="100%"
          onLoad={handleIframeLoad}
        />
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

  return <>{story && renderStory()}</>;
};

export default Content;
