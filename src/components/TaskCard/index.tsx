import { Container, DeleteButton, LeftContainer, Paragraph, ProgressBar, ProgressBarFill, TaskContent, Title } from "./styles";
import { ITask } from "../../core/interfaces/models/task.interface"
import { formatDate } from "../../core/utils/time-utils";
import CheckboxInput from "../CheckboxInput";
import useTask from "../../data/hooks/useTask";

interface TaskCardProps {
    onClick: () => void;
    onCheckboxChange: (isChecked: boolean) => void;
    task: ITask;
}

export default function TaskCard({ onClick, onCheckboxChange, task }: TaskCardProps) {
    const { destroy } = useTask();
    return (
        <Container>
            <LeftContainer>
                <CheckboxInput 
                    onChange={(e) => onCheckboxChange(e.target.checked)} 
                    checked={task.isDone}
                />
                <DeleteButton onClick={() => destroy(task.id)}>&times;</DeleteButton>
            </LeftContainer>
            <TaskContent onClick={onClick}>
                <Title>{task.name}</Title>
                <Paragraph>{task.description}</Paragraph>
                {(task.startsAt || task.deadline) && (
                    <>
                        <Paragraph>
                            <strong>🕑 </strong>
                            {task.startsAt ? formatDate(task.startsAt) : ''}
                            {task.startsAt && task.deadline && ' - '}
                            {task.deadline ? formatDate(task.deadline) : ''}
                        </Paragraph>
                        {task.startsAt && task.deadline && (
                            <ProgressBar>
                                <ProgressBarFill 
                                    $width={
                                        (new Date().getTime() - new Date(task.startsAt).getTime()) * 100 / 
                                        (new Date(task.deadline).getTime() - new Date(task.startsAt).getTime())
                                    } 
                                />
                            </ProgressBar>
                        )}
                    </>
                )}
                {task.checklist && (
                    <>
                        <Paragraph>
                            <strong>✅ </strong>
                            {task.checklist.items.filter(i => i.isChecked).length}/{task.checklist.items.length}
                        </Paragraph>
                        <ProgressBar>
                            <ProgressBarFill 
                                $width={task.checklist.items.filter(i => i.isChecked).length * 100 / task.checklist.items.length}
                            />
                        </ProgressBar>
                    </>
                )}
            </TaskContent>
        </Container>
    );
}