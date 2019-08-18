// -----------------------------------------------------------------------------
// JavaScript function to generate combinatorial geometric series 
// for board games like Dobble / Spot it!
// 
// Each generated series is expected to have the following features:
//
// - a given number (N) of different elements, as long as N is a prime number +1
// - one (and only one) element in common with each other series;
//
// Released on GNU - General Public Licence v3.0
// https://www.gnu.org/liceNes/gpl-3.0.en.html
// 
// Darkseal, 2018-2019
// https://www.ryadel.com/en/dobble-spot-it-algorithm-math-function-javascript
// -----------------------------------------------------------------------------
// 
function dobble() {
  var N = 8;     // number of symbols on each card
  var nC = 0;    // progressive number of cards
  var sTot = []; // array of series (cards)
  
  // check if N is valid (it must be a prime number +1)
  if (!isPrime(N-1)) {
	document.write("<pre>ERROR: N value ("+N+") is not a prime number +1:"); 
	document.write(" some tests will fail.</pre>");
  }
  
  // Generate series from #01 to #N
  for (i=0; i <= N-1; i++)  {
    var s = [];
    nC++;
    s.push(1);
    for (i2=1; i2 <= N-1; i2++) {
        s.push((N-1) + (N-1) * (i-1) + (i2+1));
    }
    sTot.push(s);
  }
  
  // Generate series from #N+1 to #N+(N-1)*(N-1)
  for (i= 1; i<= N-1; i++) {
    for (i2=1; i2 <= N-1; i2++) {
      var s = [];
      nC++;
      s.push(i+1);
      for (i3=1; i3<= N-1; i3++) {
        s.push((N+1) + (N-1) * (i3-1) + ( ((i-1) * (i3-1) + (i2-1)) ) % (N-1));
      }
      sTot.push(s);
    }
  }
  
  // Print the series to screen
  outputSeries(sTot);

  // perform 1000 test and print the results to screen
  outputTest(sTot, 1000);
}
  
function isPrime(num) {
  for(var i = 2; i < num; i++) {
    if(num % i === 0) return false;
  }
  return num > 1;
}

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function outputSeries(sTot) {
  var nPad = sTot.length.toString().length;
  var cnt = 0;
  document.write("<div>Printing "+ sTot.length +" series of "+ sTot[0].length +" elements each.</div>");
  document.write("<pre>");
  for (var i in sTot) {
    cnt++;
    var sLog = "#" + pad(cnt,nPad) + ":";
    for (var i2 in sTot[i]) {
      sLog += " " + pad(sTot[i][i2], nPad);
    } 
    document.write(sLog + "\n");
  }
  document.write("</pre>");
}

// test function
// compares n pairs of different series randomly taken from sTot 
// and outputs the results.
function outputTest(sTot, n) {
  var nSucc = 0;
  var nFail = 0;
  var err = "";
  for (i = 0; i < n; i++) {
    var i1 = Math.floor(Math.random() * (sTot.length - 1));
    var i2 = 0;
    do {
      i2 = Math.floor(Math.random() * (sTot.length - 1));
    }
    while (i1 == i2);
    var s1 = sTot[i1];
    var s2 = sTot[i2];
    var nEquals = 0;
    for (var p1 in s1) {
      for (var p2 in s2) {
        if (s1[p1] == s2[p2]) {
          nEquals++;
        }
      }
    }
    if (nEquals == 1) {
      nSucc++;
    }
    else {
      nFail++;
      err += "FAILURES #"+nFail+": Series #"+ s1 +" and series #"+ s2 + " do have "+ nEquals +" numbers in common. +\n";
    }
  }
  document.write("<pre>");
  document.write("Test result (after "+n+" tests):\n");
  document.write("- SUCCESS #: "+nSucc+"\n");
  document.write("- FAILURE #: "+nFail+"\n");
  if (nFail > 0) {
    document.write("<pre>"+ err +"</pre>");
  }
}
