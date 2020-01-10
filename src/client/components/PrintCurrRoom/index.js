import React from "react";

const PrintCurrRoom = (props) => {
	return (
		<div>
			<div className="labelDiv">
				<label htmlFor="printCurrRoom">
					Current room address :
				</label>
			</div>
			<input
				type="test"
				value={props.fullAddrRoom}
				id="printCurrRoom"
				readOnly
			/>
		</div>
	)
}

export default PrintCurrRoom;