var listOfDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function reverseDate(date) {
  var newdate = [];
  var x = 0;
  for (var i = date.length - 1; i >= 0; i--) {
    newdate[x] = date[i];
    x++;
  }
  return newdate.join("");
}

function palindromeCheck(date) {
  var reversed = reverseDate(date);
  if (reversed === date) {
    return true;
  } else return false;
}

function convertDateToString(date) {
  var daystring;
  var month_string;
  var year_string = date.year.toString();
  if (date.day < 10) {
    daystring = "0" + date.day;
  } else daystring = date.day.toString();

  if (date.month < 10) {
    month_string = "0" + date.month;
  } else month_string = date.month.toString();

  return (date = { day: daystring, month: month_string, year: year_string });
}

function dateFormatter(date) {
  var dob = convertDateToString(date);
  var ddmmyyyy = dob.day.slice(-2) + dob.month.slice(-2) + dob.year;
  var mmddyyyy = dob.month.slice(-2) + dob.day.slice(-2) + dob.year;
  var yyyymmdd = dob.year + dob.month.slice(-2) + dob.day.slice(-2);
  var ddmmyy = dob.day.slice(-2) + dob.month.slice(-2) + dob.year.slice(-2);
  var mmddyy = dob.month.slice(-2) + dob.day.slice(-2) + dob.year.slice(-2);
  var yymmdd = dob.year.slice(-2) + dob.month.slice(-2) + dob.day.slice(-2);

  var formattedDateArray = [
    ddmmyyyy,
    mmddyyyy,
    yyyymmdd,
    ddmmyy,
    mmddyy,
    yymmdd,
  ];
  return formattedDateArray;
}

function CheckForAnyPalindrome(date) {
  var ListofDates = dateFormatter(date);
  var ispalindrome = false;
  var ispalindromeList = [];
  for (var x = 0; x < ListofDates.length; x++) {
    if (palindromeCheck(ListofDates[x]) === true) {
      ispalindrome = true;
      ispalindromeList.push(ispalindrome);
    } else {
      ispalindromeList.push(ispalindrome);
    }
  }
  return ispalindromeList;
}

function leapYearCheck(year) {
  var flag = false;
  if (year % 4 === 0) {
    if (year % 100 === 0) {
      if (year % 400 === 0) {
        flag = true;
      } else flag = false;
    } else flag = true;
  } else flag = false;

  return flag;
}

function NextDate(date) {
  var day = Number(date.day) + 1;
  var month = Number(date.month);
  var year = Number(date.year);
  if (month === 2) {
    if (leapYearCheck(year)) {
      if (day > 29) {
        day = 1;
        month = 3;
      }
    } else if (day > 28) {
      day = 1;
      month = 3;
    }
  } else if (day > listOfDaysInMonth[month - 1]) {
    day = 1;
    month++;
  }

  if (month > 12) {
    month = 1;
    year++;
  }

  return { day: day, month: month, year: year };
}

function PreviousDate(date) {
  var day = Number(date.day) - 1;
  var month = Number(date.month);
  var year = Number(date.year);

  if (day === 0) {
    month--;

    if (month === 0) {
      month = 12;
      day = 31;
      year--;
    } else if (month === 2) {
      if (leapYearCheck(year)) {
        day = 29;
      } else {
        day = 28;
      }
    } else {
      day = listOfDaysInMonth[month - 1];
    }
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

function checkNextPalindrome(date) {
  var Nxtdate = NextDate(date);
  var ctr = 0;

  while (true) {
    ctr++;
    var resultList = CheckForAnyPalindrome(Nxtdate);

    for (let i = 0; i < resultList.length; i++) {
      if (resultList[i]) {
        return [ctr, Nxtdate];
      }
    }

    Nxtdate = NextDate(Nxtdate);
  }
}
function checkPreviousPalindrome(date) {
  var PreDate = PreviousDate(date);
  var ctr = 0;

  while (true) {
    ctr++;
    var resultList = CheckForAnyPalindrome(PreDate);
    for (let i = 0; i < resultList.length; i++) {
      if (resultList[i]) {
        return [ctr, PreDate];
      }
    }

    PreDate = PreviousDate(PreDate);
  }
}

function print(msg,color) {
  result.innerText = msg;
  result.style.color = color;
}
function PrintPrev([NumberofPreviousDays, PastDate]) {
  print(
    "You missed it by " +
      NumberofPreviousDays +
      " days. Nearest previous Palindrome date was " +
      PastDate.day +
      "/" +
      PastDate.month +
      "/" +
      PastDate.year,"red"
  );
}
function PrintNext([NumberofNextDays, nextPday]) {
  print(
    "You missed it by " +
      NumberofNextDays +
      " days. Next nearest Palindrome date is " +
      nextPday.day +
      "/" +
      nextPday.month +
      "/" +
      nextPday.year,"red"
  );
}

var dates = document.querySelector("input");
var submit = document.querySelector(".submit");
var result = document.querySelector(".result");
var NxDate = document.querySelector("#NextDate");
var PrevDate = document.querySelector("#PrevDate");
NxDate.style.display = "none";
PrevDate.style.display = "none";

submit.addEventListener("click", function () {
  var birthdate = dates.value;
  var isItPalindrome = false;
  if (birthdate !== "") {
    var bday = birthdate.split("-");
    var date = {
      day: bday[2],
      month: bday[1],
      year: bday[0],
    };
    var resultList = CheckForAnyPalindrome(date);

    for (var i = 0; i < resultList.length; i++) {
      if (resultList[i]) {
        isItPalindrome = true;
        break;
      }
    }
    if (isItPalindrome) {
      print("Super!! Your birthday is palindrome","green");
    } else {
      const [NumberofNextDays, nextPday] = checkNextPalindrome(date);
      const [NumberofPreviousDays, PastDate] = checkPreviousPalindrome(date);

      PrevDate.addEventListener("click", function () {
        PrintPrev([NumberofPreviousDays, PastDate]);
      });
      NxDate.addEventListener("click", function () {
        PrintNext([NumberofNextDays, nextPday]);
      });

      if (NumberofNextDays < NumberofPreviousDays) {
        PrintNext([NumberofNextDays, nextPday]);

        NxDate.style.display = "none";
        PrevDate.style.display = "block";
      } else {
        PrevDate.style.display = "none";
        NxDate.style.display = "block";
        PrintPrev([NumberofPreviousDays, PastDate]);
      }
    }
  } else print("Please Enter a Date first");
});