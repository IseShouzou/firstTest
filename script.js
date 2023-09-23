window.onload = function(){

    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

    let alpRad;
    let betRad;
    let gamRad;

    canvas.setAttribute("width", window.innerWidth )
    canvas.setAttribute("height", window.innerHeight )

    let fovy = 45.0;

    //let pnts = [ [ 0.5, -0.5,  0.1 ],
    //             [ 0.5,  0.5,  0.1 ],
    //             [ 0.5,  0.5,  0.5 ],
    //             [ 0.5, -0.5,  0.5 ] ];

    let pnts = [ [ 0.5, -0.1,  -0.1 ],
                 [ 0.5,  0.1,  -0.1 ],
                 [ 0.5,  0.1,   0.1 ],
                 [ 0.5, -0.1,   0.1 ] ];


    let sliderA = document.getElementById("SliderAlpha");
    let sliderB = document.getElementById("SliderBeta");
    let sliderC = document.getElementById("SliderGamma");


    sliderA.addEventListener("input", function(e){
        //console.log( sliderA.value );
        alpRad =  sliderA.value * Math.PI / 180.0;
    })

    sliderB.addEventListener("input", function(e){
        //console.log( sliderB.value );
        betRad =  sliderB.value * Math.PI / 180.0;
    })

    sliderC.addEventListener("input", function(e){
        //console.log( sliderC.value );
        gamRad =  sliderC.value * Math.PI / 180.0;
    })

    window.addEventListener("deviceorientation", function(e){
        //alpRad = ( e.alpha || 0) * Math.PI / 180.0;
        //betRad = ( e.beta  || 0) * Math.PI / 180.0;
        //gamRad = ( e.gamma || 0) * Math.PI / 180.0;

        //alpRad =  20.0 * Math.PI / 180.0;
        //betRad =   0.0 * Math.PI / 180.0;
        //gamRad = 120.0 * Math.PI / 180.0;

        alpRad =  sliderA.value * Math.PI / 180.0;
        betRad =  sliderB.value * Math.PI / 180.0;
        gamRad =  sliderC.value * Math.PI / 180.0;

    });

    function calcDCM(){

        let ca = Math.cos( alpRad );
        let sa = Math.sin( alpRad );
        let cb = Math.cos( betRad );
        let sb = Math.sin( betRad );
        let cg = Math.cos( gamRad );
        let sg = Math.sin( gamRad );

        let m11 = - ( sg * ca + cg * sb * sa );
        let m21 =   - cb * sa ;
        let m31 =   - sg * ca + cg * sb * sa ;

        let m12 =  - ( cg * sa - sg * sb * ca );;
        let m22 =      cb * ca ;
        let m32 =    - sg * sa - cg * sb * ca  ;

        let m13 = - sg * cb;
        let m23 =   sb;
        let m33 =   cg * cb;

        let phi = 180.0 / Math.PI * Math.atan2(   m23, m33 );
        let the = 180.0 / Math.PI * Math.atan2( - m13, Math.sqrt( m23 * m23 + m33 * m33) );
        let psi = 180.0 / Math.PI * Math.atan2(   m12, m11 );
        //console.log( phi, the, psi );

        return [ [ m11, m12, m13 ],
                 [ m21, m22, m23 ],
                 [ m31, m32, m33 ] ];
        //return [ [ 1.0, 0.0, 0.0 ],
        //         [ 0.0, 1.0, 0.0 ],
        //         [ 0.0, 0.0, 1.0 ] ];

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

                        let e = W / 2.0 / Math.tan( fovy / 2.0 * Math.PI / 180.0 );

                        //console.log( W, H, e );

                        ctx.save();

                        ctx.fillStyle = "#ddd";
                        ctx.fillRect(0, 0, W, H );

                        //ctx.font = "24px system";
                        //ctx.fillStyle = "#F55";
                        //ctx.textBaseline = "top";
                        //ctx.fillText("X: " + X , 20,  20);
                        //ctx.fillText("Y: " + Y , 20,  60);
                        //console.log( pnts.length );

                        ctx.beginPath();

                        let dcm = calcDCM();
                        for( let k = 0; k<pnts.length; k++ ){
                            let x = 0.0;
                            let y = 0.0;
                            let z = 0.0;
                            for( let j = 0; j<3; j++ ){
                                x += dcm[0][j] * pnts[k][j];
                                y += dcm[1][j] * pnts[k][j];
                                z += dcm[2][j] * pnts[k][j];
                            }
                            XX = W / 2.0 + e * z / x;
                            YY = H / 2.0 - e * y / x;

                            //console.log( XX, YY );

                            if( k==0 ){ ctx.moveTo( XX, YY ); }
                            else      { ctx.lineTo( XX, YY ); }
                        }

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

                        ctx.restore();

                    })
                    .catch( (e) => {} );
             }, 10 );

        })
        .catch(e => alert("error" + e.message));

};

