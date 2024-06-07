
import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Box, Typography } from '@mui/material';

function Dashboard() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch('./Assignment.xlsx')
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        const workbook = XLSX.read(buffer, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(worksheet);

        const monthlyData = data.reduce((acc, row) => {
          const dateValue = row.Date;
          const jsDate = new Date(Math.round((dateValue - 25569) * 86400 * 1000));
          const month = `${jsDate.getFullYear()}-${(jsDate.getMonth() + 1).toString().padStart(2, '0')}`;

          if (!acc[month]) {
            acc[month] = 0;
          }
          acc[month] += parseInt(row.Revenue, 10); 
          return acc;
        }, {});

        const chartData = Object.keys(monthlyData).map((month) => ({
          month,
          revenue: monthlyData[month],
        }));

        setChartData(chartData);
      })
      .catch((error) => console.error('Error reading the file:', error));
  }, []);

  return (
    <Box>
      <Box 
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 2,
          marginTop: 2
        }}
      >
        <Typography sx={{ color: '#04AA6D' }} variant="h4" component="h1" gutterBottom>
          Finance
        </Typography>
      </Box>
      <div>
        {chartData && (
          <div style={{paddingLeft:'2%'}}>
            <h2 style={{marginBottom:'20px'}}>Monthly Revenue Bar Chart:</h2>
            <BarChart width={600} height={300} data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#8884d8" />
            </BarChart>
          </div>
        )}
      </div>
    </Box>
  );
}

export default Dashboard;
