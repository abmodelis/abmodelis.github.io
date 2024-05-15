import * as React from "react";
import { /*dayjs,*/ Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

type Props = {
  title: String;
};

export const BirthDataPicker: React.FC<Props> = ({ title }) => {
  const [value, setValue] = React.useState<Dayjs | null>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker", "DatePicker"]}>
        <DatePicker
          label={title}
          value={value}
          onChange={(newValue) => setValue(newValue)}
          format="DD/MM/YYYY"
          sx={{ width: "100%" }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};
