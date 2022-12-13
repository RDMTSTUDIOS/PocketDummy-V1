import style from "./style.module.css";

import ScreenHeader from "./header";
import ScreenMenu from "./dashboard/menu"
import ScreenInfo from "./dashboard/info";
import ScreenSidebar from "./sidebar";

import AddAnalogEffect from "../effects";
import DummyKernel from "../core/kernel";

import gsap from "gsap";

export default class Screen {

    public static display(root?: HTMLElement) {
        if (!this.instance) {
            new Screen();
        };
        (root ? root : document.body).appendChild(this.instance._component);
    }

    public static get node() {
        return (new this)._component
    };

    private static CONNECTION: {port: number, message(message: string, data?: string): void};

    private static instance: Screen;
    private _component: HTMLElement;
    private _screenContent: HTMLElement;

    constructor() {
        if (Screen.instance) { return Screen.instance };

        Screen.ConstructNodeFor(this);
        
        {
            this._screenContent = document.createElement('div')
            this._screenContent.className = style.screenContent;
        };

        Screen.CONNECTION = DummyKernel.connectToPort(2, Screen);

        const main_field: HTMLElement = document.createElement('div');
        main_field.className = style.main_field;
        
        {
            const left_side: HTMLElement = document.createElement('div');
            left_side.className = style.left_side;
            left_side.append( ScreenInfo.node, ScreenMenu.node );``
            main_field.append( left_side, ScreenSidebar.node );
        };

        this._screenContent.append( ScreenHeader.node, main_field );
        this._component.appendChild(this._screenContent);

        AddAnalogEffect(this._component);

        Screen.instance = this;
    };

    private static ConstructNodeFor(elem: Screen): void {
        elem._component = document.createElement('div');
        elem._component.className = style.component;
    };

    private static CurrentAnimation?: GSAPAnimation;

    private static PowerOffAnimation() {
        if (this.CurrentAnimation) {
            this.CurrentAnimation.kill();
        };
        const target = this.instance._screenContent;
        const animation = gsap.timeline();
        this.CurrentAnimation = animation;
        
        animation.to(target, {
            pointerEvents: 'none',
            duration: '0',
        });
        animation.to(target, {
            opacity: '0',
            duration: '0.1',
            ease: 'steps(10)',
        });
        this.CurrentAnimation = undefined;
    };

    private static PowerOnAnimation() {
         if (this.CurrentAnimation) {
            this.CurrentAnimation.kill();
        };
        const target = this.instance._screenContent;
        const animation = gsap.timeline();
        animation.to(target, {
            opacity: '1',
            duration: '0.1',
            ease: 'steps(10)',
        });
        animation.to(target, {
            pointerEvents: '',
            duration: '0',
        });
        this.CurrentAnimation = undefined;
        
    };

    public static PowerOff() {
       this.PowerOffAnimation();
    };

    public static PowerOn() {
        this.PowerOnAnimation();
    };
};
