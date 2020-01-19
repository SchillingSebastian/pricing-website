import React, {Component} from "react";
import {Button, Select, Row, Col, Typography, Modal, Table} from "antd";
import moment from 'moment';
const {Title} = Typography;

export default class RunningJobs extends Component{
    constructor(props) {
        super(props);
        this.state = {
            runningJobsData: null,
            isLoading:true
        };
    }
    componentDidMount() {
        console.log("http://46.4.80.238:8080/api/jobs/running")
        fetch("http://46.4.80.238:8080/api/jobs/running")
            .then(response => {
                console.log(response)
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("/api/testdata/testset/name/"+this.state.selectedTestset+"/"+this.state.selectedSetting);
                }
            })
            .then(json => this.setState({runningJobsData: json, isLoading: false}))
            .catch(error => this.setState({error, isLoading: false}));
    }

    render(){
        var columns=[
            {
                title: 'Testset',
                dataIndex: 'testsetName',
                key: 'testsetName'
            },
            {
                title: 'Setting',
                dataIndex: 'settingsName',
                key: 'settingsName'
            },
            {
                title: 'Scheduled',
                dataIndex: 'scheduled',
                key: 'scheduled'
            },

            {
                title: 'Executed',
                dataIndex: 'executed',
                key: 'executed'
            }

        ]
        var tabledata=[]
        var runningjobs = this.state.runningJobsData;

        if(runningjobs != null){
            var keyindex =0;
            for(var i =0; i< runningjobs.length; i++){
                var settingTable={}
                Object.keys(runningjobs[i]).forEach(function (key) {

                    if(key == "scheduled" || key =="executed"){
                        if(runningjobs[i][key] != null) settingTable[key] = moment.utc(runningjobs[i][key]).format("Do MMM YYYY, h:mm:ss a")
                    }
                    else settingTable[key] = runningjobs[i][key];
                });
                settingTable.key = runningjobs[i]["testsetName"] +keyindex;
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