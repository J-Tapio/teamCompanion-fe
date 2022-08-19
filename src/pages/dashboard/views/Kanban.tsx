import {useState, useEffect} from 'react'; 
// React-beautiful-dnd
import { DragDropContext, Draggable, Droppable, DroppableProvided, DroppableProvidedProps, Placeholder, DropResult } from 'react-beautiful-dnd';
// MaterialUI
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { Paper } from '@material-ui/core';
import Typography from '@mui/material/Typography';
// Redux store
import { RootState, useDispatch, useSelector } from '../../../store';
// Redux reducers
import { changeOrder, changeColumn } from '../../../store/slices/memo';

//------------------------------------------------------------------------------

type KanbanTaskCard = {
  index: number;
  id: string;
  content: string;
}

function KanbanTaskCard({index,id,content}:KanbanTaskCard) {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <Paper elevation={2} style={{padding: '1rem'}}>
            <Typography variant="body2">{content}</Typography>
          </Paper>
        </div>
      )}
    </Draggable>
  );
}

//------------------------------------------------------------------------------

interface IKanbanColumn {
  index: number;
  column: {
    id: string;
    title: string;
    taskIds: string[];
  };
}

function KanbanColumn({index, column}:IKanbanColumn) {
  const {tasks} = useSelector((state: RootState) => state.memo);
  const {id, title, taskIds} = column;
  const columnTasks = taskIds.map((taskId) => tasks[taskId]);


  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <Paper
          {...provided.draggableProps}
          ref={provided.innerRef}
          elevation={1}
          style={{ padding: '1rem' }}
        >
          <Typography variant="h5" fontWeight={500} gutterBottom>
            {title}
          </Typography>
          <Stack spacing={2} {...provided.dragHandleProps} width={280}>
            <Droppable droppableId={id} type="task">
            {
              (provided) => (
                <Stack ref={provided.innerRef} {...provided.droppableProps} spacing={2}>
                  {
                  columnTasks.map((task, index) => (
                    <KanbanTaskCard
                      key={task.id}
                      index={index}
                      id={task.id}
                      content={task.content}
                    />
                  ))
                  }
                  {provided.placeholder}
                </Stack>
              )
            }
            </Droppable>
          </Stack>
        </Paper>
      )}
    </Draggable>
  );
}

//------------------------------------------------------------------------------

export default function Kanban() {
  const dispatch = useDispatch();
  const {columns, columnOrder, tasks} = useSelector((state: RootState) => state.memo);

  const handleDragEnd = (result: DropResult) => {
    const {destination, source, draggableId, type} = result;

    console.log(draggableId); //taskid
    console.log(destination);
    console.log(source);

    if(!destination) return;

    if(destination.droppableId === source.droppableId && destination.index === source.index) return;
    // Same column change
    if(destination.droppableId === source.droppableId) {
      dispatch(changeOrder({taskId: draggableId, columnId: destination.droppableId, newIndex: destination.index, oldIndex: source.index}));
    } else {
      dispatch(changeColumn({
        taskId: draggableId, oldColumn: source.droppableId, newColumn: destination.droppableId, newIndex: destination.index
      }))
    }
  };

  return (
    <Grid item xs={12}>
      <Stack spacing={5}>
        <Typography variant="h3" fontWeight="700" gutterBottom>
          Memo
        </Typography>
        <Typography variant="h6" fontWeight="700" gutterBottom>
          Feel free to move tasks between To Do and Done tables. Will implement possibility to add/remove tasks later.
        </Typography>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="kanban-columns" direction="horizontal" type="column">
              {(provided) => (
                <Stack 
                {...provided.droppableProps} 
                ref={provided.innerRef} 
                direction="row" 
                spacing={3}>
                  {columnOrder.map((columnId, index) => {
                  let column = columns[columnId];
                  return (
                    <KanbanColumn
                      index={index}
                      key={columnId}
                      column={column}
                    />);
                })}
                  {provided.placeholder}
                </Stack>
              )}
          </Droppable>

        </DragDropContext>
      </Stack>
    </Grid>
  );
}