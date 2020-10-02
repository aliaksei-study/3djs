import React from "react";
import {actions, getModel, Line, RandomLine, tableReducer, TableState} from "./tableReducer";
import {Vector3} from "three";
import {modelAPI} from "../api/modelAPI";

const state: TableState = {
    lines: [
        {
            id: 0.34567,
            points: [
                new Vector3(1, 2, 3),
                new Vector3(2, 3, 4)
            ],
            firstLineId: 0.345634,
            secondLineId: 0.342313
        },
        {
            id: 0.4657345,
            points: [
                new Vector3(2, 2, 2),
                new Vector3(2, 7, 3)
            ],
            firstLineId: 0.3434754,
            secondLineId: 0.244385
        }
    ],
    sections: [
        {
            id: 0.23453,
            firstPortalId: 0.24854,
            secondPortalId: 0.32524,
            sectionLines: []
        }
    ],
    portals: [
        {
            id: 0.12414,
            step: 10,
            distFromStart: 10,
            heightOfPortal: 20,
            numberOfPortalLayers: 2,
            portalLines:[]
        }
    ],
    removedLineId: null
};
const initialState = {
    sections: [],
    portals: [],
    removedLineId: null,
    lines: []
};

jest.mock("../api/modelAPI");
const modelAPIMock = modelAPI as jest.Mocked<typeof modelAPI>;


it('when add new random line array of lines should be greater initial array', () => {
    let line: RandomLine = {
        id: 0.34567,
        points: [
            new Vector3(1, 2, 3),
            new Vector3(2, 3, 4)
        ],
        firstLineId: 0.345634,
        secondLineId: 0.342313
    };
    let newState: TableState = tableReducer(state, actions.addLine(line));
    expect<number>(newState.lines.length).toBeGreaterThan(state.lines.length);
});

it('when delete model, array\'s size should be equal to zero', () => {
    let newState: TableState = tableReducer(state, actions.removeModel());
    expect<TableState>(newState).toEqual(initialState);
});

test('thunk test get model', async () => {
    modelAPIMock.getModel.mockReturnValue(Promise.resolve(state));
    const thunk = getModel();
    const dispatchMock = jest.fn();
    const getStateMock = jest.fn();
    await thunk(dispatchMock, getStateMock, {});
    expect(dispatchMock).toBeCalled();
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setLoadedModel(state));
});


