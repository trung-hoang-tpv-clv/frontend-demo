import { PropsWithChildren, Suspense } from "react";

export default function Layout(
  props: PropsWithChildren<{ pageTitle: string }>
) {
  return (
      <main>
        {props.children}
      </main>
  );
}
