import DummyKernel from "../../../../core/kernel";
import style from "./style.module.css";

export default class ScreenDisplay {

    public static get node() {
        if (!this.instance) {
            new ScreenDisplay();
        }
        return this.instance._component
    }

    private static instance: ScreenDisplay;
    private _component!: HTMLElement;

    private static CONNECTION: {port: number, message(message: string, data?: string): void};

    constructor() {
        if (ScreenDisplay.instance) { return ScreenDisplay.instance };
        
        ScreenDisplay.ConstructNodeFor(this);
        ScreenDisplay.CONNECTION = DummyKernel.connectToPort(1, ScreenDisplay);
        ScreenDisplay.instance = this
    };

    private static ConstructNodeFor(elem: ScreenDisplay): void {
        elem._component = document.createElement('div');
        elem._component.className = style.component;
    };

    public static MenuButtonSelected(data: string) {
        const target = this.instance._component;
        switch(data) {
            case 'Field':
                target.textContent = '125.05 MH.Z';
                break;
            case 'Potential':
                target.textContent = 'NO DATA';
                break;
            case 'Miracle':
                target.textContent = 'Pipeline error. Fatal 06';
                break;
            case 'Factor':
                target.textContent = 'Pipeline error. Fatal 11';
                break;
            default:
                target.textContent = 'Unexpected data';
        }
    };

}

