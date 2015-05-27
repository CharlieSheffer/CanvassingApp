"use strict"
//MIKE STALL:  aryDATA is a two-dimensional associative array that I need filled with the csv data.  For this sample, it pulls in a hard-coded set of names
var aryDATA = funcFakeData();
//MIKE STALL:  aryFIELDS are the field names of each of the columns form the .csv that are visible to the user.  Note the VoterID is the primary-key from the data array
var aryFIELDS = ["FirstName","LastName","Gender","StreetNumber","Street","LastContact","Party","Result","Notes"];

funcSortTable();


function funcSortTable(){
	var blnHighFirst = $('input[name=rdbDirection]:checked', '#frmDirection').val() == 'High2Low';
	var blnGroupByOddEven = $('input[name=rdbOddEven]:checked', '#frmOddEven').val() == 'OddEven';
	var blnEvensFirst = $('input[name=rdbOddEvenSequence]:checked', '#frmOddEvenSequence').val() == 'Even';
	
	if(blnGroupByOddEven){
		$('#frmOddEvenSequence').removeClass('hidden');
		$('.TR-Separator').removeClass('hidden');
	}
	else{
		$('#frmOddEvenSequence').addClass('hidden');
		$('#div2ndSeperator').addClass('hidden');		
	}

	//Group the streets together
	aryDATA.sort(function(a,b){
		var a1=a.Street.toLowerCase(),b1=b.Street.toLowerCase();
		if(a1== b1) return 0;
		return a1> b1? 1: -1;
	});
	
	//Sort by High to Low
	aryDATA.sort(function(a,b){
		var a1=a.Street.toLowerCase(),b1=b.Street.toLowerCase();
		var a2=a.StreetNumber, b2=b.StreetNumber;
		
		//Now that streets have been grouped, do not do any sorting amongst the street names themselves
		if(a1!= b1){
			return 0;
		}
		else{
			if(a2== b2) return 0;
			if(blnHighFirst){
				return a2 < b2? 1: -1;				
			}
			else{
				return a2 > b2? 1: -1;
			}			
		}
		
	});
	
	//Group by Odds/Evens
	if(blnGroupByOddEven)
	{
		aryDATA.sort(function(a,b){
			var a1=a.Street.toLowerCase(),b1=b.Street.toLowerCase();
			var a2=a.StreetNumber, b2=b.StreetNumber;
			//Keep things sorted by street name, or if both values are even or odd, don't sort them so to keep the high-to-low or low-to-high sequencing
			if(a1!= b1 || (funcIsEven(a2)==funcIsEven(b2))){
				return 0;
			}
			else{
				if(funcIsEven(a2) && !funcIsEven(b2)){
					return blnEvensFirst ? -1: 1;
				}
				else{
					return blnEvensFirst ? 1: -1;
				}
			}
		});		
	}
	var htmlTable = funcTableFromArray(aryDATA, aryFIELDS, 'TR-Table table-responsive table-bordered', 'tblWalkList');
	$('#divWalkList').html(htmlTable);
	funcStripeTable();
	funcSizeColumns();
}


function funcStripeTable(){
	var strNUMBER = 314159, strSTREET = 'The root of PI';
	var blnCLASS = false;
	$('#tblWalkList tr').each( function(){
		if($(this).find(':nth-child(4)').text() == strNUMBER &&
			$(this).find(':nth-child(5)').text() == strSTREET){
			
			}
			else{
				strNUMBER = $(this).find(':nth-child(4)').text();
				strSTREET = $(this).find(':nth-child(5)').text();
				blnCLASS = !blnCLASS == true;
			}
		if(blnCLASS){
			$(this).addClass('altColorWhite');
		}
		else{
			$(this).addClass('altColorGreen');
		}
	});
}
function funcNotYet(){
	alert("This option is not programmed in yet.");		
}
function funcTableOfOptions(ary,str){
	var html = "<div style='border-style: solid;border-width: 1px; border-color: #545454;'><table class='table table-striped table-hover table-condensed'><tbody>";
	for(var x=0;x<ary.length;x++){
		if(ary[x]==str){
			html += "<tr><td onclick='funcRecordAnswer($(this).text())' class='current-selection'>" + ary[x] + "</td></tr>";	
		}
		else{
			html += "<tr><td onclick='funcRecordAnswer($(this).text())'>" + ary[x] + "</td></tr>";			
		}

	}
	html += "</tbody></table>";
	return html;
}
