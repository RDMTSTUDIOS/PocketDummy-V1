import style from "./style.module.css";

import ScreenDisplay from "./display";
import ScreenMonitoring from "./monitoring";

export default class ScreenInfo {
    
    public static display(root?: HTMLElement) {
        if (!this.instance) {
            new ScreenInfo();
        }
        (root ? root : document.body).appendChild(this.instance._component);
    }

    public static get node() {
        if (!this.instance) {
            new ScreenInfo();
        }
        return this.instance._component
    };

    private static instance: ScreenInfo;
    private _component: HTMLElement;

    constructor() {
        if (ScreenInfo.instance) { return ScreenInfo.instance };

        ScreenInfo.ConstructNodeFor(this);
        
        this._component.append( ScreenMonitoring.node, ScreenDisplay.node );
        ScreenInfo.instance = this;
    };

    private static ConstructNodeFor(elem: ScreenInfo): void {
        elem._component = document.createElement('div');
        elem._component.className = style.component;
    };
}
