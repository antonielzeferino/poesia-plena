"use client";

import BackBtn from "@/components/BackBtn";

const PoemLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col">
      <header className="w-full flex justify-start p-4">
        <BackBtn />
      </header>
      <main className="w-full md:px-6 pb-4">{children}</main>
    </div>
  );
};

export default PoemLayout;
