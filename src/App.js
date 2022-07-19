import React, { useEffect, useState } from "react";
import "./App.scss";

function App() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const getPost = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json"
      );

      const data = await response.json();

      setPosts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  const formatDate = (date) => {
    const newDate = new Date(date);

    var months = {
      1: "January",
      2: "February",
      3: "March",
      4: "April",
      5: "May",
      6: "June",
      7: "July",
      8: "August",
      9: "September",
      10: "October",
      11: "November",
      12: "December",
    };

    return `${newDate.getDate()} ${
      months[newDate.getMonth()]
    } ${newDate.getFullYear()}`;
  };

  return (
    <div className="page__container">
      <div className="row">
        {loading && (
          <div className="loader">
            <i className="p-icon--spinner u-animation--spin"></i>
          </div>
        )}
        {!loading &&
          posts?.length > 0 &&
          posts.map((post) => (
            <div
              key={post.id}
              className="p-card shadow post-card col-4 col-medium-3"
            >
              <p className="u-no-margin uppercase padding-small">
                {post._embedded["wp:term"]?.[2]?.[0]?.name}
              </p>
              <div className="p-card__content card-content padding-small separator-dotted">
                <div>
                  <img
                    className="p-card__image"
                    alt="feature media"
                    src={post.featured_media}
                  />
                  <h4 title={post.title.rendered}>
                    <a
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {post.title.rendered}
                    </a>
                  </h4>
                </div>
                <div className="author">
                  By{" "}
                  <a
                    href={post._embedded?.author[0]?.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {post._embedded?.author[0]?.name}
                  </a>{" "}
                  on {formatDate(post.date)}
                </div>
              </div>
              <p className="u-no-margin padding-small separator-dotted p-text--small">
                {post._embedded["wp:term"]?.[0]?.[0]?.name}
              </p>
            </div>
          ))}
        {!loading && !posts?.length > 0 && <p>No posts available</p>}
      </div>
    </div>
  );
}

export default App;
