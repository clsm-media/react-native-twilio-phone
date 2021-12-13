import { NativeEventEmitter } from 'react-native';
import { RNTwilioPhone } from './RNTwilioPhone';
export declare enum PermissionName {
    Record = "RECORD",
    RecordAudio = "RECORD_AUDIO",
    CallPhone = "CALL_PHONE"
}
export declare enum PermissionStatus {
    Granted = "GRANTED",
    Denied = "DENIED",
    Undetermined = "UNDETERMINED",
    Unknown = "UNKNOWN"
}
export declare type MessagePayload = Record<string, string>;
export declare type ConnectParams = Record<string, string>;
export declare type Permissions = Record<PermissionName, PermissionStatus>;
declare type TwilioPhoneType = {
    register(accessToken: string, deviceToken: string): void;
    handleMessage(payload: MessagePayload): void;
    acceptCallInvite(callSid: string): void;
    rejectCallInvite(callSid: string): void;
    disconnectCall(callSid: string): void;
    endCall(callSid: string): void;
    toggleMuteCall(callSid: string, mute: boolean): void;
    toggleHoldCall(callSid: string, hold: boolean): void;
    toggleSpeaker(speakerOn: boolean): void;
    sendDigits(callSid: string, digits: string): void;
    startCall(accessToken: string, params: ConnectParams): void;
    unregister(accessToken: string, deviceToken: string): void;
    activateAudio(): void;
    deactivateAudio(): void;
    checkPermissions(callback: (permissions: Permissions) => void): void;
    requestPermissionIOS(callback: (status: PermissionStatus) => void): void;
};
declare const TwilioPhone: TwilioPhoneType;
declare const twilioPhoneEmitter: NativeEventEmitter;
export { RNTwilioPhone, TwilioPhone, twilioPhoneEmitter };
export declare enum EventType {
    CallInvite = "CallInvite",
    CancelledCallInvite = "CancelledCallInvite",
    CallRinging = "CallRinging",
    CallConnectFailure = "CallConnectFailure",
    CallConnected = "CallConnected",
    CallReconnecting = "CallReconnecting",
    CallReconnected = "CallReconnected",
    CallDisconnected = "CallDisconnected",
    CallDisconnectedError = "CallDisconnectedError",
    RegistrationSuccess = "RegistrationSuccess",
    RegistrationFailure = "RegistrationFailure",
    UnregistrationSuccess = "UnregistrationSuccess",
    UnregistrationFailure = "UnregistrationFailure"
}
