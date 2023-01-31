import styled from 'styled-components';

export const SearchTodo = () => {
	return (
		<SSearchField>
			<label>idで絞り込み</label>
			<SSelect>
				<option hidden>idを選択してください</option>
				<option value='1'>1</option>
			</SSelect>
			<label style={{marginLeft: '20px'}}>期限で絞り込み</label>
			<input type='date' placeholder='期限'/>
			<label style={{marginLeft: '20px'}}>ステータスで絞り込み</label>
			<SSelect>
				<option>未着手</option>
			</SSelect>
		</SSearchField>
	)
}

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