// Definición de gráfica
    var madre = new TimeSeries();
    var hijo  = new TimeSeries();
    var opt_sm = {
        grid: {
            strokeStyle : 'rgba(119,119,119,0.20)',
            verticalSections: 8,
        },
        
        timestampFormatter: SmoothieChart.timeFormatter
    }
    var smoothie = new SmoothieChart(opt_sm);
    smoothie.addTimeSeries(madre, {
        strokeStyle: 'rgb(0, 255, 0)', 
        lineWidth: 2
    });
    smoothie.addTimeSeries(hijo, {
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
        for (var x = 0; x < data.mom.length; x++) {
            if (data.mom[x]!=0) {
                madre.append(new Date().getTime(), data.mom[x]);
            };
        }
        for (var z = 0; z < data.child.length; z++) {
            if (data.child[z]!=0) {
                hijo.append(new Date().getTime(), data.child[z]);
            };
        }
    });