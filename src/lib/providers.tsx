"use client";

/* Core */
import { Provider } from "react-redux";

/* Instruments */
import { reduxStore } from "@/lib/redux";
import { SessionProvider } from "next-auth/react";

export const Providers = (props: React.PropsWithChildren) => {
  return (
    <SessionProvider>
      <Provider store={reduxStore}>{props.children}</Provider>
    </SessionProvider>
  );
};
