import { Card, CardContent, Typography, LinearProgress, Box } from "@mui/material";

const PerformanceChart = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>Portfolio Performance</Typography>
        <Typography>Weekly Growth</Typography>
        <Box sx={{ mb: 2 }}>
          <LinearProgress variant="determinate" value={80} sx={{ height: 10, borderRadius: 5 }}/>
        </Box>
        <Typography>Monthly Growth</Typography>
        <Box>
          <LinearProgress variant="determinate" value={65} color="secondary" sx={{ height: 10, borderRadius: 5 }}/>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;
