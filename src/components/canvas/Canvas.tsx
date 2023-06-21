import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Shape, addShape } from '../../redux/store/canvasSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store/store';
import useDrawShape from '../../hooks/useDrawShape';

const Canvas: React.FC = () => {
  const color = useSelector((state: RootState) => state.canvas.color);
  const thickness = useSelector((state: RootState) => state.canvas.thickness);
  const currentTool = useSelector((state: RootState) => state.canvas.currentTool);
  const shapes = useSelector((state: RootState) => state.canvas.shapes);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [tempShape, setTempShape] = useState<Shape | null>(null);
  const [isNewShapeAdded, setIsNewShapeAdded] = useState(false); // Добавлено состояние для отслеживания новой фигуры
  const newShapeRef = useRef<Shape | null>(null); // Добавлен ref для хранения новой фигуры

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dispatch = useDispatch();
  const drawShape = useDrawShape();

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
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
    },
    [color, currentTool, thickness],
  );

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isDrawing) return;
      console.log('render move');
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
    },
    [color, currentTool, dispatch, isDrawing, startX, startY, tempShape, thickness],
  );

  const handleMouseUp = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
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
        const updatedShapes = [...shapes, tempShape];

        dispatch(addShape(updatedShapes));

        setTempShape(null);
        newShapeRef.current = tempShape;
        setIsNewShapeAdded(true);
      }
    },
    [color, currentTool, dispatch, shapes, startX, startY, tempShape, thickness],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');

    if (!context) return;

    if (isNewShapeAdded) {
      if (newShapeRef.current) {
        drawShape(context, newShapeRef.current);
        setIsNewShapeAdded(false);
      }
    } else {
      context.fillStyle = '#FFFFFF';
      context.clearRect(0, 0, canvas.width, canvas.height);

      shapes.forEach(shape => drawShape(context, shape));

      if (tempShape) {
        drawShape(context, tempShape);
      }
    }
  }, [shapes, tempShape, isNewShapeAdded, drawShape]);

  return (
    <canvas
      ref={canvasRef}
      className="canvas"
      style={{ display: 'flex', margin: '30px auto', border: '3px solid #b6b6b6' }}
      width={900}
      height={600}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    />
  );
};

export default Canvas;
