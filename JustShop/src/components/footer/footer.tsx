import { BottomNavigation, Typography } from "@mui/material";

export const Footer = () => {
  return (
    <BottomNavigation
      sx={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        direction: "row",
        mt: "30px",
        border: "1px solid #adadad",
        backgroundColor: "#ECEDEE",
      }}
    >
      <Typography mt="15px" color="GrayText" paddingLeft="10px">
        {"© 2023 JustShop | All Rights Reserved"}
      </Typography>
    </BottomNavigation>
  );
};
