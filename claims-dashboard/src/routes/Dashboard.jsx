import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
const Dashboard = () => {
  const theme = useTheme();
  const [data, setData] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    denied: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClaims = async () => {
      setLoading(false);
      try {
        const response = await axios.get('http://localhost:3001/claims');
        const claims = response.data;
        const total = claims.length;
        const approved = claims.filter((c) => c.status === 'Approved').length;
        const pending = claims.filter((c) => c.status === 'pending').length;
        const denied = claims.filter((c) => c.status === 'Denied').length;
        setData({ total, approved, pending, denied });
      } catch (err) {
        setError('Failed to fetch claims data.');
      } finally {
        setLoading(false);
      }
    };
    fetchClaims();
  }, []);

  if (loading) return <p>Loading dashboard data...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  // Prepare Chart Data
  const chartData = [
    { name: 'Approved', value: data.approved, color: '#4CAF50' }, // Green
    { name: 'Pending', value: data.pending, color: '#FFC107' }, // Yellow
    { name: 'Denied', value: data.denied, color: '#F44336' }, // Red
  ];

  const COLORS = ['#4CAF50', '#F44336', '#FFC107'];

  return (
    <>
      
      <Grid container spacing={3}>
        {[
          { label: 'Total Claims', value: data.total, color: 'primary.main' },
          {
            label: 'Approved Claims',
            value: data.approved,
            color: 'success.main',
          },
          {
            label: 'Pending Claims',
            value: data.pending,
            color: 'warning.main',
          },
          { label: 'Denied Claims', value: data.denied, color: 'error.main' },
        ].map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.label}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" color={item.color}>
                  {item.label}
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Chart Section */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h6" mb={2}>
          Claims Status Distribution
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </>
  );
};

export default Dashboard;
