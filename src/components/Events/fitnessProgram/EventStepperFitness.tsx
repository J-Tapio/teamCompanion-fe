// MaterialUI
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
// Redux
import { RootState, useSelector } from '../../../store';
//============================================================================//

function FitnessStepper() {
  const { horizontalStep } = useSelector((state: RootState) => state.fitness);

  return (
    <Stepper
      activeStep={horizontalStep}
      alternativeLabel
      sx={{
        '& .MuiStepLabel-horizontal .MuiStepLabel-label': {
          fontSize: '1.1rem',
        },
        '& .MuiSvgIcon-root.Mui-active': {
          color: '#87cf3a',
        },
        '& .MuiSvgIcon-root.Mui-completed': {
          color: '#87cf3a',
        },
      }}
    >
      {['Choose date to work on', 'Design fitness program', 'Finished'].map(
        (label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ),
      )}
    </Stepper>
  );
}

export default FitnessStepper;
