// test
// a set of 2 angles per result each
// you should know the result beforehand

function observeThrow(yuts) {
    result = 0
    countUps = 0
    backdoUp = false
    for (yut in yuts) {
        // raycast from yut
        // if it doesn't touch floor
            // countUps++
            // if yut.type == backdo
                // backdoUp = true
    }
    // if countUps == 0:
        // result = 5
    // else if countUps == 1:
        // if backdoUp == true:
            // result = -1
    // else:
        // result = countUps
    return result
}
module.exports = observeThrow;

// another test
// set yuts at specified locations
// throw them with specified force
// when they rest, they should give the same result for 150 throws