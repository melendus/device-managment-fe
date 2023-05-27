import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Avatar,
  Typography,
  Chip,
  Box,
} from "@mui/material";
import horeaDiagram from "../../../images/horeaDIagram.png";
import Vote from "./Vote";

const QuestionPage = () => {
  const question = {
    title: "How to use Material-UI in React?",
    author: "John Doe",
    description:
      "I'm having trouble using Material-UI in my React project. Can anyone provide guidance?",
    date: "May 20, 2023",
    time: "10:00 AM",
    tags: ["react", "material-ui", "frontend"],
    answers: [
      {
        author: "Jane Smith",
        content:
          "You can import Material-UI components and use them in your React components. Make sure to install the required dependencies first.",
      },
      {
        author: "Mike Johnson",
        content:
          "I recommend checking out the Material-UI documentation for detailed instructions and examples. It's a great resource!",
      },
    ],
    image: horeaDiagram,
  };

  const totalAnswers = question.answers.length;

  const handleImageClick = () => {
    window.open(question.image, "_blank");
  };

  return (
    <Card>
      <CardHeader
        avatar={
          <>
            <Vote />
            <Avatar sx={{ width: 60, height: 60 }}>
              {question.author.charAt(0)}
            </Avatar>
          </>
        }
        title={
          <Typography variant="h4" component="div" fontWeight="bold">
            {question.title}
          </Typography>
        }
        subheader={`Asked by ${question.author} on ${question.date} at ${question.time}`}
      />
      <CardContent>
        <Box mb={2}>
          <Typography variant="body2" color="text.secondary">
            Tags:{" "}
            {question.tags.map((tag) => (
              <Chip key={tag} label={tag} style={{ marginRight: "5px" }} />
            ))}
          </Typography>
        </Box>
        <Typography variant="body1" gutterBottom>
          {question.description}
        </Typography>
        <CardMedia
          component="img"
          alt="Question Image"
          image={question.image}
          style={{ maxWidth: "50%", maxHeight: "50%", cursor: "pointer" }}
          onClick={handleImageClick}
        />
        <Box mt={3}>
          <Typography variant="h6" gutterBottom>
            Answers ({totalAnswers}):
          </Typography>
          {question.answers.map((answer, index) => (
            <Box
              key={index}
              sx={{
                border: "1px solid rgba(0, 0, 0, 0.12)",
                borderRadius: "4px",
                p: 2,
                mt: 2,
                display: "flex", // Add flex display
                alignItems: "flex-start", // Adjust alignment as per your needs
              }}
            >
              <Vote />

              <Box sx={{ ml: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Avatar>{answer.author.charAt(0)}</Avatar>
                  <Typography variant="subtitle1" sx={{ ml: 1 }}>
                    {answer.author}
                  </Typography>
                </Box>
                <Typography variant="body1">{answer.content}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default QuestionPage;
