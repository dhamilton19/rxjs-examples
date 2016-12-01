import {Observable} from 'rxjs';


//set up circle
document.getElementById('app').innerHTML =
    '<div style="border:4px solid #ccc;height:500px;width:500px;">' +
        '<div id="circle" style="background-color:cornflowerblue;border-radius:50%;width:30px;height:30px;position:absolute"></div>' +
    '</div>';
const circle = document.getElementById('circle');


const observable =
    Observable.fromEvent(document, 'mousemove')
        .map(x => ({
            x: x.clientX - 12,
            y: x.clientY - 12
        }))
        .filter(({x, y}) => x < 500 && y < 500 && x > 12 && y > 12)
        .delay(200);


observable
    .subscribe(
        ({x, y}) => {
            circle.style.left = `${x}px`;
            circle.style.top = `${y}px`;
            console.log({x,y});
        },
        e => console.log(`error: ${e}`),
        () => console.log('complete')
    );
