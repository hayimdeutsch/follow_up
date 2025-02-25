import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

const FollowupsManager = ({ loading, student }) => {
  const [followupsData, setFollowupsData] = useState([]);
  const [studentId, setStudentId] = useState("");

  useEffect(() => {
    if (!loading && student) {
      setFollowupsData(student.followUps);
      setStudentId(student._id);
    }
  }, [loading, student]);

  return (
    <Box
      sx={{
        minHeight: 200,
        maxHeight: 400,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Typography
        color="primary"
        variant="h5"
        gutterBottom
        sx={{ alignSelf: "center" }}
      >
        Follow-ups
      </Typography>
      <Box sx={{ flexGrow: 1, overflow: "auto", mb: 2 }}>
        {loading ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100%"
          >
            <Typography>Loading...</Typography>
          </Box>
        ) : !followupsData || followupsData.length === 0 ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100%"
          >
            <Typography>No followups exist.</Typography>
          </Box>
        ) : (
          <Paper sx={{ height: "100%", overflow: "auto" }}>
            <List>
              {followupsData.map((followup, index) => (
                <ListItem key={index}>
                  <ListItemText primary={followup.title} />
                  <IconButton
                    edge="end"
                    onClick={() => handleDeleteFollowup(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </Paper>
        )}
      </Box>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to={{pathname: `/student/followups/create`,
             state: { student }}
      }
        sx={{ mt: 2 }}
      >
        Create New Followup
      </Button>
    </Box>
  );
};

export default FollowupsManager;
