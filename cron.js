var request = require("request");
var cheerio = require("cheerio");
var async = require("async");
var excelParser = require('excel-parser');
var fs = require("fs");
//var files_to_download = [{"name":"Abhyudaya_Cooperative_Bank.xls"}, {"name":"Abu_Dhabi_Commercial_Bank.xls"}, {"name":"Ahmedabad_Mercantile_Cooperative_Bank.xls"}, {"name":"Akola_Janata_Commercial_Cooperative_Bank.xls"}, {"name":"Allahabad_Bank.xls"}, {"name":"Almora_Urban_Co-Operative_Bank_ltd.xls"}, {"name":"Andhra_Bank.xls"}, {"name":"Andhra_Pragathi_Grameena_Bank.xls"}, {"name":"Apna_Sahakari_Bank_Ltd.xls"}, {"name":"Australia_and_New_Zealand_Banking_Group_Ltd.xls"}, {"name":"Axis_Bank.xls"}, {"name":"Bandhan_Bank_Limited.xls"}, {"name":"Bank_Internasional_Indonesia.xls"}, {"name":"Bank_of_America.xls"}, {"name":"Bank_of_Bahrein_and_Kuwait.xls"}, {"name":"Bank_of_Baroda.xls"}, {"name":"Bank_of_Ceylon.xls"}, {"name":"Bank_of_India.xls"}, {"name":"Bank_of_Maharashtra.xls"}, {"name":"Bank_of_Tokyo_Mitsubishi_Ltd.xls"}, {"name":"Barclays_Bank.xls"}, {"name":"Bassein_Catholic_Co-Op_Bank_Ltd.xls"}, {"name":"Bharat_Cooperative_Bank_Mumbai_Ltd.xls"}, {"name":"Bharatiya_Mahila_Bank_Ltd.xls"}, {"name":"BNP_Paribas_Bank.xls"}, {"name":"Canara_Bank.xls"}, {"name":"Capital_Local_Area_Bank_Ltd.xls"}, {"name":"Catholic_Syrian_Bank.xls"}, {"name":"Central_Bank_of_India.xls"}, {"name":"Chinatrust_Commercial_Bank.xls"}, {"name":"CITI_Bank.xls"}, {"name":"Citizen_Credit_Cooperative_Bank.xls"}, {"name":"City_Union_Bank_Ltd.xls"}, {"name":"Commonwealth_Bank_of_Australia.xls"}, {"name":"Corporation_Bank.xls"}, {"name":"Credit_Agricole_Corporate_and_Investment_Bank.xls"}, {"name":"Credit_Suisse_AG.xls"}, {"name":"DBS_Bank_Ltd.xls"}, {"name":"DCB_Bank_Ltd.xls"}, {"name":"Dena_Bank.xls"}, {"name":"Deposit_Insurance_and_Credit_Guarantee_Corporation.xls"}, {"name":"Deutsche_Bank.xls"}, {"name":"Development_Bank_of_Singapore_DBS.xls"}, {"name":"Dhanlaxmi_Bank_Ltd.xls"}, {"name":"DICGC.xls"}, {"name":"Doha_Bank_QSC.xls"}, {"name":"Dombivli_Nagari_Sahakari_Bank_Ltd.xls"}, {"name":"Export_Import_Bank_of_India.xls"}, {"name":"Federal_Bank_Ltd.xls"}, {"name":"Firstrand_Bank_Ltd.xls"}, {"name":"G_P_Parsik_Bank.xls"}, {"name":"Gurgaon_Gramin_Bank_Ltd.xls"}, {"name":"HDFC_Bank_Ltd.xls"}, {"name":"HSBC_Bank_Oman_Saog.xls"}, {"name":"HSBC.xls"}, {"name":"ICICI_Bank_Ltd.xls"}, {"name":"IDBI_Ltd.xls"}, {"name":"IDFC_Bank_Ltd.xls"}, {"name":"Indian_Bank.xls"}, {"name":"Indian_Overseas_Bank.xls"}, {"name":"Indusind_Bank_Ltd.xls"}, {"name":"Industrial_and_Commercial_Bank_of_China_Ltd.xls"}, {"name":"Industrial_Bank_of_Korea.xls"}, {"name":"ING_Vysya_Bank_Ltd.xls"}, {"name":"Jalgaon_Janata_Sahkari_Bank_Ltd.xls"}, {"name":"Jammu_and_Kashmir_Bank.xls"}, {"name":"Janakalyan_Sahakari_Bank_Ltd.xls"}, {"name":"Janaseva_Sahakari_Bank_(Borivli)_Ltd.xls"}, {"name":"Janaseva_Sahakari_Bank_Ltd.xls"}, {"name":"Janata_Sahakari_Bank_Ltd_(Pune).xls"}, {"name":"Jankalyan_Sahakari_Bank_Ltd.xls"}, {"name":"JP_Morgan_Chase_Bank_NA.xls"}, {"name":"Kallappanna_Awade_Ichalkaranji_Janata_Sahakari_Bank_Ltd.xls"}, {"name":"Kalupur_Commercial_Cooperative_Bank.xls"}, {"name":"Kalyan_Janata_Sahakari_Bank_Ltd.xls"}, {"name":"Kapol_Cooperative_Bank.xls"}, {"name":"Karnataka_Bank_Ltd.xls"}, {"name":"Karnataka_Vikas_Grameena_Bank.xls"}, {"name":"Karur_Vysya_Bank.xls"}, {"name":"KEB_Hana_Bank.xls"}, {"name":"Kerala_Gramin_Bank.xls"}, {"name":"Kotak_Mahindra_Bank.xls"}, {"name":"Laxmi_Vilas_Bank.xls"}, {"name":"Mahanagar_Cooperative_Bank_Ltd.xls"}, {"name":"Maharastra_State_Cooperative_Bank.xls"}, {"name":"Mashreq_Bank.xls"}, {"name":"Mizuho_Corporate_Bank_Ltd.xls"}, {"name":"Nagar_Urban_Co-Operative_Bank.xls"}, {"name":"Nagpur_Nagrik_Sahakari_Bank_Ltd.xls"}, {"name":"National_Australia_Bank.xls"}, {"name":"National_Bank_of_Abu_Dhabi_PJSC.xls"}, {"name":"New_India_Cooperative_Ban_Ltd.xls"}, {"name":"NKGSB_Cooperative_Bank_Ltd.xls"}, {"name":"North_Malabar_Gramin_Bank.xls"}, {"name":"Nutan_Nagarik_Sahakari_Bank_Ltd.xls"}, {"name":"Oman_International_Bank.xls"}, {"name":"Oriental_Bank_of_Commerce.xls"}, {"name":"Pragathi_Krishna_Gramin_Bank.xls"}, {"name":"Prathama_Bank.xls"}, {"name":"Prime_Co-Operative_Bank_Ltd.xls"}, {"name":"Punjab_and_Maharashtra_Cooperative_Bank_Ltd.xls"}, {"name":"Punjab_and_Sind_Bank.xls"}, {"name":"Punjab_National_Bank.xls"}, {"name":"Rabobank_International.xls"}, {"name":"Rajgurunagar_Sahakari_Bank_Ltd.xls"}, {"name":"Rajkot_Nagarik_Sahakari_Bank_Ltd.xls"}, {"name":"RBL_Bank_Limited.xls"}, {"name":"Reserve_Bank_of_India.xls"}, {"name":"Sahebrao_Deshmukh_Co-Op._Bank_Ltd.xls"}, {"name":"Samarth_Sahakari_Bank_Ltd.xls"}, {"name":"Saraswat_Cooperative_Bank_Ltd.xls"}, {"name":"SBER_Bank.xls"}, {"name":"SBM_Bank_Mauritius_Ltd.xls"}, {"name":"Shikshak_Sahakari_Bank_Ltd.xls"}, {"name":"Shinhan_Bank.xls"}, {"name":"Shivalik_Mercantile_Co_Operative_Bank_Ltd.xls"}, {"name":"Shri_Chhatrapati_Rajarshi_Shahu_Urban_Co-Op_Bank_Ltd.xls"}, {"name":"Societe_Generale.xls"}, {"name":"Solapur_Janata_Sahkari_Bank_Ltd.xls"}, {"name":"South_Indian_Bank.xls"}, {"name":"Standard_Chartered_Bank.xls"}, {"name":"State_Bank_of_Bikaner_and_Jaipur.xls"}, {"name":"State_Bank_of_Hyderabad.xls"}, {"name":"State_Bank_of_India.xls"}, {"name":"State_Bank_of_Mauritius_Ltd.xls"}, {"name":"State_Bank_of_Mysore.xls"}, {"name":"State_Bank_of_Patiala.xls"}, {"name":"State_Bank_of_Travancore.xls"}, {"name":"Sumitomo_Mitsui_Banking_Corporation.xls"}, {"name":"Surat_National_Cooperative_Bank_Limited.xls"}, {"name":"Sutex_Cooperative_Bank_Ltd.xls"}, {"name":"Syndicate_Bank.xls"}, {"name":"Tamilnadu_Mercantile_Bank.xls"}, {"name":"The_Akola_District_Central_Co-Operative_Bank.xls"}, {"name":"The_Andhra_Pradesh_State_Coop_Bank_Ltd.xls"}, {"name":"The_A.P._Mahesh_Co-Op_Urban_Bank_Ltd.xls"}, {"name":"The_Bank_of_Nova_Scotia.xls"}, {"name":"The_Cosmos_Cooperative_Bank_Ltd.xls"}, {"name":"The_Delhi_State_Cooperative_Bank_Ltd.xls"}, {"name":"The_Gadchiroli_District_Central_Cooperative_Bank_Ltd.xls"}, {"name":"The_Greater_Bombay_Co-operative_Bank_Ltd.xls"}, {"name":"The_Gujarat_State_Co-Operative_Bank_Ltd.xls"}, {"name":"The_HASTI_Co-Operative_Bank_Ltd.xls"}, {"name":"The_Jalgaon_Peoples_Co-Op_Bank.xls"}, {"name":"The_Kangra_Central_Cooperative_Bank_Ltd.xls"}, {"name":"The_Kangra_Cooperative_Bank_Ltd.xls"}, {"name":"The_Karad_Urban_Co-op_Bank_Ltd.xls"}, {"name":"The_Karnataka_State_Apex_Cooperative_Bank_Ltd.xls"}, {"name":"The_Kurmanchal_Nagar_Sahkari_Bank_Ltd.xls"}, {"name":"The_Mehsana_Urban_Cooperative_Bank_Ltd.xls"}, {"name":"The_Mumbai_District_Central_Co-Op_Bank_Ltd.xls"}, {"name":"The_Municipal_Co_Operative_Bank_Ltd,_Mumbai.xls"}, {"name":"The_Nainital_Bank_Ltd.xls"}, {"name":"The_Nasik_Merchants_Co-Op_Bank_Ltd.xls"}, {"name":"The_Pandharpur_Urban_Co_Op._Bank_Ltd._Pandharpur.xls"}, {"name":"The_Rajasthan_State_Cooperative_Bank_Ltd.xls"}, {"name":"The_Royal_Bank_of_Scotland_N.V..xls"}, {"name":"The_Seva_Vikas_Co-Operative_Bank_Ltd.xls"}, {"name":"The_Shamrao_Vithal_Cooperative_Bank_Ltd.xls"}, {"name":"The_Surat_District_Co_Operative_Bank_Ltd.xls"}, {"name":"The_Surat_Peoples_Co-Op_Bank_Ltd.xls"}, {"name":"The_Tamilnadu_State_Apex_Cooperative_Bank.xls"}, {"name":"The_Thane_Bharat_Sahakari_Bank_Ltd.xls"}, {"name":"The_Thane_District_Central_Co-Op_Bank_Ltd.xls"}, {"name":"The_Thane_Janata_Sahakari_Bank_Ltd.xls"}, {"name":"The_Varachha_Co-Op._Bank_Ltd.xls"}, {"name":"The_Vishweshwar_Sahakari_Bank_Ltd.xls"}, {"name":"The_West_Bengal_State_Cooperative_Bank_Ltd.xls"}, {"name":"The_Zoroastrian_Cooperative_Bank_Limited.xls"}, {"name":"TJSB_Sahakari_Bank_Ltd.xls"}, {"name":"Tumkur_Grain_Merchants_Cooperative_Bank_Ltd.xls"}, {"name":"UCO_Bank.xls"}, {"name":"Union_Bank_of_India.xls"}, {"name":"United_Bank_of_India.xls"}, {"name":"United_Overseas_Bank.xls"}, {"name":"Vasai_Vikas_Sahakari_Bank_Ltd.xls"}, {"name":"Vijaya_Bank.xls"}, {"name":"Westpac_Banking_Corporation.xls"}, {"name":"Woori_Bank.xls"}, {"name":"Yes_Bank_Ltd.xls"}, {"name":"Zila_Sahkari_Bank_Ltd_Ghaziabad"}];
var files_to_download = [];
var objToSave = {};
var file_to_be_written;
var file_destination = '/home/akbar/demo/pdf-extracter/res/ifsc.txt'
var getAllLink = function(callback) {
    request({uri: "https://www.rbi.org.in/Scripts/bs_viewcontent.aspx?Id=2009"}, function(error, response, body) {
        var $ = cheerio.load(body);
        $('a').each(function(linkElement){
            var link = $(this).attr('href');
            var bank_name = $(this).html().replace(/ /g, '_')
            bank_name+='.xls'
            if( link && (link.substr(link.length-3)) === "xls") {
                link = link.replace('http', 'https');
                files_to_download.push({link: link, name: bank_name})
            }
        });
        console.log("finished listing")
        callback(undefined)
    });
}
var downloadFiles = function (link, callback) {
  request({uri: link.link, headers: {"Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8", "User-Agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.101 Safari/537.36"}})
      .pipe(fs.createWriteStream(__dirname + '/downloads/'+link.name, {defaultEncoding: 'binary'}).
      on('close', function(){
        console.log("finished downloading " + link.name);
        callback();
      }))
      //.on('data', function(chunk) {
      //console.log("adding data")
       // file +=chunk
      //}).on('response', function(response) {
       // console.log(response.statusCode) // 200
      //  console.log(response.headers['content-type']) // 'image/png'
      //})
     
}

var parseExcel = function (link, callback) {
    var finalObj = {};
    excelParser.parse({
        inFile: __dirname + '/downloads/'+link.name,
        worksheet: 1,
        skipEmpty: true,
    },function(err, records){
        if(err){
            
             console.error("Problem in downloading "+__dirname + '/downloads/'+link.name + " " + JSON.stringify(err));
             
             callback();
             return;
         } else{
         console.log(__dirname + '/downloads/'+link.link+ " Parsed")
         file_to_be_written = "";
         
            records.forEach(function(record){
                //finalObj = {}
                objToSave[record[1]] = record[0] + ", " + record[4] + ", " + record[6] + ", " + record[7] + ", " + record[8];
                //file_to_be_written += JSON.stringify(finalObj);    
                //file_to_be_written += ','
                  
            });
            callback();   
            //objToSave += file_to_be_written;
            /*fs.appendFile(file_destination, objToSave, function(err) {
                    if (!err) {
                        console.log("finshed creating file")
                        callback();
                        return;
                    } else {
                        console.error(err)
                        callback();
                        return;
                    }
                });*/
            
        }
    });
}
getAllLink(function(err) {
    if (!err) {
        async.eachSeries(files_to_download, downloadFiles, function(err, data){
            console.log("Finished downlaoding all files");
            fs.writeFile(file_destination, '', function(){
                async.eachSeries(files_to_download, parseExcel, function(err, data){
                fs.writeFile(file_destination, JSON.stringify(objToSave), function(err) {
                    if (!err) {
                        console.log("Finished extractig all files");
                    } else {
                        console.error(err)
                    }
                });
                    
                });
            });
        })
    }
})
