import style from "./style.module.css"

export default function AddAnalogEffect(toNode: HTMLElement): void {
    toNode.append(
        ((): HTMLElement => {
            const grid = document.createElement('div');
            grid.className = style.grid;
            return grid
        })(),
        // ((): HTMLElement => {
        //    const bg = document.createElement('div');
        //    bg.className = style.bg;
        //    return bg
        // })()
    );
}
