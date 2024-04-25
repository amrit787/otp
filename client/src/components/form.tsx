import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { InputOtp, OtpInputSlot } from '../components/InputOtp';
import { validateOtp } from '../lib/validateOTP';
import axios from 'axios';

interface FormProps {
  // Add props here
}

const Form: React.FC<FormProps> = () => {
  const [otpdata, setOtpData] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string> | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const error = validateOtp(otpdata);
    if (error) {
      setErrors(error);
      return;
    }

    try {
      setLoading(true);
      await axios.post('http://localhost:4000/otp', { otp: otpdata });
      navigate('/success');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrors(
          error.response?.data.error || {
            general: error.message || 'Some error occured'
          }
        );
      } else {
        setErrors({ general: 'Some error occured' });
      }
    } finally {
      setLoading(false);
    }
  };

  const onOTPComplete = (value: string) => {
    const error = validateOtp(value);

    setOtpData(value);
    setErrors(error);
  };
  return (
    <>
      <InputOtp maxLength={6} onComplete={onOTPComplete}>
        <OtpInputSlot index={0} />
        <OtpInputSlot index={1} />
        <OtpInputSlot index={2} />
        <div className="h-1 w-3 align-middle rounded-sm self-center bg-black"></div>
        <OtpInputSlot index={3} />
        <OtpInputSlot index={4} />
        <OtpInputSlot index={5} />
      </InputOtp>
      {errors?.['otp'] && (
        <div className="text-sm mb-3 self-start text-start text-rose-600">
          {errors['otp']}
        </div>
      )}
      <button
        onClick={handleSubmit}
        // disabled={!!errors}
        className="w-full rounded-md px-4 py-2 hover:opacity-80 bg-rose-500 text-white"
      >
        {loading ? 'wait...' : 'Submit'}
      </button>
      {errors?.['general'] && (
        <div className="text-sm mb-3 self-start text-start text-rose-600">
          {errors['general']}
        </div>
      )}
    </>
  );
};

export default Form;
