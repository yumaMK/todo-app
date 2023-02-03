import styled from 'styled-components';
import { FC, useState } from 'react';
import type { Todos } from '../types/Todos';

type Props = {
	todoList: Todos[];
	handleEditClick: (index: number) => void;
	onClickDelete: (index: number) => void;
}

export const TodoList: FC<Props> = props => {
	const { todoList, handleEditClick, onClickDelete } = props;
	const [searchId, setSearchId] = useState<number>(0);
	const [searchLimit, setSearchLimit] = useState<string>('3000/1/1');
	const [searchStatus, setSearchStatus] = useState<string>('未着手 進行中 完了');

	const filteredTodoList = todoList.filter(v => (v.id >= searchId) && (v.limit <= searchLimit) && searchStatus.includes(v.status));

	const onChangeSearchId = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSearchId(Number(e.target.value));
	}
	const onChangeSearchLimit = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchLimit(e.target.value);
	}
	const onChangeSearchState = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSearchStatus(e.target.value);
	}

	return (
		<SList>
			<p>TODOリスト一覧</p>
			<SSearchField>
				<label>idで絞り込み</label>
				<SSelect onChange={onChangeSearchId}>
					<option hidden>idを選択してください</option>
					<option value='0'>選択しない</option>
					{todoList.map((todo) => (
						<>
						<option value={todo.id}>{todo.id}</option>
						</>
					))}
				</SSelect>
				<label style={{marginLeft: '20px'}}>期限で絞り込み</label>
				<input type='date' placeholder='期限' onChange={onChangeSearchLimit}/>
				<label style={{marginLeft: '20px'}}>ステータスで絞り込み</label>
				<SSelect onChange={onChangeSearchState}>
					<option hidden>ステータスを選択してください</option>
					<option value="未着手 進行中 完了">選択しない</option>
					<option value="未着手">未着手</option>
					<option value="進行中">進行中</option>
					<option value="完了">完了</option>
				</SSelect>
			</SSearchField>
			<ul>
				{filteredTodoList.map((todo, index) => (
					<li key={todo.id}>
						<SListWrapper>
							<SListContent>タイトル:{todo.title}</SListContent>
							<SListContent>状況:{todo.status}</SListContent>
							<SListContent>詳細:{todo.summary}</SListContent>
							<SListContent>期限:{todo.limit}</SListContent>
							<button onClick={()=>handleEditClick(index)}>編集</button>
							<button onClick={()=>onClickDelete(index)}>削除</button>
						</SListWrapper>
					</li>
				))}
			</ul>
		</SList>
	)
}

const SList = styled.div`
	border: solid 1px #aaa;
	margin: 10px;
	padding: 10px;
`
const SListWrapper = styled.div`
	display: flex;
	align-items: center;
`

const SListContent = styled.p`
	padding: 0 10px;
`

const SSearchField = styled.div`
	margin: 10px;
	padding: 10px;
	background-color: #d7faf9;
	border: solid 1px #aaa
`
const SSelect = styled.select`
	margin: 0 5px 0 5px;
`

const SInput = styled.input`
	margin: 0 5px 0 5px;
`