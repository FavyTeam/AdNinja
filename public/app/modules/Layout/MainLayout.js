import React, { Component, PropTypes } from 'react';

export default class MainLayout extends Component {
  static displayName = 'MainLayout';
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    const { children } = this.props;

    return (
      <div>
        { children }
      </div>
    );
  }
}
