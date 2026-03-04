
// document.body.onclick = function () {
//     // window.open('','_self').close();
// }

//idで指定したボタンがクリックされたときのイベントリスナーを追加
const trainInfoElement = document.getElementById("train-info");

  trainInfoElement.addEventListener('click', function() {
    //処理内容
    if (trainIndex == 0){
        trainIndex = 1;
    }
    else{
        trainIndex = 0;
    }
    trainInfo();
});

const dustElement = document.getElementById("dust");

  dustElement.addEventListener('click', function() {
    //処理内容
    debugDustIndex++;
    dustDay();
});

//クラス名で指定したボタンがクリックされたときのイベントリスナーを追加
// const button = document.querySelector('.myClass');

// button.addEventListener('click'() => {
//     alert('クラス名で指定したボタンがクリックされました！');
// });

function weather() {

    if (DEBUG_MODE == false) {
        var req = new XMLHttpRequest();

        req.onreadystatechange = function () {		  // XMLHttpRequest オブジェクトの状態が変化した際に呼び出されるイベントハンドラ
            if (req.readyState == 4 && req.status == 200) { // サーバーからのレスポンスが完了し、かつ、通信が正常に終了した場合
                //alert(req.responseText);		          // 取得した JSON ファイルの中身を表示
            }
        };
        //city1
        req.open('GET', CITY_WEATHER_1, false); // 非同期通信で指定した URL のデータを取得する
        req.send(null);		                          // リクエストを送信
        console.log("CITY_1!");
        var data = JSON.parse(req.responseText);      // 取得した JSON ファイルを JavaScript のオブジェクトに変換
        console.log(data);

        //city2
        req.open('GET', CITY_WEATHER_2, false); // 非同期通信で指定した URL のデータを取得する
        req.send(null);		                          // リクエストを送信
        console.log("CITY_2!");
        var data2 = JSON.parse(req.responseText);      // 取得した JSON ファイルを JavaScript のオブジェクトに変換

    }
    else {// デバッグモードの場合は、ローカルの JSON データを使用する
        var data = weatherDataDemo;
        var data2 = weatherDataDemo;
    }

    //city1    
    var msg = data.description.text;              // オブジェクトの中から、天気予報の説明文を取得
    var img = data.forecasts[0].image.url;        // オブジェクトの中から、天気予報の画像 URL を取得
    var temperatureMax = data.forecasts[0].temperature.max.celsius; // 最高気温を取得
    var chanceOfRain = data.forecasts[0].chanceOfRain; // 降水確率を取得

    document.getElementById("city-name-1").innerHTML = CITY_NAME_1; // 都市名を表示

    if (DEBUG_MODE == false) {
        document.getElementsByClassName("forecast__image__1")[0].src = img; // 画像の src 属性を更新
    }else{
        document.getElementsByClassName("forecast__image__1")[0].src = "./img/212.svg"; // 画像の src 属性を更新
    }

    if (temperatureMax !== null) {
        document.getElementById("max__1").innerHTML = temperatureMax + "℃"; // 最高気温を表示
    }
    document.getElementById("chanceOfRain__1").innerHTML
        = chanceOfRain.T00_06.slice(0, -1) + " / "
        + chanceOfRain.T06_12.slice(0, -1) + " / "
        + chanceOfRain.T12_18.slice(0, -1) + " / "
        + chanceOfRain.T18_24; // 降水確率を表示
    // alert(img);                                  // 取得した天気予報の説明文をアラートで表示


    //city2
    msg = data2.description.text;              // オブジェクトの中から、天気予報の説明文を取得
    img = data2.forecasts[0].image.url;        // オブジェクトの中から、天気予報の画像 URL を取得
    temperatureMax = data2.forecasts[0].temperature.max.celsius; // 最高気温を取得
    chanceOfRain = data2.forecasts[0].chanceOfRain; // 降水確率を取得

    document.getElementById("city-name-2").innerHTML = CITY_NAME_2; // 都市名を表示

    if (DEBUG_MODE == false) {
        document.getElementsByClassName("forecast__image__2")[0].src = img; // 画像の src 属性を更新
    }else{
        document.getElementsByClassName("forecast__image__2")[0].src = "./img/100.svg"; // 画像の src 属性を更新
    }
    
    if (temperatureMax !== null) {
        document.getElementById("max__2").innerHTML = temperatureMax + "℃"; // 最高気温を表示
    }
    document.getElementById("chanceOfRain__2").innerHTML
        = chanceOfRain.T00_06.slice(0, -1) + " / "
        + chanceOfRain.T06_12.slice(0, -1) + " / "
        + chanceOfRain.T12_18.slice(0, -1) + " / "
        + chanceOfRain.T18_24; // 降水確率を表示
    // alert(img);                                  // 取得した天気予報の説明文をアラートで表示

}
function trainInfoStatusDisplay(status, cause, space) {
    var p = document.getElementById("train-info-status");
    // var status_cause=status+"　"+cause;
    var status_cause = status + "　" + cause;
    if (status_cause.length > 10) {
        p.style.animationDuration = (status_cause.length * 0.2) + "s";
        // p.style.animationName = "SlideSample";
        // p.style.animationPlayState = "running";
        // p.style.animationIterationCount = "infinite";
        p.classList.add("scrollEnable");

        document.getElementsByClassName("train-status")[0].textContent = status;


        

        document.getElementById("train-info-status").innerHTML = cause + space + cause + space;
    }
    else {
        p.style.animation = "none";
        document.getElementsByClassName("train-status")[0].textContent = status;
        document.getElementById("train-info-status").innerHTML = cause;
        // document.getElementById("train-info").innerHTML = info;
    }
}
function trainInfoSuccess(data) {

    //更新時刻の取得※取得した時間ではなく、取得したデータにある更新時刻を読み込み
    var date = data["dc:date"].substr(11, 5);

    //運行情報の取得
    var info = data["odpt:trainInformationText"].ja; // オブジェクトの中から、運行情報のテキストを取得
    const space = "　　　　";

    //天気の右側の情報の表示
    if (info != "平常運転") {
        var range = data["odpt:trainInformationRange"].ja; // 運行情報の範囲を取得
        var status = data["odpt:trainInformationStatus"].ja; // 運行情報のステータスを取得
        var cause = data["odpt:trainInformationCause"].ja; // 運行情報の原因を取得
        document.getElementById("train-info-range").innerHTML = range;
        trainInfoStatusDisplay(status, cause, space);
    } else {
        document.getElementsByClassName("train-status")[0].textContent = "";
        document.getElementById("train-info-range").innerHTML = "";
        document.getElementById("train-info-status").innerHTML = "";
    }

    //////////////////////////////////////////////////
    //運行情報
    console.log("train-info length:", info.length);
    var p = document.getElementById("train-info");
    if (info.length > 10) {
        p.style.animationDuration = (info.length * 0.2) + "s";
        // p.style.animationDuration ="10s";
        p.style.animationName = "SlideSample";
        p.style.animationPlayState = "running";
        p.style.animationIterationCount = "infinite";
        p.style.animationTimingFunction = "linear";

        document.getElementById("train-info").innerHTML = info + space + info + space;
    }
    else {
        p.style.animation = "none";
        document.getElementById("train-info").innerHTML = info;
    }
    //////////////////////////////////////////////////

    document.getElementById("train-info-updatetime").innerHTML = "更新時刻 " + date;


}

function trainInfo() {
    if (DEBUG_MODE == false) {
        var req = new XMLHttpRequest(); // XMLHttpRequest オブジェクトを生成
        req.open('GET', API_URL);       // URL のデータを取得する
        req.send(null);                 // リクエストを送信

        req.onload = function () {		          // リクエストが成功した場合に呼び出されるイベントハンドラ
            if (req.status == 200) {		          // サーバーからのレスポンスが正常に終了した場合
                console.log("Train Info Loaded Successfully");

                var data = JSON.parse(req.response || "null");      // 取得した JSON ファイルを JavaScript のオブジェクトに変換
                console.log(req.response); // 取得したデータをコンソールに表示
                trainInfoSuccess(data[trainIndex]); // 運行状況を表示する関数を呼び出す

            } else {
                var errorText = req.statusText;
                var errorNo = req.status;
                console.error("Error: " + errorText); // エラーが発生した場合はエラーメッセージを表示
                console.error("ErrorNo: " + errorNo); // エラーが発生した場合はエラーメッセージを表示
                document.getElementById("train-info").innerHTML = errorText + " (" + errorNo + ")"; // エラーが発生した場合はエラーメッセージを表示
                return;
            }
        };
        req.onerror = function () {		          // リクエストが失敗した場合に呼び出されるイベントハンドラ
            console.error("Request failed");      // エラーメッセージを表示
            document.getElementById("train-info").innerHTML = "trainInfo request failed"; // エラーメッセージを表示
            return;
        };
    }
    else {// デバッグモードの場合は、ローカルの JSON データを使用する

        trainInfoSuccess(trainInfoData[trainIndex]);
    }
}
function timeToSec(str) {
    // 時刻を秒に変換する関数
    // 例: "12:34" -> 12 * 3600 + 34 * 60
    var hour = parseInt(str.substr(0, 2), 10);
    var minute = parseInt(str.substr(3, 2), 10);
    // var second = parseInt(str.substr(6,2), 10);

    // console.log("hour:minute=" + hour + ":" + minute + ":" + second );
    // return hour * 3600 + minute * 60 + second;
    console.log("h:m=" + hour + ":" + minute);
    return hour * 3600 + minute * 60;

}

function twoDigit(num) {
    let ret;
    if (num < 10) {
        ret = "0" + num;
    } else {
        ret = num;
    }
    return ret;
}

function showClock() {
    var time = new Date();
    var month = time.getMonth() + 1; // 月は0から始まるので1を足す
    var day = time.getDate();
    var week = time.getDay();
    var week_ja = new Array("日", "月", "火", "水", "木", "金", "土")

    var hour = twoDigit(time.getHours());
    var minute = twoDigit(time.getMinutes());
    var second = twoDigit(time.getSeconds());

    // var msgDay = month+"月"+day+"日"+"（"+week_ja[week]+"）";
    var msgDay = month + "/" + day + "（" + week_ja[week] + "）";
    // var msgDay = 12+"/"+28+"（"+week_ja[week]+"）";

    // var msgTime = hour+"時"+minute+"分"+second+"秒";
    // var msgTime = hour+"："+minute+"："+second;
    var msgTime = hour + ":" + minute + ":" + second;

    document.getElementById("realTime").innerHTML = msgTime;
    document.getElementById("realDay").innerHTML = msgDay;


    if (second == "00") {
        timeSay(Number(hour), Number(minute));

    }
}
// 鉄道会社名を表示。一度きりでいいのでここに書く
document.getElementById("trainName").innerHTML = TRAIN_NAME;


setInterval('showClock()', 1000);// 現在時刻。1秒ごとに更新		

trainInfo();// 運行情報を取得
setInterval('trainInfo()', 600000);// 10分ごとに更新

dustDay();// ゴミの日を表示。定義はconfig.jsに記載
setInterval('dustDay()', 600000);// 10分ごとに更新

weather();// 天気予報を取得。

