var year2=document.querySelector('#year1');
var mon2=document.querySelector('#Mon1');
var day2=document.querySelector('#Day1');
var msg = document.querySelector("#msg");


function init(){
    //어제 날짜 구하기

    //오늘 날짜 확인
    var today=new Date();
    var year3=today.getFullYear();
    var month3=today.getMonth()+1; // 시작이 0
    var day3=today.getDate()-1; // 시작이 어제 날짜 확인
    

    //1~9월에 대해서 앞에 0 추가 /  1-9일 도 앞에 0 추가 하기

    if(month3<10){
        month3="0"+month3;
    }
    if(day3<10){
        day3="0"+day3;
    }
    // 어제 날짜  박스오피스 기본으로 만들기

   year2= year3;
   mon2= month3;
   day2= day3;
    
}
function show(moiveCd){
   // alert(moiveCd);

   var url="http://kobis.or.kr/kobisopenapi/webservice/rest/people/searchPeopleInfo.xml?key=f5eef3421c602c6cb7ea224104795888&peopleCd="

   fetch(url).then((response)=>
   {
    !response.ok{
        throw new Error('데이터가 없습니다.')
        retrun response.text()
    }
   }).then((data)=>{

   }).catch((error) => {
    msg.innerHTML=error;
   });
}
window.onload = function(){
    init();

    document.querySelector('#bt1').addEventListener('click',getOrder);

    function getOrder(){
        // url 생성
        
        
        var url="https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.xml?key=f5eef3421c602c6cb7ea224104795888&targetDt="

        url += year2+mon2+day2;

        console.log(url)

        fetch(url)
        .then((response)=>{

            if(!response.ok){
                throw new Error
            }
            return response.text();
        })
        .then((data)=>{
            const parser = new DOMParser();
            const xml = parser.parseFromString(data,"application/xml")

            dailyBoxOffice = xml.querySelector('dailyBoxOffice');

            //console.log(dailyBoxOffice)
             

            //결과 변수 선언

            let str = "";
            dailyBoxOffice.forEach((item,idx)=>{
                //순위
                str += item.querySelector("rank").text()
                //증감
                var rankInten = parseInt(item.querySelector("rankInten").textContet);
                if(rankInten>0)str +="(△";
                else if (rankInten<0) str +="(▽"
                else str += "("

                str +=rankInten + ") :"



                //영화 코드

                var moiveCd= item.querySelector("movieCd").textContet;
                //영화명
                var movieNm = item.querySelector("movieNm").textContet+"<br>";
                str += "<a href='#' onclick='javascript:show(")>+movieNm +"</a>"
            });
            msg.innerHTML=str;
        }).catch((error)=>{
                msg.innerHTML=error;
            });

    }


};