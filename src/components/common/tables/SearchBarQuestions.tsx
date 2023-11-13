import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import React, {useEffect, useState} from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  Device,
  TagType,
  UserType,
} from "../types/DataTypes";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import {getAllUsers} from "../../../services/UserApi";
import {updateCurrentUsers} from "../../../redux/slices/UserSlice";

interface SearchBarProps {
  devices: Device[];
  setCurrentDevices: (value: any) => void;
}
const SearchBarQuestions = ({
    devices,
                              setCurrentDevices,
}: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<TagType | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<UserType>();
  const [users, setUsers] = useState<UserType[]>([]);

  const dispatch = useAppDispatch();

  // const handleChangeDropdownUsers = (newValue: any) => {
  //   let searchedDevices = questions;
  //
  //   if (newValue) {
  //     searchedQuestions = questions.filter(
  //       (question) => question.creator.id === newValue.userId
  //     );
  //   }
  //
  //   setCurrentQuestions(searchedQuestions);
  //   setSelectedUsers(newValue);
  // };
  // const handleChangeText = (event: any) => {
  //   const searchedString = event.target.value;
  //   setSearchTerm(searchedString);
  //
  //   if (searchedString === "") {
  //     setCurrentQuestions(questions);
  //   } else {
  //     const searchedQuestions = questions.filter((question) => {
  //       const questionTags = question.tags.map((tag: any) => tag.name);
  //       const includesTag = questionTags.some((tagName: any) =>
  //         tagName.includes(searchedString)
  //       );
  //       const includesTitle = question.title.includes(searchedString);
  //       return includesTag || includesTitle;
  //     });
  //     setCurrentQuestions(searchedQuestions);
  //   }
  // };
  //
  // const renderUserLabel = (user: UserType) => {
  //   return `${user.firstName} ${user.lastName}`;
  // };
  //
  // useEffect(() => {
  //   (async function() {
  //     const res = await getAllUsers();
  //     dispatch(updateCurrentUsers(res));
  //     setUsers(res);
  //   })()
  // }, []);

  // return (
  //   <div
  //     style={{
  //       display: "flex",
  //       padding: "10px 15px",
  //       flexDirection: "row",
  //       gap: "5px",
  //     }}
  //   >
  //     <TextField
  //       id="search"
  //       type="search"
  //       label="Search"
  //       value={searchTerm}
  //       onChange={handleChangeText}
  //       sx={{ width: 600 }}
  //       InputProps={{
  //         endAdornment: (
  //           <InputAdornment position="end">
  //             <SearchIcon />
  //           </InputAdornment>
  //         ),
  //       }}
  //     />
  //       <Autocomplete
  //         sx={{ flexGrow: "1", width: "120px" }}
  //         options={users}
  //         getOptionLabel={(option: UserType) => renderUserLabel(option)}
  //         value={selectedUsers}
  //         onChange={(event: any, newValue: any) =>
  //           handleChangeDropdownUsers(newValue)
  //         }
  //         renderInput={(params) => (
  //           <TextField {...params} label="users" variant="outlined" />
  //         )}
  //       />
  //   </div>
  // );
  return
  <div></div>
};

export default SearchBarQuestions;
