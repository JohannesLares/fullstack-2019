import React from "react";

interface totalProps {
    time: number
}

const Total: React.FC<totalProps> = (props) => {
    return(
        <p>
            Number of exercises {props.time}
        </p>
    )
}

export default Total;