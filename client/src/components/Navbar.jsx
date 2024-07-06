import { Stack, Typography } from "@mui/material";

const Navbar = () => {
  return (
    <Stack
      direction="row"
      spacing={2}
      position="sticky"
      top={0}
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography
        variant="h4"
        fontFamily="Montserrat"
        fontWeight="700"
        color="primary.main"
      >
        Navbar
      </Typography>
    </Stack>
  );
};

export default Navbar;
