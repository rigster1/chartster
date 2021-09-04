/**
 * Initialize a Chartster chart
 *
 * @param container - id of HTML element container
 * @returns - the initialized chart
 */
export const initChart = (containerId: string) => {
  const container = document.getElementById(containerId);
  if (container === null) throw new Error("Element with that id not found");
};
