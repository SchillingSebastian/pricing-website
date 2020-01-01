import React, { Component } from "react";
import { Button, Select, Row, Col } from "antd";
import Chart from "chart.js";
import classes from "./LineGraph.module.css";
const { Option } = Select;
const preselectedTestGroups = [];

export default class myLineGraph extends Component {
  chartRef = React.createRef();

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext("2d");
    for (let i = 10; i < 36; i++) {
      preselectedTestGroups.push(
        <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>
      );
    }

    new Chart(myChartRef, {
      type: "line",
      data: {
        //Bring in data
        labels: ["Jan", "Feb", "March"],
        datasets: [
          {
            label: "Sales",
            data: [86, 67, 91]
          }
        ]
      },
      options: {
        //Customize chart options
      }
    });
  }

  render() {
    return (
      <div className={classes.graphContainer}>
        <canvas id="myChart" ref={this.chartRef} />
        <Row type="flex" width>
          <Col span={15}>
            <Select
              style={{ width: "100%" }}
              mode="multiple"
              placeholder="Please Select"
              defaultVale={["goodInstances"]}
              onChange={this.handleChanges}
            >
              {preselectedTestGroups}
            </Select>
          </Col>
          <Col span={1}>
            <Button style={{ flex: 1 }}>Test</Button>
          </Col>
        </Row>
      </div>
    );
  }

  handleChange(value) {
    console.log(`selected ${value}`);
  }
}
