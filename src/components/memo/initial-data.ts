
type taskObj = {
  [key: string]: {
    id: string;
    content: string;
  }
}

type columnsObj = {
  [key: string]: {
    id: string;
    title: string;
    taskIds: string[]
  }
}

interface IMemoData {
  tasks : taskObj,
  columns: columnsObj,
  columnOrder: string[],
}

const memoData:IMemoData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Add features' },
    'task-2': { id: 'task-2', content: 'Enhance user experience' },
    'task-3': { id: 'task-3', content: 'Demo' },
    'task-4': { id: 'task-4', content: 'Fitness event and program creation' }
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      taskIds: ['task-1', 'task-2']
    },
    'column-2': {
      id: 'column-2',
      title: 'Done',
      taskIds: ['task-3', 'task-4']
    },
  },
  columnOrder: ['column-1', 'column-2']
}

export default memoData;