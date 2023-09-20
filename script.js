window.onload = function(){

    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

    window.addEventListener("deviceorientation", function(e){

        let W = canvas.width;
        let H = canvas.height;

        //console.log( W, H );

	ctx.fillStyle = "#ddd";
	ctx.fillRect(0, 0, W, H );

	// キャンバスに加速度センサーの各プロパティを表示
	ctx.font = "24px system";
	ctx.fillStyle = "#F55";
	ctx.textBaseline = "top";	// 文字のベースラインを上に


        let alpRad = ( e.alpha || 0) * Math.PI / 180;
        let betRad = ( e.beta  || 0) * Math.PI / 180;
        let gamRad = ( e.gamma || 0) * Math.PI / 180;

        let ca = Math.cos( alpRad );
        let sa = Math.sin( alpRad );
        let cb = Math.cos( betRad );
        let sb = Math.sin( betRad );
        let cg = Math.cos( gamRad );
        let sg = Math.sin( gamRad );


        //let m11 =   cg * ca - sg * sb * sa ;
        //let m21 =   cg * sa + sg * sb * ca ;
        //let m31 = - sg * cb ;

        //let m12 = - cb * sa ;
        //let m22 =   cb * ca ;
        //let m32 =   sb      ;

        //let m13 =   sg * ca + cg * sb * sa ;
        //let m23 =   sg * sa - cg * sb * ca ;
        //let m33 =   cg * cb ;


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

	}, false);
	
};

