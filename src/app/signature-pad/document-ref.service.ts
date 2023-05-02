/*
    http://juristr.com/blog/2016/09/ng2-get-window-ref/
 */
import { Injectable } from '@angular/core';

function getDocument(): any {
    // return the global native browser window object
    return document;
}

@Injectable()
export class DocumentRef {
    get nativeDocument(): any {
        return getDocument();
    }
}
