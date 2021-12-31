export class KeyboardListener
{
    private _isControlPressed: boolean = false;

    public init(): void
    {
        document.addEventListener('keydown', event => {
            if (event.code === 'ControlLeft') {
                this._isControlPressed = true;
            }
        });

        document.addEventListener('keyup', event => {
            if (event.code === 'ControlLeft') {
                this._isControlPressed = false;
            }
        });
    }

    public get isControlPressed(): boolean
    {
        return this._isControlPressed;
    }
}