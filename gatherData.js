var isRecording = false;
var measurements = [[],[],[],[],[],[],[]] // x,y,z,alpha,beta,gamma,interval
var runningTime = 0

function toggle(id) { 
    isRecording = !isRecording
    if (isRecording){
        id.innerHTML = "Stop";
    }
    else{
        id.innerHTML = "Start"
    }
}

function reset() { 
    measurements = [[],[],[],[],[],[],[]]
    runningTime = 0
    document.getElementById("time").innerHTML = runningTime.toFixed(2);    
}

function download() { 
    var data, filename, link;
    var csv = generateCSV();

    filename = 'export.csv';
    data ='data:text/octet-stream,' + encodeURI(csv);

    hiddenElement = document.createElement('a');
    hiddenElement.href =  data;
    hiddenElement.target = '_blank';
    hiddenElement.download = 'sensorData.csv';
    hiddenElement.click();
}

function generateCSV() {  
    var result = 'sep=,\n';
    result += 'x,y,z,alpha,beta,gamma,interval\n';


    var numMeasurements = measurements[0].length;
    var numMeasured = measurements.length;
    
    for (var i = 0; i < numMeasurements; i++){
        for (var j = 0; j < numMeasured; j++){
            result += measurements[j][i] + ','
        }
        result += '\n'
    }
    return result;
}

function plotResults(){
    document.getElementById("time").innerHTML = runningTime.toFixed(2);
    var layout = {
        title: 'Sensor data',
        showlegend : false,
        margin: { t: 0 }
    };
    Plotly.newPlot( 'plotx', [{y: measurements[0] }], layout, {staticPlot: true})
    Plotly.newPlot( 'ploty', [{y: measurements[1] }], layout, {staticPlot: true})
    Plotly.newPlot( 'plotz', [{y: measurements[2] }], layout, {staticPlot: true})

}

if (window.DeviceMotionEvent) {
	window.ondevicemotion = function(e) {
        if (isRecording){
            measurements[0].push(e.accelerationIncludingGravity.x)
            measurements[1].push(e.accelerationIncludingGravity.y)
            measurements[2].push(e.accelerationIncludingGravity.z)
            measurements[3].push(e.rotationRate.alpha)
            measurements[4].push(e.rotationRate.beta)
            measurements[5].push(e.rotationRate.gamma)
            measurements[6].push(e.interval)
            
            runningTime += e.interval/1000

            if (measurements[0].length % 10 == 0){
                plotResults()
            }
        }
    }
}