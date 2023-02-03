import { ChangeEvent, useState, FC } from 'react';
import styled from "styled-components";
import { AddForm } from './components/AddForm';
import { EditForm } from './components/EditForm';
import { TodoList } from './components/TodoList';
import type { Todos, AddTodo } from './types/Todos';

export const App = () => {
	const defaultTodos = [
		{id: 0, title:'test1', status: '未着手', summary: 'testtest1', limit: '2023-01-01'},
		{id: 1, title:'test2', status: '進行中', summary: 'testtest2', limit: '2023-02-10'},
		{id: 2, title:'test2', status: '完了', summary: 'testtest3', limit: '2023-03-31'},
	]

	const [inputAddTodo, setInputAddTodo] = useState<AddTodo>({id: 0, title:'', status: '', summary: '', limit: ''})
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [currentTodo, setCurrentTodo] = useState<AddTodo>({id: 0, title:'', status: '', summary: '', limit: ''});
	const [todoList, setTodoList] = useState<Todos[]>(defaultTodos);

	const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputAddTodo({
			...inputAddTodo,
			title: e.target.value,
		});
	}
	const onChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setInputAddTodo({
			...inputAddTodo,
			status: e.target.value
		});
	}
	const onChangeSummary = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputAddTodo({
			...inputAddTodo,
			summary: e.target.value
		});
	}
	const onChangeLimit = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputAddTodo({
			...inputAddTodo,
			limit: e.target.value
		});
	}


	const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		const newTodos = [...todoList];
		newTodos.push({id: newTodos.length, title: inputAddTodo.title, status: inputAddTodo.status, summary: inputAddTodo.summary, limit: inputAddTodo.limit});
		setTodoList(newTodos);
		setInputAddTodo({id: 0, title: '', status: '', summary: '', limit: ''})
	}


	const onClickDelete = (index: number) => {
		const newTodos = [...todoList];
		newTodos.splice(index, 1);
		setTodoList(newTodos);
	}

	const handleEditClick = (index: number) => {
		const newTodos = [...todoList];
		const [selectTodo] = newTodos.slice(index, index + 1);
		setCurrentTodo(selectTodo);
		setIsEditing(true);
		console.log(currentTodo)
	}

	const handleEditInputTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCurrentTodo({
			...currentTodo,
			title: e.target.value
		});
	}
	const handleEditInputStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setCurrentTodo({
			...currentTodo,
			status: e.target.value
		});
	}
	const handleEditInputSummaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCurrentTodo({
			...currentTodo,
			summary: e.target.value
		});
	}
	const handleEditInputLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCurrentTodo({
			...currentTodo,
			limit: e.target.value
		});
	}

	const handleUpdateTodo = (id: number, updateTodo: any) => {
		const updateTodoItem = todoList.map((todo) => {
			return todo.id === id ? updateTodo : todo;
		})
		setIsEditing(false);
		setTodoList(updateTodoItem);
	}

	const handleEditSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		handleUpdateTodo(currentTodo.id, currentTodo)
	}

	return (
		<SContainer>
			<h1>TODO管理アプリ</h1>
			{isEditing ? (
				<EditForm
					currentTodo={currentTodo}
					handleEditInputTitleChange={handleEditInputTitleChange}
					handleEditInputStatusChange={handleEditInputStatusChange}
					handleEditInputSummaryChange={handleEditInputSummaryChange}
					handleEditInputLimitChange={handleEditInputLimitChange}
					handleEditSubmit={handleEditSubmit}
				/>
			) : (
				<AddForm
					inputAddTodo={inputAddTodo}
					onChangeTitle={onChangeTitle}
					onChangeStatus={onChangeStatus}
					onChangeSummary={onChangeSummary}
					onSubmit={onSubmit}
					onChangeLimit={onChangeLimit}
				/>
			)}
				<TodoList
					todoList={todoList}
					handleEditClick={handleEditClick}
					onClickDelete={onClickDelete}
				/>
		</SContainer>
	)
}

const SContainer = styled.div`
	margin: 10px;
`
