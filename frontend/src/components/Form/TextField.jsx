// import React from "react";
// import { TextField as MUITextField } from "@mui/material";
// import { Controller } from "react-hook-form";

// const TextField = ({ name, control, label, rules, ...props }) => {
//   return (
//     <Controller
//       name={name}
//       control={control}
//       rules={rules}
//       render={({ field, fieldState: { error } }) => (
//         <MUITextField
//           {...field}
//           {...props}
//           label={label}
//           error={!!error}
//           helperText={error?.message}
//           fullWidth
//           variant="outlined"
//           margin="normal"
//         />
//       )}
//     />
//   );
// };

// export default TextField;
import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { TextField as MuiTextField, Box, Typography } from "@mui/material";

const TextField = ({
  name,
  label,
  type = "text",
  sx,
  labelPosition = "in-field",
  ...props
}) => {
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
          <MuiTextField
            {...field}
            {...props}
            sx={sx}
            label={labelPosition === "in-field" ? label : ""}
            type={type}
            error={!!error}
            helperText={error ? error.message : ""}
            fullWidth
            variant="outlined"
            margin="normal"
            slotProps={{
              input: {
                ...(type === "date" && { placeholder: "YYYY-MM-DD" }),
              },
              inputLabel: {
                ...(type === "date" && { shrink: true }),
              },
            }}
          />
        )}
      />
    </Box>
  );
};

export default TextField;
