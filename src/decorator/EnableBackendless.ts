import Backendless from 'backendless';
import process from "process";

function _verifyEnvironmentVariable(variable: string): string {
    let v: string | undefined = process.env[variable]
    if(v === undefined) {
        throw new Error(`${variable} not initialized.`);
    }
    else {
        return v;
    }
}

function EnableBackendless() {
    return (target: any) => {
        let original = target;

        // new constructor behaviour
        let f: any = (...args: any[]) => {
            Backendless.initApp(_verifyEnvironmentVariable("BACKENDLESS_APPLICATION_ID"), _verifyEnvironmentVariable("BACKENDLESS_API_KEY"));
            // @ts-ignore
            return original.apply(this, args);
        }

        // copy prototype so instanceof operator still works
        f.prototype = original.prototype;

        return f;
    };
}

export { Backendless, EnableBackendless }
