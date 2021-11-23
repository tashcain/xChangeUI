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

class AddStocks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbItems: [
        { title: "Forms", link: "#" },
        { title: "Forms Elements", link: "#" },
      ],
      customchk: true,
      toggleSwitch: true,
      stockName: "",
      notes: "",
    };
  }

  handleOnChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  addStocks = () => {
    console.log(this.state);
    fetch(api_route + "/admin/createStock", {
      method: "POST",

      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this.state.stockName,
        notes: this.state.notes,
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
                        Stock Name
                      </Label>
                      <Col md={10}>
                        <Input
                          className="form-control"
                          type="text"
                          placeholder="Name of the stock"
                          onChange={this.handleOnChange}
                          id="stockName"
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-email-input"
                        className="col-md-2 col-form-label"
                      >
                        Notes
                      </Label>
                      <Col md={10}>
                        <Input
                          className="form-control"
                          type="text"
                          placeholder="Any notes ..."
                          onChange={this.handleOnChange}
                          id="notes"
                        />
                      </Col>
                    </FormGroup>

                    <Button onClick={this.addStocks} color="success">
                      Add
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

export default AddStocks;
