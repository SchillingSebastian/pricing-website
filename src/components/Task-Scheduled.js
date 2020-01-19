import React, {Component} from "react";
import {Button, Select, Row, Col, Typography, Modal, Table} from "antd";
import moment from "moment";
const {Title} = Typography;

export default class ScheduledJobs extends Component{
    constructor(props) {
        super(props);
        this.state = {
            runningJobsData: null,
            isLoading:true
        };
    }
    componentDidMount() {
        console.log("http://46.4.80.238:8080/api/jobs/scheduled")
        fetch("http://46.4.80.238:8080/api/jobs/scheduled")
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
        var scheduledJobs = this.state.runningJobsData;

        if(scheduledJobs != null){
            var keyindex =0;
            for(var i =0; i< scheduledJobs.length; i++){
                var settingTable={}
                Object.keys(scheduledJobs[i]).forEach(function (key) {
                    if(key != "setting" && key!="testset"){
                        if(key =="date_inserted" || key=="date_executed" || key =="date_finished"){
                            if(scheduledJobs[i][key] != null) settingTable[key] = moment.utc(scheduledJobs[i][key]).format("Do MMM YYYY, h:mm:ss a")
                        }else settingTable[key] = scheduledJobs[i][key];
                    }
                    if(key == "setting"){
                        settingTable["settingname"] = scheduledJobs[i][key]["name"]
                    }
                    if(key == "testset"){
                        settingTable["testsetname"] = scheduledJobs[i][key]["name"]
                    }
                });
                settingTable.key = scheduledJobs[i]["testset"]["name"] +keyindex;
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