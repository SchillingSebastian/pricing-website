import React from "react";
import { Typography } from "antd";
import "../App.css";

const { Title } = Typography;

class Information extends React.Component {
  render() {
    return (
      <div>
        <Title level={3}>Basic Information</Title>
        <p>Some Information on this website and how it works</p>
      </div>
    );
  }
}
export default Information;
