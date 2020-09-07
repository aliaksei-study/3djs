import React, {useState} from 'react';

function InputCellComponent(props: any) {
    const [isUpdatable, setUpdatable] = useState(false);
    return (
        <td onClick={() => {
            setUpdatable(true);
        }}
        onBlur={() => setUpdatable(false)}>{isUpdatable && <input></input>} {!isUpdatable && props.value}</td>
    )
}

export default InputCellComponent;