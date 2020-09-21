import React, {useEffect, useState} from 'react';
import {MapEntryType} from "./AddLineComponent";

type Props = {
    selectedValue: number,
    values: Array<MapEntryType>,
    onChange: (value: number) => void
}

function SelectMapArrayCellComponent(props: Props) {
    const [isUpdatable, setUpdatable] = useState<boolean>(false);
    const [inside, setInside] = useState<number>(0);

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
                   let selectedObject = props.values.find((value: MapEntryType, index: number) => {
                       return value.key === event.target.value;
                   });
                   if (selectedObject !== undefined) {
                       setInside(selectedObject.value);
                   }
               }}
        >
            {props.values.map((item: MapEntryType, i: number) => (
                <option key={i}>{item.key}</option>
            ))}
        </select>} {!isUpdatable && props.values.find(value => value.value === props.selectedValue)?.key}
        </td>
    )
}

export default SelectMapArrayCellComponent;