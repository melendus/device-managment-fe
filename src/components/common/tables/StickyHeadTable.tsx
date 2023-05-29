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
import { getAllUsers, updateUser } from "../../../services/UserApi";
import { Button } from "@mui/material";
import { useAppSelector } from "../../../hooks/hooks";
import { banUser } from "../../../services/AdminApi";

interface Column {
  id: "firstName" | "lastName" | "score" | "email" | "button";
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
    id: "score",
    label: "Score",
    minWidth: 100,
    align: "right",
  },
  { id: "button", label: "", minWidth: 50 },
];

const creator: UserType = {
  userId: Math.random() * 1000,
  firstName: "Stefan",
  lastName: "CEl mare",
  role: "user",
  score: 100,
  email: "email@email.com",
};

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
  } // Convert to string representation
  return value;
};
export default function StickyHeadTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState<any[]>(originalRows);

  const currentUser = useAppSelector((state) => state.currentUser);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await getAllUsers();
      console.log("users--->", res.data);
      setRows(res.data);
    };
    fetchUsers();
  }, []);

  const onBanHandle = async (user: any) => {
    const res = await banUser(user);
    console.log("res---->", res);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const navigate = useNavigate();

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
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
                    onClick={() => {}}
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
                            {currentUser.role === "admin" && (
                              <Button onClick={() => onBanHandle(row)}>
                                BAN
                              </Button>
                            )}
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
