import { Box } from '@mui/material';

function Home() {
  return (
      <Box
          sx={{
              height: "100vh",
              background: "linear-gradient(to bottom, #04AA6D, black)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
          }}
      >
          Home
      </Box>
  );
}

export default Home