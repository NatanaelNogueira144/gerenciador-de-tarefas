import Layout from "../../components/Layout";
import Modal from "../../components/Modal";
import TaskCard from "../../components/TaskCard";
import TaskForm from "../../components/TaskForm";
import useTask from "../../data/hooks/useTask";
import { Container, FilterButton, FiltersContainer, NoTaskMessageArea, TasksContainer, TasksGrid } from "./styles";
import { ITask } from "../../core/interfaces/models/task.interface";
import { TasksFilter } from "../../data/contexts/TaskContext";
import { useState } from "react";

export default function MainPage() {
    const { selectedFilter, selectedTask, setSelectedFilter, setSelectedTask, tasks, update } = useTask();
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <Layout onAddTaskClick={() => {
            setSelectedTask(undefined);
            setModalOpen(true);
        }}>
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
                                    onCheckboxChange={(isChecked) => {
                                        const updatedTask = {...task, isDone: isChecked} as ITask;
                                        setSelectedTask(updatedTask);
                                        update(updatedTask.id, updatedTask);
                                    }}
                                    onClick={() => {
                                        setSelectedTask(task);
                                        setModalOpen(true);
                                    }}
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
    )
}