import Form from './components/form';

function App() {
  return (
    <div className="h-screen  gap-4 w-screen flex flex-col justify-center items-center">
      <div className=" p-4 rounded-md ring-[1px] ring-gray-300 flex gap-2 flex-col items-center justify-center">
        {' '}
        <p className="text-2xl font-bold">Enter your otp</p>
        <p className="text-sm text">Pro tip : never share otp to anyone ;)</p>
        <Form />
      </div>
    </div>
  );
}

export default App;
