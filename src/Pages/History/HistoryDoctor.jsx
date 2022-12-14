import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import Header from "../../Components/Header/Header";
import DoneIcon from "@mui/icons-material/Done";
import axios from "../../api/axios";
const bull = (
  <Box
    component="span"
    sx={{
      display: "inline-block",
      mx: "2px",
      transform: "scale(0.8)",
    }}>
    •
  </Box>
);
const HistoryDoctor = () => {
  const { appointments } = useSelector(
    (state) => state.appointment
  );
  const { services } = useSelector(
    (state) => state.service
  );
  let inter = [];
  for (let i = 0; i < appointments.length; i++) {
    for (let j = 0; j < services.length; j++) {
      if (appointments[i].serviceId == services[j].id) {
        inter.push(services[j]);
      }
    }
  }
  console.log(inter);
  const len = [];
  for (let i = 0; i < appointments.length; i++) {
    len.push(i + 1);
  }
  const modifyApp = async (id) => {
    try {
      await axios({
        method: "patch",
        url: `myPage/doctor/appointment/${id}/statusChange`,

        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "token"
          )}`,
        },
      });
      appointments.filter(
        (appointment) => appointment.id !== id
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Header />
      <Box sx={{ Width: 400 }} className="all-his">
        {appointments.map((appointment, index) => (
          <Card className="history" variant="outlined">
            <React.Fragment>
              <CardContent>
                <Typography
                  sx={{ fontSize: 32 }}
                  color="text.secondary"
                  gutterBottom>
                  Appointment {len[index]}
                </Typography>
                {/* <Typography variant="h5" component="div">
                  Service name: {inter[index].service_name}
                </Typography> */}
                {/* <Typography
                  sx={{ mb: 1.5 }}
                  color="text.secondary">
                  Service price: ${inter[index].price}
                </Typography> */}
                <Typography variant="body2">
                  Patient: {""}
                  <b>
                    {appointment.name} {"  "}{" "}
                    {appointment.surname}
                  </b>
                </Typography>
                <Typography variant="body2">
                  Date:{" "}
                  <b>
                    {new Date(
                      appointment.startDate
                    ).getUTCMonth() + 1}
                    /
                    {new Date(
                      appointment.startDate
                    ).getUTCDate()}
                    /
                    {new Date(
                      appointment.startDate
                    ).getUTCFullYear()}
                  </b>
                </Typography>
                <Typography variant="body2">
                  Time:{" "}
                  <b>
                    {new Date(
                      appointment.startDate
                    ).getUTCHours() + 7}
                    :
                    {new Date(
                      appointment.startDate
                    ).getUTCMinutes() == 0
                      ? "00"
                      : new Date(
                          appointment.startDate
                        ).getUTCMinutes()}
                    -
                    {new Date(
                      appointment.endDate
                    ).getUTCHours() + 7}
                    :
                    {new Date(
                      appointment.endDate
                    ).getUTCMinutes() == 0
                      ? "00"
                      : new Date(
                          appointment.endDate
                        ).getUTCMinutes()}
                  </b>
                </Typography>
                <Typography variant="body2">
                  Completed status:{" "}
                  <b>
                    {appointment.completed ? "Yes" : "No"}
                  </b>
                  <DoneIcon
                    onClick={() =>
                      modifyApp(appointment.id)
                    }
                  />
                </Typography>
              </CardContent>
            </React.Fragment>
          </Card>
        ))}
      </Box>
    </div>
  );
};

export default HistoryDoctor;
