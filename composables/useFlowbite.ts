export interface FlowbiteInstance {
  initAccordions: () => void;
  initCarousels: () => void;
  initCollapses: () => void;
  initDials: () => void;
  initDismisses: () => void;
  initDrawers: () => void;
  initDropdowns: () => void;
  initModals: () => void;
  initPopovers: () => void;
  initTabs: () => void;
  initTooltips: () => void;
  initInputCounters: () => void;
  initCopyClipboards: () => void;
  initDatepickers: () => void;
  initFlowbite: () => void;
}

export function useFlowbite(callback: (flowbite: FlowbiteInstance) => void) {
  if (import.meta.client === true) {
    import("flowbite").then((flowbite) => {
      callback(flowbite);
    });
  }
}
