import { Card, CardBody, CardImg, CardText, CardTitle } from "reactstrap";
import React, { Component } from "react";

class Dishdetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDish: null,
    };
  }

  render() {
    return (
      <Card >
        <CardImg top src={this.props.dish.image} alt={this.props.dish.name} />
        <CardBody>
          <CardTitle className="font-weight-bold">
            {this.props.dish.name}
          </CardTitle>
          <CardText>{this.props.dish.description} </CardText>
        </CardBody>



      </Card>
    );
  }
}

export default Dishdetail;
