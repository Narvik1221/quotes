import React, { useState, useEffect, useContext } from "react";
import { Quote } from "../components/Quote";
import { useLocation } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Item } from "../pages/Start";
import { getPerson } from "../pages/Start";
import { filterData } from "../pages/Start";
import { scrollHandler } from "../pages/Start";
export const Category = observer(() => {
  const location = useLocation();
  const [category, setCategory] = useState<string>("");
  const [items, setItems] = useState<any>([]);
  const [totalCount, setTotalCount] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [fetching, setFetching] = useState<boolean>(true);
  const { quotes }: any = useContext(Context);
  useEffect(() => {
    let path = location.pathname.split("/");
    let category = path[path.length - 1];
    setCategory(category);
  }, []);
  useEffect(() => {
    if (fetching) {
      let path = location.pathname.split("/");
      let category = path[path.length - 1];
      getPerson(
        `https://api.quotable.io/quotes?page=${page}&limit=20&tags=` + category
      )
        .then((data) => {
          let filteredData = filterData([...items, ...data.results]);
          setItems(filteredData);
          setTotalCount(data.results.length);
          setPage((prev) => prev + 1);
        })
        .finally(() => setFetching(false));
    }
  }, [fetching]);

  useEffect(() => {
    document.addEventListener("scroll", (e) =>
      scrollHandler(e, setFetching, totalCount)
    );
    return function () {
      document.removeEventListener("scroll", (e) =>
        scrollHandler(e, setFetching, totalCount)
      );
    };
  }, []);
  return (
    <div className="start">
      <div className="container">
        <div className="start__inner">
          <Card.Title>Category: {category}</Card.Title>
          <div className="start__cards">
            {items.length > 0 ? (
              items.map((i: Item) => (
                <Quote
                  key={i._id}
                  _id={i._id}
                  author={i.author}
                  content={i.content}
                ></Quote>
              ))
            ) : (
              <div className="empty-quotes">Loading...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
