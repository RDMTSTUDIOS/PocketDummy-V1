
// ! ADD TO GIT !  
export default class DummyKernel {
    constructor() {
        throw new Error('Tried to get an instance of a KERNEL');
    };

    private static _dataBus: [any?][] = [];
    private static _numberOfPorts: number;
    private static _POWER: boolean = false;

    public static StartUp(numberOfPorts: IntRange<1, 10> = 4) {

        console.log('DummyKernel V1 StartUp called.')
        this._numberOfPorts = numberOfPorts;
        this.syslog(`number of ports is set to ${this._numberOfPorts}\n\nPort[0] - kernel calls.\nPort[1-${numberOfPorts-1}] - can be used.`);

        for (let i = 0; i < this._numberOfPorts ; ++i) {
            this._dataBus.push([]);
        };

        this.syslog(`databus size ${this._dataBus.length}`);

        this._POWER = !(this._POWER);
        console.log('\n\nDummyKernel V1 is now active.\n\n\n')
    };

    public static connectToPort(port: number, entity: any) {
        if ((port >= this._numberOfPorts) || (port === 0)) { throw new Error(`Unrechable port ${port}. Ports available ${1-this._numberOfPorts-1}`) }    
        this.cntlog(`${entity.name} has been connected to port ${port} manually.`);
        
        this._dataBus[port].push(entity);
        this._dataBus[0].push(entity);

        return {
            port: port,
            message(message: string, data?: string): void {
                if (port) {
                    DummyKernel.dispatch(port, message, data);
                };
            },
        }
    };

    private static dispatch(port: number, message: string, data?: string) {
        this._dataBus[port].forEach((value) => {
            
            try {
                value[message](data);
            } catch(e) {
            }
        });
    };

    private static syslog(message: string) {
        console.log(`\nDummyKernel\nSystem: ${message}\n\n`)
    };

    private static cntlog(message: string) {
        console.log(`\nDummyKernel\n\nConnection API: ${message}\n\n`)
    };

    private static log(message: string) {
        console.log(`\nDummyKernel\nLog: ${message}\n\n`)
    };

    public static Power() {
        this._POWER = !(this._POWER);
        this.dispatch(0, `${this._POWER ? 'PowerOn' : 'PowerOff'}`);
    };

};

type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>

type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>

