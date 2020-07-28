/* Copyright © 2020 Gatech-API - All Rights Reserved. Subject to terms of the PolyForm Noncommercial License. */

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

const BACKENDLESS_APPLICATION_ID: string = _verifyEnvironmentVariable("BACKENDLESS_APPLICATION_ID");

const BACKENDLESS_API_KEY: string = _verifyEnvironmentVariable("BACKENDLESS_API_KEY");

function EnableBackendless(target: any) {
    // save reference to the original constructor
    let original = target;

    // new constructor behaviour
    let f : any = function (...args: any[]) {
        Backendless.initApp(BACKENDLESS_APPLICATION_ID, BACKENDLESS_API_KEY);
        return new original(...args);
    }

    f.prototype = original.prototype;

    return f;
}

export { Backendless, EnableBackendless, BACKENDLESS_APPLICATION_ID, BACKENDLESS_API_KEY }
