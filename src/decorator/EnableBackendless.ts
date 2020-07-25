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

function EnableBackendless(target: any) {
    // save reference to the original constructor
    var original = target;

    // new constructor behaviour
    var f : any = function (...args: any[]) {
        Backendless.initApp(_verifyEnvironmentVariable("BACKENDLESS_APPLICATION_ID"), _verifyEnvironmentVariable("BACKENDLESS_API_KEY"));
        return new original(...args);
    }

    f.prototype = original.prototype;

    return f;
}

export { Backendless, EnableBackendless }
