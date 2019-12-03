#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <CoreMotion/CoreMotion.h>

@interface ActivityRecognizer : RCTEventEmitter <RCTBridgeModule>
  @property(nonatomic, strong) CMMotionActivityManager *motionActivityManager;

@end
