export declare type RNTwilioPhoneOptions = {
    requestPermissionsOnInit: boolean;
};
declare type Call = {
    uuid: string | null;
    sid: string | null;
};
declare type TwilioOptions = {
    to: string;
    from: string;
    calleeName: string;
    record: string;
    callLogId: string;
    api_token: string;
};
declare class RNTwilioPhone {
    static calls: Call[];
    private static fetchAccessToken;
    private static deviceToken;
    static initialize(callKeepOptions: {}, fetchAccessToken: () => Promise<string>, options?: RNTwilioPhoneOptions): () => void;
    static initializeCallKeep(callKeepOptions: {}, fetchAccessToken: () => Promise<string>, options?: RNTwilioPhoneOptions): () => void;
    static handleBackgroundState(): void;
    static startCall(options: TwilioOptions): Promise<void>;
    static unregister(): Promise<void>;
    private static listenTwilioPhone;
    private static removeTwilioPhoneListeners;
    private static removeCall;
    private static getCallUUID;
}
export { RNTwilioPhone };
