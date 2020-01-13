import React, {Component} from "react";
import {Button, Select, Row, Col, Typography, Modal, Table} from "antd";
const {Title} = Typography;

export default class AllJobs extends Component{
    constructor(props) {
        super(props);
        this.state = {
            runningJobsData: null,
            isLoading:true
        };
    }
    componentDidMount() {
        console.log("http://35.246.177.194:8080/api/jobs/all")
        fetch("http://35.246.177.194:8080/api/jobs/all")
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("/api/jobs/all");
                }
            })
            .then(json => this.setState({runningJobsData: json, isLoading: false}))
            .catch(error => this.setState({error, isLoading: false}));
    }

    render(){
        var columns=[
            {
              title: 'Job Name',
              dataIndex: 'name',
                key: 'name'
            },
            {
                title: 'Testset',
                dataIndex: 'testsetname',
                key: 'testsetName'
            },
            {
                title: 'Setting',
                dataIndex: 'settingname',
                key: 'settingName'
            },
            {
                title: 'Scheduled',
                dataIndex: 'date_inserted',
                key: 'scheduled'
            },

            {
                title: 'Executed',
                dataIndex: 'date_executed',
                key: 'executed'
            },
            {
                title: 'Finished',
                dataIndex: 'date_finished',
                key:'finished'
            },
            {
                title: 'Author',
                dataIndex: 'author',
                key:'author'
            }

        ]
        var tabledata=[]
        var runningjobs = this.state.runningJobsData;

        if(runningjobs != null){
            var keyindex =0;
            for(var i =0; i< runningjobs.length; i++){
                var settingTable={}
                Object.keys(runningjobs[i]).forEach(function (key) {
                    if(key != "setting" && key!="testset"){
                        settingTable[key] = runningjobs[i][key];
                    }
                    if(key == "setting"){
                        settingTable["settingname"] = runningjobs[i][key]["name"]
                    }
                    if(key == "testset"){
                        settingTable["testsetname"] = runningjobs[i][key]["name"]
                    }





                });
                settingTable.key = runningjobs[i]["testset"]["name"] +keyindex;
                tabledata.push(settingTable);
                console.log(settingTable)
            }

        }

        return(
            <div>
                <Table columns={columns} dataSource={tabledata}>

                </Table>
            </div>
        );
    }
}