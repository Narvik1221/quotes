import React, { useState, useEffect, useContext } from "react";
import { Quote } from "../components/Quote";
import { useLocation } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { TagsList } from "../components/TagsList";
import { Item } from "../pages/Start";
import { getPerson } from "../pages/Start";
import { filterData } from "../pages/Start";
export const Category = observer(() => {
  const location = useLocation();
  const [category,setCategory]=useState<string>("");
  const [items, setItems] = useState([]);
  const [totalCount, setTotalCount] = useState<number>(1);
  const [fetching, setFetching] = useState<boolean>(true);
  const { quotes }: any = useContext(Context);
  useEffect(() => {
    let path = location.pathname.split("/");
    let category = path[path.length - 1];
    setCategory(category)
    getPerson("https://api.quotable.io/quotes?limit=35&tags=" + category).then(
      (data) => {
        let filteredData =filterData([...items, ...data])
        setItems(data.results);
        console.log(data.results);
      }
    );
  }, []);
  
  return (
    <div className="start">
      <div className="container">
        <div className="start__inner">
          <Card.Title>Category: {category}</Card.Title>
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
