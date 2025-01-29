import React, { useEffect, useRef } from "react";
import { Button } from "@mui/material";
import { useFormContext } from "react-hook-form";

const SubmitButton = ({ label, watchFields = [], sx, ...props }) => {
  const {
    formState: { errors },
    clearErrors,
    watch,
  } = useFormContext();
  const prevValues = useRef({});

  // Watch specific fields
  const watchedFields = watch(watchFields);

  useEffect(() => {
    const hasChanged = Object.keys(watchedFields).some(
      (key) => watchedFields[key] !== prevValues.current[key]
    );

    if (hasChanged && errors.form) {
      clearErrors("form");
    }

    prevValues.current = watchedFields;
  }, [watchedFields, clearErrors, errors.form]);

  return (
    <Button
      variant="contained"
      color={errors.form ? "error" : "primary"}
      type="submit"
      fullWidth
      sx={sx}
      {...props}
    >
      {errors.form ? errors.form.message : label}
    </Button>
  );
};

export default SubmitButton;
