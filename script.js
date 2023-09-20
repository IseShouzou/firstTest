
window.onload = function(){

    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

    let alpRad;
    let betRad;
    let gamRad;

    canvas.setAttribute("width", window.innerWidth )
    canvas.setAttribute("height", window.innerHeight )

    window.addEventListener("deviceorientation", function(e){
        alpRad = ( e.alpha || 0) * Math.PI / 180.0;
        betRad = ( e.beta  || 0) * Math.PI / 180.0;
        gamRad = ( e.gamma || 0) * Math.PI / 180.0;

    });

    function calcEuler(){

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

        return [ phi, the, psi ];

    }


    navigator.mediaDevices
        .getUserMedia({ audio: false, video: { facingMode: "environment" } })
        .then(stream => {

            let imageCapture = new ImageCapture( stream.getVideoTracks()[0] );

            setInterval(() => {

                imageCapture.grabFrame()
                    .then((imageBitmap) => {

                        let W = canvas.width;
                        let H = canvas.height;

                        ctx.fillStyle = "#ddd";
                        ctx.fillRect(0, 0, W, H );

                        let euler = calcEuler();
                        let Y = euler[1];

                        ctx.beginPath();
                        ctx.moveTo( 100, Y + 100 );
                        ctx.lineTo( 300, Y + 100 );
                        ctx.lineTo( 300, Y + 400 );
                        ctx.lineTo( 100, Y + 400 );
                        ctx.closePath();
                        ctx.stroke();
                        ctx.clip();

                        wb = imageBitmap.width;
                        hb = imageBitmap.height;
                        if ( W / H < wb / hb ){
                            let w =  W / H * hb;
                            let x = ( wb - w ) / 2;
                            ctx.drawImage(imageBitmap, x, 0, w, hb, 0, 0 ,W, H );
                        } else {
                            let h =  H / W * wb;
                            let y = ( hb - h ) / 2;
                            ctx.drawImage(imageBitmap, 0, y, wb, h, 0, 0 ,W, H );
                        }

                    })
                    .catch( (e) => {} );
             }, 10 );

        })
        .catch(e => alert("error" + e.message));

};
