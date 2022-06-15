import { format } from "date-fns";

import {
    Card,
    CardImg,
    CardImgOverlay, CardTitle
} from "reactstrap";
import Dishdetail from "./DishdetailComponent";
import React, { Component } from "react";

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDish: null,
    };
  }

  onDishSelect(dish) {
    this.setState({ selectedDish: dish });
  }

  renderDish(dish) {
    if (dish != null)
      return (
        <Dishdetail dish={dish}/>
      );
    else return <div></div>;
  }

  renderComment(dish){
    if (dish != null)
      return (
       <div>
        <h4>Comments</h4>
        {dish.comments.map((cmt)=>{
            return(
                <div key={cmt.id}>
                <p>--{cmt.comment}</p>
                <p>{cmt.author},{format(Date.parse(cmt.date), "MMMM do, yyyy ")}</p>
                </div>
            )
        })}
</div>
      );
    else return <div></div>;

  }

  render() {
    const menu = this.props.dishes.map((dish) => {
      return (
        <div className="col-12 col-md-5 m-1" key={dish.id}>
          
          <Card 
              onClick={() => this.onDishSelect(dish)}>
              <CardImg width="100%" src={dish.image} alt={dish.name} />
              <CardImgOverlay>
                  <CardTitle className="font-weight-bold">{dish.name}</CardTitle>
              </CardImgOverlay>
            </Card>
        </div>
      );
    });

    return (
      <div className="container">
        <div className="row">{menu}</div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            {this.renderDish(this.state.selectedDish)}
          </div>
          <div className="col-12 col-md-5 m-1">
            {this.renderComment(this.state.selectedDish)}
          </div>
        </div>
      </div>
    );
  }
}

export default Menu;
