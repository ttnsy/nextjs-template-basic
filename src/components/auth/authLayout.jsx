export const AuthLayout = ({ children }) => {
  return (
    <main className="w-full h-screen flex flex-col justify-center items-center">
      <div className="w-[420px]">{children}</div>
    </main>
  );
};
