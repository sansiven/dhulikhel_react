import React, { Component } from "react";
import { firebaseMessages, firebasePromotions } from "../../../firebase";
import { firebaseLooper, reverseArray } from "../../ui/misc";
import CircularProgress from "@material-ui/core/CircularProgress";
import AdminLayout from "../../../HOC/AdminLayout";

class AdminSubscribed extends Component {
  state = {
    isLoading: true,
    subscriptions: [],
  };

  getMessages() {
    firebasePromotions.once("value").then((snapshot) => {
      const subscriptions = firebaseLooper(snapshot);
      this.setState({
        isLoading: false,
        subscriptions: reverseArray(subscriptions),
      });
    });
  }

  componentDidMount() {
    firebaseMessages
      .once("value")
      .then((snapshot) => {
        const subscriptions = firebaseLooper(snapshot);
        this.setState({
          isLoading: false,
          subscriptions: reverseArray(subscriptions),
        });
      })
      .catch((e) => console.log(e));
  }

  render() {
    return (
      <AdminLayout>
        <div className="messages-container" style={{ marginTop: "100px" }}>
          <div className="container">
            <h3 style={{ textAlign: "center" }}>Mailing List</h3>
            <div className="row messages-row">
              <div className="admin_progress">
                {this.state.isLoading ? (
                  <CircularProgress
                    thickness={7}
                    style={{ color: "#3da066" }}
                  />
                ) : (
                  ""
                )}
              </div>
              <ul className="list-group">
                {this.state.subscriptions
                  ? this.state.subscriptions.map((subscribed, i) => (
                      <li key={i} className="list-group-item">
                        {subscribed.email}
                      </li>
                    ))
                  : null}
              </ul>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }
}

export default AdminSubscribed;
