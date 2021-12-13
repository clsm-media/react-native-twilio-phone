# React Native Twilio Phone

![GitHub release (latest by date)](https://img.shields.io/github/v/release/MrHertal/react-native-twilio-phone)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/MrHertal/react-native-twilio-phone/Node.js%20CI)

This module allows you to add voice-over-IP (VoIP) calling into your React Native app using [Twilio Programmable Voice](https://www.twilio.com/docs/voice).

Supported versions:

- iOS 13+
- Android API 26+

Android call to iOS:

![Android outgoing call](docs/images/android-outgoing-call.jpg)

iOS call to Android:

![iOS outgoing call](docs/images/ios-outgoing-call.png)

### Twilio server-side web application

Follow the Twilio Voice [iOS SDK Quickstart](https://www.twilio.com/docs/api/voice-sdk/ios/getting-started) and [Android SDK Quickstart](https://www.twilio.com/docs/api/voice-sdk/android/getting-started).

Steps 1 and 6 must be skipped.

## Installation

Now come the easy part :)

```sh
npm install react-native-twilio-phone
```

### iOS

Run this command to complete installation on iOS:

```sh
cd ios/ && pod install
```

You must also create a Swift file like [this one](https://github.com/MrHertal/react-native-twilio-phone/blob/master/example/ios/File.swift) in the `/ios` folder. If you don't have such a file, your app won't build.

## Usage

### RNTwilioPhone

Use `RNTwilioPhone` class to easily receive incoming calls or start outgoing calls.

```jsx
import * as React from 'react';
import { RNTwilioPhone } from 'react-native-twilio-phone';

// ...

const callKeepOptions = {

};

// Async function that returns Twilio access token
async function fetchAccessToken() {
  const response = await fetch(
    'https://XXXXXX.ngrok.io/accessToken?identity=alice'
  );
  const accessToken = await response.text();

  return accessToken;
}

// RNTwilioPhone options
const options = {
  requestPermissionsOnInit: true, // Default: true - Set to false if you want to request permissions manually
};

export function MyComponent() {
  // Initialize once when component did mount
  // Execute returned function when component will unmount to avoid memory leaks
  React.useEffect(() => {
    // This will set up CallKeep and register device for incoming calls
    return RNTwilioPhone.initialize(callKeepOptions, fetchAccessToken, options);

    // Or use initializeCallKeep if you just want to make outgoing calls
    // return RNTwilioPhone.initializeCallKeep(callKeepOptions, fetchAccessToken, options);
  }, []);

  // Function that starts an outgoing call
  async function startCall() {
    try {
      await RNTwilioPhone.startCall('+00123456789');
    } catch (e) {
      console.log(e);
    }
  }

  // Call this function to unregister device from incoming calls
  // Useful when user signs out for example
  async function unregister() {
    try {
      await RNTwilioPhone.unregister();
    } catch (e) {
      console.log(e);
    }
  }

  // Display active calls
  console.log(RNTwilioPhone.calls);

  // ...
}
```

### Events

Use `twilioPhoneEmitter` to subscribe to module's events:

```jsx
import { twilioPhoneEmitter } from 'react-native-twilio-phone';

// ...

React.useEffect(() => {
  const subscriptions = [
    twilioPhoneEmitter.addListener('CallConnected', (data) => {
      console.log(data);
    }),
    twilioPhoneEmitter.addListener('CallDisconnected', (data) => {
      console.log(data);
    }),
    twilioPhoneEmitter.addListener('CallDisconnectedError', (data) => {
      console.log(data);
    }),
  ];

  return () => {
    subscriptions.map((subscription) => {
      subscription.remove();
    });
  };
}, []);

// ...
```

Following events are available:

```typescript
enum EventType {
  CallInvite = 'CallInvite',
  CancelledCallInvite = 'CancelledCallInvite',
  CallRinging = 'CallRinging',
  CallConnectFailure = 'CallConnectFailure',
  CallConnected = 'CallConnected',
  CallReconnecting = 'CallReconnecting',
  CallReconnected = 'CallReconnected',
  CallDisconnected = 'CallDisconnected',
  CallDisconnectedError = 'CallDisconnectedError',
  RegistrationSuccess = 'RegistrationSuccess',
  RegistrationFailure = 'RegistrationFailure',
  UnregistrationSuccess = 'UnregistrationSuccess',
  UnregistrationFailure = 'UnregistrationFailure',
}
```

### Low level API

Use `TwilioPhone` class to have more control over calls.

```typescript
type TwilioPhoneType = {
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
  activateAudio(): void; // iOS only
  deactivateAudio(): void; // iOS only
  checkPermissions(callback: (permissions: Permissions) => void): void;
  requestPermissioniOS(callback: (permissions: Permissions) => void): void;
};
```

### Request permissions manually

If you don't want to request permissions on initialization, set `requestPermissionsOnInit` option to `false`:

```jsx
// ...

export function MyComponent() {
  React.useEffect(() => {
    return RNTwilioPhone.initialize(callKeepOptions, fetchAccessToken, {
      requestPermissionsOnInit: false,
    });
  }, []);
}
```

You can request permissions later by calling `checkPermissions` method on `TwilioPhone`:

```javascript
TwilioPhone.checkPermissions((permissions) => {
  console.log(permissions); // Display the required permissions and their status
});
```

## Example app

To start the example app, first set up [Twilio server-side web application](#Twilio-server-side-web-application).

Then run `yarn bootstrap` in the root directory to install the required dependencies for each package:

```sh
yarn bootstrap
```

To run the example app on Android:

```sh
yarn example android
```

To run the example app on iOS:

```sh
yarn example ios
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
