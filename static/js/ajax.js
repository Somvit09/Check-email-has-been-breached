var requestAjax=function(options){
	var object = {
		//url:"http://ec2-54-188-242-233.us-west-2.compute.amazonaws.com:8000/validate/test@gmail.com/",
		//Update API Address
		//url:"http://185.196.100.87:8000/validate/test@gmail.com/",
		url:"http://127.0.0.1:8000/validate/test@gmail.com/",
		type:"GET",
		dataType:'json'
	};

	$.extend(object,options);
	univ.xhr=$.ajax(object).done(function(data){

		$('.loader').hide();
		if(data==null){
			console.log("No data found!!!");
			alert("No data found!!!");
		}
		else{
			try{

				data = JSON.parse(JSON.stringify(data));
				if(data.length>0){
					$("header").animate({"height":"10em"},1000,function(){
					//$(".search_result_cont").toggleClass("search_result_cont_show");

						$('.breach_found').css({'visibility':'visible'});
						$('.breach_not_found').css({'visibility':'collapse'});

						$('#breach_count').text(data.length);

						$('.breach_desc_cont>div').detach();

						for(var i=0; i<data.length; i++){
							var logo=$('<img/>',{
								'src':data[i].LogoPath
							});

							var name=$('<h4></h4>',{
								'text':data[i].Name
							});

							var bdate=$('<h5></h5>',{
								'text':'Breached On '+data[i].BreachDate
							});

							var desc=$('<p></p>');
							desc.html(data[i].Description);

							var compromised=$('<p></p>',{
								'html':'<span style="font-weight:bold">Compromised Data:</span> '+data[i].DataClasses
							});

							var logo_cont=$('<div></div>');
							var desc_cont=$('<div></div>');

							var breach_cont=$('<div></div>');

							logo_cont.append(logo);
							desc_cont.append(name);
							desc_cont.append(bdate);
							desc_cont.append(desc);
							desc_cont.append(compromised);

							breach_cont.append(logo_cont);
							breach_cont.append(desc_cont);

							$('.breach_desc_cont').append(breach_cont);
						}
						if(data.Pastes!=null){

							if(data.Pastes.length > 0){

								$('.pastes_rows>tr').detach();

								$('#pastes_count').text(data.Pastes.length);

								for(var i in data.Pastes){

									var title=$('<td></td>',{
										'text':data.Pastes[i].Title
									});
									var pdate=$('<td></td>',{
										'text':data.Pastes[i].Date
									});
									var ecount=$('<td></td>',{
										'text':data.Pastes[i].EmailCount
									});

									var pasteRow=$('<tr></tr>');

									pasteRow.append(title);
									pasteRow.append(pdate);
									pasteRow.append(ecount);

									$('.pastes_rows').append(pasteRow);
								}
							}
						}
						else{
							$('#pastes_count').text('0');
							$('.breach_pastes_cont').css({'visibility':'collapse'});
						}
					});
				}
				else if (data.data === "No Pawn Found"){
					$('.breach_found').css({'visibility':'collapse'});
					$('.breach_not_found').css({'visibility':'visible'});
				}
			}
			catch(err){
				alert('Unable to Parse JSON '+err)
			}
		}

	}).fail(function( jqXHR, textStatus, errorThrown ) {
		$('.loader').hide();
		if(jqXHR.status==500){
			$('.breach_found').css({'visibility':'collapse'});
			$('.breach_not_found').css({'visibility':'visible'});
		}
		else{
	  		alert(jqXHR.statusText);
		}
	});;

}
