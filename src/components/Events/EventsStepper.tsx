// MaterialUI
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
// Redux
import { RootState, useSelector } from '../../store';

//==============================================================================

function EventStepper() {
  const {formStep} = useSelector(
    (state: RootState) => state.events,
  );

  const eventCreationSteps = [
    'Select event type',
    'Select participants for the event',
    'Select date & time for the event',
  ];

  return (
    <Stepper
      activeStep={formStep}
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
      {eventCreationSteps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}

export default EventStepper;
