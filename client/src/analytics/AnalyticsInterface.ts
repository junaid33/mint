export type PostHogConfigInterface = {
  apiKey?: string;
  apiHost?: string;
};

export type AmplitudeConfigInterface = {
  apiKey?: string;
};

export type MixpanelConfigInterface = {
  projectToken?: string;
};

export type HotjarConfigInterface = {
  hjid?: string;
  hjsv?: string;
}

// We can use & instead of | because all keys are optional
export type ConfigInterface = PostHogConfigInterface &
  AmplitudeConfigInterface &
  MixpanelConfigInterface &
  HotjarConfigInterface;

// TypeScript doesn't recommend setting interfaces on constructors.
// How an object is constructed should not matter because an interface
// only cares about what it does.
export type AnalyticsInterface = {
  // New implementations need their own config interface.
  init: (implementationConfig: ConfigInterface) => void;

  createEventListener: (eventName: string) => (eventProperties: object) => void;
};

export type AnalyticsMediatorInterface = {
  createEventListener: (eventName: string) => (eventConfig: object) => Promise<void>;
};
