import React, { Component } from "react";
//import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  Collapse,
  NavItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { Link } from "react-router-dom";
import { BsFillPencilFill } from "react-icons/bs";

function FormError(props) {
  if (props.isHidden) {
    return null;
  }

  return <div className="text-danger">{props.errorMessage}</div>;
}

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isNavOpen: false,
      isModalOpen: false,
      value: "",
      isInputValid: true,
      errorMessage: "",
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleComment = this.handleComment.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }
  handleComment(event) {
    this.toggleModal();
    alert(
      "Rating: " +
        this.rating.value +
        " Yourname: " +
        this.yname.value +
        " has comment"
    );
    event.preventDefault();
  }

  handleInput = (event) => {
    const { value } = event.target;
    this.setState({ value });
  };
  handleInputValidation = (event) => {
    const { isInputValid, errorMessage } = validateInput(this.state.value);
    this.setState({
      isInputValid: isInputValid,
      errorMessage: errorMessage,
    });
  };

  

  render() {
    return (
      <React.Fragment>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal} className="font-weight-bold">
            Submit comment
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleComment}>
              <FormGroup>
                <Label htmlFor="rating" className="font-weight-bold">
                  Rating
                </Label>
                <Input
                  type="number"
                  id="rating"
                  name="rating"
                  min="1"
                  max="10"
                  innerRef={(input) => (this.rating = input)}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="yname" className="font-weight-bold">
                  Yourname
                </Label>
                <Input
                  onChange={this.handleInput}
                  onBlur={this.handleInputValidation}
                  type="yname"
                  id="yname"
                  name="yname"
                  innerRef={(input) => (this.yname = input)}
                />
                <FormError
                  isHidden={this.state.isInputValid}
                  errorMessage={this.state.errorMessage}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="comment" className="font-weight-bold">
                  Comment
                </Label>
                <br />
                <textarea
                  type="text"
                  id="comment"
                  name="comment"
                  rows="6"
                  cols="60"
                  className="rounded "
                  innerRef={(input) => (this.comment = input)}
                />
              </FormGroup>

              <Button type="submit" value="submit" color="primary">
                Submit
              </Button>
            </Form>
          </ModalBody>
        </Modal>
        <Button outline onClick={this.toggleModal}>
          <span>
            <BsFillPencilFill />
          </span>{" "}
          Submit Comment
        </Button>
      </React.Fragment>
    );
  }
}

const validateInput = (checkingText) => {
  if (checkingText.length < 2) {
	return {
		isInputValid: false,
		errorMessage: "Must be greater than 2 characters",
	  };
  } else if(checkingText.length>15) {
    return {
      isInputValid: false,
      errorMessage: "Must be 15 characters or less",
    };
  }
  else{
	return {isInputValid: true, errorMessage: " ",}
  }
};

function RenderDish({ dish }) {
  return (
    <div className="col-12 col-md-5 m-1">
      <Card>
        <CardImg top src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

function RenderComments({ comments }) {
  if (comments != null) {
    return (
      <div className="col-12 col-md-5 m-1">
        <h4>Comments</h4>
        <ul className="list-unstyled">
          {comments.map((comment) => {
            return (
              <li key={comment.id}>
                <p>{comment.comment}</p>
                <p>
                  -- {comment.author} ,{" "}
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  }).format(new Date(Date.parse(comment.date)))}
                </p>
              </li>
            );
          })}
        </ul>
        <CommentForm />
      </div>
    );
  } else {
    return <div></div>;
  }
}

const DishDetail = (props) => {
  if (props.dish != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderDish dish={props.dish} />
          <RenderComments comments={props.comments} />
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default DishDetail;
