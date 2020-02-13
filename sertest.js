// docker build -t serialtest .
// docker run -it -v /f/study/sertcp:/workspace serialtest bash

// cd /workspace
// npm install serialport

// 別のウィンドウから起動中コンテナに exec bash して以下を実行（IPは適宜変更）
// socat -d -d pty,link=/dev/hogetty,raw,echo=0,waitslave tcp:192.168.11.9:10000

// node sertest.js

'use strict';

const SerialPort = require('serialport');
const port = new SerialPort('/dev/hogetty', {
  baudRate: 9600
});

port.on('open', function () {
  console.log('Serial open.');
  setInterval(write, 1000, 'OK;');
});

port.on('data', function (data) {
  console.log('Data: ' + data);
});

function write(data) {
  console.log('Write: ' + data);
  port.write(new Buffer.from(data), function(err, results) {
    if(err) {
    console.log('Err: ' + err);
    console.log('Results: ' + results);
    }
  });
}

// Arduino側ソース
/*
bool led = false;

void setup() {
  pinMode(13, OUTPUT);
  Serial.begin(9600);
  Serial.setTimeout(100000000);
}

void loop()
{
  if (Serial.available() > 0) {
    String recv = Serial.readStringUntil(';');

    if (recv == "OK") {
      led = !led;
      digitalWrite(13, led);
      Serial.println("received!");
    }
  }
}
*/
