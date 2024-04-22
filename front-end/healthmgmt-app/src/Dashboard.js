import React, { Component } from "react";
import HealthTracking from "./HealthTracking";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            healthData: null
        };
    }

    componentDidMount() {
        this.checkToken();
        this.getHealthDetails();
    }

    checkToken() {
        if (!localStorage.getItem("token")) {
            this.props.history.push("/");
        }
    }

    getHealthDetails() {
        const token = localStorage.getItem("token");
        if (!token) {
            this.props.history.push("/");
            return; // Exit function early if token is not available
        }

        fetch("https://healthmanagementapi.orangewave-663720c0.eastus.azurecontainerapps.io/api/hms/fhir/patientHealthData", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // Attach token to Authorization header
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error_message) {
                    alert(data.error_message);
                } else {
                    this.setState({ healthData: data });
                    console.log(data);
                }
            })
            .catch((err) => console.error(err));
    }


    render() {
        return (
            <div className='dashboard'>
                <h2 style={{marginBottom: "30px"}}>
                    {this.state.healthData ? (
                        <HealthTracking data={this.state.healthData}/>
                    ) : null}
                </h2>
            </div>

        );
    }
}

export default Dashboard;
