import React, {useEffect, useState} from 'react';

type Props = {
    selectedValue: number | null,
    values: Array<number>,
    onChange: (value: number | null) => void
};

function SelectNumberCellComponent(props: Props) {
    const [isUpdatable, setUpdatable] = useState<boolean>(false);
    const [inside, setInside] = useState<number | null>(null);

    useEffect(() => {
        setInside(props.selectedValue)
    }, [props.selectedValue]);

    return (
        <td onClick={() => {
            setUpdatable(true);
        }}>{isUpdatable &&
        <select autoFocus={true}
                onBlur={() => {
                    props.onChange(inside);
                    setUpdatable(false)
                }}
                onChange={(event) => {
                    setInside(+event.target.value);
                }}
        >
            <option>null</option>
            {props.values.map((value: number) => (
                <option key={value}>{value}</option>
            ))}
        </select>} {!isUpdatable && props.selectedValue}
        </td>
    )
}

export default SelectNumberCellComponent;