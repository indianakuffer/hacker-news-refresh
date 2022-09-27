import { useEffect, useState, useCallback } from "react";
import { Story } from "../global/interfaces";
import styles from "../styles/StoryLink.module.scss";

const StoryLink = (props: any) => {
  const { storyId, storyData, setExpandedStory } = props;
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
      {story && (
        <li
          key={story.id}
          id={`story-${story.id}`}
          className={styles.link}
          onClick={() => setExpandedStory(story)}
        >
          <div className={styles.title}>{story.title}</div>
          <div className={styles.commentCount}>
            📣 {story.kids && story.kids.length}
          </div>
          <div className={styles.score}>🔺 {story.score}</div>
        </li>
      )}
    </>
  );
};

export default StoryLink;
