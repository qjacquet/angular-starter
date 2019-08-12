export class DialogData {
    title  = '';
    message = '';
    showOKBtn = false;
    showCancelBtn = false;

    public constructor(init?: Partial<DialogData>) {
        Object.assign(this, init);
    }
}
