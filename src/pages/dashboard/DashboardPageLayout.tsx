import React, {useEffect, useState} from "react";
import background from "../../assets/images/light_bulb.png";
import styled from "styled-components";
import {Typography, Paper, Grid} from "@mui/material";
import MediaCard from "../components/MediaCard";
import questionImage from "../../assets/images/questions.png";
import usersImage from "../../assets/images/users.jpg";
import colorConfigs from "../../configs/colorConfigs";
import {getAllUsers} from "../../services/UserApi";
import {getAllDevices} from "../../services/DevicesApi";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url(${background});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 200%;
  width: 100%;
  background-color: rgba(150, 150, 93, 0.15);
  z-index: 1;
`;

const Title = styled(Typography)`
  color: white;
  font-weight: bold;
  z-index: 2;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  font-size: 50px;
  position: relative;
  top: 100px;
`;

const Description = styled(Typography)`
  color: white;
  z-index: 2;
  text-align: center;
  max-width: 600px;
  margin-top: 2px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  font-size: 25px;
  position: relative;
  top: 100px;
`;

const FullHeightPaper = styled(Paper)`
  height: 100vh;
  z-index: 2;
`;

const DashboardPageLayout = () => {
    const [nrOfUsers, setNrOfUsers] = useState(0);
    const [nrOfDevices, setNrOfDevices] = useState(0);

    useEffect(() => {
        (async function() {
            const users = await getAllUsers();
            const devices = await getAllDevices();
            setNrOfUsers(users.length);
            setNrOfDevices(devices.length);
        })()
    }, []);
    return (
        <FullHeightPaper elevation={3}>
            <Overlay/>
            <Container>
                <Title variant="h4">Welcome to your Energy Managment System!</Title>
                <Description variant="body1">
                    Discover our Energy Management App, the ultimate solution for users to oversee and control energy
                    consumption across all their devices. Easily monitor, set preferences, and save on energy costs with
                    real-time insights.
                </Description>
            </Container>
            <Grid container spacing={2} justifyContent="center" marginTop={4} sx={{
                backgroundColor: colorConfigs.topbar.bg
            }}>
                <Grid item>
                    <MediaCard
                        image={usersImage}
                        title="Users"
                        description={`Number of users: ${nrOfUsers}`}
                    />
                </Grid>
                <Grid item>
                    <MediaCard
                        image={questionImage}
                        title="Devices"
                        description={`Number of devices: ${nrOfDevices}`}
                    />
                </Grid>
            </Grid>
        </FullHeightPaper>
    );
};

export default DashboardPageLayout;
