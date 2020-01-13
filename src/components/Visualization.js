import React, {Component} from "react";
import {Button, Select, Row, Col, Typography, Modal, Table} from "antd";

import { Bar } from 'react-chartjs-2';
import classes from "./LineGraph.module.css";
const {Option} = Select;
const {Title} = Typography;
const {confirm} = Modal;


export default class MyLineGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stateData: null,
            isLoading: false,
            error: null,
            selectedCat: ["pricing_time"],
            modalVisible:false,
            allTestsets: null,
            allSettings:null,
            selectedTestset:"short",
            selectedSetting:"default",
            settingData:null,
            modalSettingTableVisible:false
        };
    }

    chartRef = React.createRef();

    componentDidMount() {

        this.loadData()
    }

    loadData(){
        this.setState({isLoading: true});
        console.log("fetching "+ "http://35.246.177.194:8080/api/testdata/testset/name/"+this.state.selectedTestset+"/"+this.state.selectedSetting)
        fetch("http://35.246.177.194:8080/api/testdata/testset/name/"+this.state.selectedTestset+"/"+this.state.selectedSetting)
            .then(response => {
                console.log(response)
                if (response.ok) {
                    return response.json();
                } else {
                    ;
                    throw new Error("http://35.246.177.194:8080/api/testdata/testset/name/"+this.state.selectedTestset+"/"+this.state.selectedSetting);
                }
            })
            .then(json => this.setState({stateData: json, isLoading: false}))
            .catch(error => this.setState({error, isLoading: false}));

    }

    showModal = () => {
        fetch("http://35.246.177.194:8080/api/testsets/all")
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Error in fetching API Data");
                }
            })
            .then(json => this.setState({allTestsets: json}))
            .catch(error => console.log("error fetching testsets"));
        fetch("http://35.246.177.194:8080/api/settings/all")
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Error in fetching API Data");
                }
            })
            .then(json => this.setState({allSettings: json}))
            .catch(error => console.log("error fetching settings"));


        this.setState({
            modalVisible: true,
        });
    };

    updateSettingTable = () =>{
        fetch("http://35.246.177.194:8080/api/settings/name/"+this.state.selectedSetting)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Error in fetching API Data");
                }
            })
            .then(json => this.setState({settingData: json, modalSettingTableVisible: true}))
            .catch(error => console.log("error fetching settingdata"));
    }
    showPropsConfirm(testsetName,settingName) {
        confirm({
            title: 'Run missing',
            content: 'This testset/setting combination is missing in the database. Do you want to schedule a run?',
            okText: 'Yes',
            okType: 'primary',
            okButtonProps: {
                disabled: false,
            },
            cancelText: 'No',
            onOk() {
                console.log("http://35.246.177.194:8080/api/jobs/add/name/"+testsetName+"/"+ settingName + "/"+1+"/webrequestMissing")
                fetch("http://35.246.177.194:8080/api/jobs/add/name/"+testsetName+"/"+ settingName + "/"+1+"/webrequestMissing",{method: 'POST'})
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            throw new Error("Error in fetching API Data");
                        }
                    })
                    .then(json => this.setState({settingData: json, modalSettingTableVisible: true}))
                    .catch(error => console.log("error fetching settingdata"));
            },
            onCancel() {
            },
        });
    }

    handleOk = e => {
        console.log("fetching"+ "http://35.246.177.194:8080/api/testdata/testset/name/"+this.state.selectedTestset+"/"+this.state.selectedSetting)
        fetch("http://35.246.177.194:8080/api/testdata/testset/name/"+this.state.selectedTestset+"/"+this.state.selectedSetting)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("http://35.246.177.194:8080/api/testdata/testset/name/"+this.state.selectedTestset+"/"+this.state.selectedSetting);
                }
            })
            .then(json => this.setState({stateData: json}))
            .catch(error => this.showPropsConfirm(this.state.selectedTestset, this.state.selectedSetting));

        this.setState({
            modalVisible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            modalVisible: false,
        });
    };

    render() {



        const {isLoading, error, selectedCat} = this.state;
        if (error) {
            return (
                <div>
                    <Col span={3}>
                    </Col>
                    <Col>
                        <Row><Title level={4}>Error occured while fetching API data</Title></Row>
                        <Row>Error during fetch call:</Row>
                        <Row>{error.message}</Row>
                    </Col>
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

        if (this.state.stateData != null) {

            return this.pageDataLoaded();
        } else {
            return <div>null</div>;
        }
    }

    pageDataLoaded() {
        const {stateData} = this.state;


        var selections = this.state.selectedCat;



        var tempArray = [];
        Object.keys(stateData).forEach(function (key) {
            tempArray.push(stateData[key]);
        });
        var chartDataTemp=[]


        //iterate over selected values
        var indexOverallime=-1;
        for(let index in selections) {
            var chategoryData = {}
            chategoryData.label = selections[index]
            if(selections[index]!="overall_time"){
                chategoryData.data =[]
                for(var i = 0; i < tempArray[2].length; i++){
                    var instanceName = tempArray[2][i]["instance"]["name"]
                    chategoryData.data.push(Math.round(tempArray[2][i][selections[index]] * 100) / 100);

                }
                //backgroundColor: window.chartColors.green,
                console.log(categoryData)
                chartDataTemp.push(chategoryData)
            }else indexOverallime=index




        }
        if(indexOverallime=-1){
            var categoryData = {}
            categoryData.label = "overall_time"
            categoryData.data =[]
            for(var i = 0; i < tempArray[2].length; i++) {
                for(var i = 0; i < tempArray[2].length; i++){
                    var instanceName = tempArray[2][i]["instance"]["name"]
                    var overallTime= tempArray[2][i]["overall_time"]
                    for(let index in selections){
                        if(selections[index]!="overall_time")overallTime = overallTime - tempArray[2][i][selections[index]]
                    }

                    categoryData.data.push(Math.round(overallTime * 100) / 100);

                }
            }
            //backgroundColor: window.chartColors.green,
            console.log(categoryData)
            chartDataTemp.push(categoryData)
        }

        //get all instances as names
        var instanceNames=[]
        for(var i = 0; i < tempArray[2].length; i++){
            instanceNames.push(tempArray[2][i]["instance"]["name"])
        }





        var barChartData = {
            labels: instanceNames,
            datasets: chartDataTemp
        };



        var chartHeight = window.innerHeight - 200;
        var chartWidth = window.innerWidth - window.innerWidth * 0.15;

        console.log(chartDataTemp);
      //retrieve display options
      var times = [];
      for (let name in tempArray[2][0]) {

        var nameStr = name.toString();
        if(name.toString()!="job" && name.toString()!="instance" && name.toString()!="id" && name.toString()!="setting")times.push(<Option key={nameStr}>{nameStr}</Option>);
      }

      //retrieveTestsets to display in modal
        var testsetOptions=[]
        var testsets = this.state.allTestsets
        if(testsets!= null){
            Object.keys(testsets).forEach(function (key) {
                testsetOptions.push(<Option key={testsets[key].name}> {testsets[key].name} </Option>);
            });

        }

        //retrieve Settings to be displayed in modal
        var settingOptions=[]
        var settings = this.state.allSettings
        if(settings != null){
            Object.keys(settings).forEach(function (key) {
                settingOptions.push(<Option key={settings[key].name}> {settings[key].name} </Option>);
            });
        }

        //setTableData
        var columns=[
            {
                title: 'Settingname',
                dataIndex: 'settingname',
                key: 'settingname'
            },
            {
                title: 'Value',
                dataIndex: 'value',
                key: 'value'
            }

        ]
        var datasource=[];
        var displayedSetting = this.state.settingData;
        if(displayedSetting != null){
            var keyindex =0;
            Object.keys(displayedSetting).forEach(function (key) {
                if(key != "id" && key!="name" && key != "settingsfile"){
                    var settingTable={}
                    settingTable.settingname = key;
                    settingTable.value = ""+displayedSetting[key]
                    settingTable.key = keyindex
                    datasource.push(settingTable)
                    keyindex++;
                }
            });
        }



        var displayedName = tempArray[0]+' on setting '+tempArray[1]["settingsfile"]
        return (
          <div className={classes.graphContainer}>
              <Modal
                  title="Select testset and setting"
                  visible={this.state.modalVisible}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
              >
                  <Row><div>Testset</div></Row>
                  <Select
                      style={{ width: "100%" }}
                      mode="single"
                      placeholder="Please Select"
                      defaultValue={this.state.selectedTestset}
                      onChange={value => {
                          this.setState({ selectedTestset: value });
                      }}
                  >
                      {testsetOptions}
                  </Select>
                  <Row><div>Setting</div></Row>
                  <Select
                      style={{ width: "100%" }}
                      mode="single"
                      placeholder="Please Select"
                      defaultValue={this.state.selectedSetting}
                      onChange={value => {
                          this.setState({ selectedSetting: value });
                          this.updateSettingTable();
                      }}
                  >
                      {settingOptions}
                  </Select>
                  <Table columns={columns} dataSource={datasource}></Table>
              </Modal>
              {/*<Row> <Title level={4}>{displayedName}</Title></Row>*/}
              <Row type="flex">
                  <Col span={15}>
                      <Select
                          style={{ width: "100%" }}
                          mode="multiple"
                          placeholder="Please Select"
                          defaultValue={this.state.selectedCat}
                          onChange={value => {

                              this.setState({ selectedCat: value });
                          }}
                      >
                          {times}
                      </Select>
                  </Col>
                  <Col span={1}></Col>
                  <Col span={1}>
                      <Button type="primary" style={{ flex: 1 }} onClick={this.showModal}>Configure Chart</Button>
                  </Col>
              </Row>
            <div style={{ display: "flex", maxWidth: 1600 }}>
                <Bar
                    data={barChartData}
                    width={chartWidth}
                    height={chartHeight}
                    options={{
                        title: {
                        display: true,
                        text: {displayedName}
                    },
                        tooltips: {
                        mode: 'index',
                        intersect: false
                    },
                        responsive: true,
                        scales: {
                        xAxes: [{
                        stacked: true,
                    }],
                        yAxes: [{
                        stacked: true
                    }]
                    }
                    }}
                />
            </div>

          </div>
        );
    }

    handleChanges(value) {
        console.log(`selected ${value}`);
        console.log(this.state.selectedCat);
    }
}
