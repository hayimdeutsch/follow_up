import React from "react";
import { TextField as MUITextField } from "@mui/material";
import { Controller } from "react-hook-form";

const TextField = ({ name, control, label, rules, ...props }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <MUITextField
          {...field}
          {...props}
          label={label}
          error={!!error}
          helperText={error?.message}
          fullWidth
          variant="outlined"
          margin="normal"
        />
      )}
    />
  );
};

export default TextField;
