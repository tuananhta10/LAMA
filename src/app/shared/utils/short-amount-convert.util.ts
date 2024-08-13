export function shortifyAmount(num,dec){
    /*let x = (''+num).length;
    let p = Math.pow;

    dec = p(10,dec);
    x -= x % 3;
    return Math.round(num*dec/p(10,x))/dec+" kMGTPE"[x/3];*/

    // 2 decimal places => 100, 3 => 1000, etc
    dec = Math.pow(10,dec);

    // Enumerate num abbreviations
    var abbrev = [ "k", "m", "b", "t" ];

    // Go through the array backwards, so we do the largest first
    for (var i=abbrev.length-1; i>=0; i--) {

        // Convert array index to "1000", "1000000", etc
        var size = Math.pow(10,(i+1)*3);

        // If the num is bigger or equal do the abbreviation
        if(size <= num) {
             // Here, we multiply by dec, round, and then divide by dec.
             // This gives us nice rounding to a particular decimal place.
             num = Math.round(num*dec/size)/dec;

             // Handle special case where we round up to the next abbreviation
             if((num == 1000) && (i < abbrev.length - 1)) {
                 num = 1;
                 i++;
             }

             // Add the letter for the abbreviation
             num += abbrev[i];

             // We are done... stop
             break;
        }
    }

    let regex = /\@"^[a-zA-Z]+$/gi

    return (num + '')?.match(regex) || isNaN(num) ? num : num?.toFixed(2);
}