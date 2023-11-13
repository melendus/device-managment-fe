import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import { UserType } from "../types/DataTypes";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../../../services/UserApi";
import { useAppSelector } from "../../../hooks/hooks";
import { banUser } from "../../../services/AdminApi";
import { useAppDispatch } from "../../../hooks/hooks";
import { updateClickedUser } from "../../../redux/slices/ClickedUserSlice";
import { OptionsButton } from "../OptionsButton";
import { getActionsUser } from "../../../utils/usersUtils";
import Button from "@mui/material/Button";
import styled from "styled-components";
import AddUserModal from "../../../pages/userProfile/AddUserModal";
import { updateCurrentUsers } from "../../../redux/slices/UserSlice";

interface Column {
  id: "firstName" | "lastName" | "actions" | "email" | "button";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: Date) => string;
}

const columns: readonly Column[] = [
  { id: "firstName", label: "First Name", minWidth: 170 },
  { id: "lastName", label: "Last Name", minWidth: 100 },
  { id: "email", label: "Email", minWidth: 100 },
  {
    id: "actions",
    label: "Actions",
    minWidth: 100,
    align: "right",
  },
  { id: "button", label: "", minWidth: 50 },
];

const creator: UserType = {
  id: Math.random() * 1000,
  firstName: "Stefan",
  lastName: "CEl mare",
  role: "user",
  email: "email@email.com",
};

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
`;

const originalRows: UserType[] = [
  creator,
  creator,
  creator,
  creator,
  creator,
  creator,
  creator,
  creator,
  creator,
  creator,
  creator,
  creator,
  creator,
  creator,
  creator,
  creator,
  creator,
  creator,
];

const getText = (fieldName: string, value: any) => {
  if (fieldName === "createdAt") {
    return value ? value.toLocaleDateString("en-GB") : "";
  }
  return value;
};
export default function StickyHeadTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState<any[]>(originalRows);
  const [openAddUserModal, setOpenAddUserModal] = useState(false);

  const [isUpdate, setIsUpdate] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState();

  const handleOpen = () => setOpenAddUserModal(true);
  const handleClose = () => setOpenAddUserModal(false);

  const currentUserState = useAppSelector((state) => state.currentUser);
  const userOptions = getActionsUser();

  const dispatch = useAppDispatch();

  useEffect(() => {
    (async function () {
      const res = await getAllUsers();
      dispatch(updateCurrentUsers(res));
      setRows(res);
    })();
  }, []);

  useEffect(() => {
    setRows(currentUserState.currentUsers);
  }, [currentUserState.currentUsers]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <AddUserModal
        closeModal={handleClose}
        open={openAddUserModal}
        isUpdate={isUpdate}
        userToUpdate={userToUpdate}
      />
      <ButtonsContainer>
        <Button variant="contained" onClick={handleOpen}>
          Add User
        </Button>
      </ButtonsContainer>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={index}
                    onClick={() => {
                      dispatch(updateClickedUser({ userId: row.id }));
                      setOpenAddUserModal(true);
                      setIsUpdate(true);
                      setUserToUpdate(row);
                    }}
                    sx={{ cursor: "pointer" }}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      if (column.id === "button") {
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{
                              height: "65px",
                            }}
                          >
                            <OptionsButton
                              item={{ userId: row.id }}
                              options={userOptions}
                              isUser
                            />
                          </TableCell>
                        );
                      }
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{
                            height: "65px",
                          }}
                        >
                          {getText(column.id, value)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
