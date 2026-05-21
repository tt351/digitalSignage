const CITY_WEATHER_1 = 'https://weather.tsukumijima.net/api/forecast/city/130010';
const CITY_WEATHER_2 = 'https://weather.tsukumijima.net/api/forecast/city/130010';
const CITY_NAME_1 = '都市名'; // 都市名を定数として定義
const CITY_NAME_2 = 'デモ'; // 都市名を定数として定義

const TRAIN_NAME = 'デモ東海道線'; // 鉄道路線名を定数として定義
const API_FILTER = ['', 'odpt:railway=odpt.Railway:JR-East.Tokaido', ''];
const YOUR_ACCESS_TOKEN = 'KEY';
const API_URL = 'https://api-challenge.odpt.org/api/v4/odpt:TrainInformation?odpt:operator=odpt.Operator:jre-is' + API_FILTER.join('&') + 'acl:consumerKey=' + YOUR_ACCESS_TOKEN;

const DEBUG_MODE = true; // デバッグモードを有効にするかどうかのフラグ
var IS_WEATHER_INFO_DISP = true; // 天気情報を表示するかどうかのフラグ
var trainIndex = 0; // 表示する運行情報のインデックス

var debugDustIndex = 0; // デバッグモードで表示するゴミの日のインデックス

function dustDay() {
    var time = new Date();
    if (DEBUG_MODE == true) {
        time.setDate(time.getDate() + debugDustIndex);
    }
    var month = time.getMonth() + 1; // 月は0から始まるので1を足す
    var day = time.getDate();
    var week = time.getDay();
    var week_ja = new Array("日", "月", "火", "水", "木", "金", "土")
    var nthWeek = Math.ceil(day / 7); // 何週目かを計算

    document.getElementById("dust").style.fontSize = "115px";

    //自分でゴミの種類ごとに曜日や何週目かといった条件を追加していく
    if (week_ja[week] == "日" ) {
        document.getElementById("dust").innerHTML = "ゴミの日A";
        document.getElementById("dust").style.color = "darkred";
    }
    else if (week_ja[week] == "月") {
        document.getElementById("dust").innerHTML = "ゴミの日ああああああああ";
        document.getElementById("dust").style.color = "darkorange";
        // document.getElementById("dust").style.fontSize = "6rem";
        document.getElementById("dust").style.fontSize = "96px";
    }    
    else if (week_ja[week] == "火") {
        document.getElementById("dust").innerHTML = "ゴミの日B";
        document.getElementById("dust").style.color = "darkgreen";
    }
    
    else if (week_ja[week] == "水") {
        document.getElementById("dust").innerHTML = "ゴミの日C";
        document.getElementById("dust").style.color = "darkgoldenrod";
    }
    else if (week_ja[week] == "木") {
        document.getElementById("dust").innerHTML = "XXX";
        document.getElementById("dust").style.color = "purple";
    }
    else if (week_ja[week] == "金") {
        document.getElementById("dust").innerHTML = "ゴミの日D";
        document.getElementById("dust").style.color = "darkblue";
    }
    else if (week_ja[week] == "土") {
        document.getElementById("dust").innerHTML = "ゴミの日E";
        document.getElementById("dust").style.color = "darkslategray";
    }
    // else if (week_ja[week] == "金" && (nthWeek == 2 || nthWeek == 4)) {
    //     document.getElementById("dust").innerHTML = "ゴミの日D";
    //     document.getElementById("dust").style.color = "darkblue";
    // }
    else {
        document.getElementById("dust").innerHTML = "ゴミ出しなし";
    }
}

//デバッグ用Jsonデータ
var trainInfoData = [
    {
        "dc:date":"2026-03-07T10:16:50+09:00",
        "odpt:trainInformationText":{
            "ja":"東海道線は、人身事故の影響で、上下線の一部列車に遅れがでています。"
        },
        "odpt:trainInformationCause":{
            "ja":"人身事故"
        },
        "odpt:trainInformationRange":{
            "ja":"全線"
        },
        "odpt:trainInformationStatus":{
            "ja":"遅延"
        }
    },
    {
        "dc:date": "2025-08-31T19:17:01+09:00",
        "odpt:trainInformationText": {
            "ja": "平常運転"
        },
    },
    {
        "dc:date": "2025-08-31T19:17:01+09:00",
        "odpt:trainInformationText": {
            "ja": "ここにはtrainInformationTextが入ります。"
        },
        "odpt:trainInformationCause": {
            "ja": "ここにはtrainInformationCauseが入ります。"
        },
        "odpt:trainInformationRange": {
            "ja": "いろは〜ほへと駅間"
        },
        "odpt:trainInformationStatus": {
            "ja": "遅延"
        }
    },
];

var weatherDataDemo =
{
    "title": "福岡県 久留米 の天気",
   
    "description": {
        "headlineText": "福岡、北九州地方では、３日夕方まで高波に注意してください。福岡県では、４日まで空気の乾燥した状態が続くため、火の取り扱いに注意してください。",
        "bodyText": "　福岡県は、寒気の影響により曇りとなっている所がありますが、高気圧に覆われて概ね晴れています。\n\n　３日は、寒気の影響によりはじめ曇りとなる所がありますが、高気圧に覆われて概ね晴れとなるでしょう。\n\n　４日は、高気圧に覆われて晴れとなる所もありますが、気圧の谷や湿った空気の影響により概ね曇りで、夜遅くは雨となるでしょう。",
        "text": "福岡、北九州地方では、３日夕方まで高波に注意してください。福岡県では、４日まで空気の乾燥した状態が続くため、火の取り扱いに注意してください。\n\n　福岡県は、寒気の影響により曇りとなっている所がありますが、高気圧に覆われて概ね晴れています。\n\n　３日は、寒気の影響によりはじめ曇りとなる所がありますが、高気圧に覆われて概ね晴れとなるでしょう。\n\n　４日は、高気圧に覆われて晴れとなる所もありますが、気圧の谷や湿った空気の影響により概ね曇りで、夜遅くは雨となるでしょう。"
    },
    "forecasts": [
        {
            "dateLabel": "今日",
            "temperature": {
                 "min": {
                    "celsius": null,
                },
                "max": {
                    "celsius": "14",
                }
            },
            "chanceOfRain": {
                "T00_06": "--%",
                "T06_12": "0%",
                "T12_18": "0%",
                "T18_24": "0%"
                // "T00_06": "90%",
                // "T06_12": "100%",
                // "T12_18": "100%",
                // "T18_24": "100%"
            },
            "image": {
                "url": "./img/100.svg"
            }
        },

        {
            "dateLabel": "明日",
            "temperature": {
                "min": {
                    "celsius": "4",
                },
                "max": {
                    "celsius": "18",
                }
            },
            "chanceOfRain": {
                "T00_06": "10%",
                "T06_12": "10%",
                "T12_18": "20%",
                "T18_24": "60%"
            },
            "image": {
                "url": "./img/212.svg",
            }
        }
    ]
};
