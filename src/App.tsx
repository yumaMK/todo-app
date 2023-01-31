import { ChangeEvent, useState, FC } from 'react';
import styled from "styled-components";
import { AddForm } from './components/AddForm';
import { EditForm } from './components/EditForm';
import { SearchTodo } from './components/SearchTodo';
import { TodoList } from './components/TodoList';
import type { Todos, AddTodo } from './types/Todos';

export const App = () => {
	const [inputTitle, setInputTitle] = useState<string>('');
	const [inputStatus, setInputStatus] = useState<string>('');
	const [inputSummary, setInputSummary] = useState<string>('');
	const [inputLimit, setInputLimit] = useState<string>('');
	const [inputAddTodo, setInputAddTodo] = useState<AddTodo>({id: 0, title:'', status: '', summary: '', limit: ''})
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [currentTodo, setCurrentTodo] = useState<AddTodo>({id: 0, title:'', status: '', summary: '', limit: ''});

	const [todoList, setTodoList] = useState<Todos[]>([{id: 0, title:'', status: '', summary: '', limit: ''}]);

	const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputTitle(e.target.value);
	}

	// const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	setInputAddTodo({
	// 		...inputAddTodo,
	// 		title: e.target.value,
	// 	});
	// }


	const onChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setInputStatus(e.target.value);
	}
	const onChangeSummary = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputSummary(e.target.value);
	}
	const onChangeLimit = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputLimit(e.target.value);
	}

	const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		const newTodos = [...todoList];
		newTodos.push({id: newTodos.length, title: inputTitle, status: inputStatus, summary: inputSummary, limit: inputLimit});
		setTodoList(newTodos);
		console.log(todoList);

		setInputTitle('');
		setInputStatus('');
		setInputSummary('');
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
		console.log(currentTodo);
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

	const handleUpdateTodo = (id: number, updateTodo: any) => {
		const updateTodoItem = todoList.map((todo) => {
			return todo.id === id ? updateTodo : todo;
		})
		setIsEditing(false);
		setTodoList(updateTodoItem);
	}

	const handleEditSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		console.log(currentTodo);

		handleUpdateTodo(currentTodo.id, currentTodo)
	}

	return (
		<SContainer>
			<h1>TODO管理アプリ</h1>
			{isEditing ? (
				<EditForm
					currentTodo={currentTodo}
					onChangeTitle={onChangeTitle}
					onChangeStatus={onChangeStatus}
					onChangeSummary={onChangeSummary}
					handleEditInputTitleChange={handleEditInputTitleChange}
					handleEditInputStatusChange={handleEditInputStatusChange}
					handleEditInputSummaryChange={handleEditInputSummaryChange}
					handleEditSubmit={handleEditSubmit}
				/>
			) : (
				<AddForm
					inputTitle={inputTitle}
					inputStatus={inputStatus}
					inputSummary={inputSummary}
					inputLimit={inputLimit}
					onChangeTitle={onChangeTitle}
					onChangeStatus={onChangeStatus}
					onChangeSummary={onChangeSummary}
					onSubmit={onSubmit}
					onChangeLimit={onChangeLimit}
				/>
			)}
				<SearchTodo
				/>
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
