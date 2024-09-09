export function useFlowbite(callback: (flowbite: any) => void) {
  if (process.client) {
    import("flowbite").then((flowbite) => {
      callback(flowbite);
    });
  }
}
