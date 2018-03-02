import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchOrders} from '../store';
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

  renderOrderStatusFilter() {
    return (
      <div>
        Status:
        <select onChange={this.handleOrderStatusFilterChange}>
          <option value="ALL">All</option>
          <option value="CREATED">Created</option>
          <option value="PROCESSING">Processing</option>
          <option value="CANCELLED">Cancelled</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>
    );
  }

  filterOrders(orders) {
    if (this.state.orderStatusFilter === 'ALL') return orders;
    return orders.filter(order => this.state.orderStatusFilter === order.status);
  }

  renderOrders(orders, user) {
    orders = this.filterOrders(orders);
    return (
      <div>
        {
          user.accountType === 'ADMIN'
          ? this.renderOrderStatusFilter()
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
              { this.renderAddress(order.address) }
              <div>
                Total: ${ this.computeTotalFromOrderItems(order.orderItems) }
              </div>
              <div>
                Status: { order.status[0] + order.status.slice(1).toLowerCase() }
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

const mapDispatch = { fetchOrders };

export default connect(mapState, mapDispatch)(Orders);
