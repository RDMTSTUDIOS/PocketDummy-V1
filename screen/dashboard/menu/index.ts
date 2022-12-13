import style from "./style.module.css";
import DummyKernel from "../../../core/kernel";

export default class ScreenMenu {

    public static get node() {
        if (!this.instance) {
            new ScreenMenu();
        }
        return this.instance._component
    };

    private static instance: ScreenMenu;
    private _component!: HTMLElement;
    private static activeNode: HTMLElement;

    public display(root?: HTMLElement) {
        (root ? root : document.body).appendChild(this._component);
    };

    private static CONNECTION: {port: number, message(message: string, data?: string): void};

    constructor() {
        if (ScreenMenu.instance) { return ScreenMenu.instance };
        
        ScreenMenu.ConstructNodeFor(this);

        ScreenMenu.CONNECTION = DummyKernel.connectToPort(1, ScreenMenu);
        
        ScreenMenu.AddButtonsTo(this._component, ['Field', 'Potential', 'Miracle', 'Factor']);
        ScreenMenu.instance = this;
    };

    private static ConstructNodeFor(elem: ScreenMenu): void {
        elem._component = document.createElement('div');
        elem._component.className = style.component;
    };

    private static AddButtonsTo(node: HTMLElement, buttonLabels: string[]) {
        buttonLabels.forEach((value) => {
            node.appendChild(ScreenMenu.ConstructMenuButton(value));
        });
    };

    private static ConstructMenuButton(withText: string): HTMLElement {
        const button = document.createElement('div');
        button.insertAdjacentHTML('afterbegin', `<div>${withText}</div>`)
        button.className = style.menuButton;

        button.onclick = (): void => this.ToggleActiveButton(button);

        if (!this.activeNode) {
            ScreenMenu.ToggleActiveButton(button);
        }
        return button;
    };

    private static ToggleActiveButton(button: HTMLElement | null): void {
        
        if (this.activeNode !== button) {
            this.CONNECTION.message('MenuButtonSelected', button!.textContent!);
            if (this.activeNode) {
                this.activeNode.classList.toggle(style.active);
            };
            
            this.activeNode = button!;
            button?.classList.toggle(style.active);
        };
    };
}