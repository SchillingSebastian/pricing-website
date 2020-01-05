import React, { Component } from "react";
import { Button, Select, Row, Col } from "antd";
import { Chart } from "react-google-charts";
import classes from "./LineGraph.module.css";
const { Option } = Select;

export default class myLineGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: null,
      isLoading: false,
      error: null,
      selectedCat: ["OVERALL TIME"]
    };
  }

  chartRef = React.createRef();

  componentDidMount() {
    console.log("Mounted + creates options");

    this.setState({ isLoading: true });
    fetch("api/giveMeSample")
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error in fetching API Data");
        }
      })
      .then(json => this.setState({ chartData: json, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
    //setting up options
    if (this.state.chartData != null) {
    }
  }

  render() {
    const { isLoading, error, selectedCat } = this.state;
    if (error) {
      return (
        <div>
          <p>Error see:</p>
          <p>{error.message}</p>
        </div>
      );
    }
    if (isLoading) {
      return (
        <div>
          <p>Is Loading</p>
        </div>
      );
    }
    if (selectedCat.length == 0) {
    }

    if (this.state.chartData != null) {
      return this.pageDataLoaded();
    } else {
      return <div>null</div>;
    }
  }

  pageDataLoaded() {
    const { chartData } = this.state;
    //actual Data construction
    //retrieve actual data
    var tempArray = [];
    Object.keys(chartData).forEach(function(key) {
      tempArray.push(chartData[key]);
    });
    var data = tempArray[0];
    //retrieve possible Display Options
    var times = [];
    for (let name in data) {
      times.push(<Option key={name.toString()}>{name.toString()}</Option>);
    }
    //retrieve testnames
    var testnamesData = data.AGGREGATIONS;
    var testnames = [];
    for (let name in testnamesData) {
      testnames.push(name);
    }
    //construct chart data array
    var actualChartData = [];
    var indexes = ["Instances"].concat(this.state.selectedCat);
    actualChartData[0] = indexes;
    for (let i = 0; i < testnames.length; i++) {
      //add name
      var testinstanceData = [];
      testinstanceData.push(testnames[i]);
      //add Data in correspondance to selected Values
      var selections = this.state.selectedCat;
      for (let j = 0; j < selections.length; j++) {
        var instanceData = data[selections[j]];
        testinstanceData.push(instanceData[testnames[i]]);
      }
      actualChartData.push(testinstanceData);
    }
    var chartHeight = window.innerHeight - 200;
    var chartWidth = window.innerWidth - window.innerWidth * 0.15;

    var displayedName = data.testname;
    return (
      <div className={classes.graphContainer}>
        <div style={{ display: "flex", maxWidth: 1600 }}>
          <Chart
            width={chartWidth}
            height={chartHeight}
            chartType="ColumnChart"
            loader={<div>Loading Chart</div>}
            data={actualChartData}
            options={{
              title: displayedName,
              chartArea: { width: "80%" },
              isStacked: false,
              hAxis: {
                title: "Instances",
                minValue: 0
              },
              vAxis: {
                title: "Time"
              }
            }}
            // For tests
            rootProps={{ "data-testid": "3" }}
          />
        </div>
        <Row type="flex">
          <Col span={15}>
            <Select
              style={{ width: "100%" }}
              mode="multiple"
              placeholder="Please Select"
              defaultValue={this.state.selectedCat}
              onChange={value => {
                //console.log(value);
                this.setState({ selectedCat: value });
              }}
            >
              {times}
            </Select>
          </Col>
          <Col span={1}>
            <Button style={{ flex: 1 }}>Test</Button>
          </Col>
        </Row>
      </div>
    );
  }

  handleChanges(value) {
    console.log(`selected ${value}`);
    console.log(this.state.selectedCat);
  }
}
