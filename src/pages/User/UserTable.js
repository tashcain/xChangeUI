import React, { Component } from "react";
import {
  Col,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Card,
  CardBody,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import { api_route, token } from "../../Api-config/config";
import { message, notification, Modal } from "antd";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { loginUserSuccessful } from "../../store/actions";

class UserTableComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      tableData: [],
      visible: false,
      rowId: "",
    };
  }

  componentDidMount() {
    console.log("1");
    this.fetchTableData();
  }

  fetchTableData = () => {
    console.log("2");
    fetch(api_route + "/admin/findUsersWithVerifiedData", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          res.json().then((data) => {
            console.log(data);
            this.setState({
              tableData: data,
            });
          });
        } else {
          res.text().then((msg) => {
            notification.error({ message: msg });
          });
        }
      })
      .catch((err) => {
        console.log(err);
        notification.error({ message: "Error occurred" });
      });
  };

  handleModal = (id) => {
    this.setState({
      visible: true,
      rowId: id,
    });
  };

  handleOk = () => {
    this.handleDelete(this.state.rowId);
    this.setState({
      visible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      rowId: null,
    });
  };

  handleDelete = (id) => {
    fetch(api_route + "/user/deletePortfolio", {
      method: "DELETE",
      headers: {
        "x-auth-token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        portfolioId: id,
      }),
    })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          res.text().then((msg) => {
            message.success(msg);
            this.fetchTableData();
          });
        } else {
          res.text().then((msg) => {
            notification.error({ message: msg });
          });
        }
      })
      .catch((err) => {
        console.log(err);
        notification.error({ message: "Error occurred" });
      });
  };

  toggleSellable = (e, id) => {
    switch (e.target.value) {
      case "select":
        console.log("select");
        break;
      case "Sell":
        console.log(e.target.value);
        fetch(api_route + "/user/toggleIsSellable", {
          method: "PUT",
          headers: {
            "x-auth-token": token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            portfolioId: id,
          }),
        })
          .then((res) => {
            if (res.status === 200 || res.status === 201) {
              res.json().then((data) => {
                console.log(data);
                message.success("Listed to sell");
                this.fetchTableData();
              });
            } else {
              res.text().then((msg) => {
                notification.error({ message: msg });
              });
            }
          })
          .catch((err) => {
            console.log(err);
            notification.error({ message: "Error occurred" });
          });
        break;
      case "Back":
        fetch(api_route + "/user/toggleIsSellable", {
          method: "PUT",
          headers: {
            "x-auth-token": token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            portfolioId: id,
          }),
        })
          .then((res) => {
            if (res.status === 200 || res.status === 201) {
              res.json().then((data) => {
                console.log(data);
                message.success("Removed from listed stocks");
                this.fetchTableData();
              });
            } else {
              res.text().then((msg) => {
                notification.error({ message: msg });
              });
            }
          })
          .catch((err) => {
            console.log(err);
            notification.error({ message: "Error occurred" });
          });
        console.log("back");
        break;
    }
  };

  render() {
    const data = {
      columns: [
        {
          dataField: "User.id",
          text: "Id",

          filter: textFilter(),
        },
        {
          dataField: "User.name",
          text: "Name",

          filter: textFilter(),
        },
        {
          dataField: "User.email",
          text: "Email",

          filter: textFilter(),
        },
        {
          dataField: "User.mobileNumber",
          text: "Mobile Number",
          filter: textFilter(),
        },

        {
          dataField: "User.id",
          text: "Details",
          editable: false,
          formatter: (cellContent, row) => {
            return (
              <Link to={`/userDetails/${row.User.id}/1`}>
                <button className="btn btn-primary btn-xs">Details</button>
              </Link>
            );
          },
        },
      ],
      rows: this.state.tableData,
    };

    const options = {
      pageStartIndex: 1,
      hideSizePerPage: true,
      hidePageListOnlyOnePage: false,
      showTotal: true,
      sizePerPageList: [
        {
          text: "5th",
          value: 25,
        },
        {
          text: "10th",
          value: 25,
        },
        {
          text: "All",
          value: data.rows.length,
        },
      ],
    };

    // const selectRow = {
    //   mode: 'checkbox',
    //   clickToSelect: true
    // };
    if (false) {
      return (
        <React.Fragment>
          <Col lg={20}>
            <Card>
              <CardBody>
                <Dropdown
                  isOpen={this.state.menu}
                  toggle={() => this.setState({ menu: !this.state.menu })}
                  className="float-right"
                >
                  <DropdownToggle tag="i" className="arrow-none card-drop">
                    <i className="mdi mdi-dots-vertical"></i>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem onClick={this.props.prophandleForm}>
                      Add Firm
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <h4 className="card-title mb-4">Firm Master</h4>

                <div class="d-flex justify-content-center">
                  <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </React.Fragment>
      );
    } else {
      return (
        <div style={{ marginTop: " 87px" }}>
          <React.Fragment>
            <Modal
              title="Confirm Delete"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <p>Are you Sure!</p>
            </Modal>
            <Col lg={20}>
              <Card>
                <CardBody>
                  <Dropdown
                    isOpen={this.state.menu}
                    toggle={() => this.setState({ menu: !this.state.menu })}
                    className="float-right"
                  >
                    <DropdownToggle tag="i" className="arrow-none card-drop">
                      <i className="mdi mdi-dots-vertical"></i>
                    </DropdownToggle>
                  </Dropdown>
                  <h4 className="card-title mb-4">Users</h4>
                  <BootstrapTable
                    keyField="id"
                    data={data.rows}
                    columns={data.columns}
                    hover
                    wrapperClasses="table-responsive"
                    rowClasses="text-nowrap"
                    filter={filterFactory()}
                    // expandRow={ expandRow }
                    //   rowEvents={this.props.rowEvents}
                    pagination={paginationFactory(options)}
                    // selectRow={ selectRow }
                  />
                </CardBody>
              </Card>
            </Col>
          </React.Fragment>
        </div>
      );
    }
  }
}

const mapStatetoProps = (state) => {
  return {
    ...state.Login,
  };
};
export default connect(mapStatetoProps, {
  loginUserSuccessful,
})(withRouter(UserTableComp));
