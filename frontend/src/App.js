import './App.css';
import Navbar from './components/Navbar/Navbar';
import Box from '@mui/material/Box';

function App() {
  return (
    <div className="App">
      <Navbar />
      <h1 className='title'>
        IntelliFIR
      </h1>
      <Box
        sx={{
          width: '100%',
          height: '400px',
          backgroundImage: `url("../public/assets/FIR_StockImage_1.jpeg")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <h1>hi  </h1>
      </Box>
    </div>
  );
}

export default App;
