import React, { useContext, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Item } from "../pages/Start";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { toJS } from "mobx";
export const Quote: React.FC<Item> = observer(({ _id, author, content }) => {
  const { quotes }: any = useContext(Context);
  useEffect(() => {

  }, []);
  const likeCard = (event: React.MouseEvent<HTMLButtonElement>) => {
    let myLikes = toJS(quotes.likes);
    if (event.currentTarget.classList.contains("active")) {
      event.currentTarget.classList.remove("active");
      delete myLikes[_id];
      quotes.setLikes(myLikes);
    } else {
      event.currentTarget.classList.add("active");
      myLikes[_id] = {
        _id,
        author,
        content,
      };
      quotes.setLikes(myLikes);
      
    }
  };

  return (
    <Card className="quote" id={_id}>
      <Card.Body>
        <Card.Title>{author}</Card.Title>
        <Card.Text>{content}</Card.Text>
        <button
          onClick={(event) => likeCard(event)}
          className={
            toJS(quotes.likes)[_id] !== undefined
              ? "card-like active"
              : "card-like"
          }
        ></button>
      </Card.Body>
    </Card>
  );
});
