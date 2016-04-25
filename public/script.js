// Definición de gráfica
    var elementOne = new TimeSeries();
    var elementTwo  = new TimeSeries();
    var opt_sm = {
        grid: {
            strokeStyle : 'rgba(119,119,119,0.20)',
            verticalSections: 8,
        },
        
        timestampFormatter: SmoothieChart.timeFormatter
    }
    var smoothie = new SmoothieChart(opt_sm);
    smoothie.addTimeSeries(elementOne, {
        strokeStyle: 'rgb(0, 255, 0)', 
        lineWidth: 2
    });
    smoothie.addTimeSeries(elementTwo, {
        strokeStyle: 'rgb(255, 0, 255)',
        lineWidth: 2
    });
    smoothie.streamTo(document.getElementById("placeholder"), 1000);

    var webSocket = io.connect("127.0.0.1:3000");

    $(document).on("ready", function() {
        $("#form-envio").on("submit", function(e) {
            e.preventDefault();
            var dato = $("#datos").val();
            webSocket.emit("datos_cliente", dato);
        });
    });
    webSocket.on("datos_servidor", function(data) {
        for (var x = 0; x < data.elementTwo.length; x++) {
            if (data.elementTwo[x]!=0) {
                elementOne.append(new Date().getTime(), data.elementTwo[x]);
            };
        }
        for (var z = 0; z < data.elementOne.length; z++) {
            if (data.elementOne[z]!=0) {
                elementTwo.append(new Date().getTime(), data.elementOne[z]);
            };
        }
    });