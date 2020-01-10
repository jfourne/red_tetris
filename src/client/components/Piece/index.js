import React from "react";
import "./Piece.css";

const tetri_color = [
	"p_0",
	"p_1",
	"p_2",
	"p_3",
	"p_4",
	"p_5",
	"p_6",
	"p_7",
	"p_8",
	"p_2prev",
	"p_3prev",
	"p_4prev",
	"p_5prev",
	"p_6prev",
	"p_7prev",
	"p_8prev",
]

const Piece = (props) => {
	return (
		<div
			className={`flex-row-item ${props.mainBoard ? "mainPieceHeight" : "otherPieceHeight"}`}
			id={tetri_color[props.value]}>
		</div>
	)
}

export default Piece;