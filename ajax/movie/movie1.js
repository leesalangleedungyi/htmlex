let txtYear = document.querySelector("#txtYear");
let selMon = document.querySelector("#selMon");
let selDay = document.querySelector("#selDay");
let msg = document.querySelector("#msg");

function init() {
  //어제 날짜 구하기

  //오늘 날짜 확인
  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth() + 1; // month 0 : 1월
  var day = today.getDate() - 1; // 어제 날짜

  // 1~9월은 앞에 0 추가 / 1~9 일 앞에 0 추가
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }

  //어제 날짜 구한 부분을 상단의 날짜 부분에 보여주기
  txtYear.value = year;
  selMon.value = month;
  selDay.value = day;
}

function show(movieCd) {
  //alert(movieCd);

  var url =
    "http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=f5eef3421c602c6cb7ea224104795888&movieCd=" +
    movieCd;

  //fetch 요청
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("데이터가 없습니다.");
      }
      return response.json();
    })
    .then((data) => {
      
    
      var movieInfo = data.movieInfoResult.movieInfo;

      var movieNm = movieInfo.movieNm;
      var movieNmEn = movieInfo.movieNmEn;
      var showTm = movieInfo.showTm;
      var genres = movieInfo.genres[0].genreNm
      var director = movieInfo.directors[0].peopleNm;
      var actors = movieInfo.actors;

      var temp = "";
      var actors_length = actors.length;
      actors.forEach((item, idx) => {
        if (idx == actors_length - 1) {
          temp += item.peopleNm;
        } else {
          temp += item.peopleNm + ", ";
        }
      });

      let str = "<ul>";
      str += "<li>영화제목 : " + movieNm + "</li>";
      str += "<li>영어제목 : " + movieNmEn + "</li>";
      str += "<li>상영시간 : " + showTm + "분 </li>";
      str += "<li>영화종목 : " + genres + "</li>";
      str += "<li>감독 : " + director + "</li>";
      str += "<li>배우 : " + temp + "</li>";

      document.querySelector(".box3").innerHTML = str;
    })
    .catch((error) => {
      msg.innerHTML = error;
    });
}

window.onload = function () {
    init();
  
    document.querySelector("#bt1").addEventListener("click", getOrder);
  
    function getOrder() {
      //url 생성
  
      var url =
        "https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?key=f5eef3421c602c6cb7ea224104795888&weekGb=0&targetDt=";
  
      url += txtYear.value + selMon.value + selDay.value;
  
      console.log(url);
  
      //fetch 요청
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("데이터가 없습니다.");
          }
          return response.json();
        })
        .then((data) => {
        
  
          var boxOfficeResult = data.boxOfficeResult;
          
  
          // 결과 변수 선언
          let str = "";
          
          
          var yearWeekTime = boxOfficeResult.yearWeekTime + '번째 주'
          str += yearWeekTime
          var showRange = "(날짜:"+boxOfficeResult.showRange+")"
          str += showRange +"<br>"

          boxOfficeResult.weeklyBoxOfficeList.forEach((item) => {
            //순위
            str += "<br>"+item.rank + " 위";

            // 누적 관객수
            str += "<br>누적 관객 수:("+item.audiCnt + "명)<br>"

            //영화코드
            var movieCd = item.movieCd;
  
            //영화명
            var movieNm = item.movieNm + "<br>";
  
            str +=
              "<a href='#' onclick='javascript:show(" + movieCd + ")'>" + movieNm + "</a>";
          });
          msg.innerHTML = str;
        })
        .catch((error) => {
          msg.innerHTML = error;
        });
    }
  };
