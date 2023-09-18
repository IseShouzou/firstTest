/*
 * 加速度センサーの値を取得する
 */
 
/*
 * 定数
 */
const SCREEN_WIDTH = 480;		// キャンバス幅
const SCREEN_HEIGHT = 480;	// キャンバス高さ

/*
 * グローバル変数
 */
//var canvas = null;	// キャンバス
//var ctx = null;	// コンテキスト

/*
 * 起動処理
 */
window.onload = function(){

    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;
	
    // 加速度センサーイベント処理
    window.addEventListener("deviceorientation", function(e){
	// キャンバスをクリア
	ctx.fillStyle = "#ddd";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// キャンバスに加速度センサーの各プロパティを表示
	ctx.font = "24px system";
	ctx.fillStyle = "#555";
	ctx.textBaseline = "top";	// 文字のベースラインを上に
		
	ctx.fillText("alpha: " + e.alpha, 20,  20);	// z軸
	ctx.fillText("beta: "  + e.beta , 20,  60);	// x軸
	ctx.fillText("gamma: " + e.gamma, 20, 100);	// y軸

	ctx.fillText("absolute: " + e.absolute, 20, 180);	// 相対値: true 絶対値: false

	}, false);
};

