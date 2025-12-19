// App.tsx
// import { TanStackDevtools } from "@tanstack/react-devtools";
// import { FormDevtoolsPlugin } from "@tanstack/react-form-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { createRouter, RouterProvider } from "@tanstack/react-router";
// import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { routeTree } from "./routeTree.gen.ts";
import reactQueryCliente from "./lib/react-query";

const router = createRouter({
  routeTree,
  context: { queryClient: reactQueryCliente },
  defaultViewTransition: true,
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const AppRouter = () => {
  return (
    <>
      <RouterProvider router={router} />
      {/*<TanStackDevtools*/}
      {/*  config={{ defaultOpen: false }}*/}
      {/*  plugins={[*/}
      {/*    FormDevtoolsPlugin(),*/}
      {/*    { name: "TanStack Query", render: <ReactQueryDevtoolsPanel /> },*/}
      {/*    {*/}
      {/*      name: "TanStack Router",*/}
      {/*      render: <TanStackRouterDevtoolsPanel />,*/}
      {/*    },*/}
      {/*  ]}*/}
      {/*/>*/}
    </>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={reactQueryCliente}>
      <AppRouter />
    </QueryClientProvider>
  );
};

export default App;
