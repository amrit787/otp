import { createContext, useRef, useState } from 'react';

type OtpContextType = {
  inputRef: React.MutableRefObject<HTMLInputElement[]>;
  OTP: string[];
  setOTP: React.Dispatch<React.SetStateAction<string[]>>;
  maxLength: number;
  onComplete: (value: string) => void;
};

export const OtpIputContext = createContext<OtpContextType>({
  inputRef: { current: [] },
  OTP: [],
  setOTP: () => {},
  maxLength: 0,
  onComplete: () => {}
});

const OtpInputProvider: React.FC<{
  children: React.ReactNode;
  maxLength: number;
  onComplete: (value: string) => void;
}> = ({ children, maxLength, onComplete }) => {
  const inputRef = useRef<HTMLInputElement[]>([]);
  const [OTP, setOTP] = useState<string[]>([]);
  return (
    <OtpIputContext.Provider
      value={{ inputRef, OTP, setOTP, maxLength, onComplete }}
    >
      {children}
    </OtpIputContext.Provider>
  );
};

export default OtpInputProvider;
