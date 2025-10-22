import { Card, CardContent, Typography, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const StockList = () => {
  const stocks = [
    { symbol: "AAPL", price: 189.7, change: "+1.5%" },
    { symbol: "GOOG", price: 2845.2, change: "-0.8%" },
    { symbol: "TSLA", price: 255.4, change: "+2.1%" },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>Live Stock Prices</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Symbol</TableCell>
              <TableCell>Price ($)</TableCell>
              <TableCell>Change</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stocks.map((s) => (
              <TableRow key={s.symbol}>
                <TableCell>{s.symbol}</TableCell>
                <TableCell>{s.price}</TableCell>
                <TableCell sx={{ color: s.change.includes('+') ? 'green' : 'red' }}>{s.change}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default StockList;
