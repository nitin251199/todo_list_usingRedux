import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { useSelector, useDispatch } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DurationPicker from "react-duration-picker";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  subdiv: {
    width: 950,
    height: "auto",
    background: "#f1f2f6",
    marginTop: 5,
    padding: 15,
    borderRadius: 5,
  },
  droot: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  dsubdiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 1,
    borderRadius: 5,
  },
  cardRoot: {
    width: 251,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

export const App = (props) => {
  const classes = useStyles();

  var dispatch = useDispatch();

  var tasks = useSelector((state) => state.tasks);
  var userTasks = Object.values(tasks);

  const [taskTitle, setTaskTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [priority, setPriority] = useState("");
  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("0");
  const [seconds, setSeconds] = useState("0");
  const [status, setStatus] = useState("");
  const [data, setData] = useState([userTasks]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [open, setOpen] = React.useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleClickOpen = (data) => {
    setTaskTitle(data.taskTitle);
    setDescription(data.description);
    setDate(data.date);
    setAssignedTo(data.assignedTo);
    setPriority(data.priority);
    setHours(data.hours);
    setMinutes(data.minutes);
    setSeconds(data.seconds);
    setStatus(data.status);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    dispatch({
      type: "ADD_TASK",
      payload: [
        taskTitle,
        {
          taskTitle,
          description,
          date,
          assignedTo,
          priority,
          hours,
          minutes,
          seconds,
          status,
        },
      ],
    });
    setRefresh(!refresh);
    setTaskTitle("");
    setDescription("");
    setDate("");
    setAssignedTo("");
    setPriority("");
    // setDuration("");
    setStatus("");
    setOpen(false);
  };
  const handleDelete = (data) => {
    dispatch({ type: "REMOVE_TASK", payload: [data.taskTitle] });
    setRefresh(!refresh);
  };

  const TaskDialog = () => {
    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            <div
              style={{
                width: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                padding: 1,
              }}
            >
              <div
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  letterSpacing: 1,
                  padding: 1,
                }}
              >
                <span>Edit Task</span>
              </div>
            </div>
          </DialogTitle>
          <DialogContent>
            <div className={classes.droot}>
              <div className={classes.dsubdiv}>
                <Grid
                  container
                  xs={12}
                  spacing={1}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Grid item xs={12}>
                    <TextField
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      label="Description"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Date"
                      type="date"
                      fullWidth
                      defaultValue={
                        new Date(Date.parse(date)).getFullYear() +
                        "-" +
                        (new Date(Date.parse(date)).getMonth() + 1 > 9
                          ? new Date(Date.parse(date)).getMonth() + 1
                          : "0" + (new Date(Date.parse(date)).getMonth() + 1)) +
                        "-" +
                        (new Date(Date.parse(date)).getDate() > 9
                          ? new Date(Date.parse(date)).getDate()
                          : "0" + new Date(Date.parse(date)).getDate())
                      }
                      onChange={(e) => setDate(e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      value={assignedTo}
                      onChange={(e) => setAssignedTo(e.target.value)}
                      label="Assigned To"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-outlined-label">
                        Priority
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        label="Priority"
                      >
                        <MenuItem value={"Low"}>Low</MenuItem>
                        <MenuItem value={"Medium"}>Medium</MenuItem>
                        <MenuItem value={"High"}>High</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-outlined-label-2">
                        Status
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label-2"
                        id="demo-simple-select-outlined-2"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        label="Status"
                      >
                        <MenuItem value={0}>Pending</MenuItem>
                        <MenuItem value={1}>Completed</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    Duration:
                    <DurationPicker
                      onChange={(duration) => onChangeDuration(duration)}
                      initialDuration={{ hours: hours, minutes: minutes, seconds: seconds }}
                      noSeconds={true}
                    />
                  </Grid>
                  
                  <Grid
                    item
                    xs={12}
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      alignItems: "center",
                      marginTop: 30,
                    }}
                  >
                    <Button
                      size="large"
                      variant="outlined"
                      onClick={() => handleClick()}
                      style={{
                        borderRadius: 0,
                        border: "2px solid #000",
                        padding: "10px 60px",
                      }}
                    >
                      Edit Task
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  useEffect(() => {
    setData(userTasks);
    console.log("REFRESH", refresh);
  }, [refresh]);

  const taskCard = () => {
    return data.map((item) => {
      return (
        <Card className={classes.cardRoot}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {item.taskTitle}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Description: <b>{item.description}</b>
            </Typography>
            <Typography variant="body2" component="p">
              Date: <b>{item.date}</b>
              <br />
              Assigned To: <b>{item.assignedTo}</b>
              <br />
              Priority: <b>{item.priority}</b>
              <br />
              Duration:{" "}
              <b>{`${item.hours} hr ${item.minutes} min ${item.seconds} sec`}</b>
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={() => handleClickOpen(item)} size="small">
              Edit Task
            </Button>
            <Button onClick={() => handleDelete(item)} size="small">
              Delete Task
            </Button>
          </CardActions>
        </Card>
      );
    });
  };

  const handleSpecificDate = (value) => {
    let filterData = userTasks.filter((item) => {
      return item.date === value;
    });
    setData(filterData);
  };

  const handleDateRange = () => {
    let filterData = userTasks.filter((item) => {
      return (
        new Date(item.date).getDate() >= new Date(fromDate).getDate() &&
        new Date(item.date).getDate() <= new Date(toDate).getDate()
      );
    });
    setData(filterData);
  };

  const handlePriorityFilter = (value) => {
    let filterData = userTasks.filter((item) => {
      return item.priority === value;
    });
    setData(filterData);
  };

  const handleAssignedFilter = (value) => {
    let filterData = userTasks.filter((item) => {
      return item.assignedTo === value;
    });
    setData(filterData);
  };

  const handlePending = () => {
    let filterData = userTasks.filter((item) => {
      return item.status === 0;
    });
    setData(filterData);
  };

  const handleCompleted = () => {
    let filterData = userTasks.filter((item) => {
      return item.status === 1;
    });
    setData(filterData);
  };

  const handleReset = () => {
    setData(userTasks);
    setToDate("");
    setFromDate("");
  };

  const onChangeDuration = (duration) => {
    duration.hours !== null ? setHours(duration.hours) : setHours("0")
    duration.minutes !== null ? setMinutes(duration.minutes) : setMinutes("0")
    duration.seconds !== null ? setSeconds(duration.seconds) : setSeconds("0")
  };

  return (
    <div>
      <div>{TaskDialog()}</div>
      <Grid container>
        <Grid item xs={4}>
          <Grid container spacing={2} style={{ padding: 20 }}>
            <Grid item xs={12}>
              <Typography variant="h6">Add Task</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                label="Task title"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                label="Description"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                size="small"
                value={date}
                label="Date"
                type="date"
                fullWidth
                onChange={(e) => setDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                size="small"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                label="Assigned To"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-outlined-label">
                  Priority
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  label="Priority"
                >
                  <MenuItem value={"Low"}>Low</MenuItem>
                  <MenuItem value={"Medium"}>Medium</MenuItem>
                  <MenuItem value={"High"}>High</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-outlined-label-2">
                  Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label-2"
                  id="demo-simple-select-outlined-2"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  label="Status"
                >
                  <MenuItem value={0}>Pending</MenuItem>
                  <MenuItem value={1}>Completed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              Duration:
              <DurationPicker
                onChange={(duration) => onChangeDuration(duration)}
                noSeconds={true}
              />
            </Grid>
            
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
                marginTop: 30,
              }}
            >
              <Button
                size="large"
                variant="outlined"
                onClick={() => handleClick()}
                style={{
                  borderRadius: 0,
                  border: "2px solid #000",
                  padding: "10px 60px",
                }}
              >
                Add Task
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <div style={{ fontSize: 18, padding: 20, display: "flex" }}>
            <div style={{ flex: 1 }}>
              <b>Filter BY:-</b>
            </div>
            <div>
              <Button variant="contained" onClick={() => handleReset()}>
                Reset Filters
              </Button>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              padding: 20,
              gap: 20,
              flexWrap: "wrap",
            }}
          >
            <TextField
              size="small"
              variant="outlined"
              label="Specific Date"
              type="date"
              onChange={(e) => handleSpecificDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {/* handleDateRange */}
            <FormControl variant="outlined" size="small" style={{ width: 200 }}>
              <InputLabel id="demo-simple-select-outlined-label">
                Priority
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                onChange={(e) => handlePriorityFilter(e.target.value)}
                label="Priority"
              >
                <MenuItem value={"Low"}>Low</MenuItem>
                <MenuItem value={"Medium"}>Medium</MenuItem>
                <MenuItem value={"High"}>High</MenuItem>
              </Select>
            </FormControl>
            <TextField
            size="small"
              variant="outlined"
              helperText="Input Full Name To be searched"
              onChange={(e) => handleAssignedFilter(e.target.value)}
              label="Assigned To"
              style={{ width: 250 }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span style={{ marginRight: 20 }}>
                <b>DATE RANGE FILTER :</b>
              </span>
              <TextField
              size="small"
                label="Date"
                type="date"
                defaultValue={
                  new Date(Date.parse(fromDate)).getFullYear() +
                  "-" +
                  (new Date(Date.parse(fromDate)).getMonth() + 1 > 9
                    ? new Date(Date.parse(fromDate)).getMonth() + 1
                    : "0" + (new Date(Date.parse(fromDate)).getMonth() + 1)) +
                  "-" +
                  (new Date(Date.parse(fromDate)).getDate() > 9
                    ? new Date(Date.parse(fromDate)).getDate()
                    : "0" + new Date(Date.parse(fromDate)).getDate())
                }
                onChange={(e) => setFromDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              To
              <TextField
              size="small"
                label="Date"
                type="date"
                defaultValue={
                  new Date(Date.parse(toDate)).getFullYear() +
                  "-" +
                  (new Date(Date.parse(toDate)).getMonth() + 1 > 9
                    ? new Date(Date.parse(toDate)).getMonth() + 1
                    : "0" + (new Date(Date.parse(toDate)).getMonth() + 1)) +
                  "-" +
                  (new Date(Date.parse(toDate)).getDate() > 9
                    ? new Date(Date.parse(toDate)).getDate()
                    : "0" + new Date(Date.parse(toDate)).getDate())
                }
                onChange={(e) => setToDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Button variant="contained" onClick={() => handleDateRange()}>
                Search
              </Button>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              padding: 20,
              gap: 20,
            }}
          >
            <Button variant="contained" onClick={() => handleReset()}>
              ALL
            </Button>
            <Button variant="contained" onClick={() => handlePending()}>
              Pending
            </Button>
            <Button variant="contained" onClick={() => handleCompleted()}>
              Completed
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: 20,
              gap: 20,
              flexWrap: "wrap",
            }}
          >
            {taskCard()}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
