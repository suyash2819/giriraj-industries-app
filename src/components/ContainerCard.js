import React from "react";
import Card from "./Card";
import { LinearProgress } from "@material-ui/core";
import "../CSS/AllSection.css";

const ContainerCard = (props) => {
  let showData = [];
  let _itemTypes = [];
  const { data } = props;
  data.forEach((element) => {
    let index = _itemTypes.indexOf(element.Item_Type);
    if (index > -1) {
      showData[index].push(element);
    } else {
      showData.push([element]);
      _itemTypes.push(element.Item_Type);
    }
  });
  if (showData.length === 0) {
    return (
      <div className="container">
        <LinearProgress />
      </div>
    );
  } else {
    return (
      <>
        {showData.map((el, index) => (
          <div className="container" key={index}>
            <h1>{_itemTypes[index]}</h1>
            <div className="row">
              {el.map((obj) => (
                <Card
                  key={obj.id}
                  id={obj.id}
                  wrapperClass="col-md-3"
                  image={obj.Image_url}
                  itemType={obj.Item_Type}
                  description={obj.Description}
                  cost={obj.Cost}
                  btnText={obj.btnText}
                />
              ))}
            </div>
          </div>
        ))}
      </>
    );
  }
};

export default ContainerCard;
