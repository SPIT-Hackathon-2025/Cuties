import React from "react";
import Price from "./Price";
import Time from "./Time";

const Bet = ()=> {
    return (
        <div className="bet">
            <Price content="0.041 ETH" />
            <Time content="3 days left" />
        </div>
    );
}

export default Bet;