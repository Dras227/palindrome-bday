

var userBday = document.getElementById("bdate")
var btnCheck = document.querySelector("#btn-check")
var output = document.querySelector(".output")

console.log(output)

function palindromeChecker(s) {
	return s == (s.split('').reverse().join(''));
}
function manyVersions(goodDate) {
	DDMMYYYY = goodDate.day + goodDate.month + goodDate.year;
	MMDDYYYY = goodDate.month + goodDate.day + goodDate.year;
	YYYYMMDD = goodDate.year + goodDate.month + goodDate.day;
	DDMMYY = goodDate.day + goodDate.month + goodDate.year.slice(-2);
	MMDDYY = goodDate.month + goodDate.day + goodDate.year.slice(-2);
	YYMMDD = goodDate.year.slice(-2) + goodDate.month + goodDate.day;

	var dates = [DDMMYYYY,
		MMDDYYYY,
		YYYYMMDD,
		DDMMYY,
		MMDDYY,
		YYMMDD]

	return dates;
}
function dateToStr(rawDate) {
	goodDate = { year: '', month: '', day: '' }

	if (rawDate.day < 10) {
		goodDate.day = '0' + rawDate.day;
	}
	else {
		goodDate.day = rawDate.day.toString();
	}
	if (rawDate.month < 10) {
		goodDate.month = '0' + rawDate.month;
	}
	else {
		goodDate.month = rawDate.month.toString();
	}
	goodDate.year = rawDate.year.toString()
	return goodDate;
}
function checkPalindromeForAll(dateList) {

	var flagList = [] ;

    //console.log("hello cool")
    dateList.forEach((item,index) => {
        flagList.push(palindromeChecker(item));
       
    });
	return flagList;
}
function  isLeap(year) {

    if(year % 400 === 0 )
        return true;
    if(year % 100 === 0)
        return false;
     if(year % 4 === 0)
        return true;
    return false;   
}
function nextDate(date)
{
    var day = date.day;
    var month = date.month;
    var year = date.year;

    //console.log(day)
    // declar an array of no. of days in a month

    var montlyDay = [31,29,31,30,31,30,31,31,30,31,30,31]
    if(month === 2)
    {
        if(isLeap(year))
        {
            if(day >= 29)
            {
                month++;
                day = 1;
            }
            else day++;
        }
        else
        {
            if(day >= 28)
            {
                day = 1;
                month++;
            }else day++;
        }
        
    }
    else
    {
        // do something
        if(day >= montlyDay[month-1])
        {
            day  = 1;
            month++;
        }
        else{
            day++;
        }
    }
    if(month > 12)
    {
        month= 1;
        year++;
    }

    return {
        day:day,
        month:month,
        year:year
    }
}
function  getNextPalindromeDate(date) {
    var cnt =0 ;
    while(1)
    {     
        //console.log(cnt)
        var dateStr = dateToStr(date);
        var manyVR = manyVersions(dateStr);
        var resultList = checkPalindromeForAll(manyVR);
    
        for(let i=0;i<resultList.length;i++)
            {
                if(resultList[i])
                {
                    return [date,cnt,manyVR[i]];
                }
            } 
        cnt++;
        date = nextDate(date);
    }

    return "hi"

}
function  getPreviousPalindromeDate(date) { 
     var cnt =0 ;
    while(1)
    {     
       // console.log(cnt)
        var dateStr = dateToStr(date);
        var manyVR = manyVersions(dateStr);
        var resultList = checkPalindromeForAll(manyVR);
    
        for(let i=0;i<resultList.length;i++)
            {
                if(resultList[i])
                {
                    return [date,cnt,manyVR[i]];
                }
            } 
        cnt++;
        date = getPreviousDate(date);
       // console.log(date)
    }

    return "hi"
}
function getPreviousDate(date) {
    var day = date.day;
    var month = date.month;
    var year = date.year;

    var montlyDay = [31,29,31,30,31,30,31,31,30,31,30,31]
    if(month<=1 && day <=1)
    {
        year--;
        return {
            day:31,
            year:year,
            month:12
        }
    }
    if(month==3)
    {
        if(isLeap(year))
        {
            if(day<=1)
            {
                day = 29;
                month = 2;
            }
            else day--;
        }
        else if(day<=1)
        {
            day = 28;
            month = 2;
        }
        else day--;
    }
    else if(day==1)
    {
        day = montlyDay[month-2]       
        month--;
    }
    else day--;

    

    return {
        day:day,
        month:month,
        year:year
    }
}

btnCheck.addEventListener("click",()=>{
    var input = userBday.value
    var d = new Date(input)
    date = {
        day:d.getDate(),
        month:d.getMonth()+1,
        year:d.getFullYear()
    }
    

    var p =getPreviousPalindromeDate(date)

    var n = getNextPalindromeDate(date)

    
    var paliDate,counter,type;
    if(p[1] < n[1])
    {
        paliDate = p[0]
        counter = p[1];
        type = p[2];
    }
    else {
        paliDate = n[0]
        counter = n[1];
        type = n[2];
    }
    //console.log(paliDate,counter)

    showInVP(paliDate,counter,n[2]);
})

function showInVP(date,missed_days,formate)
{
    output.innerHTML = ""
    output.style.display = "block"
    var msg = ""
    if(missed_days > 0)
    {
        var msg2 = "You missed by "+missed_days + " days";
         msg = "\nThe nearest palindrome date is "+date.day +"-" + date.month +"-"+date.year+", ";
        msg+=msg2;
        //console.log(msg);
    }
    else{
        msg = "Congrats!! Your Birthday is a Palindrome "
    }
    var tNode = document.createTextNode(msg);
        output.append(tNode);
}
