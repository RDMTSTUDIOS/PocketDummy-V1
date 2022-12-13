import style from "./style.module.css";
import frame_image from "./source/DummyFrame.png";
import DummyKernel from "../core/kernel";

export default class Frame {

    public static get node() {
        if (!this.instance) {
            new Frame();
        }
        return this.instance._component
    }

    private static CONNECTION;

    private static instance: Frame;
    private _component!: HTMLImageElement;

    constructor() {
        if (Frame.instance) { return Frame.instance };
        
        Frame.ConstructNodeFor(this);
        Frame.CONNECTION = DummyKernel.connectToPort(2, Frame);
        this._component.classList.add(style.background);
        Frame.instance = this
    };

    private static ConstructNodeFor(elem: Frame): void {
        elem._component = new Image();
        elem._component.className = style.component;
        elem._component.src = frame_image;
    };

    public static Display(root: HTMLElement) {
        (root ? root : document.body).appendChild(this.instance._component);
    };

    public static PowerOff() {
        this.instance._component.classList.remove(style.background);
    };

    public static PowerOn() {
        this.instance._component.classList.add(style.background);
    };
}