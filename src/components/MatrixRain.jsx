import styles from './styles/MatrixRain.module.css';
import { useState,useEffect,useRef } from 'react';




function MatrixRain(){
    const canvasRef = useRef(null);
    const chars = 'アァイィウヴエェオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモヤャユュヨョラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const fontSize = 16;
    
    
    useEffect(()=>{
        const ctx = canvasRef.current.getContext('2d');

        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        ctx.font = fontSize + "px monospace";

        let columns = Math.floor(canvasRef.current.width / fontSize);
        let rows = Math.floor(canvasRef.current.height / fontSize);

        let frameCount = 0;
        let nonRainColArr = new Array(columns).fill(0).map((_v,_i)=>{return {col:_i,currentRow:0};});
        let rainColArr=[];

        const rainAnimation = ()=>{

            const drawColumns = () =>{
                ctx.fillStyle = "#0F0";
                for(const obj of rainColArr){
                    if(obj.currentRow>=rows+1){
                        obj.currentRow=0;
                        nonRainColArr.push(obj);
                        rainColArr = rainColArr.filter((col)=>col.col!==obj.col);
                    }
                    const randChar = chars[Math.floor(Math.random()*chars.length)];
                    ctx.fillText(randChar,obj.col*fontSize,obj.currentRow*fontSize);
                    obj.currentRow++;
                } 
            }

            if(frameCount>=3){
                frameCount=0;
                ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
                ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                if(nonRainColArr.length>0){
                    const randCol = nonRainColArr[Math.floor(Math.random()*nonRainColArr.length)];
                    rainColArr.push(randCol);
                    nonRainColArr = nonRainColArr.filter((col)=>col.col!==randCol.col);
                }
                drawColumns();
            }
            else
                frameCount++;
            requestAnimationFrame(rainAnimation);  
        }

        function resizeCanvas() {
            canvasRef.current.width = window.innerWidth;
            canvasRef.current.height = window.innerHeight;
            ctx.font = fontSize + "px monospace";
            let prevColumns = columns;
            let prevRows = rows;
            columns = Math.floor(canvasRef.current.width / fontSize);
            rows = Math.floor(canvasRef.current.height / fontSize);
            if(prevColumns<columns){
                for(let i=prevColumns;i<columns;i++){
                    nonRainColArr.push({col:i,currentRow:0});
                }
            }
            else if(prevColumns>columns){
                nonRainColArr = nonRainColArr.filter((col)=>col.col<columns);
                rainColArr = rainColArr.filter((col)=>col.col<columns);
            }
            if(prevRows>rows){
                let filteredHeight =rainColArr.filter((col)=>col.currentRow>=rows+1)
                nonRainColArr = nonRainColArr.concat(filteredHeight);
                rainColArr = rainColArr.filter((col)=>col.currentRow<rows+1);
            }

        }
        rainAnimation();   
        addEventListener("resize", resizeCanvas); 
    },[]);
    return (<canvas className={styles['matrix-canvas']} ref={canvasRef}></canvas>);
}

export default MatrixRain;