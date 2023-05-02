import { HttpClient, HttpHandler, HttpXhrBackend } from '@angular/common/http';
import { enableProdMode, Injector } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { retry } from 'rxjs/operators';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';






if (environment.production) {
    enableProdMode();
}

const injector = Injector.create({
    providers: [
        { provide: HttpClient, deps: [HttpHandler] },
        { provide: HttpHandler, useValue: new HttpXhrBackend({ build: () => new XMLHttpRequest() }) },
    ],
});

const httpClientInstance = injector.get(HttpClient);

function getApplicationConfig() {
    return this.get(`assets/config/${environment.configFilename}`);
}

getApplicationConfig
    .call(httpClientInstance).pipe(
        retry(3)
    )
    .subscribe(appConfig => {

        const configProvider = {
            provide: 'ApplicationConfig',
            useValue: appConfig
        };

        platformBrowserDynamic([configProvider]).bootstrapModule(AppModule);
    },
    err => console.log(err)
    );

let script: HTMLScriptElement;
script = document.createElement('script');
script.innerHTML = '(function (i, s, o, g, r, a, m) {\n' +
    '        i[\'GoogleAnalyticsObject\'] = r; i[r] = i[r] || function () {\n' +
    '            (i[r].q = i[r].q || []).push(arguments)\n' +
    '        }, i[r].l = 1 * new Date(); a = s.createElement(o),\n' +
    '            m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)\n' +
    '        })(window, document, \'script\', \'https://www.google-analytics.com/analytics.js\', \'ga\');\n' +
    '        ga(\'create\', \'UA-27405067-16\', \'auto\');\n';
document.body.appendChild(script);

// New Live Chat
script = document.createElement('script');
script.src = 'https://c.la1-c2-iad.salesforceliveagent.com/content/g/js/49.0/deployment.js';
document.body.appendChild(script);

script = document.createElement('script');
script.src = 'https://service.force.com/embeddedservice/2.0/esw.min.js';
document.body.appendChild(script);
