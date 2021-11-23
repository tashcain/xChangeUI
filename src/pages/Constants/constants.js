import React, { Component } from "react";
import {
  Card,
  CardBody,
  Col,
  Row,
  Container,
  FormGroup,
  Label,
  Input,
  Button,
  CustomInput,
} from "reactstrap";
import Select from "react-select";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { api_route, token } from "../../Api-config/config";
import { message, notification } from "antd";

class Constants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbItems: [
        { title: "Forms", link: "#" },
        { title: "Forms Elements", link: "#" },
      ],
      customchk: true,
      toggleSwitch: true,
      activeStocks: [],
      stockId: "",
      status: "",
      penalty: "",
      margin: "",
    };
  }

  componentDidMount() {
    this.getActiveStocks();
  }

  handleSelect = (e) => {
    this.setState({
      stockId: e.id,
    });
  };

  handleOnChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  postProfileStocks = () => {
    console.log(this.state);
    fetch(api_route + "/user/userPortfolio", {
      method: "POST",
      headers: {
        "x-auth-token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stockId: this.state.stockId,
        quantity: this.state.quantity,
        stockPrice: this.state.stockPrice,
        onSale: this.state.sellable,
      }),
    })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          res.json().then((data) => {
            message.success("Stock Added successfully !");
          });
        } else {
          res.text().then((msg) => {
            console.log(msg);
            notification.error({ message: msg });
          });
        }
      })
      .catch((err) => {
        console.log(err);
        notification.error({ message: "Error occurred" });
      });
  };

  render() {
    const stockNames = [];

    this.state.activeStocks.forEach((element) => {
      let t = {
        id: element.id,
        label: element.name,
        value: element.name,
      };
      stockNames.push(t);
    });

    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <Breadcrumbs
              title="Add Stocks"
              breadcrumbItems={this.state.breadcrumbItems}
            />

            <Row>
              <Col xs={12}>
                <Card>
                  <CardBody>
                    <FormGroup row>
                      <Label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        Margin/Markup
                      </Label>
                      <Col md={10}>
                        {/* <Select
                          options={stockNames}
                          onChange={this.handleSelect}
                        /> */}
                        <Input
                          className="form-control"
                          type="number"
                          defaultValue="0"
                          onChange={this.handleOnChange}
                          id="margin"
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-email-input"
                        className="col-md-2 col-form-label"
                      >
                        Set penalty amount
                      </Label>
                      <Col md={10}>
                        <Input
                          className="form-control"
                          type="number"
                          defaultValue="0"
                          onChange={this.handleOnChange}
                          id="penalty"
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Label
                        htmlFor="example-email-input"
                        className="col-md-2 col-form-label"
                      >
                        Status
                      </Label>
                      <Col md={10}>
                        <Input
                          className="form-control"
                          type="text"
                          defaultValue="0"
                          onChange={this.handleOnChange}
                          id="status"
                        />
                      </Col>
                    </FormGroup>
                    <Button color="success">Save</Button>
                  </CardBody>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col xs={12}>
                <Card>
                  <CardBody>
                    <h4 className="card-title">Suggest Stocks</h4>

                    <FormGroup row>
                      <Label
                        htmlFor="example-email-input"
                        className="col-md-2 col-form-label"
                      >
                        Name of Stock
                      </Label>
                      <Col md={10}>
                        <Input
                          className="form-control"
                          onChange={this.handleOnChange}
                          type="text"
                          placeholder="Stock Name"
                          id="suggestStock"
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-email-input"
                        className="col-md-2 col-form-label"
                      >
                        Note
                      </Label>
                      <Col md={10}>
                        <Input
                          className="form-control"
                          onChange={this.handleOnChange}
                          type="text"
                          placeholder="Note"
                          id="suggestNotes"
                        />
                      </Col>
                    </FormGroup>
                    <Button onClick={this.suggestProfileStocks} color="primary">
                      Suggest
                    </Button>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default Constants;
