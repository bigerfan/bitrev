import type React from "react";

type Props = {
  children: React.ReactNode;
};

export const Appcontainer = ({ children }: Props) => {
  return (
    <div className="min-h-screen flex justify-center items-start text-foreground text-base my-4 px-8">
      {children}
    </div>
  );
};
