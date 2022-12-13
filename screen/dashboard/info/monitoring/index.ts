import DummyKernel from "../../../../core/kernel";
import style from "./style.module.css";

export default class ScreenMonitoring {
    public static get node() {
        if (!this.instance) {
            new ScreenMonitoring();
        }
        return this.instance._component
    }

    private static instance: ScreenMonitoring;
    private _component!: HTMLElement;

    private static CONNECTION: {port: number, message(message: string, data?: string): void};

    constructor() {
        if (ScreenMonitoring.instance) { return ScreenMonitoring.instance };
        
        ScreenMonitoring.ConstructNodeFor(this);
        ScreenMonitoring.CONNECTION = DummyKernel.connectToPort(1, ScreenMonitoring);
        ScreenMonitoring.ConstructInnerHTMLFor(this._component);
        this._component.insertAdjacentHTML('beforeend', `<div class=${style.Kb}>Kb</div>`)

        ScreenMonitoring.instance = this;
    };

    private static ConstructNodeFor(elem: ScreenMonitoring): void {
        elem._component = document.createElement('div');
        elem._component.className = style.component;
    };

    private static ConstructInnerHTMLFor(node: HTMLElement): void {
        node.append(
            ((): HTMLElement => {
                const memoryUsage = document.createElement('div');
                memoryUsage.className = style.memoryUsage;

                const base = 14;
                function CalculateMemUsage(): string {
                    const usage = (base + (Math.floor(Math.random() * 18)/100) * (Math.random() < 0.5 ? -1 : 1)).toString();
                    return `${usage.length === 5 ? usage : usage.length === 4 ? usage.concat('0') : usage.concat('.00')}`;
                };

                memoryUsage.textContent = CalculateMemUsage();
                setInterval(() => {
                    memoryUsage.textContent = CalculateMemUsage();
                }, 1600);

                return memoryUsage;
            })(),
            ((): HTMLElement => {
                const label = document.createElement('div');
                label.className = style.label;
                label.textContent = 'NETWORK SPEED';
                return label;
            })()
        );
    };
}