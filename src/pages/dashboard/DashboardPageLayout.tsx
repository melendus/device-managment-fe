import React from "react";
import background from "../../assets/images/stack-overflow-background.png";
import styled from "styled-components";
import { Typography, Paper, Grid } from "@mui/material";
import MediaCard from "../components/MediaCard";
import questionImage from "../../assets/images/questions.png";
import usersImage from "../../assets/images/users.jpg";
import answersImage from "../../assets/images/answers.jpg";

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
  height: 100%;
  width: 100%;
  background-color: rgba(93, 93, 93, 0.15);
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
  height: 85vh;
`;

const DashboardPageLayout = () => {
  return (
    <FullHeightPaper elevation={3}>
      <Container>
        <Overlay />
        <Title variant="h4">Welcome to our knowledge-sharing hub!</Title>
        <Description variant="body1">
          Connect, learn, and share with our vibrant tech community. Ask
          questions, find answers, and explore endless possibilities. Let's
          innovate together!
        </Description>
      </Container>
      <Grid container spacing={2} justifyContent="center" marginTop={4}>
        <Grid item>
          <MediaCard
            image={usersImage}
            title="Users"
            description="Number of users"
          />
        </Grid>
        <Grid item>
          <MediaCard
            image={questionImage}
            title="Questions"
            description="Number of questions"
          />
        </Grid>
        <Grid item>
          <MediaCard
            image={answersImage}
            title="Answers"
            description="Number of answers"
          />
        </Grid>
      </Grid>
    </FullHeightPaper>
  );
};

export default DashboardPageLayout;
