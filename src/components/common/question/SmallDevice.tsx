import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { Chip, Grid, IconButton, Stack } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { Device, QuestionType, UserType } from "../types/DataTypes";
import { useAppDispatch } from "../../../hooks/hooks";
import { updateQuestion } from "../../../redux/slices/QuestionSlice";
import { useEffect, useState } from "react";
import { findOneUser } from "../../../services/UserApi";

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
  device: Device;
  setDeviceToUpdate: (device: Device) => void;
  setIsUpdate: (update: boolean) => void;
  setIsOpen: (open: boolean) => void;
  showOptions: boolean;
}

const INITIAL_USER: UserType = {
  id: -1,
  firstName: "",
  lastName: "",
  role: "",
  email: "",
};

const SmallDevice = ({
  device,
  setDeviceToUpdate,
  setIsUpdate,
  setIsOpen,
  showOptions,
}: QuestionProps) => {
  const dispatch = useAppDispatch();

  const [allocatedUser, setAllocatedUser] = useState<any>(INITIAL_USER);

  useEffect(() => {
    (async function () {
      if (device.userId !== null) {
        const { data: foundUser } = await findOneUser(device.userId.toString());
        setAllocatedUser(foundUser);
      }
    })();
  }, [device]);

  return (
    <Card style={{ width: "100%", overflow: "visible", marginBottom: "10px" }}>
      <CardContent>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs>
            <CardHeader
              avatar={
                <HeaderContainer>
                  <Avatar
                    sx={{ backgroundColor: red[500] }}
                    aria-label="question"
                  >
                    {device.name.charAt(0)}
                  </Avatar>
                </HeaderContainer>
              }
              action={
                <IconButton
                  aria-label="settings"
                  onClick={() => {
                    setDeviceToUpdate(device);
                    setIsOpen(true);
                    setIsUpdate(true);
                  }}
                  disabled={showOptions}
                >
                  <KeyboardArrowRightIcon />
                </IconButton>
              }
              titleTypographyProps={{ variant: "h5" }}
              title={device.name}
              subheader={<>Address: {device.address}</>}
              sx={{
                padding: "16px 16px 16px 0",
              }}
            />

            <Typography variant="body2" color="text.secondary">
              {device.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <b>Energy Consumption per Hour:</b>{" "}
              {device.energyConsumptionPerHour}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <b>Allocated User:</b>{" "}
              {`${allocatedUser.firstName} ${allocatedUser.lastName}`}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SmallDevice;
