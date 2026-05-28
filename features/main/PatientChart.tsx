import { useEffect, useRef } from "react";
import { GlucoseRecord } from "@/types/medical";
import { Coords } from "@/lib/chart/coords";

const MARGIN = { x: 20, y: 20 };

export default function PatientChart({ data }: { data: GlucoseRecord[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (data.length === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    ctx.scale(dpr, dpr);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);

    const timestamps = data.map((r) => r.measuredAt.getTime());
    const viewBox = {
      xMin: Math.min(...timestamps),
      xMax: Math.max(...timestamps),
      yMin: 40,
      yMax: 400,
    };

    const canvasSize = {
      width,
      height,
      padding: {
        top: MARGIN.y,
        right: MARGIN.x,
        bottom: MARGIN.y,
        left: MARGIN.x,
      },
    };

    const coords = new Coords(viewBox, canvasSize);

    ctx.lineWidth = 2;
    ctx.strokeStyle = "red";

    ctx.beginPath();
    data.forEach((record, i) => {
      const x = coords.worldToScreenX(record.measuredAt.getTime());
      const y = coords.worldToScreenY(record.value);

      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
  }, [data]);

  return <canvas ref={canvasRef} className="h-full w-full" />;
}
