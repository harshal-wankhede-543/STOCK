import { Box } from "@mui/material";
import TradeForm from "../components/TradeForm.jsx";
import LiveTicker from "../components/LiveTicker.jsx";

const Trade = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", p: 2 }}>
      <LiveTicker />
      <TradeForm onStockAdded={() => {}} />
    </Box>
  );
};

export default Trade;
