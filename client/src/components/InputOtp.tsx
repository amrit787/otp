import { useContext, useState } from 'react';
import OtpInputProvider, {
  OtpIputContext
} from '../providers/otpInputProvider';
import { twMerge } from 'tailwind-merge';

export const OtpInputSlot = ({
  index,
  className
}: {
  index: number;
  className?: string;
}) => {
  const { OTP, setOTP, inputRef, maxLength, onComplete } =
    useContext(OtpIputContext);
  const [isError, setIsError] = useState(
    OTP[index] ? isNaN(parseFloat(OTP[index])) : null
  );

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    // it means on paste
    if (e.target.value.length > 2) {
      return;
    }

    const input = (
      e.target.value.length > 1
        ? e.target.value.split('').pop()
        : e.target.value
    ) as string;
    const newPin = [...OTP];
    newPin[index] = input;
    setOTP(newPin);
    if (isNaN(parseFloat(input))) {
      setIsError(true);
    } else {
      setIsError(false);
    }

    if (input.length === 1 && index < maxLength - 1) {
      inputRef.current[index + 1]?.focus();
    }

    if (input.length === 0 && index > 0) {
      inputRef.current[index - 1]?.focus();
    }

    onComplete(newPin.join(''));
  };

  const handlePaste: React.ClipboardEventHandler<HTMLInputElement> = (e) => {
    const clipboardData = e.clipboardData;
    const text = clipboardData.getData('text');

    setOTP([...text.split('')]);
    onComplete(text);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    const key = e.key;
    const newPin = [...OTP];

    if (key === 'Backspace' || key === 'Delete') {
      console.log('inside this ..........');
      const hasValue = OTP[index]?.length;
      if (hasValue) {
        return;
      }
      e.preventDefault();
      if (index > 0) {
        inputRef.current[index - 1]?.focus();
        newPin[index] = '';

        setOTP(newPin);
      }
    }
  };

  return (
    <input
      key={index}
      onKeyDown={handleKeyDown}
      type="text"
      // defaultValue={''}
      // maxLength={1}
      onPaste={handlePaste}
      value={OTP[index]}
      onChange={handleChange}
      ref={(ref) => (inputRef.current[index] = ref as HTMLInputElement)}
      className={twMerge(
        className,
        `w-8 h-8 text-lg font-semibold rounded-sm border pl-[10px] ${
          isError ? 'border-rose-500 text-rose-500' : 'border-black'
        }`
      )}
    />
  );
};

export const InputOtp = ({
  children,
  maxLength,
  onComplete,
  className
}: {
  children: React.ReactNode;
  maxLength: number;
  onComplete: (value: string) => void;
  className?: string;
}) => {
  return (
    <OtpInputProvider onComplete={onComplete} maxLength={maxLength}>
      <div className={twMerge(`flex gap-x-4`, className)}>{children}</div>
    </OtpInputProvider>
  );
};
