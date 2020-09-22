import React from "react";
import {changeAddPipeShowedValue} from "../reducer/modalReducer";
import {useDispatch, useSelector} from "react-redux";
import AddPipeComponent from "./AddPipeComponent";
import {RootState} from "../store/store";
import {
    changeBeamCoordinateX,
    changeBeamCoordinateY,
    changeBeamCoordinateZ, changeBeamId, changeOuterDiameter, changeThickness,
    deletePipes,
    Pipe
} from "../reducer/PipeModalReducer";
import InputCellComponent from "./InputCellComponent";
import SelectMapArrayCellComponent from "./SelectMapArrayCellComponent";
import SelectNumberCellComponent from "./SelectNumberCellComponent";

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
                            <SelectMapArrayCellComponent selectedValue={pipe.startBeam.lineId} values={pipe.optionPipeMap} onChange={(newLineId: number) => dispatch(changeBeamId(pipe.id, newLineId, true))}/>
                            <InputCellComponent value={pipe.startBeam.coordinateX} onChange={(newCoordinateX: number) => dispatch(changeBeamCoordinateX(pipe.id, pipe.startBeam.lineId, newCoordinateX))} />
                            <InputCellComponent value={pipe.startBeam.coordinateY} onChange={(newCoordinateY: number) => dispatch(changeBeamCoordinateY(pipe.id, pipe.startBeam.lineId, newCoordinateY))} />
                            <InputCellComponent value={pipe.startBeam.coordinateZ} onChange={(newCoordinateZ: number) => dispatch(changeBeamCoordinateZ(pipe.id, pipe.startBeam.lineId, newCoordinateZ))} />
                            <SelectMapArrayCellComponent selectedValue={pipe.endBeam.lineId} values={pipe.optionPipeMap} onChange={(newLineId: number) => dispatch(changeBeamId(pipe.id, newLineId, false))}/>
                            <InputCellComponent value={pipe.endBeam.coordinateX} onChange={(newCoordinateX: number) => dispatch(changeBeamCoordinateX(pipe.id, pipe.endBeam.lineId, newCoordinateX))} />
                            <InputCellComponent value={pipe.endBeam.coordinateY} onChange={(newCoordinateY: number) => dispatch(changeBeamCoordinateY(pipe.id, pipe.endBeam.lineId, newCoordinateY))} />
                            <InputCellComponent value={pipe.endBeam.coordinateZ} onChange={(newCoordinateZ: number) => dispatch(changeBeamCoordinateZ(pipe.id, pipe.endBeam.lineId, newCoordinateZ))} />
                            <InputCellComponent value={pipe.outerDiameter} onChange={(newOuterDiameter: number) => dispatch(changeOuterDiameter(pipe.id, newOuterDiameter))} />
                            <InputCellComponent value={pipe.thickness} onChange={(newThickness: number) => dispatch(changeThickness(pipe.id, newThickness))} />
                            <SelectNumberCellComponent values={pipes.map((pipe: Pipe) => pipe.id)} selectedValue={pipe?.nextPipeId} onChange={(newNextPipeId: number | null) => console.log()} />
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