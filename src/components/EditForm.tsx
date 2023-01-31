import { FC } from 'react';
import styled from 'styled-components';
import type { Todos, AddTodo } from '../types/Todos';

type Props = {
	currentTodo: AddTodo;
	onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onChangeStatus: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	onChangeSummary: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleEditInputTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleEditInputStatusChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	handleEditInputSummaryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleEditSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const EditForm: FC<Props> = props => {
	const { currentTodo, onChangeTitle, onChangeStatus, onChangeSummary, handleEditInputTitleChange, handleEditInputStatusChange, handleEditInputSummaryChange,  handleEditSubmit} = props;
	return (
		<SInputField>
			<form onSubmit={()=>handleEditSubmit}>
				<SInput placeholder="タイトルを編集" onChange={handleEditInputTitleChange} value={currentTodo.title}/>
				<SSelect value={currentTodo.status} onChange={handleEditInputStatusChange}>
					<option hidden>状況を選択してください</option>
					<option value={'未着手'}>未着手</option>
					<option value={'進行中'}>進行中</option>
					<option value={'完了'}>完了</option>
				</SSelect>
				<SInput placeholder="詳細を編集" value={currentTodo.summary} onChange={handleEditInputSummaryChange}/>
				<button type='submit' onClick={(e)=>handleEditSubmit(e)}>更新</button>
			</form>
		</SInputField>
	)
}

const SInputField = styled.div`
	margin: 10px;
`

const SInput = styled.input`
	margin: 0 5px 0 5px;
`

const SSelect = styled.select`
	margin: 0 5px 0 5px;
`
