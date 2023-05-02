/*
    http://juristr.com/blog/2016/09/ng2-get-window-ref/
 */
import { Injectable } from '@angular/core';

function getWindow(): any {
    // return the global native browser window object
    return window;
}

@Injectable()
export class WindowRef {
    get nativeWindow(): any {
        return getWindow();
    }
}
