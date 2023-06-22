import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { Shape, addShape, setIsDrawing, setStartX, setStartY, setTempShape } from '../../redux/store/canvasSlice';
import useDrawShape from '../../hooks/useDrawShape';

interface CanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

const Canvas: React.FC<CanvasProps> = ({ canvasRef }) => {
  const { color, thickness, currentTool, shapes, isDrawing, startX, startY, tempShape } = useSelector(
    (state: RootState) => state.canvas,
  );

  const dispatch = useDispatch();
  const drawShape = useDrawShape();

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      dispatch(setStartX(x));
      dispatch(setStartY(y));
      dispatch(setIsDrawing(true));

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

        dispatch(setTempShape(shape));
      }
    },
    [color, currentTool, dispatch, thickness],
  );

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
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

        dispatch(addShape(shape));
        dispatch(setStartX(x));
        dispatch(setStartY(y));
      } else if (tempShape) {
        const shape: Shape = {
          ...tempShape,
          endX: x,
          endY: y,
        };

        dispatch(setTempShape(shape));
      }
    },
    [color, currentTool, dispatch, isDrawing, startX, startY, tempShape, thickness],
  );

  const handleMouseUp = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      dispatch(setIsDrawing(false));

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

        dispatch(addShape(shape));
      } else if (tempShape) {
        dispatch(addShape(tempShape));
        dispatch(setTempShape(null));
      }
    },
    [color, currentTool, dispatch, startX, startY, tempShape, thickness],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.fillStyle = '#FFFFFF';
    context.clearRect(0, 0, canvas.width, canvas.height);

    shapes.forEach(shape => drawShape(context, shape));

    if (tempShape) {
      drawShape(context, tempShape);
    }
  }, [shapes, tempShape, drawShape]);

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
