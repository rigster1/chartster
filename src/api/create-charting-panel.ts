import { ChartingPanel } from "./charting-panel-api";

/**
 * Initialize a technical analysis user interface inside the container
 *
 * @param container - id of HTML element container
 * @returns - the initialized chart
 */
export const createChartingPanel = (containerId: string) => {
  const containerElement = document.getElementById(containerId);

  if (containerElement === null)
    throw new Error("Element with that id not found");

  return new ChartingPanel(containerElement);
};
