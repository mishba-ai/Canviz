
export function createCanvas(parent) {
    const canvasContainer = document.createElement('div');
    canvasContainer.classList.add('flex-1', 'relative');

    const canvas = document.createElement('canvas');
    canvas.id = 'main-canvas';
    canvas.classList.add('absolute', 'inset-0', 'w-full', 'h-full', 'bg-red-400');

    canvasContainer.appendChild(canvas);
    parent.appendChild(canvasContainer);

    const setCanvasSize = () => {
        canvas.width = canvasContainer.offsetWidth;
        canvas.height = canvasContainer.offsetHeight;

    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    return canvas;

}