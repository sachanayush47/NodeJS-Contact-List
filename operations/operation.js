module.exports = {

    capitalize : function(string) {
        let temp = string.split(" ");
        for (let i = 0; i < temp.length; ++i) {
            temp[i] = temp[i].charAt(0).toUpperCase() + temp[i].substring(1);       
        }
        return temp.join(" ");
    }

} 