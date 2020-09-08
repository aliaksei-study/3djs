import React, {useEffect, useState} from 'react';

type Props = {
    value: number;
    onChange: (value: number) => void
}

function InputCellComponent(props: Props) {
    const [isUpdatable, setUpdatable] = useState<boolean>(false);
    const [inside, setInside] = useState<number>(0);

    useEffect(() => {
        setInside(props.value)
    }, [props.value]);

    return (
        <td onClick={() => {
            setUpdatable(true);
        }}>{isUpdatable &&
        <input autoFocus={true}
               onBlur={() => {
                   props.onChange(inside);
                   setUpdatable(false)
               }}
               defaultValue={props.value}
               onChange={(event) => setInside(+event.target.value)}
        />} {!isUpdatable && props.value}
        </td>
    )
}

export default InputCellComponent;