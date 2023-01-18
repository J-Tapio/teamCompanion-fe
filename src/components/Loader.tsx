import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

//============================================================================//

function Loader() {
  return (
    <Box sx={{
      position: "absolute",
      right: 0,
      bottom: 0,
      width: "calc(100vw - 64px)", 
      height: "calc(100vh - 64px)", 
      background: "rgba(255, 255, 255, 0.18)",
      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
      backdropFilter: "blur(5.5px)",
      WebkitBackdropFilter: "blur(5.5px)"
      }}>
        <Box sx={{width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
          <CircularProgress sx={{color: "#87cf3a"}} />
        </Box>
    </Box>
  );
}

export default Loader;