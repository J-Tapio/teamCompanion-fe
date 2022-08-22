// MaterialUI
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
// Mui Icons
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
// Redux
import { RootState, useDispatch, useSelector } from '../../../store';
import {
  editCurrentCardioExercise,
  editCurrentStrengthExercise,
} from 'store/slices/fitness';
import { ITeamMember } from 'types/team';

//==============================================================================

interface SelectableParticipant {
  department:
    | 'All participants'
    | 'Coaches'
    | 'Athletes'
    | 'Physiotherapists'
    | 'Trainers'
    | 'Staff';
  participant: string;
  participantInfo?: ITeamMember;
}

let departments = new Map([
  ['Coach', 'Coaches'],
  ['Athlete', 'Athletes'],
  ['Physiotherapist', 'Physiotherapists'],
  ['Staff', 'Staff'],
  ['Trainer', 'Trainers'],
]);

export default function ExerciseParticipantSelector() {
  const dispatch = useDispatch();
  const {
    selectedFitnessEvent,
    currentCardioExercise,
    currentStrengthExercise,
    exerciseCategory,
  } = useSelector((state: RootState) => state.fitness);
  //const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  //const checkedIcon = <CheckBoxIcon fontSize="small" />;

  // Participant(s) later grouped by department within Autoselect component
  let selectableParticipants: SelectableParticipant[] = [
    { department: 'All participants', participant: 'All participants' },
  ];

  let allParticipants: any;

  if (selectedFitnessEvent) {
    allParticipants = Object.values(selectedFitnessEvent.participants).flat(1);

    selectableParticipants.push(
      ...allParticipants.map((participant: ITeamMember) => {
        return {
          department: departments.get(participant.teamRole),
          participant: `${participant.firstName} ${participant.lastName}`,
          participantInfo: participant,
        };
      }),
    );
  } else {
    // Nothing to select - no participants available for some reason.
    selectableParticipants = [];
  }

  // Selection / assign of participant for exercise
  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    assignedParticipants: SelectableParticipant[],
  ) => {
    if (exerciseCategory === 'Strength') {
      if (
        assignedParticipants.some(
          (selected) => selected.participant === 'All participants',
        )
      ) {
        dispatch(
          editCurrentStrengthExercise({
            ...currentStrengthExercise,
            participants: allParticipants || [],
          }),
        );
      } else {
        dispatch(
          editCurrentStrengthExercise({
            ...currentStrengthExercise,
            participants: assignedParticipants.map((assignedParticipant) => {
              return assignedParticipant.participantInfo;
            }),
          }),
        );
      }
    } else if (exerciseCategory === 'Cardio') {
      if (
        assignedParticipants.some(
          (selected) => selected.participant === 'All participants',
        )
      ) {
        dispatch(
          editCurrentCardioExercise({
            ...currentCardioExercise,
            participants: allParticipants || [],
          }),
        );
      } else {
        dispatch(
          editCurrentCardioExercise({
            ...currentStrengthExercise,
            participants: assignedParticipants.map((assignedParticipant) => {
              return assignedParticipant.participantInfo;
            }),
          }),
        );
      }
    }
  };

  return (
    <Autocomplete
      multiple={true}
      id="checkboxes-tags-demo"
      options={selectableParticipants}
      groupBy={(option) => option.department}
      onChange={handleChange}
      isOptionEqualToValue={(option, value) => option.participant === value.participant}
      //disableCloseOnSelect
      getOptionLabel={(option) => option.participant}
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
   /*    renderOption={(props, option, { selected }) => (
        <li {...props} style={{ fontWeight: 500 }}>
          <FormControlLabel
            value="end"
            label={option.participant}
            control={
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
                sx={{
                  '& .MuiSvgIcon-root': { fontSize: 20 },
                  '&.Mui-checked': {
                    color: '#87cf3a',
                  },
                }}
              />
            }
          />
        </li>
      )} */
      renderInput={(params) => (
        <TextField {...params} label="Assign participant to exercise" />
      )}
      /* renderInput={(params) => (
        <TextField
          {...params}
          label="Assign participant(s) for exercise"
          placeholder="Assign participant(s) for exercise"
        />
      )} */
    />
  );
}
