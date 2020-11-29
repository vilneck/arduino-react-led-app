const { Board, Led } = require("johnny-five");
const firebase = require("firebase");
const board = new Board({port: "COM5"});

var firebaseConfig = {
  
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


board.on("ready", () => {
  const led = new Led(13);
  board.repl.inject({
    led
  });

  var escuta = firebase.database().ref('lampada').on('value',function(snapshot){

    let lampada = snapshot.val();
    if(lampada == 'on')
    {
      led.on();
    }else{
      led.off();
    }
  });
});

