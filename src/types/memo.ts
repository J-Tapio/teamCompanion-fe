
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

export interface IMemoData {
  tasks : taskObj,
  columns: columnsObj,
  columnOrder: string[],
}