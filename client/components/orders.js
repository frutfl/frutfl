import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchOrders, writeOrderStatus} from '../store';
import {DAYS, MONTHS} from '../utils/date';
import OrderItem from './order-item';

class Orders extends Component {
  constructor() {
    super();
    this.state = {
      orderStatusFilter: 'ALL'
    };
    this.handleOrderStatusFilterChange = this.handleOrderStatusFilterChange
      .bind(this);
    this.handleOrderStatusEdit = this.handleOrderStatusEdit.bind(this);
  }

  componentDidMount() {
    this.props.fetchOrders();
  }

  renderLoading() {
    return (
      <div>Loading</div>
    );
  }

  convertTimestampToPrettyDate(timestamp) {
    let date = new Date(timestamp);
    return `${DAYS[date.getDay()]}, ${MONTHS[date.getMonth()]} ${date.getDate()}`;
  }

  renderAddress(address) {
    return (
      <div>
        {address.name}<br />
        {address.street}<br />
        {address.city}, {address.state} {address.zipCode}
      </div>
    );
  }

  computeTotalFromOrderItems(orderItems) {
    return orderItems.reduce((sum, item) => {
      return sum + +item.price * item.quantity;
    }, 0);
  }

  handleOrderStatusFilterChange(event) {
    this.setState({orderStatusFilter: event.target.value});
  }

  handleOrderStatusEdit(order) {
    return function (event) {
      this.props.writeOrderStatus(order.id, event.target.value);
    }.bind(this);
  }

  renderOrderStatusFilterDropdown(handleChange) {
    return (
        <select onChange={handleChange}>
          <option value="ALL">All</option>
          <option value="CREATED">Created</option>
          <option value="PROCESSING">Processing</option>
          <option value="CANCELLED">Cancelled</option>
          <option value="COMPLETED">Completed</option>
        </select>
    );
  }

  renderOrderStatusEditDropdown(handleChange, status) {
    console.log(status);
    return (
        <select onChange={handleChange} value={status}>
          <option value="CREATED">Created</option>
          <option value="PROCESSING">Processing</option>
          <option value="CANCELLED">Cancelled</option>
          <option value="COMPLETED">Completed</option>
        </select>
    );
  }

  filterOrders(orders) {
    if (this.state.orderStatusFilter === 'ALL') return orders;
    return orders.filter(order => this.state.orderStatusFilter === order.status);
  }

  renderNonAdminStatus(status) {
    return status[0] + status.slice(1).toLowerCase();
  }

  renderOrders(orders, user) {
    orders = this.filterOrders(orders);
    return (
      <div>
        {
          user.accountType === 'ADMIN'
          ? <div>
            Status: { this.renderOrderStatusFilterDropdown(
              this.handleOrderStatusFilterChange) }
            </div>
          : null
        }
        { orders.map(order => {
          return (
            <div key={order.id}>
              <div>{this.convertTimestampToPrettyDate(order.createdAt)}</div>
              { order.orderItems.map(orderItem => {
                return (
                  <OrderItem key={orderItem.id} item={orderItem} />
                );
              })}
              { this.renderAddress(order.shippingAddress) }
              <div>
                Total: ${ this.computeTotalFromOrderItems(order.orderItems) }
              </div>
              <div>
                Status: {
                  user.accountType === 'ADMIN'
                  ? this.renderOrderStatusEditDropdown(
                      this.handleOrderStatusEdit(order),
                      order.status
                    )
                  : this.renderNonAdminStatus(order.status)
                }
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    const orders = this.props.orders;
    const fetching = this.props.fetching;
    const user = this.props.user;
    return (
      <div>
        <h1>Orders</h1>
        { fetching
          ? this.renderLoading()
          : this.renderOrders(orders, user) }
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    orders: state.order.orders,
    fetching: state.order.fetching,
    user: state.user
  };
};

const mapDispatch = { fetchOrders, writeOrderStatus };

export default connect(mapState, mapDispatch)(Orders);
