import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { addShapes, setIsDrawing, setStartX, setStartY, setTempShape, Shape } from '../../redux/store/canvasSlice';
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

  const handleMouse = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (event.type === 'mousedown') {
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
    } else if (event.type === 'mousemove') {
      if (!isDrawing) return;

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

        dispatch(addShapes([shape]));
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
    } else if (event.type === 'mouseup') {
      dispatch(setIsDrawing(false));

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

        dispatch(addShapes([shape]));
      } else if (tempShape) {
        dispatch(addShapes([tempShape]));
        dispatch(setTempShape(null));
      }
    }
  };

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
      style={{ display: 'flex', margin: '30px auto', border: '3px dashed #b6b6b6' }}
      width={window.innerWidth * 0.7}
      height={window.innerHeight * 0.7}
      onMouseDown={handleMouse}
      onMouseMove={handleMouse}
      onMouseUp={handleMouse}
    />
  );
};

export default Canvas;
