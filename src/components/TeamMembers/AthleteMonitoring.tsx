// MaterialUI
import Box from '@mui/material/Box';
// Components
import ChartBase from "./charts/ChartBase";

// Charts
import ChartDonut from './charts/ChartDonut';
import ChartLine from './charts/ChartLine';

//==============================================================================

function AthleteMonitoring() {
  return (
    <Box>
      <ChartBase>
        <ChartDonut />
        <ChartLine />
      </ChartBase>
    </Box>
  );
}

export default AthleteMonitoring;