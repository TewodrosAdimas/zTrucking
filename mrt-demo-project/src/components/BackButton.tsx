import React from "react";
import { Button } from "@mui/material";

interface BackButtonProps {
  onClick: () => void;
  label: string;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick, label }) => {
  return (
    <Button variant="contained" onClick={onClick}>
      {label}
    </Button>
  );
};

export default BackButton;
