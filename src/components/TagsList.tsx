import React, { useState, useEffect, useContext } from "react";
import { Quote } from "../components/Quote";
import { observer } from "mobx-react-lite";
import Card from "react-bootstrap/Card";
import { Context } from "../index";
import { Tag } from "./Tag";
export interface TagList {
  _id: string;
  name: string;
  slug: string;
  quoteCount: number;
}

const getPerson = async (url: string) => {
  const response = await fetch(url);
  return response.json();
};

export const TagsList = observer(() => {
  const [items, setItems] = useState([]);
  const { quotes }: any = useContext(Context);
  useEffect(() => {
    getPerson("https://api.quotable.io/tags?sortBy=quoteCount&order=desc").then(
      (data) => {
        setItems(data);
      }
    );
  }, []);
  return (
    <>
      <Card.Title>Categories</Card.Title>
      <Card>
        <Card.Body className="tag-container">
          {items.length > 0 ? (
            items.map(
              (i: TagList) =>
                i.quoteCount > 0 && (
                  <Tag
                    key={i._id}
                    _id={i._id}
                    name={i.name}
                    slug={i.slug}
                    quoteCount={i.quoteCount}
                  ></Tag>
                )
            )
          ) : (
            <div className="empty-quotes">Loading...</div>
          )}
        </Card.Body>
      </Card>
    </>
  );
});
