import React, { Component } from "react";
import PropTypes from "prop-types";

class MyComponent extends Component {
  render() {
    const { name, favoriteNumber, children } = this.props;
    return (
      <div>
        안명하세요, 제 이롬은 {name}업니다. <br />
        children 값은 {children}입니다. <br />
        제가 좋아하는 숫자는 {favoriteNumber}업니다
      </div>
    );
  }
}

MyComponent.defaultProps = { name: "기존 이름" };
MyComponent.propTypes = {
  name: PropTypes.string,
  favoriteN니mber: PropTypes.number.isRequired,
};

export default MyComponent;
