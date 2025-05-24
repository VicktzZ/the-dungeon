declare module 'node-key-sender' {
  interface KeySenderOptions {
    extraDelayPressMillisec?: number;
    focusDelayMillisec?: number;
    autoDelayMillisec?: number;
    autoDelayMicrosec?: number;
  }

  interface KeySenderInstance {
    setOption(option: KeySenderOptions): void;
    sendKey(key: string): Promise<void>;
    sendKeys(keys: string | string[]): Promise<void>;
    sendText(text: string): Promise<void>;
    sendEnter(): Promise<void>;
    sendTab(): Promise<void>;
    closeNotificationDialog(): Promise<void>;
    isX11(): boolean;
    isWindows(): boolean;
    isDarwin(): boolean;
  }

  const instance: KeySenderInstance;
  export = instance;
}
