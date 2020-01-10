import React from "react";
import "./Board.css";
import Piece from "../Piece";
import { get } from "http";

const Board = (props) => {
	return (
		<div className={`flex-row-item ${props.mainBoard ? "mainBoard"	: "otherBoard" + props.otherId}`}
			onClick={() => props.handleClickMain(props.id)}>
			<div
				className={`flex-row-container
					${props.mainBoard
					? "mainBoardHeight"
					: "otherBoardHeight"}`}>
				{props.board && props.board.map((piece, index) =>
				<Piece
					key={index}
					index={index}
					value={piece}
					mainBoard={props.mainBoard}
				/>
			)}
			</div>
		</div>
	);
}

export default Board;