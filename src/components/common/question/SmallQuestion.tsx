import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { Chip, Grid, IconButton, Stack } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Question } from "./config";
import Vote from "./Vote";
import styled from "styled-components";
import colorConfigs from "../../../configs/colorConfigs";
import { QuestionType } from "../types/DataTypes";

const Header = styled.h1`
  font-size: 20px;
  margin-right: 5px;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
`;

const QuestionScoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 70px;
`;

interface QuestionProps {
  question: QuestionType;
}

const questionScore = 50;

const SmallQuestion = ({ question }: QuestionProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const date = new Date(question.createdAt);

  return (
    <Card style={{ width: "100%", overflow: "visible", marginBottom: "10px" }}>
      <CardContent>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <QuestionScoreContainer>
              <Header>{questionScore}</Header>
            </QuestionScoreContainer>
          </Grid>
          <Grid item xs>
            <CardHeader
              avatar={
                <HeaderContainer>
                  <Avatar
                    sx={{ backgroundColor: red[500] }}
                    aria-label="question"
                  >
                    {question.creator.firstName.charAt(0)}
                  </Avatar>
                </HeaderContainer>
              }
              action={
                <IconButton
                  aria-label="settings"
                  onClick={() => navigate("/question")}
                >
                  <KeyboardArrowRightIcon />
                </IconButton>
              }
              titleTypographyProps={{ variant: "h5" }}
              title={question.title}
              subheader={
                <>
                  {date.toLocaleDateString()} | Author:{"  "}
                  {question.creator.firstName}
                </>
              }
              sx={{
                padding: "16px 16px 16px 0",
              }}
            />

            <Typography variant="body2" color="text.secondary">
              {question.description}
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              style={{ marginTop: "15px", marginBottom: "5px" }}
            >
              {question.tags.map((tag, index) => (
                <Chip label={tag.name} key={index} />
              ))}
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SmallQuestion;
