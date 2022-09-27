import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import Content from "../components/Content";
import StoryLink from "../components/StoryLink";
import styles from "../styles/Home.module.scss";
import { Story } from "../global/interfaces";
import Pagination from "../components/Pagination";

const Home: NextPage = () => {
  const [stories, setStories] = useState<number[]>([]);
  const [displayedStories, setDisplayedStories] = useState<number[]>([]);
  const [storyData, setStoryData] = useState<{ [id: number]: Story }>({});
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(20);
  const [expandedStory, setExpandedStory] = useState<number | null>(null);

  useEffect(() => {
    // on load, get top stories
    getTopStories().catch(console.error);
  }, []);

  useEffect(() => {
    // when stories or page updates, update displayed stories
    const currentPageStories = stories.slice(
      (page - 1) * perPage,
      page * perPage
    );
    const currentAndNextPageStories = stories.slice(
      (page - 1) * perPage,
      (page + 1) * perPage
    );
    setDisplayedStories(currentPageStories);

    // fetch next page of missing storyData
    let newStoryData = storyData;
    currentAndNextPageStories.forEach(async (storyId) => {
      if (!newStoryData[storyId]) {
        const newStory = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`
        ).then((res) => res.json());
        newStoryData[storyId] = newStory;
      }
    });
    setStoryData(newStoryData);
  }, [stories, page]);

  useEffect(() => {
    document.querySelector("#content-wrapper")!.scrollTop = 0;
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

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>Hacker News Refresh</h1>
        <button onClick={handleTopButtonClick}>Top Stories</button>
        <button onClick={handleBestButtonClick}>Best Stories</button>
      </div>
      <main className={styles.main}>
        <div className={styles.sidenav}>
          <ul>
            {displayedStories.map((storyId) => (
              <StoryLink
                key={storyId}
                storyId={storyId}
                storyData={storyData}
                setExpandedStory={setExpandedStory}
              />
            ))}
          </ul>
          <Pagination
            page={page}
            setPage={setPage}
            setExpandedStory={setExpandedStory}
          />
        </div>
        <div id="content-wrapper" className={styles.contentWrapper}>
          <Content story={expandedStory} />
        </div>
      </main>
    </>
  );
};

export default Home;
