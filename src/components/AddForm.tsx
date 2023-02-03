import { FC } from 'react';
import styled from 'styled-components';
import type {AddTodo} from '../types/Todos';

type Props = {
	inputAddTodo: AddTodo;
	onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onChangeStatus: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	onChangeSummary: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	onChangeLimit: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AddForm: FC<Props> = props => {
	const { inputAddTodo,  onChangeTitle, onChangeStatus, onChangeSummary, onSubmit, onChangeLimit} = props;
	return (
		<SInputField>
			<h5>TODO追加</h5>
			<form>
				<SInput placeholder="タイトル" onChange={onChangeTitle} value={inputAddTodo.title}/>
				<SSelect value={inputAddTodo.status} onChange={onChangeStatus}>
					<option hidden>状況を選択してください</option>
					<option value={'未着手'}>未着手</option>
					<option value={'進行中'}>進行中</option>
					<option value={'完了'}>完了</option>
				</SSelect>
				<SInput placeholder="詳細" value={inputAddTodo.summary} onChange={onChangeSummary}/>
				<SInput type='date' placeholder='期限' value={inputAddTodo.limit} onChange={onChangeLimit}/>
				<button onClick={onSubmit}>追加</button>
			</form>
		</SInputField>
	)
}

const SInputField = styled.div`
	margin: 10px;
	padding: 10px;
	border: solid 1px #aaa;
`

const SInput = styled.input`
	margin: 0 5px 0 5px;
`

const SSelect = styled.select`
	margin: 0 5px 0 5px;
`