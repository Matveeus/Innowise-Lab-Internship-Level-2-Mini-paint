import { useCallback } from 'react';
import { Shape } from '../redux/store/canvasSlice';

const useDrawShape = () => {
  return useCallback((context: CanvasRenderingContext2D, shape: Shape) => {
    context.strokeStyle = shape.color;
    context.lineWidth = shape.thickness;
    context.beginPath();

    if (shape.type === 'brush' || shape.type === 'line') {
      context.moveTo(shape.startX, shape.startY);
      context.lineTo(shape.endX, shape.endY);
    } else if (shape.type === 'square') {
      const width = shape.endX - shape.startX;
      const height = shape.endY - shape.startY;
      context.rect(shape.startX, shape.startY, width, height);
    } else if (shape.type === 'circle') {
      const radius = Math.sqrt(Math.pow(shape.endX - shape.startX, 2) + Math.pow(shape.endY - shape.startY, 2));
      context.arc(shape.startX, shape.startY, radius, 0, 2 * Math.PI);
    } else if (shape.type === 'star') {
      const radius = Math.sqrt(Math.pow(shape.endX - shape.startX, 2) + Math.pow(shape.endY - shape.startY, 2));
      const spikes = 5;
      const rotation = Math.PI / 2;

      const centerX = (shape.startX + shape.endX) / 2;
      const centerY = (shape.startY + shape.endY) / 2;

      const angleStep = (2 * Math.PI) / (spikes * 2);
      const initialAngleOffset = Math.PI / spikes;

      context.moveTo(centerX + radius * Math.cos(rotation), centerY + radius * Math.sin(rotation));

      for (let i = 1; i <= spikes * 2; i++) {
        const angle = rotation + i * angleStep - initialAngleOffset;
        const innerRadius = i % 2 === 0 ? radius / 2 : radius;
        const x = centerX + Math.cos(angle) * innerRadius;
        const y = centerY + Math.sin(angle) * innerRadius;

        context.lineTo(x, y);
      }

      context.closePath();
      context.stroke();
    }

    context.closePath();
    context.stroke();
  }, []);
};

export default useDrawShape;
