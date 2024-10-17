/**
 * Renders information about the user obtained from MS Graph
 * @param props
 */
import { useMsal } from "@azure/msal-react";
import React, { useState } from "react";
import WebService from "../../apiService/webservice";
import { baseEndPoint, endPoints } from "../../apiService/endpoints";
import { ProfileDataType } from "../../types";
import LineChart from "../../components/Charts/LineChart.view";
import Heatmap from "../../components/Charts/Heatmap.view";

export const ProfileContent = () => {
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState();

  const RequestProfileData = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const res = await WebService.get(baseEndPoint);
    console.log("profile res", res);
    setGraphData(res.data);
  };

  return (
    <>
      <h5>Welcome {accounts[0].name}</h5>
      <br />
      {graphData ? (
        <ProfileData graphData={graphData} />
      ) : (
        <button onClick={RequestProfileData}>
          Request Profile Information
        </button>
      )}
      {/* <Heatmap /> */}
      {/* <LineChart /> */}
    </>
  );
};

interface Props {
  graphData: ProfileDataType;
}

export const ProfileData: React.FC<Props> = (props) => {
  return (
    <div id="profile-div">
      <p>
        <strong>First Name: </strong> {props.graphData.givenName}
      </p>
      <p>
        <strong>Last Name: </strong> {props.graphData.surname}
      </p>
      <p>
        <strong>Email: </strong> {props.graphData.userPrincipalName}
      </p>
      <p>
        <strong>Id: </strong> {props.graphData.id}
      </p>
    </div>
  );
};
