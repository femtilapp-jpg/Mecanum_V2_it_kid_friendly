namespace KSIR {
    //% block="koble IR mottaker til pin %pin"
    //% pin.defl=DigitalPin.P0
    //% weight=100
    export function connect(pin: DigitalPin): void {
        // Dette kaller den underliggende IR-utvidelsen
        IrRemote.connectIRReceiver(pin)
    }

    //% block="siste IR kode"
    //% weight=90
    export function lastCode(): number {
        return IrRemote.irButton()
    }

    //% block="når IR kode %code mottas"
    //% code.defl=1
    //% weight=80
    export function onCode(code: number, handler: () => void): void {
        control.inBackground(() => {
            let last = -1
            while (true) {
                const c = IrRemote.irButton()
                if (c !== 0 && c !== last) {
                    last = c
                    if (c === code) handler()
                }
                basic.pause(10)
            }
        })
    }
}
