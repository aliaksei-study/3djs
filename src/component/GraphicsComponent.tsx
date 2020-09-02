import React, {useMemo} from 'react';
import * as THREE from "three";
import {Scene} from "three";
import {useSelector, useStore} from "react-redux";
import {Line, Portal, removePortal, Section} from "../reducer/tableReducer";
import {RootState} from "../store/store";

function drawPortals(portals: Array<Portal>, scene: Scene) {
    portals.forEach(portal => {
        let material = new THREE.LineBasicMaterial({color: 0x0000ff});
        portal.portalLines.forEach(line => {
            let geometry = new THREE.BufferGeometry().setFromPoints(line.points);
            let threeLine = new THREE.Line(geometry, material);
            threeLine.name = portal.id.toString();
            threeLine.rotation.y += 0.7;
            threeLine.rotation.x += 0.7;
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
            threeLine.rotation.y += 0.7;
            threeLine.rotation.x += 0.7;
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
        threeLine.rotation.y += 0.7;
        threeLine.rotation.x += 0.7;
        scene.add(threeLine);
        })
}

function printPortalsAndSections(portals: Array<Portal>, sections: Array<Section>) {
    console.log(Array.from(portals.map(portal => portal.portalLines)
        .concat(Array.from(sections.map(section => section.sectionLines)))));
}


function GraphicsComponent() {
    const store = useStore<RootState, any>();
    const removedLineId = useSelector((state:RootState) => state.table.removedLineId);
    const portals = useSelector((state:RootState) => state.table.portals);
    const sections = useSelector((state: RootState) => state.table.sections);
    const lines = useSelector((state: RootState) => state.table.lines);
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
    drawPortals(portals, scene);
    drawSections(sections, scene);
    drawLines(lines, scene);
    printPortalsAndSections(portals, sections);
    let animate = function () {
        renderer.render(scene, camera);
    };
    animate();

    return (
        <div/>
    )
}

export default GraphicsComponent;