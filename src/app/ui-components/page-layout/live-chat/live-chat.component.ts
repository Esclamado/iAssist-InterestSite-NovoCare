import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-live-chat',
    templateUrl: './live-chat.component.html',
    styleUrls: ['./live-chat.component.scss']
})
export class LiveChatComponent implements OnInit, OnDestroy {
    @Input() public chatLabel: any;
    private readonly ieChatId = 'esw_button_online';
    private readonly goodBrowsersChatIdOnline = 'liveagent_button_online_5730H000000fxWT';
    private readonly goodBrowsersChatIdOffline = 'liveagent_button_offline_5730H000000fxWT';
    private readonly liveAgentId = '5730H000000fxWT';

    private readonly chatOptions = {
        maxRetries: 20,
        retryMilliSecond: 300
    };

    private unsubscribe$ = new Subject<void>();

    constructor() { }

    ngOnInit(): void {
        let chatInterval;
        let retryCount = 0;

        chatInterval = setInterval(
            (chatOptions) => {
                if (window.liveagent) {
                    clearInterval(chatInterval);
                    window.liveagent.init('https://d.la1-c2-iad.salesforceliveagent.com/chat', '5720H000000fxSQ', '00Di0000000b16R');
                    this.runBrowserSpecificChat();
                } else {
                    retryCount += 1;

                    if (retryCount > chatOptions.maxRetries) {
                        clearInterval(chatInterval);
                        console.log('Unable to setup Chat');
                    }
                }
            },
            this.chatOptions.retryMilliSecond,
            this.chatOptions
        );
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
    }

    public runBrowserSpecificChat(): void {
        if (!window._laq) {
            window._laq = [];
        }

        window._laq.push(() => {
            window.liveagent.showWhenOnline(this.liveAgentId, document.getElementById(this.goodBrowsersChatIdOnline));
            window.liveagent.showWhenOffline(this.liveAgentId, document.getElementById(this.goodBrowsersChatIdOffline));
        });
    }

    public startChat(): void {
        const liveagent = window.liveagent;

        if (liveagent && this.liveAgentId) {
            this.toggleChat();
            liveagent.startChatWithWindow(this.liveAgentId, 'chat-window');
        } else {
            console.log('Cannot start Chat');
        }
    }

    openChat(): void {
        let chatElementId: string;
        let chatElement: HTMLElement;

        const userAgent = window.navigator.userAgent;
        const isIE = userAgent.match(/MSIE 10/i) || userAgent.match(/11.0/i);

        chatElementId = isIE ? this.ieChatId : this.goodBrowsersChatIdOnline;

        chatElement = document.getElementById(chatElementId) as HTMLElement;

        if (!chatElement) {
            console.error('Unable to open live chat. Unable to find the chat element in the HTML body. Check if chat is off-line.');
            return;
        }

        chatElement.click();
    }

    public toggleChat(): void {
        const chatWindow = document.getElementById('chat-window-wrapper');
        const chatBtn = document.getElementById('liveagent_wrapper');
        const chatDisplay = chatWindow.style.display;
        const chatState = chatDisplay === 'none';

        if (!(chatWindow && chatBtn)) {
            console.log('Cannot Show or Hide Chat');
        }

        chatWindow.style.display = chatState ? 'block' : 'none';
        chatBtn.style.left = chatState ? '-999px' : 'auto';
        chatBtn.style.display = chatState ? 'none' : 'block';
    }
}

export { };
declare global {
    interface Window {
        _laq: any;
        liveagent: any;
    }
}

