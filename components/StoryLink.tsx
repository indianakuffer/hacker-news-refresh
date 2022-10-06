import { useEffect, useState, useCallback } from "react";
import { Story } from "../global/interfaces";
import styles from "../styles/StoryLink.module.scss";

const StoryLink = (props: any) => {
  const { storyId, storyData, expandedStory, setExpandedStory } = props;
  const [story, setStory] = useState<Story>(storyData[storyId]);

  const getStoryData = useCallback(async () => {
    const data = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`
    ).then((res) => res.json());

    setStory(data);
  }, []);

  useEffect(() => {
    if (!story) {
      getStoryData();
    }
  }, []);

  return (
    <>
      {story ? (
        <li
          key={story.id}
          id={`story-${story.id}`}
          className={`${styles.link} ${
            expandedStory && storyId === expandedStory.id ? styles.active : ""
          }`}
          onClick={() => setExpandedStory(story)}
        >
          <div className={styles.title}>{story.title}</div>
          <div className={styles.author}>{story.by}</div>
          <div className={styles.indicatorWrapper}>
            <div className={styles.commentCount}>
              📣 {story.kids && story.kids.length}
            </div>
            <div className={styles.score}>🔼 {story.score}</div>
          </div>
        </li>
      ) : (
        <li className={styles.link}></li>
      )}
    </>
  );
};

export default StoryLink;
