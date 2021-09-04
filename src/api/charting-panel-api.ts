import { ChartingPanelUI } from "../ui/charting-panel-ui";
import { IChartingPanel } from "./icharting-panel-api";

export class ChartingPanel implements IChartingPanel {
  private chartingPanelUI: ChartingPanelUI;

  public constructor(containerElement: HTMLElement) {
    this.chartingPanelUI = new ChartingPanelUI(containerElement);
  }
}
