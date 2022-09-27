import styles from "../styles/Pagination.module.scss";

const Pagination = (props: any) => {
  const { page, setPage, setExpandedStory } = props;

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
      <div className={styles.pagination}>
        <button disabled={page - 1 === 0} onClick={prevPage}>
          prev
        </button>
        <span>{page}</span>
        <button onClick={nextPage}>next</button>
      </div>
    </>
  );
};

export default Pagination;
