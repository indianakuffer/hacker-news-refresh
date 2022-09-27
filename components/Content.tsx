import { useEffect, useState } from "react";
import styles from "../styles/Content.module.scss";

const Content = (props: any) => {
  const { item } = props;
  const [itemData, setItemData] = useState({});
  const [commentData, setCommentData] = useState([]);
  const [iframeVisible, setIframeVisible] = useState(false);

  // const getItemData = async () => {
  //   const data = await fetch(
  //     `https://hacker-news.firebaseio.com/v0/item/${item}.json?print=pretty`
  //   ).then((res) => res.json());

  //   setItemData(data);

  //   // data.kids.forEach(comment => {

  //   // })
  //   // setCommentData([...data.kids]);
  // };

  useEffect(() => {
    setIframeVisible(false);
    // getItemData().catch((error) => console.error(error));
  }, [props]);

  const handleIframeLoad = () => {
    const iframeEl = document.querySelector("#preview-frame");
    setTimeout(() => {
      if (iframeEl.contentWindow.window.length > 0) {
        setIframeVisible(true);
      }
    }, 500);
  };

  const renderItem = () => {
    const { title, url } = item;
    return (
      <>
        <h1>{title}</h1>
        <a href={url} target="_blank">
          link
        </a>
        <ul>
          {commentData && commentData.map((comment) => <li>{comment}</li>)}
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

  return <>{item && renderItem()}</>;
};

export default Content;
