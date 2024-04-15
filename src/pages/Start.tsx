import React, { useState, useEffect, useContext, DOMElement } from "react";
import { Quote } from "../components/Quote";
import Card from "react-bootstrap/Card";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { TagsList } from "../components/TagsList";
export interface Item {
  _id: string;
  author: string;
  content: string;
}

export const getPerson = async (url: string) => {
  const response = await fetch(url);
  return response.json();
};
export const filterData = (data) => {
  let dataFilter = data.filter(
    (value, index, self) => index === self.findIndex((t) => t._id === value._id)
  );
  return dataFilter;
};
export const scrollHandler = (e: any, cb, count) => {
  if (
    e.target.documentElement.scrollHeight -
      (e.target.documentElement.scrollTop + window.innerHeight) <
      100 &&
    count > 0
  ) {
    cb(true);
  }
};
export const Start = observer(() => {
  const [items, setItems] = useState<any>([]);
  const [totalCount, setTotalCount] = useState<number>(1);
  const [fetching, setFetching] = useState<boolean>(true);
  useEffect(() => {
    if (fetching)
      getPerson("https://api.quotable.io/quotes/random?limit=20")
        .then((data) => {
          let filteredData = filterData([...items, ...data]);
          setItems(filteredData);
          setTotalCount(filteredData.length);
        })
        .finally(() => setFetching(false));
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
          <TagsList></TagsList>
          <Card.Title>Top Quotes</Card.Title>
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
