import React, { useState } from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";

function App() {
  const [inputs, setInputs] = useState({
    capitalInicial: '',
    capitalFinal: '',
    inflacion: ''
  });

  const [results, setResults] = useState({
    capitalGanado: '',
    rendimientoTeorico: '',
    rendimientoReal: ''
  });

  const [calculated, setCalculated] = useState(false); // New state to track calculation execution

  const handleInputChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const calculateResults = () => {
    const capitalInicial = parseFloat(inputs.capitalInicial);
    const capitalFinal = parseFloat(inputs.capitalFinal);
    const inflacion = parseFloat(inputs.inflacion) / 100;

    const capitalGanado = capitalFinal - capitalInicial;
    const rendimientoTeorico = ((capitalFinal - capitalInicial) / capitalInicial) * 100;
    const rendimientoReal = ((1 + rendimientoTeorico / 100) / (1 + inflacion) - 1) * 100;

    setResults({
      capitalGanado,
      rendimientoTeorico: rendimientoTeorico.toFixed(2),
      rendimientoReal: rendimientoReal.toFixed(2)
    });

    setCalculated(true); // Set calculated to true when button is clicked
  };

  const refreshInputs = () => {
    setInputs({
      capitalInicial: '',
      capitalFinal: '',
      inflacion: ''
    });
    setResults({
      capitalGanado: '',
      rendimientoTeorico: '',
      rendimientoReal: ''
    });
    setCalculated(false); // Reset calculated state
  };

  return (
    <div className="App">
{/* Card for Inputs */}
<Card className="input-card" style={{ width: '90%', maxWidth: '400px', margin: '0 auto', marginBottom: '20px' }}>
  <CardHeader 
    title="Calculá el rendimiento de tus inversiones" 
    subheader="Completá los campos y tocá calcular cada vez que los modifiques para realizar los cálculos." 
  />
  <CardContent>
    <Box className="input-section" sx={{ padding: '15px' }}> {/* Adjust the padding value as needed */}
      <TextField
        name="capitalInicial"
        value={inputs.capitalInicial}
        onChange={handleInputChange}
        label="Capital inicial"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: '15px' }} // Add margin-bottom for spacing between inputs
      />
      <TextField
        name="capitalFinal"
        value={inputs.capitalFinal}
        onChange={handleInputChange}
        label="Capital final"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: '15px' }} // Add margin-bottom for spacing between inputs
      />
      <TextField
        name="inflacion"
        value={inputs.inflacion}
        onChange={handleInputChange}
        label="Inflación del período (%)"
        variant="outlined"
        fullWidth
      />
    </Box>
  </CardContent>

  <CardActions sx={{ marginTop: '20px', marginBottom: '20px' }}> {/* Adjust margin as needed */}
    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <Button 
        onClick={calculateResults} 
        variant="contained" 
        sx={{ backgroundColor: '#229c8aff', color: '#ffffff' }} 
      >
        Calcular
      </Button>
      <Button 
        onClick={refreshInputs} 
        variant="outlined" 
        sx={{ color: '#f38384ff', borderColor: '#f38384ff', marginLeft: '10px' }} 
      >
        Refresh
      </Button>
    </Box>
  </CardActions>
</Card>


      {/* Card for Results */}
      <Card className="result-card" style={{ width: '90%', maxWidth: '400px', margin: '0 auto' }}>
        <CardHeader title="Resultados" />
        <CardContent>
          <Box className="result-section">
            <Typography>Capital Ganado: {results.capitalGanado}</Typography>
            <Typography>Rendimiento Teórico: {results.rendimientoTeorico}%</Typography>
            <Typography>Rendimiento Real: {results.rendimientoReal}%</Typography>

            {/* Add margin to create space */}
            <Box sx={{ marginTop: '20px' }}>
              {/* Conditional message based on Rendimiento Real vs Inflación */}
              {calculated && inputs.inflacion && ( // Check if calculated and inflacion has value
                results.rendimientoReal > inputs.inflacion ? (
                  <Typography color="success.main">Tu inversión le ganó a la inflación. Ganaste poder adquisitivo!</Typography>
                ) : (
                  <Typography color="error.main">Tu inversión no le está pudiendo ganar a la inflación. Perdiste está valor adquisitivo.</Typography>
                )
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
