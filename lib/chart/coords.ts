type ViewBox = {
  xMin: number; // 가장 이른 시각 (timestamp)
  xMax: number; // 가장 늦은 시각
  yMin: number; // 최소 혈당 (예: 40)
  yMax: number; // 최대 혈당 (예: 280)
};

type CanvasSize = {
  width: number;
  height: number;
  padding: { top: number; right: number; bottom: number; left: number };
};

export class Coords {
  private readonly viewBox: ViewBox;
  private readonly size: CanvasSize;

  constructor(viewBox: ViewBox, size: CanvasSize) {
    this.viewBox = viewBox;
    this.size = size;
  }

  worldToScreenX(value: number): number {
    const ratio =
      (value - this.viewBox.xMin) / (this.viewBox.xMax - this.viewBox.xMin);
    const chartWidth =
      this.size.width - this.size.padding.left - this.size.padding.right;
    const result = this.size.padding.left + chartWidth * ratio;
    return result;
  }

  worldToScreenY(value: number): number {
    const ratio =
      (value - this.viewBox.yMin) / (this.viewBox.yMax - this.viewBox.yMin);
    const chartHeight =
      this.size.height - this.size.padding.top - this.size.padding.bottom;
    const result = this.size.padding.top + chartHeight * (1 - ratio);
    return result;
  }

  screenToWorldX(pixelX: number): number {
    const ratio =
      (pixelX - this.size.padding.left) /
      (this.size.width - this.size.padding.left - this.size.padding.right);
    const result =
      this.viewBox.xMin + (this.viewBox.xMax - this.viewBox.xMin) * ratio;
    return result;
  }

  screenToWorldY(pixelY: number): number {
    const ratio =
      (pixelY - this.size.padding.top) /
      (this.size.height - this.size.padding.top - this.size.padding.bottom);
    const result =
      this.viewBox.yMin + (this.viewBox.yMax - this.viewBox.yMin) * (1 - ratio);
    return result;
  }
}
