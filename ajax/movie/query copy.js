/*
  영화진흥위원회 일일박스오피스 json ==> jquery 작성
*/

let week = document.querySelector('nthweek')


$(function () {
  init();

  $("#bt1").click(function () {
    //url 생성

    var url =
      "https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.xml?key=f5eef3421c602c6cb7ea224104795888&weekGb=0&targetDt=";

    url += week.value;

    console.log(url);

    $.ajax({
      url: url,
      success: function (data) {
        var boxOfficeResult = data.boxOfficeResult;
        console.log(boxOfficeResult);

        // 결과 변수 선언
        let str = "";

        boxOfficeResult.dailyBoxOfficeList.forEach((item) => {
          //순위
          str += item.rank + " 위";


          //영화코드
          var movieCd = item.movieCd;

          //영화명
          var movieNm = item.movieNm + "<br>";

          str +=
            "<a href='#' onclick='javascript:show(" + movieCd + ")'>" + movieNm + "</a>";
        });
        $(".box3").html(str);
      },
    });
  });
});
