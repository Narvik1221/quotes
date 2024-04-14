import React, { useState, useEffect, useContext } from "react";
import { Quote } from "../components/Quote";
import Card from "react-bootstrap/Card";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { toJS } from "mobx";
export interface Item {
  _id: string;
  author: string;
  content: string;
}

export const MyQuotes = observer(() => {
  const [items, setItems] = useState<any>([]);
  const { quotes }: any = useContext(Context);
  useEffect(() => {
    setItems(toJS(quotes.likes));
  }, []);
  return (
    <div className="start">
      <div className="container">
        <div className="start__inner">
          <Card.Title className="my-quote-title">My quotes</Card.Title>

          <div className="start__cards">
            {Object.keys(items).length !== 0 ? (
              Object.keys(items).map((keyName, i) => (
                <Quote
                  key={items[keyName]._id}
                  _id={items[keyName]._id}
                  author={items[keyName].author}
                  content={items[keyName].content}
                ></Quote>
              ))
            ) : (
              <div className="empty-quotes">
                You don't have any favorite quotes
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
