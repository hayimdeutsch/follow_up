import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { FormControlLabel, Checkbox } from "@mui/material";

const CheckboxField = ({ name, label, sx, ...props }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          control={
            <Checkbox {...field} {...props} checked={field.value} sx={sx} />
          }
          label={label}
        />
      )}
    />
  );
};

export default CheckboxField;
