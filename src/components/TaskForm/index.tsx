import CheckboxInput from "../CheckboxInput";
import useTask from "../../hooks/useTask";
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
import { useState } from "react";
import { Task, TaskChecklistItem, TaskPayload } from "../../services/taskService";

interface TaskFormProps {
  task: Task|undefined;
}

export default function TaskForm({ task }: TaskFormProps) {
  const { store, update } = useTask();
  const [payload, setPayload] = useState<TaskPayload>({
    name: task?.name ?? '',
    description: task?.description ?? '',
    startsAt: task?.startsAt,
    deadline: task?.deadline,
    checklist: task?.checklist,
    isDone: task?.isDone ?? false
  });

  function handleSubmit() {
    if(payload.name.length === 0) {
      alert('O nome não pode ficar vazio!');
    } else {
      if(task === undefined) {
        store(payload);
        alert('A tarefa foi criada com sucesso!');
      } else {
        update(task.id, payload);
        alert('A tarefa foi atualizada com sucesso!');
      }
    }
  }

  return (
    <Container>
      <FormTitle>{task ? 'Editar Tarefa' : 'Adicionar Tarefa'}</FormTitle>
      <FormContainer>
        <FormLeftContainer>
          <FormGroup>
            <InputLabel>Nome</InputLabel>
            <FormInput 
              placeholder="Digite o nome da tarefa..."
              onChange={(e) => setPayload({ ...payload, name: e.target.value })}
              type="text"
              value={payload.name ?? ''}
            />
          </FormGroup>
          <FormGroup>
            <InputLabel>Descrição</InputLabel>
            <FormTextarea 
              placeholder="Digite a descrição da tarefa..."
              onChange={(e) => setPayload({ ...payload, description: e.target.value })}
              value={payload.description ?? ''}
            />
          </FormGroup>
          
          <DatesContainer>
            <FormGroup>
              <InputLabel>Início</InputLabel>
              <FormInput 
                placeholder="Digite o nome da tarefa..."
                onChange={(e) => setPayload({ ...payload, startsAt: e.target.value })}
                type="date"
                value={payload.startsAt ?? ''}
              />
            </FormGroup>
            <FormGroup>
              <InputLabel>Término</InputLabel>
              <FormInput 
                placeholder="Digite o nome da tarefa..."
                onChange={(e) => setPayload({ ...payload, deadline: e.target.value })}
                type="date"
                value={payload.deadline ?? ''}
              />
            </FormGroup>
          </DatesContainer>
        </FormLeftContainer>

        <FormRightContainer>
          <FormRightContainerHeader>
            <Title>Checklist</Title>
            <AddItemButton onClick={() => setPayload({
              ...payload,
              checklist: {
                items: (() => {
                  let newItems = [...(payload.checklist?.items ?? [])];
                  newItems.push({
                    description: '',
                    isChecked: false
                  } as TaskChecklistItem);
                  return newItems;
                })()
              }
            })}>
              + Item
            </AddItemButton>
          </FormRightContainerHeader>
          <ChecklistContainer>
            {payload.checklist?.items.map((item, key) => (
              <ChecklistItem key={key}>
                <CheckboxInput 
                  onChange={(e) => setPayload({ 
                    ...payload, 
                    checklist: {
                      items: (() => {
                        let newItems = [...(payload.checklist?.items ?? [])];
                        newItems[key].isChecked = e.target.checked;
                        return newItems;
                      })()
                    }
                  })} 
                  checked={item.isChecked} 
                />
                <FormInput 
                  placeholder="Digite o item da lista..."
                  onChange={(e) => setPayload({ 
                    ...payload, 
                    checklist: {
                      items: (() => {
                        let newItems = [...(payload.checklist?.items ?? [])];
                        newItems[key].description = e.target.value;
                        return newItems;
                      })()
                    }
                  })} 
                  type="text"
                  value={item.description}
                />
                <ChecklistButton onClick={() => setPayload({ 
                  ...payload, 
                  checklist: {
                    items: (() => {
                      let newItems = [...(payload.checklist?.items ?? [])];
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
        <SubmitButton onClick={handleSubmit}>
          Salvar
        </SubmitButton>
      </SubmitButtonContainer>
    </Container>
  );
}