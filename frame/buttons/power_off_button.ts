import DummyKernel from "../../core/kernel";
import style from "./style.module.css";

export default class power_off_button {

    public static get node() {
        if (!this.instance) {
            new power_off_button();
        }
        return this.instance._component
    };

    private static instance: power_off_button;
    private _component!: HTMLElement;

    public display(root?: HTMLElement) {
        (root ? root : document.body).appendChild(this._component);
    };

    private static CONNECTION: {port: number, message(message: string, data?: string): void};

    constructor() {
        if (power_off_button.instance) { return power_off_button.instance };
        
        power_off_button.ConstructNodeFor(this);

        power_off_button.CONNECTION = DummyKernel.connectToPort(2, power_off_button);
        
        power_off_button.instance = this;
        power_off_button.AddPowerOffEvent();
    };


    private static ConstructNodeFor(elem: power_off_button): void {
        elem._component = document.createElement('div');
        elem._component.className = style.component;
    };

    private static AddPowerOffEvent(): void {
        this.instance._component.onclick = () => {
            DummyKernel.Power();
            this.instance._component.style.pointerEvents = 'none';
            setTimeout(()=>{
                this.instance._component.style.pointerEvents = '';
            }, 300)
        };
    };
}