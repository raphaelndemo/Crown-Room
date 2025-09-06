declare module 'react-typed' {
  import * as React from 'react';

  export interface ReactTypedProps {
    strings: string[];
    typeSpeed?: number;
    backSpeed?: number;
    backDelay?: number;
    loop?: boolean;
    showCursor?: boolean;
    cursorChar?: string;
    attr?: string;
    fadeOut?: boolean;
    smartBackspace?: boolean;
    shuffle?: boolean;
    onComplete?: () => void;
    onStringTyped?: (arrayPos: number, self: any) => void;
    onLastStringBackspaced?: () => void;
    onTypingPaused?: (arrayPos: number, self: any) => void;
    onTypingResumed?: (arrayPos: number, self: any) => void;
    onReset?: () => void;
    onStop?: () => void;
    onStart?: () => void;
    onDestroy?: () => void;
  }

  const ReactTyped: React.FC<ReactTypedProps>;
  export default ReactTyped;
}