import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  QuestionType,
  QuestionTypeSearchBar,
  TagType,
  UserType,
} from "../types/DataTypes";

interface SearchBarProps {
  questions: any[];
  setCurrentQuestions: (value: any) => void;
  tags: TagType[];
  users: any[];
}
const SearchBarQuestions = ({
  questions,
  setCurrentQuestions,
  tags,
  users,
}: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<TagType | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<UserType>();

  const handleChangeDropdownTag = (newValue: TagType | null) => {
    let searchedQuestions = questions;

    if (newValue) {
      searchedQuestions = questions.filter((question) => {
        return question.tags.some((tag: any) => tag.id === newValue.id);
      });
    }

    setCurrentQuestions(searchedQuestions);
    setSelectedTag(newValue);
  };

  const handleChangeDropdownUsers = (newValue: any) => {
    let searchedQuestions = questions;

    if (newValue) {
      searchedQuestions = questions.filter(
        (question) => question.creator.id === newValue.userId
      );
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
        const questionTags = question.tags.map((tag: any) => tag.name);
        const includesTag = questionTags.some((tagName: any) =>
          tagName.includes(searchedString)
        );
        const includesTitle = question.title.includes(searchedString);
        return includesTag || includesTitle;
      });
      setCurrentQuestions(searchedQuestions);
    }
  };

  const renderUserLabel = (user: UserType) => {
    return `${user.firstName} ${user.lastName}`;
  };

  return (
    <div
      style={{
        display: "flex",
        padding: "10px 15px",
        flexDirection: "column",
        gap: "5px",
      }}
    >
      <TextField
        id="search"
        type="search"
        label="Search"
        value={searchTerm}
        onChange={handleChangeText}
        sx={{ width: 600 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "5px",
        }}
      >
        <Autocomplete
          sx={{ flexGrow: "1", width: "120px" }}
          options={tags}
          getOptionLabel={(option: TagType) => option.name}
          value={selectedTag}
          onChange={(event: any, newValue: TagType | null) =>
            handleChangeDropdownTag(newValue)
          }
          renderInput={(params) => (
            <TextField {...params} label="tags" variant="outlined" />
          )}
        />
        <Autocomplete
          sx={{ flexGrow: "1", width: "120px" }}
          options={users}
          getOptionLabel={(option: UserType) => renderUserLabel(option)}
          value={selectedUsers}
          onChange={(event: any, newValue: any) =>
            handleChangeDropdownUsers(newValue)
          }
          renderInput={(params) => (
            <TextField {...params} label="users" variant="outlined" />
          )}
        />
      </div>
    </div>
  );
};

export default SearchBarQuestions;
