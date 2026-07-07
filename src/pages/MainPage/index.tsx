import Layout from "../../components/Layout";
import Modal from "../../components/Modal";
import TaskCard from "../../components/TaskCard";
import TaskForm from "../../components/TaskForm";
import useTask from "../../hooks/useTask";
import {
  Container,
  FilterButton,
  FiltersContainer,
  NoTaskMessageArea,
  TasksContainer,
  TasksGrid
} from "./styles";
import { TasksFilter } from "../../contexts/TaskContext";
import { useState } from "react";
import { Task } from "../../services/taskService";

export default function MainPage() {
  const { selectedFilter, selectedTask, setSelectedFilter, setSelectedTask, tasks, update } = useTask();
  const [modalOpen, setModalOpen] = useState(false);

  function handleAddTask() {
    setSelectedTask(undefined);
    setModalOpen(true);
  }

  function handleTaskCheckbox(task: Task, isChecked: boolean) {
    const updatedTask: Task = {...task, isDone: isChecked};
    setSelectedTask(updatedTask);
    update(updatedTask.id, updatedTask);
  }

  function handleSelectTask(task: Task) {
    setSelectedTask(task);
    setModalOpen(true);
  }

  return (
    <Layout onAddTaskClick={handleAddTask}>
      <Container>
        <FiltersContainer>
          <FilterButton
            $isactive={selectedFilter === TasksFilter.Today}
            onClick={() => setSelectedFilter(TasksFilter.Today)}
          >
            Hoje
          </FilterButton>
          <FilterButton 
            $isactive={selectedFilter === TasksFilter.Tomorrow}
            onClick={() => setSelectedFilter(TasksFilter.Tomorrow)}
          >
            Amanhã
          </FilterButton>
          <FilterButton 
            $isactive={selectedFilter === TasksFilter.ThisWeek}
            onClick={() => setSelectedFilter(TasksFilter.ThisWeek)}
          >
            Nesta Semana
          </FilterButton>
          <FilterButton 
            $isactive={selectedFilter === TasksFilter.Awaiting}
            onClick={() => setSelectedFilter(TasksFilter.Awaiting)}
          >
            Aguardando
          </FilterButton>
          <FilterButton 
            $isactive={selectedFilter === TasksFilter.Late}
            onClick={() => setSelectedFilter(TasksFilter.Late)}
          >
            Atrasado
          </FilterButton>
          <FilterButton 
            $isactive={selectedFilter === TasksFilter.Inbox}
            onClick={() => setSelectedFilter(TasksFilter.Inbox)}
          >
            Caixa de Entrada
          </FilterButton>
          <FilterButton 
            $isactive={selectedFilter === TasksFilter.Done}
            onClick={() => setSelectedFilter(TasksFilter.Done)}
          >
            Feito
          </FilterButton>
        </FiltersContainer>
        <TasksContainer>
          {tasks.length === 0 ? (
            <NoTaskMessageArea>
              <p>Nenhuma tarefa encontrada!</p>
            </NoTaskMessageArea>
          ) : (
            <TasksGrid>
              {tasks.map((task, key) => (
                <TaskCard 
                  key={key} 
                  task={task}
                  onCheckboxChange={(isChecked) => handleTaskCheckbox(task, isChecked)}
                  onClick={() => handleSelectTask(task)}
                />
              ))}
            </TasksGrid>
          )}
        </TasksContainer>
      </Container>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <TaskForm task={selectedTask} />
      </Modal>
    </Layout>
  );
}