import React, {useMemo} from 'react';
import * as THREE from "three";
import {AxesHelper, Mesh, Scene} from "three";
import {useSelector, useStore} from "react-redux";
import {Line, Portal, RandomLine, removePortal, Section} from "../reducer/tableReducer";
import {RootState} from "../store/store";
import {Beam, Pipe} from "../reducer/PipeModalReducer";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

function drawPortals(portals: Array<Portal>, scene: Scene) {
    portals.forEach(portal => {
        let material = new THREE.LineBasicMaterial({color: 0x0000ff});
        portal.portalLines.forEach(line => {
            let geometry = new THREE.BufferGeometry().setFromPoints(line.points);
            let threeLine = new THREE.Line(geometry, material);
            threeLine.name = portal.id.toString();
            scene.add(threeLine);
        });
    })
}

function drawSections(sections: Array<Section>, scene: Scene) {
    sections.forEach(section => {
        let material = new THREE.LineBasicMaterial({color: 0xffff00});
        section.sectionLines.forEach(line => {
            let geometry = new THREE.BufferGeometry().setFromPoints(line.points);
            let threeLine = new THREE.Line(geometry, material);
            threeLine.name = line.id.toString();
            scene.add(threeLine);
        })
    })
}

function drawLines(lines: Array<Line>, scene: Scene) {
    lines.forEach(line => {
        let material = new THREE.LineBasicMaterial({color: 0xffff00});
        let geometry = new THREE.BufferGeometry().setFromPoints(line.points);
        let threeLine = new THREE.Line(geometry, material);
        threeLine.name = line.id.toString();
        scene.add(threeLine);
        })
}

function drawPipes(pipes: Array<Pipe>, scene: Scene, horizontalPortalLines: Line[], horizontalSectionLines: Line[], horizontalRandomLines: RandomLine[]) {
    pipes.forEach(pipe => {
        let startBeam = horizontalPortalLines.find(line => line.id === pipe.startBeam.lineId);
        if(startBeam === undefined) {
            startBeam = horizontalSectionLines.find(line => line.id === pipe.startBeam.lineId);
        }
        if(startBeam === undefined) {
            startBeam = horizontalRandomLines.find(line => line.id === pipe.startBeam.lineId);
        }
        let endBeam = horizontalPortalLines.find(line => line.id === pipe.endBeam.lineId);
        if(endBeam === undefined) {
            endBeam = horizontalSectionLines.find(line => line.id === pipe.endBeam.lineId);
        }
        if(endBeam === undefined) {
            endBeam = horizontalRandomLines.find(line => line.id === pipe.endBeam.lineId);
        }
        if(startBeam !== undefined && endBeam !== undefined) {
            let mesh: Mesh;
            switch(pipe.direction) {
                case "+x": {
                    if(startBeam.points[0].x > endBeam.points[0].x) {
                        mesh = drawPipeMesh(pipe, 0, 0, endBeam.points[0].x - startBeam.points[0].x);
                        moveMesh(mesh, endBeam.points[0].x + pipe.endBeam.coordinateX,
                            endBeam.points[0].y + pipe.endBeam.coordinateY, pipe.endBeam.coordinateZ);
                    } else {
                        mesh = drawPipeMesh(pipe, 0, 0, startBeam.points[0].x - endBeam.points[0].x);
                        moveMesh(mesh, startBeam.points[0].x + pipe.startBeam.coordinateX,
                            startBeam.points[0].y + pipe.startBeam.coordinateY, pipe.startBeam.coordinateZ);
                    }
                    mesh.rotateY(-Math.PI / 2);
                    scene.add(mesh);
                    break;
                }
                case "-x": {
                    if(endBeam.points[0].x < startBeam.points[0].x) {
                        mesh = drawPipeMesh(pipe, 0, 0, endBeam.points[0].x - startBeam.points[0].x);
                        moveMesh(mesh, startBeam.points[0].x + pipe.startBeam.coordinateX,
                            startBeam.points[0].y + pipe.startBeam.coordinateY, pipe.startBeam.coordinateZ);
                    } else {
                        mesh = drawPipeMesh(pipe, 0, 0, startBeam.points[0].x - endBeam.points[0].x);
                        moveMesh(mesh, endBeam.points[0].x + pipe.endBeam.coordinateX,
                            endBeam.points[0].y + pipe.endBeam.coordinateY, pipe.endBeam.coordinateZ);
                    }
                    mesh.rotateY(Math.PI / 2);
                    scene.add(mesh);
                    break;
                }
                case "+y": {
                    if(startBeam.points[0].y > endBeam.points[0].y) {
                        mesh = drawPipeMesh(pipe, 0, 0, startBeam.points[0].y - endBeam.points[0].y);
                        moveMesh(mesh, endBeam.points[0].x + pipe.endBeam.coordinateX,
                            endBeam.points[0].y + pipe.endBeam.coordinateY, endBeam.points[0].z + pipe.endBeam.coordinateZ);
                    } else {
                        mesh = drawPipeMesh(pipe, 0, 0, endBeam.points[0].y - startBeam.points[0].y);
                        moveMesh(mesh, startBeam.points[0].x + pipe.startBeam.coordinateX,
                            startBeam.points[0].y + pipe.startBeam.coordinateY, startBeam.points[0].z + pipe.startBeam.coordinateZ);
                    }
                    mesh.rotateX(-Math.PI / 2);
                    scene.add(mesh);
                    break;
                }
                case "-y": {
                    if(startBeam.points[0].y > endBeam.points[0].y) {
                        mesh = drawPipeMesh(pipe, 0, 0, startBeam.points[0].y - endBeam.points[0].y);
                        moveMesh(mesh, startBeam.points[0].x + pipe.startBeam.coordinateX,
                            startBeam.points[0].y + pipe.startBeam.coordinateY, pipe.startBeam.coordinateZ);
                    } else {
                        mesh = drawPipeMesh(pipe, 0, 0, endBeam.points[0].y - startBeam.points[0].y);
                        moveMesh(mesh, endBeam.points[0].x + pipe.endBeam.coordinateX,
                            endBeam.points[0].y + pipe.endBeam.coordinateY, pipe.endBeam.coordinateZ);
                    }
                    mesh.rotateX(Math.PI / 2);
                    scene.add(mesh);
                    break;
                }
                case "+z": {
                    if(startBeam.points[0].z > endBeam.points[0].z) {
                        mesh = drawPipeMesh(pipe, 0, 0, endBeam.points[0].z - startBeam.points[0].z);
                        moveMesh(mesh, startBeam.points[0].x + pipe.startBeam.coordinateX,
                            startBeam.points[0].y + pipe.startBeam.coordinateY, pipe.startBeam.coordinateZ);
                    } else {
                        mesh = drawPipeMesh(pipe, 0, 0, startBeam.points[0].z - endBeam.points[0].z);
                        moveMesh(mesh, endBeam.points[0].x + pipe.endBeam.coordinateX,
                            endBeam.points[0].y + pipe.endBeam.coordinateY, pipe.endBeam.coordinateZ);
                    }
                    scene.add(mesh);
                    break;
                }
                case "-z": {
                    if(startBeam.points[0].z > endBeam.points[0].z) {
                        mesh = drawPipeMesh(pipe, 0, 0, endBeam.points[0].z - startBeam.points[0].z);
                        moveMesh(mesh, endBeam.points[0].x + pipe.endBeam.coordinateX,
                            endBeam.points[0].y + pipe.endBeam.coordinateY, endBeam.points[0].z + pipe.endBeam.coordinateZ);
                    } else {
                        mesh = drawPipeMesh(pipe, 0, 0, startBeam.points[0].z - endBeam.points[0].z);
                        moveMesh(mesh, startBeam.points[0].x + pipe.startBeam.coordinateX,
                            startBeam.points[0].y + pipe.startBeam.coordinateY, startBeam.points[0].z + pipe.startBeam.coordinateZ);
                    }
                    scene.add(mesh);
                    break;
                }
            }
        }
    })
}

function moveMesh(mesh: Mesh, moveX: number, moveY: number, moveZ:number) {
    mesh.position.set(moveX, moveY, moveZ);
}

function drawPipeMesh(pipe: Pipe, shapeXCoordinate: number, shapeYCoordinate: number, meshDepth: number): Mesh {
    let arcShape = new THREE.Shape();
    arcShape.absarc(shapeXCoordinate, shapeYCoordinate, pipe.thickness, 0, Math.PI * 2, false);
    let holePath = new THREE.Path();
    holePath.absarc(shapeXCoordinate, shapeYCoordinate, pipe.outerDiameter, 0, Math.PI * 2, true);
    arcShape.holes.push(holePath);
    return new Mesh(new THREE.ExtrudeGeometry( arcShape, {
        steps : 1,
        bevelEnabled: false,
        curveSegments: 32,
        depth: meshDepth,
    }));
}

function GraphicsComponent() {
    const store = useStore<RootState, any>();
    const removedLineId = useSelector((state:RootState) => state.table.removedLineId);
    const portals = useSelector((state:RootState) => state.table.portals);
    const sections = useSelector((state: RootState) => state.table.sections);
    const lines = useSelector((state: RootState) => state.table.lines);
    const pipes = useSelector((state: RootState) => state.pipeModal.pipes);
    const horizontalPortalLines = useSelector((state: RootState) => state.table.portals.flatMap(portal => portal.portalLines)
        .filter(portalLine => portalLine.points[0].y === portalLine.points[1].y));
    const horizontalSectionLines = useSelector((state: RootState) => state.table.sections.flatMap(section => section.sectionLines)
        .filter(sectionLine => sectionLine.points[0].y === sectionLine.points[1].y));
    const horizontalRandomLines = useSelector((state: RootState) => state.table.lines).filter(randomLine =>
        randomLine.points[0].y === randomLine.points[1].y);
    let renderer = useMemo(() => {
        return new THREE.WebGLRenderer();
    }, []);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 0);
    let scene = useMemo(() => {
        return new THREE.Scene();
    }, []);
    if (removedLineId !== null) {
        store.dispatch(removePortal(removedLineId));
    }
    while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
    }
    let controls = new OrbitControls (camera, renderer.domElement);
    drawPortals(portals, scene);
    drawSections(sections, scene);
    drawLines(lines, scene);
    drawPipes(pipes, scene, horizontalPortalLines, horizontalSectionLines, horizontalRandomLines);
    let animate = function () {
        controls.update();
        requestAnimationFrame( animate );
        renderer.render(scene, camera);
    };

    animate();

    return (
        <div/>
    )
}

export default GraphicsComponent;