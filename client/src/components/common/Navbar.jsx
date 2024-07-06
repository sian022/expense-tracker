import logo from "../../assets/images/logo-no-bg.png";
import { MenuItem, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrency } from "../../slices/currencySlice";
import currencies from "../../utils/currencies";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get the selected currency from Redux store
  const selectedCurrency = useSelector((state) => state.currency.currency);

  // Handle click on logo to navigate to home
  const handleLogoClick = () => {
    navigate("/");
  };

  // Handle currency change
  const handleCurrencyChange = (e) => {
    dispatch(setCurrency(e.target.value));
  };

  return (
    <Stack
      direction="row"
      spacing={2}
      position="sticky"
      top={0}
      alignItems="center"
      justifyContent="space-between"
      px={3}
      py={2}
    >
      {/* Logo and app name section */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{ cursor: "pointer" }}
        onClick={handleLogoClick}
      >
        <img src={logo} alt="logo" width="50" />

        <Typography
          variant="h4"
          fontFamily="Montserrat"
          fontWeight={700}
          color="primary.main"
        >
          Expense Tracker
        </Typography>
      </Stack>

      {/* Currency selector section */}
      <TextField
        select
        size="small"
        sx={{ width: "140px" }}
        placeholder="Currency"
        onChange={handleCurrencyChange}
        value={selectedCurrency}
      >
        {/* Generate menu items for each currency */}
        {currencies.map((c) => (
          <MenuItem key={c.currency} value={c.currency}>
            <Stack direction="row" spacing={2} alignItems="center">
              <img src={c.flagSrc} width="20px" alt={c.name} />
              <Typography>{c.currency}</Typography>
            </Stack>
          </MenuItem>
        ))}
      </TextField>
    </Stack>
  );
};

export default Navbar;
