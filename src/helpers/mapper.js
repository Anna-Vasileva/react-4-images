const mapper = (hits) => {
  return hits.map(({ id, webformatURL, tags, largeImageURL }) => ({
    id,
    webformatURL,
    largeImageURL,
    tags,
  }));
};
export default mapper;
