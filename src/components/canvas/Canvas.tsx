import React, { useState, useRef, useEffect } from 'react';
import { Shape, addShape } from '../../redux/store/canvasSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store/store';

const drawShape = (context: CanvasRenderingContext2D, shape: Shape) => {
  context.strokeStyle = shape.color;
  context.lineWidth = shape.thickness;
  context.beginPath();

  if (shape.type === 'brush') {
    context.moveTo(shape.startX, shape.startY);
    context.lineTo(shape.endX, shape.endY);
  } else if (shape.type === 'square') {
    const width = shape.endX - shape.startX;
    const height = shape.endY - shape.startY;
    context.rect(shape.startX, shape.startY, width, height);
  } else if (shape.type === 'circle') {
    const radius = Math.sqrt(Math.pow(shape.endX - shape.startX, 2) + Math.pow(shape.endY - shape.startY, 2));
    context.arc(shape.startX, shape.startY, radius, 0, 2 * Math.PI);
  } else if (shape.type === 'line') {
    context.moveTo(shape.startX, shape.startY);
    context.lineTo(shape.endX, shape.endY);
  } else if (shape.type === 'star') {
    const radius = Math.sqrt(Math.pow(shape.endX - shape.startX, 2) + Math.pow(shape.endY - shape.startY, 2));
    context.moveTo(shape.startX, shape.startY + radius);
    for (let i = 0; i < 9; i++) {
      const x = radius * Math.cos(((2 * Math.PI) / 9) * i);
      const y = radius * Math.sin(((2 * Math.PI) / 9) * i);
      if (i % 2 === 0) {
        context.lineTo(shape.startX + x, shape.startY + y);
      } else {
        context.lineTo(shape.startX + x / 2, shape.startY + y / 2);
      }
    }
  }

  context.closePath();
  context.stroke();
};

const Canvas: React.FC = () => {
  const color = useSelector((state: RootState) => state.canvas.color);
  const thickness = useSelector((state: RootState) => state.canvas.thickness);
  const currentTool = useSelector((state: RootState) => state.canvas.currentTool);
  const shapes = useSelector((state: RootState) => state.canvas.shapes);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [tempShape, setTempShape] = useState<Shape | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dispatch = useDispatch();

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setStartX(x);
    setStartY(y);
    setIsDrawing(true);

    if (currentTool !== 'brush') {
      const shape: Shape = {
        type: currentTool,
        startX: x,
        startY: y,
        endX: x,
        endY: y,
        color,
        thickness,
      };

      setTempShape(shape);
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (currentTool === 'brush') {
      const shape: Shape = {
        type: 'brush',
        startX,
        startY,
        endX: x,
        endY: y,
        color,
        thickness,
      };

      dispatch(addShape([shape]));

      setStartX(x);
      setStartY(y);
    } else if (tempShape) {
      const shape: Shape = {
        ...tempShape,
        endX: x,
        endY: y,
      };

      setTempShape(shape);
    }
  };

  const handleMouseUp = (event: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(false);

    if (currentTool === 'brush') {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const shape: Shape = {
        type: 'brush',
        startX,
        startY,
        endX: x,
        endY: y,
        color,
        thickness,
      };

      dispatch(addShape([shape]));
    } else if (tempShape) {
      const updatedShapes = shapes.slice();
      updatedShapes.push(tempShape);

      dispatch(addShape(updatedShapes));

      setTempShape(null);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);

    shapes.forEach(shape => drawShape(context, shape));

    if (tempShape) {
      drawShape(context, tempShape);
    }
  }, [shapes, tempShape]);

  return (
    <canvas
      ref={canvasRef}
      className="canvas"
      style={{ display: 'flex', margin: '30px auto', border: '3px solid #b6b6b6' }}
      width={800}
      height={600}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    />
  );
};

export default Canvas;
