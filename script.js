window.onload = function(){

    let canvas = document.getElementById("canvas");

    canvas.setAttribute("width", window.innerWidth )
    canvas.setAttribute("height", window.innerHeight )

    let ctx = canvas.getContext("2d");

    let W = canvas.width;
    let H = canvas.height;


    ctx.fillStyle = "#ddd";
    ctx.fillRect(0, 0, W, H );

      navigator.mediaDevices
        .getUserMedia({ audio: false, video: { facingMode: "environment" } })
        .then(stream => {

          let imageCapture = new ImageCapture( stream.getVideoTracks()[0] );
          setInterval(() => {
            if (canvas && ctx){

              imageCapture.grabFrame()
                .then((imageBitmap) => {
                    //console.log( imageBitmap )
                    //ctx.drawImage(imageBitmap, 0, 0, canvas.width, canvas.height);
                    ctx.drawImage(imageBitmap, 0, 0 );

	            ctx.font = "24px system";
	            ctx.fillText( imageBitmap.width,  20,  20);	
	            ctx.fillText( imageBitmap.height, 20,  60);	



                })
                .catch( (e) => {} );

             }
           }, 10 );

        })
        .catch(e => alert("error" + e.message));

	
};

