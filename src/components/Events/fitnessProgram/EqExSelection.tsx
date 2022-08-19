// MaterialUI
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
// Redux
import { RootState, useSelector, useDispatch } from '../../../store';
import {
  editCurrentStrengthExercise,
  editCurrentCardioExercise,
  setCardioExOptions,
  setStrengthExOptions,
} from '../../../store/slices/fitness';
import { getExToEqId } from '../../../store/slices/fitness';
import { IEquipmentExercise, IEquipmentWithExercises } from 'types/fitness';

//==============================================================================

export default function EqExSelection() {
  const dispatch = useDispatch();
  const {
    formStep,
    exerciseCategory,
    strengthEquipment,
    cardioEquipment,
    cardioExOptions,
    strengthExOptions,
    currentCardioExercise,
    currentStrengthExercise,
  } = useSelector((state: RootState) => state.fitness);

  // Invoked when equipment selected
  const handleEquipmentSelection = (
    event: React.SyntheticEvent<Element, Event>,
    equipment: IEquipmentWithExercises | null,
  ) => {
    if (equipment) {
      if (exerciseCategory === 'Strength') {
        dispatch(
          editCurrentStrengthExercise({
            exerciseCategory: 'Strength',
            equipment: equipment.equipmentName,
            equipmentId: equipment.id,
          }),
        );
        dispatch(setStrengthExOptions(equipment.exercises));
      } else {
        dispatch(
          editCurrentCardioExercise({
            exerciseCategory: 'Cardio',
            equipment: equipment.equipmentName,
            equipmentId: equipment.id,
          }),
        );
        dispatch(setCardioExOptions(equipment.exercises));
      }
    }
  };

  const handleExerciseSelection = (
    event: React.SyntheticEvent<Element, Event>,
    exercise: IEquipmentExercise | null,
  ) => {
    if (exercise) {
      if (exerciseCategory === 'Strength') {
        dispatch(
          editCurrentStrengthExercise({
            exercise: exercise.exerciseName,
            exerciseId: exercise.exerciseId,
          }),
        );
        if (exerciseCategory && currentStrengthExercise) {
          dispatch(
            getExToEqId(
              exerciseCategory,
              currentStrengthExercise.equipmentId,
              exercise.exerciseId,
            ),
          );
        }
      } else {
        dispatch(
          editCurrentCardioExercise({
            exercise: exercise.exerciseName,
            exerciseId: exercise.exerciseId,
          }),
        );
        if (exerciseCategory && currentCardioExercise) {
          dispatch(
            getExToEqId(
              exerciseCategory,
              currentCardioExercise.equipmentId,
              exercise.exerciseId,
            ),
          );
        }
      }
    }
  };

  return (
    <>
      {formStep === 1 && strengthEquipment && cardioEquipment && (
        <Autocomplete
          disablePortal
          id="equipment-selection"
          onChange={handleEquipmentSelection}
          options={
            exerciseCategory === 'Strength'
              ? strengthEquipment
              : cardioEquipment
          }
          getOptionLabel={(option) => option.equipmentName}
          renderInput={(params) => (
            <TextField {...params} label={'Equipment'} />
          )}
          sx={{
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#000000',
            },
            '&:hover .MuiInputBase-root .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(135, 207, 58, 1)',
            },
            '& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline':
              {
                borderColor: 'rgba(135, 207, 58, 0.8)',
              },
          }}
        />
      )}
      {formStep === 2 && (
        <Autocomplete
          disablePortal
          id="exercise-selection"
          onChange={handleExerciseSelection}
          options={
            exerciseCategory === 'Strength'
              ? strengthExOptions
              : cardioExOptions
          }
          getOptionLabel={(option) => option.exerciseName}
          renderInput={(params) => <TextField {...params} label={'Exercise'} />}
          sx={{
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#000000',
            },
            '&:hover .MuiInputBase-root .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(135, 207, 58, 1)',
            },
            '& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline':
              {
                borderColor: 'rgba(135, 207, 58, 0.8)',
              },
          }}
        />
      )}
    </>
  );
}
