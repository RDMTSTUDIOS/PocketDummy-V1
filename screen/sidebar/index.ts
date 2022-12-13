import style from "./style.module.css";

export default class ScreenSidebar {

    public static get node() {
        if (!this.instance) {
            new ScreenSidebar();
        }
        return this.instance._component
    };

    private static instance: ScreenSidebar;
    private _component!: HTMLElement;
    private static activeNode: HTMLElement;

    public display(root?: HTMLElement) {
        (root ? root : document.body).appendChild(this._component);
    };

    constructor() {
        if (ScreenSidebar.instance) { return ScreenSidebar.instance };
        
        ScreenSidebar.ConstructNodeFor(this);
        ScreenSidebar.ConstructorInnerHTMLFor(this._component)
        ScreenSidebar.instance = this;
    };

    private static ConstructNodeFor(elem: ScreenSidebar): void {
        elem._component = document.createElement('div');
        elem._component.className = style.component;
    };

    private static ConstructorInnerHTMLFor(node: HTMLElement): void {

        node.append(
            ((): HTMLElement => {
                const top_block: HTMLElement = document.createElement('div');
                top_block.className = style.top_block;
                return top_block
            })(),
            ((): HTMLElement => {
                const bottom_block: HTMLElement = document.createElement('div');
                bottom_block.className = style.bottom_block;
                return bottom_block
            })(),
        )
    };  
}