export function eventAdder(target: HTMLElement, events: object): void {
  Object.keys(events).forEach(e => {
    target.addEventListener(e, events[e]);
  });
}

export function eventRemover(target: HTMLElement, events: object): void {
  Object.keys(events).forEach(e => {
    target.removeEventListener(e, events[e]);
  });
}
