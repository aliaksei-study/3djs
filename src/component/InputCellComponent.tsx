import React, {useState} from 'react';

function InputCellComponent(props: any) {
    const [isUpdatable, setUpdatable] = useState(false);
    return (
        <td onClick={() => {
            setUpdatable(true);
        }}>{isUpdatable &&
        <input autoFocus={true}
               onBlur={() => setUpdatable(false)}
               defaultValue={props.value.value}
               onChange={(event) => props.value.onChange(event, +event.target.value)}
        />} {!isUpdatable && props.value.value}
        </td>
    )
}

export default InputCellComponent;