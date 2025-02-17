import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useAuth } from "../config/AuthContext";

// const Header = () => {
//   const { isAuthenticated, logout } = useAuth();

//   return (
//     <AppBar
//       position="sticky"
//       sx={{
//         bgcolor: "#fcfcfc",
//         py: 1,
//         px: "10%",
//         borderBottom: "10px solid #8b2233",
//       }}
//     >
//       <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
//         <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
//           <Typography
//             variant="h1"
//             component="span"
//             sx={{ color: "primary.main", fontWeight: 600 }}
//           >
//             Connect
//           </Typography>
//           <Typography
//             variant="h3"
//             component="span"
//             sx={{ mx: 2, color: "#bbbbbb", fontWeight: 500 }}
//           >
//             a
//           </Typography>
//           <img src="/Core-Logo.png" alt="Logo" style={{ height: 50 }} />
//           <Typography
//             variant="h3"
//             component="span"
//             sx={{ marginLeft: 2, color: "#dddddd", fontWeight: 500 }}
//           >
//             project
//           </Typography>
//         </Box>
//         {isAuthenticated && (
//           <Button
//             color="transparent"
//             onClick={logout}
//             sx={{
//               fontWeight: 500,
//               color: "primary.main",
//               backgroundColor: "transparent",
//               "&:hover": {
//                 backgroundColor: "transparent",
//                 textShadow: "0 0 1px #8b2233",
//               },
//             }}
//           >
//             Logout
//           </Button>
//         )}
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Header;
const Header = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: "#fcfcfc",
        py: { xs: 1, sm: 1.5 },
        px: { xs: "5%", sm: "10%" },
        borderBottom: "10px solid #8b2233",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <Typography
            variant="h5"
            component="span"
            sx={{
              color: "primary.main",
              fontWeight: 600,
              fontSize: { xs: "1.5rem", sm: "2rem" },
            }}
          >
            Connect
          </Typography>
          <Typography
            variant="h6"
            component="span"
            sx={{
              mx: 2,
              color: "#bbbbbb",
              fontWeight: 500,
              fontSize: { xs: "1.2rem", sm: "1.5rem" },
            }}
          >
            a
          </Typography>
          <img
            src="/Core-Logo.png"
            alt="Logo"
            style={{
              height: "40px",
              width: "auto",
              maxHeight: "40px",
            }}
          />
          <Typography
            variant="h6"
            component="span"
            sx={{
              marginLeft: 2,
              color: "#dddddd",
              fontWeight: 500,
              fontSize: { xs: "1.2rem", sm: "1.5rem" },
            }}
          >
            project
          </Typography>
        </Box>
        {isAuthenticated && (
          <Button
            color="transparent"
            onClick={logout}
            sx={{
              fontWeight: 500,
              color: "primary.main",
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent",
                textShadow: "0 0 1px #8b2233",
              },
              fontSize: { xs: "0.9rem", sm: "1rem" },
            }}
          >
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
