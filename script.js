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
		
	ctx.fillText("alpha: " + e.alpha, 20,  20);	// z軸
	ctx.fillText("beta: "  + e.beta , 20,  60);	// x軸
	ctx.fillText("gamma: " + e.gamma, 20, 100);	// y軸

	//ctx.fillText("absolute: " + e.absolute, 20, 180);	// 相対値: true 絶対値: false

        let alp = e.alpha;
        let bet = e.beta;
        let gam = e.gamma;

        //let alp = 100;
        //let bet = -50;
        //let gam = 90;

        ctx.strokeStyle = 'black';
        ctx.beginPath();
        ctx.moveTo( 0, H / 2.0 );
        ctx.lineTo( W, H / 2.0 );
        ctx.stroke();

	ctx.fillStyle = "#f00";
	ctx.fillRect( W       / 12.0, H / 2.0, W / 6.0, - alp / 180.0 * H / 2.0 );

	ctx.fillStyle = "#0f0";
	ctx.fillRect( W * 5.0 / 12.0, H / 2.0, W / 6.0, - bet / 180.0 * H / 2.0 );

	ctx.fillStyle = "#00f";
	ctx.fillRect( W * 9.0 / 12.0, H / 2.0, W / 6.0, - gam / 180.0 * H / 2.0 );



	}, false);
};

