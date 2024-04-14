import React, { useState, useEffect, useContext } from "react";
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

export const Start = observer(() => {
  const [items, setItems] = useState([]);
  const { quotes }: any = useContext(Context);
  useEffect(() => {
    console.log(quotes.quotes);
    getPerson("https://api.quotable.io/quotes/random?limit=20").then((data) => {
      setItems(data);
      console.log(data.results);
    });
  }, []);
  return (
    <div className="start">
      <div className="container">
        <div className="start__inner">
          <TagsList></TagsList>
          <Card.Title>Top Quotes</Card.Title>
          <div className="start__cards">
            {items.length > 0 &&
              items.map((i: Item) => (
                <Quote
                  key={i._id}
                  _id={i._id}
                  author={i.author}
                  content={i.content}
                ></Quote>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
});
