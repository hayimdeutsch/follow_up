// import React from "react";
// import { useFormContext, Controller } from "react-hook-form";
// import { TextField as MuiTextField, Box, Typography } from "@mui/material";

// const DateField = ({ name, label, labelPosition = "in-field" }) => {
//   const { control } = useFormContext();

//   return (
//     <Box>
//       {labelPosition === "top" && (
//         <Typography variant="body1">{label}</Typography>
//       )}
//       <Controller
//         name={name}
//         control={control}
//         render={({ field, fieldState: { error } }) => (
//           <MuiTextField
//             {...field}
//             label={labelPosition === "in-field" ? label : ""}
//             type="date"
//             error={!!error}
//             helperText={error ? error.message : ""}
//             fullWidth
//             variant="outlined"
//             margin="normal"
//             slotProps={{
//               input: {
//                 placeholder: "YYYY-MM-DD",
//               },
//               inputLabel: {
//                 shrink: true,
//               },
//             }}
//           />
//         )}
//       />
//     </Box>
//   );
// };

// export default DateField;
import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField as MuiTextField, Box, Typography } from "@mui/material";
import dayjs from "dayjs";

const DateField = ({ name, label, labelPosition = "in-field", ...props }) => {
  const { control } = useFormContext();

  return (
    <Box>
      {labelPosition === "top" && (
        <Typography variant="body1">{label}</Typography>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <DatePicker
            {...field}
            {...props}
            label={labelPosition === "in-field" ? label : ""}
            value={field.value ? dayjs(field.value) : null} // Ensure value is a dayjs object
            onChange={(newValue) => {
              field.onChange(newValue ? newValue.toISOString() : null);
            }}
            slotProps={{
              textField: {
                error: !!error,
                helperText: error ? error.message : "",
                fullWidth: true,
                variant: "outlined",
                margin: "normal",
              },
            }}
          />
        )}
      />
    </Box>
  );
};

export default DateField;
