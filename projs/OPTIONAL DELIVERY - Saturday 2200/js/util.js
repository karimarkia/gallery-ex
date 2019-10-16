function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function startTimer() {
    interval = setInterval(function () {
        timer.innerHTML = minute + ' Mins ' + second + ' Secs';
        second++;        
        if (second === 60) {
            minute++;
            second = 0;
            
        }
    }, 1000);
    
    
    
}

