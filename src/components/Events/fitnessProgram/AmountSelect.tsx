// MaterialUI
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
// Redux
import { RootState, useDispatch, useSelector } from '../../../store';
import {
  editCurrentStrengthExercise,
  editCurrentCardioExercise,
} from '../../../store/slices/fitness';
//============================================================================//

let repetitionSelectables: string[] = [];
let weightSelectables: string[] = [];
let durationSelectables: string[] = [];
let distanceSelectables: string[] = [];
let setSelectables: string[] = [];

// Repetitions
for (let i = 1; i < 81; i++) {
  repetitionSelectables.push(String(i));
}
// Weight
for (let i = 1; i < 101; i++) {
  weightSelectables.push(String(i));
  if (i !== 100) {
    weightSelectables.push(String(i + 0.25));
    weightSelectables.push(String(i + 0.5));
    weightSelectables.push(String(i + 0.75));
  }
}
// Sets
for (let i = 1; i < 11; i++) {
  setSelectables.push(String(i));
}
// Distance provided as kilometers - Formatted to meters before submit of data.
for (let i = 0.1; i < 16; i++) {
  distanceSelectables.push(String(i));
  if (i !== 15) {
    distanceSelectables.push(String(i + 0.25));
    distanceSelectables.push(String(i + 0.5));
    distanceSelectables.push(String(i + 0.75));
  }
}
// Duration in minutes
for (let i = 1; i < 240; i++) {
  durationSelectables.push(String(i + ':00'));
  if (i !== 239) {
    durationSelectables.push(String(i + ':' + 15));
    durationSelectables.push(String(i + ':' + 30));
    durationSelectables.push(String(i + ':' + 45));
  }
}

type Scale = 'weight' | 'repetitions' | 'duration' | 'distance' | 'sets';
// In case more than one prop in the future needed, otherwise redundant
interface IAmountProps {
  scale: Scale;
}

const scaleOptions = {
  weight: weightSelectables,
  repetitions: repetitionSelectables,
  duration: durationSelectables,
  distance: distanceSelectables,
  sets: setSelectables,
};

const labelText = {
  weight: 'Select weight',
  repetitions: 'Select repetitions',
  duration: 'Select duration (minutes)',
  distance: 'Select distance (kilometers)',
  sets: 'Select how many sets to do the exercise',
};

//----------------------------------------------------------------------------//

export default function AmountSelect({ scale }: IAmountProps) {
  const { currentStrengthExercise, currentCardioExercise } = useSelector(
    (state: RootState) => state.fitness,
  );
  const dispatch = useDispatch();

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: string | null,
  ) => {
    switch (scale) {
      case 'weight': {
        dispatch(
          editCurrentStrengthExercise({
            ...currentStrengthExercise,
            weight: value,
          }),
        );
        break;
      }
      case 'repetitions': {
        dispatch(
          editCurrentStrengthExercise({
            ...currentStrengthExercise,
            repetitions: value,
          }),
        );
        break;
      }
      case 'sets': {
        dispatch(
          editCurrentStrengthExercise({
            ...currentStrengthExercise,
            sets: value,
          }),
        );
        break;
      }
      case 'duration': {
        dispatch(
          editCurrentCardioExercise({
            ...currentCardioExercise,
            duration: value,
          }),
        );
        break;
      }
      case 'distance': {
        dispatch(
          editCurrentCardioExercise({
            ...currentCardioExercise,
            distance: value,
          }),
        );
        break;
      }
      default:
        break;
    }
  };

  return (
    <Autocomplete
      disablePortal
      id="selection-options"
      options={scaleOptions[scale]}
      onChange={handleChange}
      sx={{
        '& .MuiInputLabel-root.Mui-focused': {
          color: '#000000',
        },
        '&:hover .MuiInputBase-root .MuiOutlinedInput-notchedOutline': {
          borderColor: 'rgba(135, 207, 58, 1)',
        },
        '& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: 'rgba(135, 207, 58, 0.8)',
        },
      }}
      renderInput={(params) => (
        <TextField {...params} label={labelText[scale]} />
      )}
    />
  );
}
