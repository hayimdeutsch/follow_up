// import React from "react";
// import { useFormContext, Controller } from "react-hook-form";
// import { TextField as MuiTextField, MenuItem, Box } from "@mui/material";

// const countryCodes = [
//   { code: "+1", label: "USA" },
//   { code: "+44", label: "UK" },
//   { code: "+972", label: "Israel" },
// ];

// const PhoneNumberField = ({ name }) => {
//   const { control } = useFormContext();

//   return (
//     <Controller
//       name={name}
//       control={control}
//       defaultValue={{ countryCode: "+1", phoneNumber: "" }}
//       render={({ field, fieldState: { error } }) => (
//         <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
//           <Box sx={{ flex: 1 }}>
//             <MuiTextField
//               select
//               label="Country Code"
//               value={field.value.countryCode || "+1"}
//               onChange={(e) =>
//                 field.onChange({ ...field.value, countryCode: e.target.value })
//               }
//               error={!!error?.countryCode}
//               helperText={error?.countryCode?.message}
//               fullWidth
//               variant="outlined"
//               margin="normal"
//             >
//               {countryCodes.map((option) => (
//                 <MenuItem key={option.code} value={option.code}>
//                   {option.label} ({option.code})
//                 </MenuItem>
//               ))}
//             </MuiTextField>
//           </Box>
//           <Box sx={{ flex: 2 }}>
//             <MuiTextField
//               label="Phone Number"
//               value={field.value.phoneNumber || ""}
//               onChange={(e) =>
//                 field.onChange({ ...field.value, phoneNumber: e.target.value })
//               }
//               error={!!error?.phoneNumber}
//               helperText={error?.phoneNumber?.message}
//               fullWidth
//               variant="outlined"
//               margin="normal"
//             />
//           </Box>
//         </Box>
//       )}
//     />
//   );
// };

// export default PhoneNumberField;
import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  TextField as MuiTextField,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";

const countryCodes = [
  { code: "+1", label: "USA" },
  { code: "+44", label: "UK" },
  { code: "+972", label: "Israel" },
];

const PhoneNumberField = ({ name, label, labelPosition = "in-field" }) => {
  const { control } = useFormContext();

  return (
    <Box>
      {labelPosition === "top" && (
        <Typography variant="body1">{label}</Typography>
      )}
      <Controller
        name={name}
        control={control}
        defaultValue={{ countryCode: "+1", phoneNumber: "" }}
        render={({ field, fieldState: { error } }) => (
          <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
            <Box sx={{ flex: 1 }}>
              <MuiTextField
                select
                label={labelPosition === "in-field" ? "Country Code" : ""}
                value={field.value.countryCode || "+1"}
                onChange={(e) =>
                  field.onChange({
                    ...field.value,
                    countryCode: e.target.value,
                  })
                }
                error={!!error?.countryCode}
                helperText={error?.countryCode?.message}
                fullWidth
                variant="outlined"
                margin="normal"
              >
                {countryCodes.map((option) => (
                  <MenuItem key={option.code} value={option.code}>
                    {option.label} ({option.code})
                  </MenuItem>
                ))}
              </MuiTextField>
            </Box>
            <Box sx={{ flex: 2 }}>
              <MuiTextField
                label={labelPosition === "in-field" ? "Phone Number" : ""}
                value={field.value.phoneNumber || ""}
                onChange={(e) =>
                  field.onChange({
                    ...field.value,
                    phoneNumber: e.target.value,
                  })
                }
                error={!!error?.phoneNumber}
                helperText={error?.phoneNumber?.message}
                fullWidth
                variant="outlined"
                margin="normal"
              />
            </Box>
          </Box>
        )}
      />
    </Box>
  );
};

export default PhoneNumberField;
