import { Card, CardContent, Typography, Table, TableBody, TableCell, TableHead, TableRow, Box, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { Delete } from "@mui/icons-material";
import api from "../init/api";

const Portfolio = ({ refreshTrigger }) => {
  const [stocks, setStocks] = useState([]);

  const getStock = async () => {
    const res = await api.get("/list");
    setStocks(res.data);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/delete/${id}`);
      getStock(); // refresh the table
    } catch (err) {
      console.error("Error deleting stock:", err);
    }
  };

  useEffect(() => {
    getStock();
  }, [refreshTrigger]);

  return (
    <Card sx={{ maxHeight: 400 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          My Portfolio
        </Typography>
        <Box sx={{ overflowY: "auto", maxHeight: 340 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Stock</TableCell>
                <TableCell>Qty</TableCell>
                <TableCell>Buy Price</TableCell>
                <TableCell>Current</TableCell>
                <TableCell>Profit/Loss</TableCell>
                <TableCell>Action</TableCell> {/* delete column */}
              </TableRow>
            </TableHead>
            <TableBody>
              {stocks.map((p) => {
                const profit = 0; // calculate with current price if available
                return (
                  <TableRow key={p._id}>
                    <TableCell>{p.symbol}</TableCell>
                    <TableCell>{p.qty}</TableCell>
                    <TableCell>${p.price}</TableCell>
                    <TableCell>${p.price}</TableCell>
                    <TableCell sx={{ color: profit >= 0 ? "green" : "red" }}>${profit}</TableCell>
                    <TableCell>
                      <IconButton color="error" onClick={() => handleDelete(p._id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Portfolio;
