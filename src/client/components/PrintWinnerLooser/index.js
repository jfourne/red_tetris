import React from 'react';
import { PLAYER } from '../../constants/playerRole';

const PrintWinnerLooser = (props) => {
	return (
		<div>
			{ props.role === PLAYER
			&& <h2>
				{props.winner === props.playerName
				? "YOU WIN"
				: "YOU LOOSE"}
			</h2>
			}
			<h3>
				WINNER IS {props.winner && props.winner.toUpperCase()}
			</h3>
		</div>
	)
}

export default PrintWinnerLooser;