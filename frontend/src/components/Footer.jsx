import React from "react";
import { Box, Typography, Container } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{ py: 1, mt: "auto", backgroundColor: "#8b2233", color: "#FFFFFF" }}
    >
      <Container>
        <Typography variant="body2" color="inherit" align="center">
          © {new Date().getFullYear()} Connect. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
