import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from 'store';
import axios, { AxiosError } from 'axios';
import { PATH_API } from 'api';
// Types
import IFitnessProgramState, { IEquipmentResponse } from '../../types/fitness';

//==============================================================================

const initialState: IFitnessProgramState = {
  error: false,
  inputInvalid: true,
  horizontalStep: 0,
  formStep: 0,
  eventDate: null,
  exerciseCategory: null,
  cardioGoal: null,
  currentCardioExercise: null,
  currentStrengthExercise: null,
  createdProgramExercises: [],
  availableEquipment: null,
  availableExercises: null,
  cardioEquipment: null,
  strengthEquipment: null,
  createdFitnessEvents: [],
  cardioEqOptions: [],
  cardioExOptions: [],
  strengthExOptions: [],
  strengthEqOptions: [],
  selectedFitnessEvent: null,
  submitSuccessful: false,
};

const slice = createSlice({
  name: 'fitness',
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },
    setCreatedFitnessEvents(state, action) {
      state.createdFitnessEvents = action.payload;
    },
    setInputInvalid(state, action) {
      state.inputInvalid = action.payload;
    },
    setSubmitSuccessful(state, action) {
      state.submitSuccessful = action.payload;
    },
    initializeForm(state) {
      if (state.eventDate) {
        return {
          ...initialState,
          submitSuccessful: state.submitSuccessful ? true : false,
          horizontalStep: 2,
          createdProgramExercises: state.createdProgramExercises,
          eventDate: state.eventDate,
          currentCardioExercise: state.currentCardioExercise
            ? state.currentCardioExercise
            : null,
          currentStrengthExercise: state.currentStrengthExercise
            ? state.currentStrengthExercise
            : null,
          selectedFitnessEvent: state.selectedFitnessEvent,
          createdFitnessEvents: state.createdFitnessEvents,
        };
      } else {
        return initialState;
      }
    },
    resetExerciseForm(state) {
      return {
        ...initialState,
        horizontalStep: 2,
        createdProgramExercises: state.createdProgramExercises,
        eventDate: state.eventDate,
        cardioEquipment: state.cardioEquipment,
        strengthEquipment: state.strengthEquipment,
        cardioEqOptions: state.cardioEqOptions,
        strengthEqOptions: state.strengthEqOptions,
        selectedFitnessEvent: state.selectedFitnessEvent,
        createdFitnessEvents: state.createdFitnessEvents,
      };
    },
    changeHorizontalStep(state, action) {
      state.horizontalStep = action.payload;
    },
    changeFormStep(state, action) {
      state.formStep = action.payload;
    },
    setEventDate(state, action) {
      state.eventDate = action.payload;
    },
    setExerciseCategory(state, action) {
      state.exerciseCategory = action.payload;
    },
    setCardioGoal(state, action) {
      state.cardioGoal = action.payload;
    },
    addToExerciseProgram(state, action) {
      state.createdProgramExercises = state.createdProgramExercises.concat(
        action.payload,
      );
    },
    discardExerciseProgram(state) {
      state.createdProgramExercises = [];
    },
    editCurrentCardioExercise(state, action) {
      state.currentCardioExercise = {
        ...state.currentCardioExercise,
        ...action.payload,
      };
    },
    editCurrentStrengthExercise(state, action) {
      state.currentStrengthExercise = {
        ...state.currentStrengthExercise,
        ...action.payload,
      };
    },
    validateFormInput(state) {
      if (state.formStep === 0 && state.exerciseCategory) {
        state.inputInvalid = false;
      }
      if (state.formStep > 0 && state.exerciseCategory === 'Strength') {
        state.inputInvalid = true;
        if (state.formStep === 1 && state.currentStrengthExercise?.equipment) {
          state.inputInvalid = false;
        } else if (
          state.formStep === 2 &&
          state.currentStrengthExercise?.exercise
        ) {
          state.inputInvalid = false;
        } else if (
          state.formStep === 3 &&
          state.currentStrengthExercise?.weight
        ) {
          state.inputInvalid = false;
        } else if (
          state.formStep === 4 &&
          state.currentStrengthExercise?.repetitions
        ) {
          state.inputInvalid = false;
        } else if (
          state.formStep === 5 &&
          state.currentStrengthExercise?.sets
        ) {
          state.inputInvalid = false;
        } else if (
          state.formStep === 6 &&
          state.currentStrengthExercise &&
          state.currentStrengthExercise.participants?.length > 0
        ) {
          state.inputInvalid = false;
        }
      } else if (state.formStep > 0 && state.exerciseCategory === 'Cardio') {
        state.inputInvalid = true;

        if (state.formStep === 1 && state.currentCardioExercise?.equipment) {
          state.inputInvalid = false;
        } else if (
          state.formStep === 2 &&
          state.currentCardioExercise?.exercise
        ) {
          state.inputInvalid = false;
        } else if (state.formStep === 3 && state.cardioGoal) {
          state.inputInvalid = false;
        } else if (
          state.formStep === 4 &&
          (state.currentCardioExercise?.duration ||
            state.currentCardioExercise?.distance)
        ) {
          state.inputInvalid = false;
        } else if (
          state.formStep === 5 &&
          state.currentCardioExercise &&
          state.currentCardioExercise.participants?.length > 0
        ) {
          state.inputInvalid = false;
        }
      }
    },
    setEquipment(state, action) {
      state.availableEquipment = action.payload;
    },
    setCardioEquipment(state, action) {
      state.cardioEquipment = action.payload;
    },
    setStrengthEquipment(state, action) {
      state.strengthEquipment = action.payload;
    },
    setCardioExOptions(state, action) {
      state.cardioExOptions = action.payload;
    },
    setCardioEqOptions(state, action) {
      state.cardioEqOptions = action.payload;
    },
    setStrengthEqOptions(state, action) {
      state.strengthEqOptions = action.payload;
    },
    setStrengthExOptions(state, action) {
      state.strengthExOptions = action.payload;
    },
    setSelectedFitnessEvent(state, action) {
      state.selectedFitnessEvent =
        state.createdFitnessEvents.find(
          (event) => event.id === action.payload,
        ) || null;
    },
  },
});

export default slice.reducer;
export const {
  hasError,
  setSubmitSuccessful,
  setCreatedFitnessEvents,
  discardExerciseProgram,
  setCardioEqOptions,
  setStrengthEqOptions,
  setCardioExOptions,
  setStrengthExOptions,
  initializeForm,
  resetExerciseForm,
  setInputInvalid,
  validateFormInput,
  changeHorizontalStep,
  changeFormStep,
  setEventDate,
  setExerciseCategory,
  setCardioGoal,
  addToExerciseProgram,
  editCurrentCardioExercise,
  editCurrentStrengthExercise,
  setEquipment,
  setCardioEquipment,
  setStrengthEquipment,
  setSelectedFitnessEvent,
} = slice.actions;

//==============================================================================
// Asynchronous functions
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(
  'accessToken',
)}`;

//------------------------------------------------------------------------------

export function getFitnessEvents(teamId: number) {
  return async () => {
    try {
      let allFitnessEvents = (
        await axios.get(
          PATH_API.activities.root + teamId + '?participants=true',
        )
      ).data.data.fitness;

      dispatch(setCreatedFitnessEvents(allFitnessEvents));
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status !== 404) {
          console.error(error);
        }
      }
      dispatch(hasError(true));
    }
  };
}

//------------------------------------------------------------------------------

export function getEquipment() {
  return async () => {
    try {
      const equipment: IEquipmentResponse = (
        await axios.get(PATH_API.equipment.root)
      ).data;

      //Assign cardio & strength equipment
      let cardioEquipment = equipment.data.filter(
        (equipment) => equipment.trainingModality === 'Cardio',
      );
      let strengthEquipment = equipment.data.filter(
        (equipment) => equipment.trainingModality === 'Strength',
      );

      dispatch(setCardioEquipment(cardioEquipment));
      dispatch(setStrengthEquipment(strengthEquipment));
      dispatch(
        setCardioEqOptions(
          cardioEquipment.map((equipment) => equipment.equipmentName),
        ),
      );
      dispatch(
        setStrengthEqOptions(
          strengthEquipment.map((equipment) => equipment.equipmentName),
        ),
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status !== 404) {
          console.error(error);
        }
      }
      dispatch(hasError(true));
    }
  };
}

//------------------------------------------------------------------------------

export function getExToEqId(
  exerciseCategory: 'Cardio' | 'Strength',
  equipmentId: number,
  exerciseId: number,
) {
  return async () => {
    try {
      const data = (
        await axios.get(
          PATH_API.exercises.exeq +
            `?equipmentId=${equipmentId}` +
            `&exerciseId=${exerciseId}`,
        )
      ).data;

      if (exerciseCategory === 'Cardio') {
        dispatch(editCurrentCardioExercise(data));
      } else {
        dispatch(editCurrentStrengthExercise(data));
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status !== 404) {
          console.error(error);
        }
      }
      dispatch(hasError(true));
    }
  };
}

//------------------------------------------------------------------------------