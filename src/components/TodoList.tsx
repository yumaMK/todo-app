import styled from 'styled-components';
import { FC } from 'react';
import type { Todos } from '../types/Todos';

type Props = {
	todoList: Todos[];
	handleEditClick: (index: number) => void;
	onClickDelete: (index: number) => void;
}

export const TodoList: FC<Props> = props => {
	const { todoList, handleEditClick, onClickDelete } = props;
	return (
		<SList>
			<p>TODOリスト一覧</p>
			<ul>
				{todoList.map((todo, index) => (
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
