import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { QuestionType, TagType, UserType } from "../types/DataTypes";

interface SearchBarProps {
  questions: QuestionType[];
  setCurrentQuestions: (value: any) => void;
  tags: TagType[];
  users: UserType[];
}
const SearchBar = ({
  questions,
  setCurrentQuestions,
  users,
}: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<UserType[]>([]);

  const handleChangeDropdownUsers = (newValue: any) => {
    let searchedQuestions = questions;

    if (newValue.length > 0) {
      searchedQuestions = questions.filter((question) => {
        return newValue.some((user: any) => question.creator.id === user.id);
      });
    }

    setCurrentQuestions(searchedQuestions);
    setSelectedUsers(newValue);
  };
  const handleChangeText = (event: any) => {
    const searchedString = event.target.value;
    setSearchTerm(searchedString);

    if (searchedString === "") {
      setCurrentQuestions(questions);
    } else {
      const searchedQuestions = questions.filter((question) => {
        const questionTags = question.tags.map((tag) => tag.name);
        const includesTag = questionTags.some((tagName) =>
          tagName.includes(searchedString)
        );
        const includesTitle = question.title.includes(searchedString);
        return includesTag || includesTitle;
      });
      setCurrentQuestions(searchedQuestions);
    }
  };
  const renderUserLabel = (user: UserType) => {
    //TODO AFTER IMPLEMENTING AUTH AND STORING CURRENT USER
    //const isCurrentUser =

    return `${user.firstName} ${user.lastName}`;
  };

  return (
    <div
      style={{
        display: "flex",
        padding: "10px 0",
        flexDirection: "row",
        gap: "5px",
      }}
    >
      <TextField
        id="search"
        type="search"
        label="Search"
        value={searchTerm}
        onChange={handleChangeText}
        sx={{ width: "70vw" }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Autocomplete
        sx={{ flexGrow: "1", width: "30vw" }}
        options={users}
        getOptionLabel={(option: UserType) => renderUserLabel(option)}
        multiple
        value={selectedUsers}
        onChange={(event: any, newValue: any) =>
          handleChangeDropdownUsers(newValue)
        }
        renderInput={(params) => (
          <TextField {...params} label="Users" variant="outlined" />
        )}
      />
    </div>
  );
};

export default SearchBar;
