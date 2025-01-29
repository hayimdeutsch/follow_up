import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  IconButton,
} from "@mui/material";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Delete } from "@mui/icons-material";
import DateField from "../components/Form/DateField";
import dayjs from "dayjs";

const ScheduledEmails = () => {
  const { control, watch, setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "scheduledEmails",
  });

  const eventDate = watch("eventDate");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [customFollowups, setCustomFollowups] = useState([]);
  const [globalError, setGlobalError] = useState("");

  const followUpOptions = [
    { label: "2 Months", value: 2 },
    { label: "6 Months", value: 6 },
    { label: "12 Months", value: 12 },
  ];

  const handleAddFollowUp = (months) => {
    if (!eventDate) {
      setGlobalError("Please select an event date first.");
      return;
    }

    const date = dayjs(eventDate).add(months, "month");

    if (date.isBefore(dayjs())) {
      setGlobalError("Cannot select a date in the past.");
      return;
    }

    const formattedDate = date.toISOString().split("T")[0];
    if (fields.some((field) => field.scheduledDate === formattedDate)) {
      setGlobalError("This follow-up date has already been added.");
      return;
    }

    append({ scheduledDate: formattedDate });
    setSelectedOptions([...selectedOptions, months]);
    setGlobalError("");
  };

  const handleRemoveFollowUp = (months) => {
    if (!eventDate) return;

    const date = dayjs(eventDate).add(months, "month");
    const formattedDate = date.toISOString().split("T")[0];

    const indexToRemove = fields.findIndex(
      (field) => field.scheduledDate === formattedDate
    );
    if (indexToRemove !== -1) {
      remove(indexToRemove);
    }

    setSelectedOptions(selectedOptions.filter((option) => option !== months));
  };

  const handleOptionChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (selectedOptions.includes(value)) {
      handleRemoveFollowUp(value);
    } else {
      handleAddFollowUp(value);
    }
  };

  const handleAddCustomFollowUp = () => {
    const newCustomFollowup = { scheduledDate: "" };
    setCustomFollowups([...customFollowups, newCustomFollowup]);
    append(newCustomFollowup);
  };

  const handleRemoveCustomFollowUp = (index) => {
    setCustomFollowups(customFollowups.filter((_, i) => i !== index));
    remove(index);
  };

  const handleCustomFollowupChange = (index, date) => {
    const updatedCustomFollowups = customFollowups.map((followup, i) =>
      i === index ? { ...followup, scheduledDate: date } : followup
    );
    setCustomFollowups(updatedCustomFollowups);
    setValue(`scheduledEmails[${index + fields.length}].scheduledDate`, date);
  };

  return (
    <Box>
      <Typography variant="h6">Scheduled Emails:</Typography>
      <Typography variant="body2" color="textSecondary" mb={2}>
        You will receive an email on each of the following dates reminding you
        to follow up with your student. A follow up consists of a questionnaire,
        meeting, or both.
      </Typography>

      <Box display="flex" flexDirection="row" flexWrap="wrap" gap={2}>
        {followUpOptions.map((option) => (
          <FormControlLabel
            key={option.value}
            control={
              <Checkbox
                checked={selectedOptions.includes(option.value)}
                onChange={handleOptionChange}
                value={option.value}
              />
            }
            label={option.label}
          />
        ))}
      </Box>
      {globalError && <FormHelperText error>{globalError}</FormHelperText>}

      {/* Render custom follow-up fields */}
      {customFollowups.map((field, index) => (
        <Box
          key={index}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mt={2}
        >
          <DateField
            name={`scheduledEmails[${index + fields.length}].scheduledDate`}
            label={`Scheduled Date ${index + 1}`}
            labelPosition="top"
            value={field.scheduledDate}
            onChange={(date) => handleCustomFollowupChange(index, date)}
          />
          <IconButton
            color="error"
            onClick={() => handleRemoveCustomFollowUp(index)}
          >
            <Delete />
          </IconButton>
        </Box>
      ))}

      <Button type="button" onClick={handleAddCustomFollowUp} sx={{ mt: 2 }}>
        Add Custom Follow-Up Date
      </Button>
    </Box>
  );
};

export default ScheduledEmails;
