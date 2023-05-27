import {
  Avatar,
  Button,
  Grid,
  styled,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import Section from "../../components/common/pageLayout/Section";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import QuestionMarkOutlinedIcon from "@mui/icons-material/QuestionMarkOutlined";
import MarkChatReadOutlinedIcon from "@mui/icons-material/MarkChatReadOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import EditProfileModal from "./EditProfileModal";

const RootContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
}));

const AvatarWrapper = styled("div")(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const AvatarImage = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(20),
  height: theme.spacing(20),
  margin: "auto",
  padding: theme.spacing(1),
  marginBottom: "10px",
  transition: "transform 0.2s ease-in-out",
  ":hover": {
    transform: "translateY(-25px)",
  },
}));

const EditButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  margin: "auto",
}));

function UserProfilePage() {
  const [isAvatarHovered, setIsAvatarHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  const handleAvatarHover = () => {
    setIsAvatarHovered(true);
  };

  const handleAvatarLeave = () => {
    setIsAvatarHovered(false);
  };

  return (
    <div>
      <EditProfileModal handleClose={handleClose} isOpen={isModalOpen} />
      <EditButton
        variant="contained"
        color="primary"
        sx={{
          marginTop: 0,
          marginBottom: 0,
        }}
        onClick={handleOpen}
      >
        Edit Profile
      </EditButton>
      <RootContainer>
        <Section centerText>
          <Grid container justifyContent="center">
            <Grid item xs={12} md={4}>
              <AvatarWrapper
                onMouseEnter={handleAvatarHover}
                onMouseLeave={handleAvatarLeave}
              >
                <AvatarImage src="/path/to/avatar.jpg" />
              </AvatarWrapper>
              <Typography variant="h4" align="center">
                User Name
              </Typography>
            </Grid>
          </Grid>
        </Section>
        <Section>
          <Typography variant="h5" gutterBottom>
            About
          </Typography>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <EmailOutlinedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="User email"
                secondary="john.doe@gmail.com"
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <AccessTimeOutlinedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Member Since" secondary="Jan 9, 2014" />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <QuestionMarkOutlinedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Number of questions"
                secondary={`This user has posted 15 questions`}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <MarkChatReadOutlinedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Number of answers"
                secondary={`This user has posted 15 answers`}
              />
            </ListItem>
          </List>
        </Section>
      </RootContainer>
    </div>
  );
}

export default UserProfilePage;
