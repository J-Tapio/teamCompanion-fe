import { createSlice } from '@reduxjs/toolkit';
// Types
import { IMemoData } from 'types/memo';

//==============================================================================

const initialState: IMemoData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Add features' },
    'task-2': { id: 'task-2', content: 'Enhance user experience' },
    'task-3': { id: 'task-3', content: 'Minimum viable demo to use' },
    'task-4': { id: 'task-4', content: 'Fitness event and program creation' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      taskIds: ['task-1', 'task-2'],
    },
    'column-2': {
      id: 'column-2',
      title: 'Done',
      taskIds: ['task-3', 'task-4'],
    },
  },
  columnOrder: ['column-1', 'column-2'],
};

const slice = createSlice({
  name: 'memo',
  initialState,
  reducers: {
    changeOrder(state, action) {
      // Change taskId place within taskIds
      let {taskId, columnId, newIndex, oldIndex} = action.payload;
      let currentIds = state.columns[columnId].taskIds;
      // Swap in-place - ES6 - check compatability of browsers or change implementation
      [currentIds[oldIndex], currentIds[newIndex]] = [currentIds[newIndex], currentIds[oldIndex]]

      state.columns[columnId].taskIds = currentIds;
    },
    changeColumn(state, action) {
      console.log(action.payload);
      let {taskId, newColumn, oldColumn, newIndex} = action.payload;

      // Remove taskId from old column
      let updatedOldColumnTasks = state.columns[oldColumn].taskIds.filter((columnTaskId) => columnTaskId != taskId);

      state.columns[oldColumn].taskIds = updatedOldColumnTasks;

      // Insert to new column at certain index
      let currentIds = state.columns[newColumn].taskIds;
      let updatedColumnTasks = currentIds.splice(newIndex,0,taskId)

      // How this even works without updating the column taskIds??
      //state.columns[newColumn].taskIds = updatedColumnTasks;
    },
  },
});

export default slice.reducer;
export const { changeOrder, changeColumn } = slice.actions;


/* 
After drop
droppableId: "column-2"
index: 0
*/