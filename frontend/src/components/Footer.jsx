import React from "react";
import { Box, Typography, Container } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: { xs: 1, sm: 2 },
        mt: "auto",
        backgroundColor: "#8b2233",
        color: "#FFFFFF",
      }}
    >
      <Container sx={{ textAlign: "center" }}>
        <Typography
          variant="body2"
          color="inherit"
          sx={{
            fontSize: { xs: "0.875rem", sm: "1rem" },
          }}
        >
          © {new Date().getFullYear()} Connect. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
