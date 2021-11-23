import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CustomInput,
  Label,
  Input,
  FormGroup,
  Button,
} from "reactstrap";

// Redux
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
// actions
import { apiError } from "../../store/actions";

import styles from "./Profile.module.css"; // Import css modules stylesheet as styles
import userImg from "../../assets/images/users/avatar-3.jpg";
import { api_route, token } from "../../Api-config/config";
import { message, notification } from "antd";

class UserDetails extends Component {
  state = {
    panNo: "",
    dematNo: "",
    aadharNo: "",
    aadharDoc: {},
    panDoc: {},
    userDetails: {},
    name: "",
    mobile: "",
    email: "",
    userId: "",
  };

  componentDidMount() {
    this.props.apiError("");
    this.fetchUser(this.props.match.params.id);
    this.setState({
      userId: this.props.match.params.id,
    });
  }

  fetchUser = (id) => {
    fetch(api_route + `/admin/getUserDataFromUserId/${id}`, {
      method: "GET",
      credentials: "include",
    }).then((res) => {
      if (res.status === 200 || res.status === 201) {
        res.json().then((data) => {
          this.setState({
            name: data.name,
            email: data.email,
            mobile: data.phoneNumber,
            panNo: data.panNumber,
            dematNo: data.dematNumber,
            aadharNo: data.adharNumber,
          });
        });
      }
    });
  };

  verifyUser = () => {
    fetch(api_route + "/admin/toggeleDocumentVerify", {
      method: "POST",

      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: this.state.userId,
      }),
    })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          res.json().then((data) => {
            message.success("User verified successfully !");
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

  uploadDoc = () => {
    var data = new FormData();
    data.append("panNumber", this.state.panNo);
    data.append("dematNumber", this.state.dematNo);
    data.append("adharNumber", this.state.aadharNo);
    data.append("adharImage", this.state.aadharDoc);
    data.append("panImage", this.state.panDoc);

    fetch(api_route + "/user/userDetails", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",

        "x-auth-token": token,
      },
      body: data,
    }).then((res) => {
      console.log("aws", res);
      if (res.status === 200) {
        message.success("Data Uploaded!!!");
      } else {
        notification.error({ message: "Try Again" });
      }
    });
  };

  handleForm = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleDoc = (e) => {
    this.setState({
      [e.target.id]: e.target.files[0],
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <Card>
              <Row>
                {/* <div
                  class={[
                    "col-sm-4",
                    styles.bg_c_lite_green,
                    styles.user_profile,
                  ].join(" ")}
                >
                  <div
                    class={[
                      styles.card_block,
                      "text-center",
                      "text-white",
                    ].join(" ")}
                  >
                    <div class={styles.m_b_25}>
                      {" "}
                      <img
                        src={userImg}
                        alt="userPhoto"
                        class="img-radius"
                        style={{
                          height: "12em",
                          width: "12em",
                          borderRadius: "50%",
                        }}
                      />{" "}
                    </div>
                    <h6 class={styles.f_w_600}>Shubham Baswal</h6>
                    <Row>
                      <Col lg={12}>
                        <Button type="button" className="btn-success mt-2">
                          Upload image
                        </Button>
                      </Col>
                    </Row>
                    
                  </div>
                </div> */}

                <div class="col-sm-8">
                  <div class={styles.card_block}>
                    <div
                      class={[
                        styles.m_b_20,
                        styles.p_b_5,
                        styles.b_b_default,
                        styles.f_w_600,
                      ].join(" ")}
                    >
                      <h6>
                        Information{" "}
                        <span
                          style={{
                            color: "white",
                            background: "lightgreen",
                            padding: "4px",
                            borderRadius: "4px",
                            float: "right",
                          }}
                        >
                          Verified
                        </span>
                      </h6>
                    </div>

                    <div>
                      <FormGroup row>
                        <Label
                          htmlFor="example-text-input"
                          className="col-md-2 col-form-label"
                        >
                          Name
                        </Label>
                        <Col md={6}>
                          <Input
                            className="form-control"
                            type="text"
                            defaultValue={this.state.name}
                            id="name"
                            disabled={true}
                            style={{ border: "none" }}
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup row>
                        <Label
                          htmlFor="example-text-input"
                          className="col-md-2 col-form-label"
                        >
                          Mob.
                        </Label>
                        <Col md={6}>
                          <Input
                            className="form-control"
                            type="text"
                            defaultValue={this.state.mobile}
                            id="mob"
                            disabled={true}
                            style={{ border: "none" }}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label
                          htmlFor="example-text-input"
                          className="col-md-2 col-form-label"
                        >
                          Email
                        </Label>
                        <Col md={6}>
                          <Input
                            className="form-control"
                            type="text"
                            defaultValue={this.state.email}
                            disabled={true}
                            style={{ border: "none" }}
                            id="email"
                          />
                        </Col>
                      </FormGroup>
                    </div>
                  </div>
                </div>
              </Row>

              <Row>
                <div class="col-sm-8">
                  <div class={styles.card_block}>
                    <div
                      class={[
                        styles.m_b_20,
                        styles.p_b_5,
                        styles.b_b_default,
                        styles.f_w_600,
                      ].join(" ")}
                    >
                      <h6> Documents </h6>
                    </div>
                    <div>
                      <FormGroup row>
                        <Label
                          htmlFor="example-text-input"
                          className="col-md-2 col-form-label"
                        >
                          Pan No.
                        </Label>
                        <Col md={6}>
                          <Input
                            className="form-control"
                            onChange={this.handleForm}
                            type="text"
                            defaultValue={this.state.panNo}
                            style={{ border: "none" }}
                            id="panNo"
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label
                          htmlFor="example-text-input"
                          className="col-md-2 col-form-label"
                        >
                          Aadhar No.
                        </Label>
                        <Col md={6}>
                          <Input
                            className="form-control"
                            onChange={this.handleForm}
                            type="text"
                            defaultValue={this.state.aadharNo}
                            style={{ border: "none" }}
                            id="aadharNo"
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label
                          htmlFor="example-text-input"
                          className="col-md-2 col-form-label"
                        >
                          Demat No.
                        </Label>
                        <Col md={6}>
                          <Input
                            className="form-control"
                            type="text"
                            defaultValue={this.state.dematNo}
                            onChange={this.handleForm}
                            style={{ border: "none" }}
                            id="dematNo"
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label
                          htmlFor="example-text-input"
                          className="col-md-2 col-form-label"
                        >
                          Aadhar Doc
                        </Label>
                        <Col md={8}>
                          <Button color="success">View</Button>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label
                          htmlFor="example-text-input"
                          className="col-md-2 col-form-label"
                        >
                          Demat Doc
                        </Label>
                        <Col md={8}>
                          <Button color="success">View</Button>
                        </Col>
                      </FormGroup>
                    </div>
                    <Button onClick={this.verifyUser} color="success">
                      Verify
                    </Button>{" "}
                    <Button color="danger">Block</Button>
                  </div>
                </div>
              </Row>
            </Card>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = (state) => {
  const { userDetail } = state.Login;
  return { userDetail };
};

export default withRouter(connect(mapStatetoProps, { apiError })(UserDetails));

// export default Profile;
