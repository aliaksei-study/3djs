import React from "react";
import {changeAddPipeShowedValue} from "../reducer/modalReducer";
import {useDispatch, useSelector} from "react-redux";
import AddPipeComponent from "./AddPipeComponent";
import {RootState} from "../store/store";
import {deletePipes, Pipe} from "../reducer/PipeModalReducer";

function PipeTableComponent() {
    const dispatch = useDispatch();
    const pipes = useSelector((state: RootState) => state.pipeModal.pipes);
    let selectedPipes: Array<Pipe> = [];
    return (
        <div className="container">
            <button type="button" className="btn btn-outline-success" onClick={(event) => {
                dispatch(changeAddPipeShowedValue(true));
            }}>Add Pipe
            </button>
            <button type="button" className="ml-3 btn btn-outline-warning" onClick={(event) => {
                dispatch(deletePipes(selectedPipes));
            }}>Delete
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
                {
                    pipes.map(pipe => (
                        <tr key={pipe.id}>
                            <td><input type="checkbox" onClick={() => {
                                let selectedElementIndex = selectedPipes.indexOf(pipe);
                                if(selectedElementIndex >= 0) {
                                    selectedPipes.splice(selectedElementIndex, 1);
                                } else {
                                    selectedPipes.push(pipe);
                                }
                            }} /></td>
                            <td>{pipe.direction}</td>
                            <td>{pipe.startBeam.lineId}</td>
                            <td>{pipe.startBeam.coordinateX}</td>
                            <td>{pipe.startBeam.coordinateY}</td>
                            <td>{pipe.startBeam.coordinateZ}</td>
                            <td>{pipe.endBeam.lineId}</td>
                            <td>{pipe.endBeam.coordinateX}</td>
                            <td>{pipe.endBeam.coordinateY}</td>
                            <td>{pipe.endBeam.coordinateZ}</td>
                            <td>{pipe.outerDiameter}</td>
                            <td>{pipe.thickness}</td>
                            <td>{pipe?.nextPipeId}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
            <AddPipeComponent/>
        </div>
    )
}

export default PipeTableComponent;