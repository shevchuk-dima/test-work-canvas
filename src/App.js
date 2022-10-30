import { useState, useEffect, useRef } from "react";
import "./App.css";
import Line from './Line.jsx'

function App() {
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [lines, setLines] = useState([]);
  const [dotsCross, setDotsCross] = useState([]);
  const [currentDotsCross, setCurrentDotsCross] = useState([]);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 800;
    canvas.height = 400;
    const context = canvas.getContext("2d");
    context.lineWidth = 1;
    contextRef.current = context;
  }, []);

  useEffect(() => {
    drawLines();
  }, [lines]);npm 

  useEffect(() => {
    drawCircles(dotsCross);
  }, [dotsCross]);


//start point
  const startDraw = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    if (!isDrawing) {
      setStartPoint({ x: offsetX, y: offsetY });
      setIsDrawing(true);
    } else {
      createLine(offsetX, offsetY);
    }
  };


  //lines functions and methods

  const createLine = (x, y) => {
    contextRef.current.canvas.width = contextRef.current.canvas.width;
    let newLine = new Line(startPoint.x, startPoint.y, x, y);
    //newLine.draw(contextRef.current); 
    setIsDrawing(false);
    setLines([...lines, newLine]);
    setDotsCross([...dotsCross, ...currentDotsCross]);
  };

  const drawLines = (arr = undefined) => {
    let currentLines = Array.isArray(arr) ? arr : lines;
    currentLines.map((item) => {
      item.draw(contextRef.current);
    });
  };

  const drawProection = ({ nativeEvent }) => {
    if (isDrawing) {
      const { offsetX, offsetY } = nativeEvent;
      contextRef.current.canvas.width = contextRef.current.canvas.width;
      drawLines();
      drawCircles(dotsCross);
      let proectionLine = new Line(startPoint.x, startPoint.y, offsetX, offsetY);
      proectionLine.draw(contextRef.current);      
      let dots = Line.isCross(proectionLine, lines);
      if (dots.length) {
        drawCircles(dots);
        setCurrentDotsCross(dots);
      }
    }
  };
  
    //dots functions and methods

  const drawCircles = (dots) => {
    dots.map((item) => {
      if (item.x > 0 || item.y > 0) {
        item.draw(contextRef.current);
      }
    });
  };

  const clearDraw = (evt) => {
    if (evt != undefined) {
      evt.preventDefault();
      setIsDrawing(false);
      contextRef.current.canvas.width = contextRef.current.canvas.width;
      drawLines();
      drawCircles(dotsCross);
    }
  };


  const collapse = () => {
    let a = 0;
    let newLines = [];
    let dots = [];
    setLines([]);
    setDotsCross([]);
    setCurrentDotsCross([]);
    let timerId = setInterval(()=>{
      a += 1;
     newLines = collapseAnimation(newLines);
     dots = Line.checkCrossDots(newLines, dotsCross);
     contextRef.current.canvas.width = contextRef.current.canvas.width;
     drawLines(newLines);
     drawCircles(dots);
      if(a >= 100){
        clearInterval(timerId);
        contextRef.current.canvas.width = contextRef.current.canvas.width;
       }
    }, 30);
  };


function collapseAnimation(arr = undefined) {
  let currentLines = arr.length ? arr : lines;
    let newLines = currentLines.map((item) => {
      let x = item.x1 - (item.x1 - item.x) / 4 * 0.2;
      let y = item.y1 - (item.y1 - item.y) / 4 * 0.2;
      let x1 = item.x - (item.x - item.x1) / 4 * 0.2;;
      let y1 = item.y - (item.y - item.y1) / 4 * 0.2;     
      return new Line(x, y, x1, y1);
    });
    return newLines;
  }

  return (
    <div className="content-wrapper">
      <canvas
        width="400px"
        height="200px"
        ref={canvasRef}
        onClick={startDraw}
        onMouseMove={drawProection}
        onContextMenu={clearDraw}
      />
      <br/>
      <button onClick={collapse}>collapse lines</button>
    </div>
  );
}

export default App;
