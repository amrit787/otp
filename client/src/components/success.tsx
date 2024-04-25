import React from 'react';
import { useNavigate } from 'react-router-dom';

interface SuccessProps {
  // Add props here
}

const Success: React.FC<SuccessProps> = () => {
  const navigate = useNavigate();

  return (
    <div className="p-2 flex flex-col items-center justify-center gap-4">
      <p className="text-3xl text-green-600 font-semibold">
        Verification Successful
      </p>
      <p
        onClick={() => navigate('/')}
        className="text-sm cursor-pointer underline text-sky-500"
      >
        test again
      </p>
    </div>
  );
};

export default Success;
