const ji_0 = new Audio("./media/time_h_0.wav");
const ji_1 = new Audio("./media/time_h_1.wav");
const ji_2 = new Audio("./media/time_h_2.wav");
const ji_3 = new Audio("./media/time_h_3.wav");
const ji_4 = new Audio("./media/time_h_4.wav");
const ji_5 = new Audio("./media/time_h_5.wav");
const ji_6 = new Audio("./media/time_h_6.wav");
const ji_7 = new Audio("./media/time_h_7.wav");
const ji_8 = new Audio("./media/time_h_8.wav");
const ji_9 = new Audio("./media/time_h_9.wav");
const ji_10 = new Audio("./media/time_h_10.wav");
const ji_11 = new Audio("./media/time_h_11.wav");
const ji_12 = new Audio("./media/time_h_12.wav");
const hun_1 = new Audio("./media/time_m_1.wav");
const hun_2 = new Audio("./media/time_m_2.wav");
const hun_3 = new Audio("./media/time_m_3.wav");
const hun_4 = new Audio("./media/time_m_4.wav");
const hun_5 = new Audio("./media/time_m_5.wav");
const hun_6 = new Audio("./media/time_m_6.wav");
const hun_7 = new Audio("./media/time_m_7.wav");
const hun_8 = new Audio("./media/time_m_8.wav");
const hun_9 = new Audio("./media/time_m_9.wav");
const hun_10 = new Audio("./media/time_m_10.wav");
const hun_20 = new Audio("./media/time_m_20.wav");
const hun_30 = new Audio("./media/time_m_30.wav");
const hun_40 = new Audio("./media/time_m_40.wav");
const hun_50 = new Audio("./media/time_m_50.wav");
const digit2_10 = new Audio("./media/time_10-.wav");
const digit2_20 = new Audio("./media/time_20-.wav");
const digit2_30 = new Audio("./media/time_30-.wav");
const digit2_40 = new Audio("./media/time_40-.wav");
const digit2_50 = new Audio("./media/time_50-.wav");

var playlist = [];
var playlistIndex = 0;

const handler = () => {            
    playlistSay();
};

function playlistSay() {
    // console.log("playlistIndex:", playlistIndex, "playlistLength:", playlist.length,playlist);

    if (playlistIndex < playlist.length) {
        // var playlistIndexLocal = playlistIndex;
        playlist[playlistIndex].play();
        playlist[playlistIndex++].addEventListener("ended", handler);
        

    } else {
        for (var i = 0; i < playlist.length; i++) {
            playlist[i].removeEventListener("ended", handler);
        }
        // playlist[playlistIndexLocal].removeEventListener("ended", handler);
        // console.log("playlistIndexLocal:", playlistIndexLocal, "playlistIndex:", playlistIndex);
    }
}


function hourSay(hour) {
    if (hour == 0) {
        // ji_0.play();
        playlist.push(ji_0);
    }
    else if (hour == 1 || hour == 13) {
        // ji_1.play();
        playlist.push(ji_1);
    }
    else if (hour == 2 || hour == 14) {
        // ji_2.play();
        playlist.push(ji_2);
    }
    else if (hour == 3 || hour == 15) {
        // ji_3.play();
        playlist.push(ji_3);
    }
    else if (hour == 4 || hour == 16) {
        // ji_4.play();
        playlist.push(ji_4);
    }
    else if (hour == 5 || hour == 17) {
        // ji_5.play();
        playlist.push(ji_5);
    }
    else if (hour == 6 || hour == 18) {
        // ji_6.play();
        playlist.push(ji_6);
    }
    else if (hour == 7 || hour == 19) {
        // ji_7.play();
        playlist.push(ji_7);
    }
    else if (hour == 8 || hour == 20) {
        // ji_8.play();
        playlist.push(ji_8);
    }
    else if (hour == 9 || hour == 21) {
        // ji_9.play();
        playlist.push(ji_9);
    }
    else if (hour == 10 || hour == 22) {
        // ji_10.play();
        playlist.push(ji_10);
    }
    else if (hour == 11 || hour == 23) {
        // ji_11.play();
        playlist.push(ji_11);
    }
    else if (hour == 12) {
        // ji_12.play();
        playlist.push(ji_12);
    }
}

function timeSay(hour, min) {
    var firstDigit = min % 10; // 最後の一桁を取得
    // console.log("firstDigit:", firstDigit);

    // console.log("min:", min, "hour:", hour, "firstDigit:", firstDigit);    
    // console.log("min:", min, "hour:", hour);    
    // console.log("minType:", typeof min, "hourType:", typeof hour);    

    playlist = []; // Clear the playlist
    playlistIndex = 0; // Reset the index for the next playback
        
    if (min == 0) {
        hourSay(hour);
    }
    else if ( min == 10 ) {
        playlist.push(hun_10);
    }
    else if ( min == 20 ) {
        playlist.push(hun_20);
    }
    else if ( min == 30 ) {
        playlist.push(hun_30);
    }
    else if ( min == 40 ) {
        playlist.push(hun_40);
    }
    else if ( min == 50 ) {
        playlist.push(hun_50);
    }
    else if (10 < min && min < 20) {
        playlist.push(digit2_10);
    }
    else if (20 < min && min < 30) {
        playlist.push(digit2_20);
    }
    else if (30 < min && min < 40) {
        playlist.push(digit2_30);
    }
    else if (40 < min && min < 50) {
        playlist.push(digit2_40);
    }
    else if (50 < min && min < 60) {
        playlist.push(digit2_50);
    }
    

    if (firstDigit == 1 ) {
        playlist.push(hun_1);
    }
    else if (firstDigit == 2 ) {
        playlist.push(hun_2);       
    }
    else if (firstDigit == 3 ) {
        playlist.push(hun_3);
    }
    else if (firstDigit == 4 ) {
        playlist.push(hun_4);
    }
    else if (firstDigit == 5 ) {
        playlist.push(hun_5);
    }
    else if (firstDigit == 6 ) {
        playlist.push(hun_6);
    }
    else if (firstDigit == 7 ) {
        playlist.push(hun_7);
    }
    else if (firstDigit == 8 ) {
        playlist.push(hun_8);
    }
    else if (firstDigit == 9 ) {
        playlist.push(hun_9);
    }
    playlistSay();
}
