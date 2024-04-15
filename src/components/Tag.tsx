import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { TagList } from "../components/TagsList";
import { observer } from "mobx-react-lite";
import { Link} from "react-router-dom";
export const Tag: React.FC<TagList> = observer(
  ({ _id, name, slug, quoteCount }) => {
    useEffect(() => {}, []);
    return (
      <div id={_id} className="tag ">
        <div className="tag__body">
          <Link to={"/categories/" + slug} className="tag__link">
            <Button  className="tag__btn btn-dark" style={ {width: "100%" }}>
              {name}
            </Button>
            <Card.Text> quoteCount: {quoteCount}</Card.Text>
          </Link>
        </div>
      </div>
    );
  }
);
