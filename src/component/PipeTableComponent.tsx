import React from "react";
import {changeAddPipeShowedValue} from "../reducer/modalReducer";
import {useDispatch} from "react-redux";
import AddPipeComponent from "./AddPipeComponent";

function PipeTableComponent() {
    const dispatch = useDispatch();
    return (
        <div className="container">
            <button type="button" className="btn btn-outline-success" onClick={(event) => {
                dispatch(changeAddPipeShowedValue(true));
            }}>Add Pipe
            </button>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th/>
                    <th>Direction</th>
                    <th colSpan={4}>Start</th>
                    <th colSpan={4}>End</th>
                    <th>Outer diameter</th>
                    <th>Thickness</th>
                    <th>Next</th>
                </tr>
                <tr>
                    <td/>
                    <td/>
                    <td>Beam</td>
                    <td>x</td>
                    <td>y</td>
                    <td>z</td>
                    <td>Beam</td>
                    <td>x</td>
                    <td>y</td>
                    <td>z</td>
                    <td/>
                    <td/>
                    <td/>
                </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
            <AddPipeComponent/>
        </div>
    )
}

export default PipeTableComponent;