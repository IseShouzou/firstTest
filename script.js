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

                    wb = imageBitmap.width;
                    hb = imageBitmap.height;

                    ctx.drawImage(imageBitmap, 0, 0, wb, hb, 0, 0 ,W, H );


	            ctx.font = "24px system";
	            ctx.fillText( imageBitmap.width,  20,  20);	
	            ctx.fillText( imageBitmap.height, 20,  60);	



                })
                .catch( (e) => {} );

             }
           }, 10 );

        })
        .catch(e => alert("error" + e.message));


    window.addEventListener("deviceorientation", function(e){

        //let W = canvas.width;
        //let H = canvas.height;

        //console.log( W, H );
        //console.log( window.innerWidth );


	//ctx.fillStyle = "#ddd";
	//ctx.fillRect(0, 0, W, H );

	// キャンバスに加速度センサーの各プロパティを表示
	ctx.font = "24px system";
	ctx.fillStyle = "#F55";
	ctx.textBaseline = "top";	// 文字のベースラインを上に


        let alpRad = ( e.alpha || 0) * Math.PI / 180.0;
        let betRad = ( e.beta  || 0) * Math.PI / 180.0;
        let gamRad = ( e.gamma || 0) * Math.PI / 180.0;

        let ca = Math.cos( alpRad );
        let sa = Math.sin( alpRad );
        let cb = Math.cos( betRad );
        let sb = Math.sin( betRad );
        let cg = Math.cos( gamRad );
        let sg = Math.sin( gamRad );

        let m11 =   sg * cb ;
        let m21 =   cg * sa + sg * sb * ca ;
        let m31 =   cg * ca - sg * sb * sa ;

        let m12 = - sb ;
        let m22 =   cb * ca ;
        let m32 = - cb * sa ;

        let m13 = - cg * cb ;
        let m23 =   sg * sa - cg * sb * ca ;
        let m33 =   sg * ca + cg * sb * sa ;

        let phi = 180.0 / Math.PI * Math.atan2(   m23, m33 );
        let the = 180.0 / Math.PI * Math.atan2( - m13, Math.sqrt( m23 * m23 + m33 * m33) );
        let psi = 180.0 / Math.PI * Math.atan2(   m12, m11 );





/*
	ctx.fillText("phi: " + phi, 20,  20);	// z軸
	ctx.fillText("the: " + the, 20,  60);	// x軸
	ctx.fillText("psi: " + psi, 20, 100);	// y軸

        ctx.strokeStyle = 'black';
        ctx.beginPath();
        ctx.moveTo( 0, H / 2.0 );
        ctx.lineTo( W, H / 2.0 );
        ctx.stroke();

	ctx.fillStyle = "#f00";
	ctx.fillRect( W       / 12.0, H / 2.0, W / 6.0, - phi / 180.0 * H / 2.0 );

	ctx.fillStyle = "#0f0";
	ctx.fillRect( W * 5.0 / 12.0, H / 2.0, W / 6.0, - the / 180.0 * H / 2.0 );

	ctx.fillStyle = "#00f";
	ctx.fillRect( W * 9.0 / 12.0, H / 2.0, W / 6.0, - psi / 180.0 * H / 2.0 );

*/

	}, false);



};


/*

    const streamButton = document.getElementById("stream");

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.rect( 0, 0,  canvas.width, canvas.height);
    ctx.fillStyle = "lightskyblue";
    //ctx.fillStyle = "rgb(255, 165, 0)";
    ctx.fill();

    //ctx.beginPath();
    //ctx.arc( 320, 300, 100, 0, 2 * Math.PI, false);
    //ctx.stroke();
    //ctx.clip();

    ctx.beginPath();
    ctx.moveTo( 100, 100 );
    ctx.lineTo( 500, 100 );
    ctx.lineTo( 500, 300 );
    ctx.lineTo( 150, 300 );
    ctx.closePath();
    ctx.stroke();
    ctx.clip();


    console.log( canvas.width, canvas.height )

    //let canvasStream = null;

    streamButton.addEventListener('click', () => {


      navigator.mediaDevices
        .getUserMedia({ audio: false, video: { facingMode: "environment" } })
        .then(stream => {

          let imageCapture = new ImageCapture( stream.getVideoTracks()[0] );
          setInterval(() => {
            if (canvas && ctx){

              imageCapture.grabFrame()
                .then((imageBitmap) => {
                    ctx.drawImage(imageBitmap, 0, 100, canvas.width, canvas.height);
                })
                .catch( (e) => {} );

             }
           }, 10 );

        })
        .catch(e => alert("error" + e.message));

    });


    function drawCanvasFromVideo()  {
      //const canvas = document.getElementById("canvas");
      //const ctx = canvas.getContext('2d');

      setInterval(() => {
        if (canvas && ctx){

            ctx.beginPath();
            ctx.arc( 320, 300, 100, 0, 2 * Math.PI, false);
            ctx.stroke();
            ctx.clip();
            ctx.drawImage(video, 0, 100, canvas.width, canvas.height);

        }
      }, 10000/100);
      //canvasStream = canvas.captureStream(30);
      //const videoCanvas = document.getElementById("player-canvas");
      //videoCanvas.srcObject = canvasStream;
    }



*/

