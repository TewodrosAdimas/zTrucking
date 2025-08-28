import React from "react";
import { useTranslation } from "react-i18next";
import { MenuItem, Select, FormControl } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const handleChange = (event: SelectChangeEvent) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <FormControl size="small" sx={{ minWidth: 120 }}>
      <Select value={i18n.language} onChange={handleChange}>
        <MenuItem value="en">🇺🇸 English</MenuItem>
        <MenuItem value="am">🇪🇹 አማርኛ</MenuItem>
      </Select>
    </FormControl>
  );
};

export default LanguageSwitcher;
