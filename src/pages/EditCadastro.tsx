// src/pages/EditCadastro.tsx
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';

interface Grade {
  portugues: number;
  matematica: number;
  historia: number;
  ciencias: number;
  geografia: number;
  ensinoReligioso: number;
}

interface Student {
  id: number;
  name: string;
  class: string;
  grades: Grade;
}

interface EditCadastroProps {
  students: Student[];
  updateStudent: (student: Student) => void;
}

const EditContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.large} ${({ theme }) => theme.spacing.medium};
  max-width: 800px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  background: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.large};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  font-size: 2rem;
  margin-bottom: ${({ theme }) => theme.spacing.large};
  text-align: center;
`;

const InputGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const Label = styled.label`
  display: block;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.1rem;
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.small};
  border: 1px solid ${({ theme }) => theme.colors.secondary}50;
  border-radius: 4px;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

const SaveButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.medium};
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  cursor: pointer;
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing.large};
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary}cc;
  }
`;

const EditCadastro: React.FC<EditCadastroProps> = ({ students, updateStudent }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const studentToEdit = students.find(student => student.id === Number(id));

  const [formData, setFormData] = useState({
    name: studentToEdit?.name || '',
    class: studentToEdit?.class || '',
    portugues: studentToEdit?.grades.portugues.toString() || '',
    matematica: studentToEdit?.grades.matematica.toString() || '',
    historia: studentToEdit?.grades.historia.toString() || '',
    ciencias: studentToEdit?.grades.ciencias.toString() || '',
    geografia: studentToEdit?.grades.geografia.toString() || '',
    ensinoReligioso: studentToEdit?.grades.ensinoReligioso.toString() || '',
  });

  useEffect(() => {
    if (!studentToEdit) {
      navigate('/');
    }
  }, [studentToEdit, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedStudent: Student = {
      id: Number(id),
      name: formData.name.trim(),
      class: formData.class,
      grades: {
        portugues: parseFloat(formData.portugues) || 0,
        matematica: parseFloat(formData.matematica) || 0,
        historia: parseFloat(formData.historia) || 0,
        ciencias: parseFloat(formData.ciencias) || 0,
        geografia: parseFloat(formData.geografia) || 0,
        ensinoReligioso: parseFloat(formData.ensinoReligioso) || 0,
      },
    };
    updateStudent(updatedStudent);
    navigate('/ranking');
  };

  return (
    <EditContainer>
      <Title>Editar Cadastro de Aluno</Title>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Label>Nome</Label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </InputGroup>
        <InputGroup>
          <Label>Turma</Label>
          <Input
            type="text"
            name="class"
            value={formData.class}
            onChange={handleChange}
            required
          />
        </InputGroup>
        <InputGroup>
          <Label>Português</Label>
          <Input
            type="number"
            name="portugues"
            value={formData.portugues}
            onChange={handleChange}
            min="0"
            max="10"
            step="0.1"
            required
          />
        </InputGroup>
        <InputGroup>
          <Label>Matemática</Label>
          <Input
            type="number"
            name="matematica"
            value={formData.matematica}
            onChange={handleChange}
            min="0"
            max="10"
            step="0.1"
            required
          />
        </InputGroup>
        <InputGroup>
          <Label>História</Label>
          <Input
            type="number"
            name="historia"
            value={formData.historia}
            onChange={handleChange}
            min="0"
            max="10"
            step="0.1"
            required
          />
        </InputGroup>
        <InputGroup>
          <Label>Ciências</Label>
          <Input
            type="number"
            name="ciencias"
            value={formData.ciencias}
            onChange={handleChange}
            min="0"
            max="10"
            step="0.1"
            required
          />
        </InputGroup>
        <InputGroup>
          <Label>Geografia</Label>
          <Input
            type="number"
            name="geografia"
            value={formData.geografia}
            onChange={handleChange}
            min="0"
            max="10"
            step="0.1"
            required
          />
        </InputGroup>
        <InputGroup>
          <Label>Ensino Religioso</Label>
          <Input
            type="number"
            name="ensinoReligioso"
            value={formData.ensinoReligioso}
            onChange={handleChange}
            min="0"
            max="10"
            step="0.1"
            required
          />
        </InputGroup>
        <SaveButton type="submit">Salvar Alterações</SaveButton>
      </Form>
    </EditContainer>
  );
};

export default EditCadastro;