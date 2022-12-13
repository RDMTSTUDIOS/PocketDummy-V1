import style from "./style.module.css";

import Frame from "./frame";
import Screen from "./screen";
import DummyKernel from "./core/kernel";
import power_off_button from "./frame/buttons/power_off_button";

export default class PocketDummyV1 {

    public static Display(mountTo?: HTMLElement) {
        (mountTo ? mountTo : document.body).appendChild((new this)._component)
    };

    public static get node() {
        return (new this)._component
    };

    private static instance: PocketDummyV1;
    private _component!: HTMLElement;

    constructor() {
        if (PocketDummyV1.instance) { return PocketDummyV1.instance };

        DummyKernel.StartUp(6);

        PocketDummyV1.ConstructNodeFor(this);
        PocketDummyV1.AssembleComponentsFor(this);
        PocketDummyV1.ConnectPowerOffButton(this);
        PocketDummyV1.instance = this;
    };

    private static ConstructNodeFor(elem: PocketDummyV1): void {
        elem._component = document.createElement('div');
        elem._component.className = style.component;
    };

    private static AssembleComponentsFor(elem: PocketDummyV1): void {
        elem._component.append(Frame.node, Screen.node);
    };

    private static ConnectPowerOffButton(elem: PocketDummyV1) {
        elem._component.appendChild(power_off_button.node);
    };
}