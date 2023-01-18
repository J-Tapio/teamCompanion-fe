import { useState, useEffect } from 'react';
// MaterialUI
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
// Components
import EqExSelection from './EqExSelection';
import TrainingType from '../TrainingType';
import AmountSelect from './AmountSelect';
import CardioGoal from './CardioGoal';
import CreatedExercise from './CreatedExercise';
import ExerciseParticipantSelector from './ExerciseParticipantSelector';
// Redux
import { RootState, useDispatch, useSelector } from '../../../store';
import {
  validateFormInput,
  changeFormStep,
  changeHorizontalStep,
  setExerciseCategory,
  initializeForm,
  setInputInvalid,
} from '../../../store/slices/fitness';

//============================================================================//

interface IStepElements {
  label: string;
  element: React.ReactNode;
}

//TODO: Rename - difficulty to naming comes since appending other steps to this.
const currentSteps: IStepElements[] = [
  {
    label: 'Select exercise category',
    element: <TrainingType />,
  },
];

const strengthExSteps: IStepElements[] = [
  {
    label: 'Select equipment',
    element: <EqExSelection />,
  },
  {
    label: 'Select exercise',
    element: <EqExSelection />,
  },
  {
    label: 'Choose weight',
    element: <AmountSelect scale={'weight' as 'weight'} />,
  },
  {
    label: 'Choose repetitions',
    element: <AmountSelect scale={'repetitions' as 'repetitions'} />,
  },
  {
    label: 'Choose sets',
    element: <AmountSelect scale={'sets' as 'sets'} />,
  },
];

const cardioExSteps: IStepElements[] = [
  {
    label: 'Select equipment',
    element: <EqExSelection />,
  },
  {
    label: 'Select exercise',
    element: <EqExSelection />,
  },
  {
    label: 'Going for duration or distance?',
    element: <CardioGoal />,
  },
];

const durationExStep: IStepElements[] = [
  {
    label: 'Choose exercise duration',
    element: <AmountSelect scale={'duration' as 'duration'} />,
  },
];

const distanceExStep: IStepElements[] = [
  {
    label: 'Choose exercise distance',
    element: <AmountSelect scale={'distance' as 'distance'} />,
  },
];

const participantExStep: IStepElements[] = [
  {
    label: 'Assign participant(s) for the exercise',
    element: <ExerciseParticipantSelector />,
  },
];

//----------------------------------------------------------------------------//

export default function ExerciseCreation() {
  const dispatch = useDispatch();
  const {
    inputInvalid,
    formStep,
    exerciseCategory,
    cardioGoal,
    currentCardioExercise,
    currentStrengthExercise,
  } = useSelector((state: RootState) => state.fitness);

  const [stepElements, setStepElements] =
    useState<IStepElements[]>(currentSteps);

  const handleNext = () => {
    dispatch(changeFormStep(formStep + 1));
  };

  const handleBack = () => {
    dispatch(changeFormStep(formStep - 1));
  };

  //TODO: Refactor later - create Redux reducer for inputValidation?.
  useEffect(() => {
    dispatch(validateFormInput());

    if (formStep === 0 && !exerciseCategory) {
      // When form reset, set stepElements to initial step.
      setStepElements(currentSteps);
    }

    if (exerciseCategory) {
      if (exerciseCategory === 'Strength') {
        setStepElements(
          currentSteps.concat(strengthExSteps, participantExStep),
        );
      }
      if (exerciseCategory === 'Cardio') {
        setStepElements(currentSteps.concat(cardioExSteps));
      }
    }

    if (cardioGoal) {
      if (cardioGoal === 'Duration') {
        setStepElements(
          currentSteps.concat(cardioExSteps, durationExStep, participantExStep),
        );
      }
      if (cardioGoal === 'Distance') {
        setStepElements(
          currentSteps.concat(cardioExSteps, distanceExStep, participantExStep),
        );
      }
    }
  }, [
    exerciseCategory,
    cardioGoal,
    formStep,
    currentCardioExercise,
    currentStrengthExercise,
  ]);

  return (
    <Box mt={2}>
      <Stepper
        activeStep={formStep}
        orientation="vertical"
        sx={{
          '& .MuiStepLabel-vertical .MuiStepLabel-label': {
            fontSize: '1.2rem',
          },
          '& .MuiStepIcon-root': {
            color: '#87cf3a',
          },
        }}
      >
        {stepElements.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                stepElements.length > 1 && index === stepElements.length - 1 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Paper elevation={2} sx={{ padding: '1rem' }}>
                {step.element}
                <Box sx={{ marginTop: '1.5rem' }}>
                  <Button
                    variant="contained"
                    disabled={inputInvalid}
                    onClick={handleNext}
                    sx={{
                      color: '#000000',
                      margin: '0',
                      padding: '.5rem 1.2rem',
                      background:
                        'linear-gradient(130deg, rgba(90,187,137,0.8) 0%, rgba(255,255,255,1) 80%)',
                      '&:hover': {
                        background:
                          'linear-gradient(130deg, rgba(90,187,137,1) 0%, rgba(255,255,255,1) 80%)',
                      },
                    }}
                  >
                    Continue
                  </Button>
                  {index > 0 && (
                    <Button
                      variant="text"
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{
                        color: '#000000',
                        background:
                          'linear-gradient(130deg, rgba(112,112,112,0.5) 0%, rgba(255,255,255,1) 100%)',
                        marginLeft: '1rem',
                        padding: '.5rem 1.2rem',
                        transition: 'background 3s',
                        '&:hover': {
                          background:
                            'linear-gradient(130deg, rgba(112,112,112,0.8) 0%, rgba(255,255,255,1) 100%)',
                        },
                      }}
                    >
                      Back
                    </Button>
                  )}
                </Box>
              </Paper>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {formStep === stepElements.length && <CreatedExercise />}
    </Box>
  );
}
