import { Helmet } from "react-helmet-async";
import { filter } from "lodash";
import { sentenceCase } from "change-case";
import { useEffect, useState } from "react";
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Grid,
  TextField,
  CardHeader,
} from "@mui/material";
// components
import Label from "../components/label";
import Iconify from "../components/iconify";
import Scrollbar from "../components/scrollbar";
// mock
import DataTableHead from "src/sections/@dashboard/datatable/DataTableHead";
import { fDate } from "src/utils/formatTime";
import { AppOrderTimeline } from "src/sections/@dashboard/app";
import { faker } from "@faker-js/faker";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Delete, Done, MoreVert } from "@mui/icons-material";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "label", label: "Label", alignRight: false },
  { id: "scheduledDate", label: "Scheduled Date", alignRight: false },
  { id: "completedDate", label: "Completed Date", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "" },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_vaccination) =>
        _vaccination.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function VaccinationPage() {
  const { user } = useOutletContext();
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [vaccinations, setVaccinations] = useState([]);

  const [upcomingVaccinations, setUpcomingVaccinations] = useState([]);

  const [scheduledDate, setScheduledDate] = useState(null);

  const [selectedItemId, setSelectedItemId] = useState(null);

  // get all vaccinations through axios
  useEffect(() => {
    getVaccinations();
    // eslint-disable-next-line
  }, []);

  const getVaccinations = () => {
    axios
      .get("http://43.205.113.198:3001/pet/vaccinations", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        setVaccinations(response.data);

        // get 6 upcoming vaccinations
        const topSixVaccinations = response.data.filter(
          (vaccination) => vaccination.status === "pending"
        );
        topSixVaccinations.sort(
          (a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate)
        );
        setUpcomingVaccinations(topSixVaccinations.slice(0, 6));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = async () => {
    const vaccination = {
      name: document.getElementById("vname").value,
      label: document.getElementById("label").value,
      scheduledDate: scheduledDate,
      completedDate: null,
      status: "scheduled",
    };
    axios
      .post("http://43.205.113.198:3001/pet/vaccinations", vaccination, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        console.log("Successfully scheduled");
        getVaccinations();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = async () => {
    axios
      .delete(`http://43.205.113.198:3001/pet/vaccinations/${selectedItemId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        console.log("Successfully deleted");
        getVaccinations();
      })
      .catch((error) => {
        console.log(error);
      });

    handleCloseMenu();
  };

  const handleComplete = async () => {
    axios
      .put(
        `http://43.205.113.198:3001/pet/vaccinations/${selectedItemId}/complete`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((response) => {
        console.log("Successfully marked as completed");
        getVaccinations();
      })
      .catch((error) => {
        console.log(error);
      });

    handleCloseMenu();
  };

  const handleOpenMenu = (event, _id) => {
    setSelectedItemId(_id);
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setSelectedItemId(null);
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = vaccinations.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - vaccinations.length) : 0;

  const filteredVaccinations = applySortFilter(
    vaccinations,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = !filteredVaccinations.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> Vaccinations | PetSmart </title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Vaccinations
          </Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => {
              document.getElementById("add_form").scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            Add New
          </Button>
        </Stack>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={9}>
            <Card>
              <Scrollbar>
                <TableContainer>
                  <Table>
                    <DataTableHead
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={vaccinations.length}
                      numSelected={selected.length}
                      onRequestSort={handleRequestSort}
                      onSelectAllClick={handleSelectAllClick}
                    />
                    <TableBody>
                      {filteredVaccinations
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => {
                          const {
                            _id,
                            name,
                            label,
                            status,
                            scheduledDate,
                            completedDate,
                          } = row;
                          const selectedVaccination =
                            selected.indexOf(_id) !== -1;
                          return (
                            <TableRow
                              hover
                              key={_id}
                              tabIndex={-1}
                              role="checkbox"
                              selected={selectedVaccination}
                            >
                              <TableCell padding="checkbox">
                                <Checkbox
                                  checked={selectedVaccination}
                                  onChange={(event) => handleClick(event, _id)}
                                />
                              </TableCell>

                              <TableCell component="th" scope="row">
                                <Typography variant="subtitle2" noWrap>
                                  {sentenceCase(name)}
                                </Typography>
                              </TableCell>

                              <TableCell align="left">{label}</TableCell>

                              <TableCell align="left">
                                {fDate(scheduledDate)}
                              </TableCell>

                              <TableCell align="left">
                                {completedDate == null
                                  ? "Not Completed"
                                  : fDate(completedDate)}
                              </TableCell>

                              <TableCell align="left">
                                <Label
                                  color={
                                    (status === "pending" && "error") ||
                                    "success"
                                  }
                                >
                                  {sentenceCase(status)}
                                </Label>
                              </TableCell>

                              <TableCell align="right">
                                <IconButton
                                  size="large"
                                  color="inherit"
                                  key={_id}
                                  onClick={(event) => {
                                    handleOpenMenu(event, _id);
                                  }}
                                >
                                  <MoreVert />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>

                    {isNotFound && (
                      <TableBody>
                        <TableRow>
                          <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                            <Paper
                              sx={{
                                textAlign: "center",
                              }}
                            >
                              <Typography variant="h6" paragraph>
                                Not found
                              </Typography>

                              <Typography variant="body2">
                                No results found for &nbsp;
                                <strong>&quot;{filterName}&quot;</strong>.
                                <br /> Try checking for typos or using complete
                                words.
                              </Typography>
                            </Paper>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>
              </Scrollbar>

              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={vaccinations.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <AppOrderTimeline
              title="Upcoming Vaccinations"
              list={upcomingVaccinations}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={9}>
            <Card id="add_form">
              <CardHeader
                title="Add new vaccination"
                subheader="Insert the vaccination details"
              />
              <Stack spacing={3} padding={3}>
                <TextField name="vname" id="vname" label="Vaccine Name" />
                <TextField name="label" id="label" label="Label (Optional)" />
                {/* <TextField name="scheduledOn" id="scheduledOn" type="date" label="Scheduled On" /> */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Scheduled Date"
                    value={scheduledDate}
                    onChange={(newValue) => {
                      setScheduledDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>

                <Button
                  size="large"
                  type="submit"
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem onClick={handleComplete}>
          <Done />
          Mark as Completed
        </MenuItem>

        <MenuItem sx={{ color: "error.main" }} onClick={handleDelete}>
          <Delete />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
