"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RNTwilioPhone = void 0;

var _reactNativeTwilioPhone = require("react-native-twilio-phone");

var _uuidRandom = _interopRequireDefault(require("uuid-random"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const defaultOptions = {
  requestPermissionsOnInit: false
}; // const CK_CONSTANTS = {
//   END_CALL_REASONS: {
//     FAILED: 1,
//     REMOTE_ENDED: 2,
//     UNANSWERED: 3,
//     ANSWERED_ELSEWHERE: 4,
//     DECLINED_ELSEWHERE: 5,
//     MISSED: 6,
//   },
// };

class RNTwilioPhone {
  // private static activeCall: Call | null = null;
  static initialize(callKeepOptions, fetchAccessToken, options = defaultOptions) {
    const unsubscribeCallKeep = RNTwilioPhone.initializeCallKeep(callKeepOptions, fetchAccessToken, options); // const unsubscribeRegisterAndroid = RNTwilioPhone.registerAndroid();
    // const unsubscribeRegisterIOS = RNTwilioPhone.registerIOS();

    return () => {
      unsubscribeCallKeep(); // unsubscribeRegisterAndroid();
      // unsubscribeRegisterIOS();
    };
  }

  static initializeCallKeep(callKeepOptions, fetchAccessToken, options = defaultOptions) {
    // const { requestPermissionsOnInit } = options;
    console.log(callKeepOptions, options);
    RNTwilioPhone.fetchAccessToken = fetchAccessToken; // if (Platform.OS === 'ios' || requestPermissionsOnInit) {
    //   RNCallKeep.setup(callKeepOptions)
    //     .then(() => {
    //       RNCallKeep.setAvailable(true);
    //     })
    //     .catch((e) => console.log(e));
    // } else {
    //   RNCallKeep.registerPhoneAccount();
    //   RNCallKeep.registerAndroidEvents();
    //   RNCallKeep.setAvailable(true);
    // }

    const unsubscribeTwilioPhone = RNTwilioPhone.listenTwilioPhone(); // const unsubscribeCallKeep = RNTwilioPhone.listenCallKeep();

    return () => {
      unsubscribeTwilioPhone(); // unsubscribeCallKeep();
    };
  }

  static handleBackgroundState() {//   if (Platform.OS !== 'android') {
    //     return;
    //   }
    //   messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    //     if (!remoteMessage.data) {
    //       return;
    //     }
    //     RNCallKeep.registerPhoneAccount();
    //     RNCallKeep.registerAndroidEvents();
    //     RNCallKeep.setAvailable(true);
    //     RNTwilioPhone.listenTwilioPhone();
    //     RNTwilioPhone.listenCallKeep();
    //     TwilioPhone.handleMessage(remoteMessage.data);
    //   });
  }

  static async startCall(options) {
    const accessToken = await RNTwilioPhone.fetchAccessToken(); // const params: ConnectParams = { ...options };
    // if (from) {
    //   params.from = from;
    // }
    // console.log('access token is', accessToken)
    // console.log('options are', options)

    _reactNativeTwilioPhone.TwilioPhone.startCall(accessToken, options);

    const uuid = (0, _uuidRandom.default)().toLowerCase(); // RNTwilioPhone.activeCall = { uuid: uuid, sid: null };

    RNTwilioPhone.calls = [{
      uuid,
      sid: ''
    }]; // RNCallKeep.startCall(uuid, options.to, options.calleeName, 'generic', false);
  }

  static async unregister() {
    if (!RNTwilioPhone.deviceToken) {
      return;
    }

    const accessToken = await RNTwilioPhone.fetchAccessToken();

    _reactNativeTwilioPhone.TwilioPhone.unregister(accessToken, RNTwilioPhone.deviceToken);
  } // private static registerAndroid() {
  //   if (Platform.OS !== 'android') {
  //     return () => {};
  //   }
  // messaging()
  //   .getToken()
  //   .then(RNTwilioPhone.registerTwilioPhone)
  //   .catch((e) => console.log(e));
  // Listen to whether the token changes
  // const unsubscribeTokenRefresh = messaging().onTokenRefresh(
  //   RNTwilioPhone.registerTwilioPhone
  // );
  // const unsubscribeMessage = messaging().onMessage((remoteMessage) => {
  //   if (remoteMessage.data) {
  //     TwilioPhone.handleMessage(remoteMessage.data);
  //   }
  // });
  // return () => {
  //   unsubscribeTokenRefresh();
  //   unsubscribeMessage();
  // };
  // }
  // private static registerIOS() {
  //   if (Platform.OS !== 'ios') {
  //     return () => {};
  //   }
  // VoipPushNotification.registerVoipToken();
  // VoipPushNotification.addEventListener(
  //   'register',
  //   RNTwilioPhone.registerTwilioPhone
  // );
  // VoipPushNotification.addEventListener(
  //   'notification',
  //   (notification: any) => {
  //     delete notification.aps;
  //     TwilioPhone.handleMessage(notification);
  //   }
  // );
  // return () => {
  //   VoipPushNotification.removeEventListener('register');
  //   VoipPushNotification.removeEventListener('notification');
  // };
  // }


  static listenTwilioPhone() {
    RNTwilioPhone.removeTwilioPhoneListeners();
    const subscriptions = [// twilioPhoneEmitter.addListener(
    //   EventType.CallInvite,
    //   ({ callSid, from }) => {
    //     // Incoming call is already reported to CallKit on iOS
    //     if (Platform.OS === 'android') {
    //       const uuid = ramdomUuid().toLowerCase();
    //       RNTwilioPhone.addCall({ uuid, sid: callSid });
    //       RNCallKeep.displayIncomingCall(uuid, from);
    //     }
    //   }
    // ),
    // twilioPhoneEmitter.addListener(
    //   EventType.CancelledCallInvite,
    //   ({ callSid }) => {
    //     const uuid = RNTwilioPhone.getCallUUID(callSid);
    //     if (uuid) {
    //       RNCallKeep.reportEndCallWithUUID(
    //         uuid,
    //         CK_CONSTANTS.END_CALL_REASONS.MISSED
    //       );
    //       RNTwilioPhone.removeCall(uuid);
    //     }
    //   }
    // ),
    // twilioPhoneEmitter.addListener(EventType.CallRinging, ({ callSid }) => {
    //   if (RNTwilioPhone.activeCall) {
    //     RNTwilioPhone.activeCall.sid = callSid;
    //     if (RNTwilioPhone.activeCall.uuid) {
    //       RNTwilioPhone.addCall(RNTwilioPhone.activeCall);
    //       RNTwilioPhone.activeCall = null;
    //     }
    //   }
    // }),
    _reactNativeTwilioPhone.twilioPhoneEmitter.addListener(_reactNativeTwilioPhone.EventType.CallConnected, ({
      callSid
    }) => {
      console.log(callSid); // const uuid = RNTwilioPhone.getCallUUID(callSid);
      // uuid && RNCallKeep.setCurrentCallActive(uuid);
    }), _reactNativeTwilioPhone.twilioPhoneEmitter.addListener(_reactNativeTwilioPhone.EventType.CallDisconnected, ({
      callSid
    }) => {
      const uuid = RNTwilioPhone.getCallUUID(callSid);

      if (uuid) {
        // RNCallKeep.reportEndCallWithUUID(
        //   uuid,
        //   CK_CONSTANTS.END_CALL_REASONS.REMOTE_ENDED
        // );
        RNTwilioPhone.removeCall(uuid);
      }
    }), _reactNativeTwilioPhone.twilioPhoneEmitter.addListener(_reactNativeTwilioPhone.EventType.CallDisconnectedError, ({
      callSid
    }) => {
      const uuid = RNTwilioPhone.getCallUUID(callSid);

      if (uuid) {
        // RNCallKeep.reportEndCallWithUUID(
        //   uuid,
        //   CK_CONSTANTS.END_CALL_REASONS.FAILED
        // );
        RNTwilioPhone.removeCall(uuid);
      }
    })];
    return () => {
      subscriptions.map(subscription => {
        subscription.remove();
      });
    };
  } // private static listenCallKeep() {
  //   RNTwilioPhone.removeCallKeepListeners();
  //   if (Platform.OS === 'ios') {
  //     RNCallKeep.addEventListener(
  //       'didDisplayIncomingCall',
  //       ({ callUUID, payload }) => {
  //         RNTwilioPhone.addCall({ uuid: callUUID, sid: payload.twi_call_sid });
  //       }
  //     );
  //     RNCallKeep.addEventListener('didResetProvider', () => {
  //       TwilioPhone.deactivateAudio();
  //     });
  //     RNCallKeep.addEventListener('didActivateAudioSession', () => {
  //       TwilioPhone.activateAudio();
  //     });
  //     RNCallKeep.addEventListener('didDeactivateAudioSession', () => {
  //       TwilioPhone.deactivateAudio();
  //     });
  //   }
  //   RNCallKeep.addEventListener('didReceiveStartCallAction', ({ callUUID }) => {
  //     if (RNTwilioPhone.activeCall) {
  //       RNTwilioPhone.activeCall.uuid = callUUID;
  //       if (RNTwilioPhone.activeCall.sid) {
  //         RNTwilioPhone.addCall(RNTwilioPhone.activeCall);
  //         RNTwilioPhone.activeCall = null;
  //       }
  //     }
  //   });
  //   // RNCallKeep.addEventListener('answerCall', ({ callUUID }) => {
  //   //   const sid = RNTwilioPhone.getCallSid(callUUID);
  //   //   sid && TwilioPhone.acceptCallInvite(sid);
  //   // });
  //   RNCallKeep.addEventListener('endCall', ({ callUUID }) => {
  //     const sid = RNTwilioPhone.getCallSid(callUUID);
  //     sid && TwilioPhone.endCall(sid);
  //     RNTwilioPhone.removeCall(callUUID);
  //   });
  //   RNCallKeep.addEventListener(
  //     'didPerformSetMutedCallAction',
  //     ({ callUUID, muted }) => {
  //       const sid = RNTwilioPhone.getCallSid(callUUID);
  //       sid && TwilioPhone.toggleMuteCall(sid, muted);
  //     }
  //   );
  //   RNCallKeep.addEventListener(
  //     'didToggleHoldCallAction',
  //     ({ callUUID, hold }) => {
  //       const sid = RNTwilioPhone.getCallSid(callUUID);
  //       sid && TwilioPhone.toggleHoldCall(sid, hold);
  //     }
  //   );
  //   RNCallKeep.addEventListener(
  //     'didPerformDTMFAction',
  //     ({ callUUID, digits }) => {
  //       const sid = RNTwilioPhone.getCallSid(callUUID);
  //       sid && TwilioPhone.sendDigits(sid, digits);
  //     }
  //   );
  //   return () => {
  //     RNTwilioPhone.removeCallKeepListeners();
  //   };
  // }


  static removeTwilioPhoneListeners() {
    _reactNativeTwilioPhone.twilioPhoneEmitter.removeAllListeners(_reactNativeTwilioPhone.EventType.CallInvite);

    _reactNativeTwilioPhone.twilioPhoneEmitter.removeAllListeners(_reactNativeTwilioPhone.EventType.CancelledCallInvite);

    _reactNativeTwilioPhone.twilioPhoneEmitter.removeAllListeners(_reactNativeTwilioPhone.EventType.CallRinging);

    _reactNativeTwilioPhone.twilioPhoneEmitter.removeAllListeners(_reactNativeTwilioPhone.EventType.CallConnected);

    _reactNativeTwilioPhone.twilioPhoneEmitter.removeAllListeners(_reactNativeTwilioPhone.EventType.CallDisconnected);

    _reactNativeTwilioPhone.twilioPhoneEmitter.removeAllListeners(_reactNativeTwilioPhone.EventType.CallDisconnectedError);
  } // private static removeCallKeepListeners() {
  //   if (Platform.OS === 'ios') {
  //     RNCallKeep.removeEventListener('didDisplayIncomingCall');
  //     RNCallKeep.removeEventListener('didResetProvider');
  //     RNCallKeep.removeEventListener('didActivateAudioSession');
  //     RNCallKeep.removeEventListener('didDeactivateAudioSession');
  //   }
  //   RNCallKeep.removeEventListener('didReceiveStartCallAction');
  //   RNCallKeep.removeEventListener('answerCall');
  //   RNCallKeep.removeEventListener('endCall');
  //   RNCallKeep.removeEventListener('didPerformSetMutedCallAction');
  //   RNCallKeep.removeEventListener('didToggleHoldCallAction');
  //   RNCallKeep.removeEventListener('didPerformDTMFAction');
  // }
  // private static async registerTwilioPhone(deviceToken: string) {
  //   try {
  //     const accessToken = await RNTwilioPhone.fetchAccessToken();
  //     TwilioPhone.register(accessToken, deviceToken);
  //     RNTwilioPhone.deviceToken = deviceToken;
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
  // private static addCall(call: Call) {
  //   RNTwilioPhone.calls.push(call);
  // }


  static removeCall(uuid) {
    let index = -1;

    for (let i = 0; i < RNTwilioPhone.calls.length; i++) {
      if (RNTwilioPhone.calls[i].uuid === uuid) {
        index = i;
        break;
      }
    }

    if (index > -1) {
      RNTwilioPhone.calls.splice(index, 1);
    }
  }

  static getCallUUID(sid) {
    for (const call of RNTwilioPhone.calls) {
      if (call.sid === sid) {
        return call.uuid;
      }
    }

    return null;
  } // private static getCallSid(uuid: string) {
  //   for (const call of RNTwilioPhone.calls) {
  //     if (call.uuid === uuid) {
  //       return call.sid;
  //     }
  //   }
  //   return null;
  // }


}

exports.RNTwilioPhone = RNTwilioPhone;

_defineProperty(RNTwilioPhone, "calls", []);

_defineProperty(RNTwilioPhone, "fetchAccessToken", void 0);

_defineProperty(RNTwilioPhone, "deviceToken", null);
//# sourceMappingURL=RNTwilioPhone.js.map