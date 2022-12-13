import style from "./style.module.css"

export default class ScreenHeader {

    public display(root?: HTMLElement) {
        (root ? root : document.body).appendChild(this._component);
    }

    public static get node() {
        if (!this.instance) {
            new ScreenHeader();
        }
        return this.instance._component
    }
    
    private static instance: ScreenHeader;
    private _component: HTMLElement;
    
    constructor() {
        if(ScreenHeader.instance) { return ScreenHeader.instance };

        ScreenHeader.ConstructNodeFor(this);
        ScreenHeader.ConstructInnerHTMLFor(this._component);
        ScreenHeader.instance = this;
    }

    private static ConstructNodeFor(elem: ScreenHeader): void {
        elem._component = document.createElement('div');
        elem._component.className = style.component;
    };

    private static ConstructInnerHTMLFor(node: HTMLElement): void {
        node.append(
            // 1.
            (() => {
                const id = document.createElement('div');
                id.textContent = 'PCDM 200';
                id.className = style.id;
                return id
            })(),
            (() => {
                const battery = document.createElement('div');
                battery.className = style.battery;
                battery.innerHTML = `<div class=${style.charge}></div>`;
                return battery;
            })(),
            (() => {
                const clock = document.createElement('div');
                clock.className = style.clock;
                
                function TIME() {
                    const now = new Date();
                    clock.textContent = `${(now.getMinutes()<10?'0':'') + now.getMinutes()}:${(now.getSeconds()<10?'0':'') + now.getSeconds()}`;
                    requestAnimationFrame(TIME)
                };
                TIME()

                return clock
            })(),
        )
    };
}



// ! Chained Elements module !