import { NativeModules, NativeEventEmitter } from 'react-native';

const { ActivityRecognizer } = NativeModules;

const emitter = new NativeEventEmitter(ActivityRecognizer);
var subscription = null;

var ActivityRecognition = {
  'ANDROID_STILL': ActivityRecognizer.ANDROID_STILL,
  'ANDROID_WALKING': ActivityRecognizer.ANDROID_WALKING,
  'ANDROID_IN_VEHICLE': ActivityRecognizer.ANDROID_IN_VEHICLE,
  'IOS_STATIONARY': ActivityRecognizer.IOS_STATIONARY,
  'IOS_WALKING': ActivityRecognizer.IOS_WALKING,
  'IOS_AUTOMOTIVE': ActivityRecognizer.IOS_AUTOMOTIVE,

  subscribe: function(success: Function) {
    subscription = emitter.addListener(
      "ActivityDetection",
      activity => {
        success({
          ...activity,
          get sorted() {
            return Object.keys(activity)
              .map(type => ({ type: type, confidence: activity[type] }))
          }
        })
      }
    );
    return () => subscription.remove();
  },

  start: function(time: number) {
    return new Promise((resolve, reject) => {
      ActivityRecognizer.startActivity(time, logAndReject.bind(null, resolve, reject))
    })
  },

  startMocked: function(time: number, mockActivity: string) {
    return new Promise((resolve, reject) => {
      ActivityRecognizer.startMockedActivity(time, mockActivity, logAndReject.bind(null, resolve, reject))
    })
  },

  stopMocked: function() {
    return new Promise((resolve, reject) => {
      ActivityRecognizer.stopMockedActivity(logAndReject.bind(null, resolve, reject))
    })
  },

  stop: function() {
    return new Promise((resolve, reject) => {
      ActivityRecognizer.stopActivity(logAndReject.bind(null, resolve, reject))
    })
  }
}

function logAndReject(resolve, reject, errorMsg) {
  if (errorMsg) {
    // Don't log this as an error, because the client should handle it using `catch`.
    console.log(`[ActivityRecognition] Error: ${errorMsg}`)
    reject(errorMsg)
    return
  }
  resolve()
}

export default ActivityRecognizer;
