export default class Mox {

    public static createMock<T>(clazz: any): T {
        const mock: any = {};
        clazz = new clazz();
        const objProps = this.props(clazz);
        for (const member in objProps) {
            if (typeof clazz[objProps[member]] === "function") {
                mock[objProps[member]] = () => null;
            } else {
                mock[objProps[member]] = null;
            }
        }
        return mock as T;
    }

    private static props(obj: any): string[] {
        const p: string[] = [];
        for (; obj != null; obj = Object.getPrototypeOf(obj)) {
            const op = Object.getOwnPropertyNames(obj);
            op.forEach((element) => {
                if (p.indexOf(element) === -1) {
                    p.push(element);
                }
            });
        }
        return p;
    }

}