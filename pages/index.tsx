import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import Content from "../components/Content";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  const [stories, setStories] = useState<number[]>([]);
  const [storyData, setStoryData] = useState<{}>({});
  const [displayedStories, setDisplayedStories] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [expandedStory, setExpandedStory] = useState<number | null>();

  useEffect(() => {
    // on load, get top stories
    getTopStories().catch(console.error);
  }, []);

  useEffect(() => {
    // when stories updates, update displayed stories
    setDisplayedStories(stories.slice((page - 1) * perPage, page * perPage));
    displayedStories.forEach(async (storyId) => {
      if (!storyData[storyId]) {
        const data = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`
        ).then((res) => res.json());
        setStoryData({ ...storyData, [storyId]: data });
      }
    });

    // stor

    // let result: any[] = [];
    // stories
    //   .slice((page - 1) * perPage, page * perPage)
    //   .forEach(async (story) => {
    //     const data = await fetch(
    //       `https://hacker-news.firebaseio.com/v0/item/${story}.json?print=pretty`
    //     ).then((res) => res.json());
    //     result.push(data);
    //     setDisplayedStories([...result]);
    //   });
  }, [stories, page]);

  useEffect(() => {
    console.log("opening", expandedStory);
  }, [expandedStory]);

  const getTopStories = useCallback(async () => {
    const data = await fetch(
      "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
    ).then((res) => res.json());

    setStories(data);
  }, []);

  const getBestStories = useCallback(async () => {
    const data = await fetch(
      "https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty"
    ).then((res) => res.json());

    setStories(data);
  }, []);

  const handleTopButtonClick = () => {
    page !== 1 ? setPage(1) : null;
    setExpandedStory(null);
    getTopStories();
  };

  const handleBestButtonClick = () => {
    page !== 1 ? setPage(1) : null;
    setExpandedStory(null);
    getBestStories();
  };

  const nextPage = () => {
    setExpandedStory(null);
    setPage(page + 1);
  };

  const prevPage = () => {
    setExpandedStory(null);
    setPage(page - 1);
  };

  return (
    <>
      <div className={styles.header}>
        <h1>Hacker News Refresh</h1>
        <button onClick={handleTopButtonClick}>Get Top Stories</button>
        <button onClick={handleBestButtonClick}>Get Best Stories</button>
      </div>
      <main className={styles.main}>
        <div className={styles.sidenav}>
          <div className={styles.pagination}>
            <button disabled={page - 1 === 0} onClick={prevPage}>
              -
            </button>
            <span>{page}</span>
            <button onClick={nextPage}>+</button>
          </div>
          <ul>
            {displayedStories.map((story) => (
              <li key={story.id} onClick={() => setExpandedStory(story)}>
                <div className="title">{story.title}</div>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.contentWrapper}>
          <Content item={expandedStory} />
        </div>
      </main>
    </>
  );
};

export default Home;
