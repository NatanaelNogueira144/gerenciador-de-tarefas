import CheckboxInput from "../CheckboxInput";
import useTask from "../../data/hooks/useTask";
import {
    AddItemButton,
    ChecklistButton,
    ChecklistContainer,
    ChecklistItem,
    Container,
    DatesContainer,
    FormContainer,
    FormGroup,
    FormInput,
    FormLeftContainer,
    FormRightContainer,
    FormRightContainerHeader,
    FormTextarea,
    FormTitle,
    InputLabel,
    SubmitButton,
    SubmitButtonContainer,
    Title
} from "./styles";
import { ISaveTaskRequest } from "../../core/interfaces/requests/save-task-request.interface";
import { ITask } from "../../core/interfaces/models/task.interface";
import { useState } from "react";
import { IChecklistItem } from "../../core/interfaces/models/checklist-item.interface";

interface TaskFormProps {
    task: ITask|undefined;
}

export default function TaskForm({ task }: TaskFormProps) {
    const { store, update } = useTask();
    const [request, setRequest] = useState((task ? {
        name: task.name,
        description: task.description,
        startsAt: task.startsAt,
        deadline: task.deadline,
        checklist: task.checklist,
        isDone: task.isDone
    } : {}) as ISaveTaskRequest);

    return (
        <Container>
            <FormTitle>{task ? 'Editar Tarefa' : 'Adicionar Tarefa'}</FormTitle>
            <FormContainer>
                <FormLeftContainer>
                    <FormGroup>
                        <InputLabel>Nome</InputLabel>
                        <FormInput 
                            placeholder="Digite o nome da tarefa..."
                            onChange={(e) => setRequest({ ...request, name: e.target.value })}
                            type="text"
                            value={request.name}
                        />
                    </FormGroup>
                    <FormGroup>
                        <InputLabel>Descrição</InputLabel>
                        <FormTextarea 
                            placeholder="Digite a descrição da tarefa..."
                            onChange={(e) => setRequest({ ...request, description: e.target.value })}
                            value={request.description}
                        />
                    </FormGroup>
                    
                    <DatesContainer>
                        <FormGroup>
                            <InputLabel>Início</InputLabel>
                            <FormInput 
                                placeholder="Digite o nome da tarefa..."
                                onChange={(e) => setRequest({ ...request, startsAt: e.target.value })}
                                type="date"
                                value={request.startsAt}
                            />
                        </FormGroup>
                        <FormGroup>
                            <InputLabel>Término</InputLabel>
                            <FormInput 
                                placeholder="Digite o nome da tarefa..."
                                onChange={(e) => setRequest({ ...request, deadline: e.target.value })}
                                type="date"
                                value={request.deadline}
                            />
                        </FormGroup>
                    </DatesContainer>
                </FormLeftContainer>

                <FormRightContainer>
                    <FormRightContainerHeader>
                        <Title>Checklist</Title>
                        <AddItemButton onClick={() => setRequest({
                            ...request,
                            checklist: {
                                items: (() => {
                                    let newItems = [...(request.checklist?.items ?? [])];
                                    newItems.push({
                                        description: '',
                                        isChecked: false
                                    } as IChecklistItem);
                                    return newItems;
                                })()
                            }
                        })}>
                            + Item
                        </AddItemButton>
                    </FormRightContainerHeader>
                    <ChecklistContainer>
                        {request.checklist?.items.map((item, key) => (
                            <ChecklistItem key={key}>
                                <CheckboxInput 
                                    onChange={(e) => setRequest({ 
                                        ...request, 
                                        checklist: {
                                            items: (() => {
                                                let newItems = [...(request.checklist?.items ?? [])];
                                                newItems[key].isChecked = e.target.checked;
                                                return newItems;
                                            })()
                                        }
                                    })} 
                                    checked={item.isChecked} 
                                />
                                <FormInput 
                                    placeholder="Digite o item da lista..."
                                    onChange={(e) => setRequest({ 
                                        ...request, 
                                        checklist: {
                                            items: (() => {
                                                let newItems = [...(request.checklist?.items ?? [])];
                                                newItems[key].description = e.target.value;
                                                return newItems;
                                            })()
                                        }
                                    })} 
                                    type="text"
                                    value={item.description}
                                />
                                <ChecklistButton onClick={() => setRequest({ 
                                    ...request, 
                                    checklist: {
                                        items: (() => {
                                            let newItems = [...(request.checklist?.items ?? [])];
                                            newItems.splice(key, 1);
                                            return newItems;
                                        })()
                                    }
                                })}>
                                    &times;
                                </ChecklistButton>
                            </ChecklistItem>
                        ))}
                    </ChecklistContainer>
                </FormRightContainer>
            </FormContainer>
            <SubmitButtonContainer>
                <SubmitButton onClick={() => {
                    if(request.name.length === 0) {
                        alert('O nome não pode ficar vazio!');
                    } else {
                        if(task === undefined) {
                            store(request);
                            alert('A tarefa foi criada com sucesso!');
                        } else {
                            update(task.id, request);
                            alert('A tarefa foi atualizada com sucesso!');
                        }
                    }
                }}>
                    Salvar
                </SubmitButton>
            </SubmitButtonContainer>
        </Container>
    );
}