var route  = function () {
    var path = require('path'),
        fs = require('fs'),
        inspect = require('util').inspect,
        extract = require('pdf-text-extract'),
        processPDF,
        uploadFile,
        getBanks,
        refined_str = "";
    processPDF = function (filePath, fileName, callback) {
        refined_str = "";
        extract(filePath, function (err, pages) {
          if (err) {
            console.error(err);
            callback(err, undefined);
            return
          }
          // We are dealing with single paged PDFs as of now, hence pages[0]. looping through each line to read data
          pages[0].split('\n').forEach(function(row) {
                var temp_str = row.trim(), // this will hold one single line
                    ind_str="", //each valid coloumn will be stored temporarily in this string
                    space_count = 0, // to count number of spaces, if more than two, then its a coloumn
                    i;
                 // looping throug each character
                for(i in temp_str) {
                    if (temp_str[i] === " ") {
                        space_count += 1; // increment space counter if character is a space
                        if (space_count > 25) { // 25 is arbitrary length taken to determine a coloumn
                                space_count = 0; // reset space count if hits a coloumn
                                refined_str += "0," // add zero in case it passes a coloum with out a valid character
                            }
                        if (ind_str && space_count > 2) { // if space count is more than two, then program has read one coloumn
                            refined_str += ind_str // add individual coloumn to the refined sentance
                            refined_str += "," // pad with comma to make a csv
                            ind_str=""; // reset individual coloumn
                        } 
                    } else if (i == temp_str.length -1) { // this is to include last character and set conditions for next line
                            ind_str += temp_str[i]
                            space_count = 0;
                            refined_str += ind_str 
                    } else { // program is reading a valid counter
                        space_count = 0;
                        ind_str += temp_str[i] // as long as valid character , build individual coloumn
                    }
                }
                refined_str += "\n"; // finally mark end of the line
            });
            callback(undefined, refined_str);
        })
    };
    uploadFile = function (req, res) {
        var fstream, filePath, ifsc, field, term, limit,  refineField;
        // util.inspect adds extra quotes on string, this function is 'Normalize' those strings
        refineField = function (val) {
            val = val.substr(1);
            val = val.substring(0, val.length - 1)
            return val;
        }
        req.pipe(req.busboy);
        //Read each fields posted
        req.busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
            switch(fieldname) {
                case 'ifsc':
                    ifsc = refineField(inspect(val));
                    break;
                case 'field':
                    field = refineField(inspect(val));
                    break;
                case 'term':
                    term = refineField(inspect(val));
                    break;
                case 'limit':
                    limit = refineField(inspect(val));
                    break;
                    
            }
        });
        //Read the posted file
        req.busboy.on('file', function (fieldname, file, filename) {
            console.log("Uploading: " + filename); 
            if (filename) {
                filePath = __dirname + '/../res/' + filename;
                fstream = fs.createWriteStream(filePath);
                file.pipe(fstream);
                // On read completion, convert pdf to strings
                fstream.on('close', function () {
                     processPDF(filePath, ifsc, function(err, data) {
                     var index = 0, i, values, ret_array = [];
                        if (!err) {
                            // map index of the filed
                            switch(field) {
                                    case 'date':
                                        index = 0;
                                        break;
                                    case 'narration':
                                        index = 2;
                                        break;
                                    case 'debit':
                                        index = 3;
                                        break;
                                    case 'credit':
                                        index = 4;
                                        break;
                                }
                            data = data.split('\n');
                            for (i = 0 ; i < data.length; i += 1) {
                                values = data[i].split(',');
                                //Check if term matches the value at the index
                                if (values[index] === term) {
                                    ret_array.push(data[i]);
                                    //Break if limit reached
                                    if (ret_array.length == limit) {
                                        break;
                                    }
                                }
                            }
                            res.status(200).send(JSON.stringify(ret_array));
                        } else {
                            res.status(500).send(JSON.stringify(err));
                        }
                    });
                });
            } else {
                 res.status(400).send({"error": "invalid file"});
            }
        });
        req.busboy.on('finish', function() {
            console.log("Finished parsing");
        });
    };
    getBanks = function (req, res) {
        var ifscData = undefined,
            ifsc = req.query.ifsc,
            index,
            loadIfsc;
            loadIfsc = function (callback) {
                if (!ifscData) {
                    fs.readFile(__dirname + '/../res/ifsc.txt', 'utf8', function (err,data) {
                      if (err) {
                        return console.log(err);
                      }
                      ifscData = JSON.parse(data);
                      callback();
                    });
                } else {
                    callback();
                }
            }
            loadIfsc(function () {
                if (ifsc && ifsc.length === 11) {
            index = Object.keys(ifscData).indexOf(ifsc);
                    if (index > -1) {
                        res.status(200).send(JSON.stringify(ifscData[ifsc]))
                    } else {
                        res.status(400).send({"error": "Bank not found"})
                    }
                } else {
                    res.status(401).send({"error": "Invalid IFSC code"})
                }
            })
        
    }
    return {
        uploadFile: uploadFile,
        getBanks: getBanks
    }
}
module.exports = route()
