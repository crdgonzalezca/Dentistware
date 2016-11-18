$(function() {

	editable = 1;

	$('#agregarRegistro').on('shown.bs.modal', function() {
		modalWidth = $("#agregarRegistroModal").width();
		modalHeight = $("#agregarRegistroModal").height();
		stateAux = $('input[name="state"]:checked').val();
		setup();
		mouseClicked();
		draw();

		$("input[name=state]").click(function() {
			stateAux = $(this).val();
		});

		$('#nuevoRegistro_form').submit(function(event) {
			event.preventDefault();
			$('.ac_p_error').fadeOut('slow').remove();
            var postData = new FormData(this);
			$.ajax({
                type: 'POST',
				url: js_site_url + 'Registro/nuevo_registro', 
                data: postData,
                processData: false,
                contentType: false,
				success: function(result) {
					var regId = result;
                    $.each(myTeeth.teeth,
						function(index, value) {
							$.post(
								js_site_url + 'Diente/nuevoDiente',
                                {   reg: regId,
									num: value["n"],
									aus: value["state"][0],
									ext: value["state"][1],
									car: value["state"][2],
									obt: value["state"][3],
									cor: value["state"][4],
									tra: value["state"][5]
								},
								function(result) {
                                    
                                }
							);
						}
					);
				},
                error: function(msg) {
                    console.log(msg);
                }
            })
		})

	});

	$('.salir-btn').click(function(e) {
		e.preventDefault();
		$('.ac_p_error').fadeOut('slow').remove();
		teethAux = teethOriginal;
	})

	$('.agregarRegistro-btn').click(function(e) {
		e.preventDefault();
		$('.ac_p_error').fadeOut('slow').remove();
		editable = 1;
		teeth = teethAux;
	})

	var lastRegId;
	$('.verRegistro-btn').click(function(e) {
		e.preventDefault();
		$('.ac_p_error').fadeOut('slow').remove();
		var id = $(this).val();
		if (editable == 1) {
			lastRegId = undefined;
			teethAux = teeth;
			editable = 0;
		}
		if (id !== lastRegId) {

			lastRegId = id;
			try {
				remove();
			} catch (err) {}
			var htmlWrapper = '';
			var postData = {
				'reg': id,
			};
			$.ajax({
				type: 'POST',
				url: js_site_url + 'Registro/',
				data: postData,
				success: function(html) {
					htmlWrapper = html;
					$.ajax({
						type: 'POST',
						url: js_site_url + 'Diente/',
						data: postData,
						success: function(html) {
							htmlWrapper += html;
							$('#verRegistro_html').html(htmlWrapper);
							$('#verRegistro').modal('show');
						},
						error: function(msg) {}
					});
				},
				error: function(msg) {}
			});
		} else {
			$('#verRegistro').modal('show');
		}
	});
    
    
    $('.crear-historia-btn').click(function(e) {
		e.preventDefault();
        window.location.href = js_site_url + "/Historia_clinica/crear_historia_clinica" ;              
    }); 
      $('.editar-historia-btn').click(function(e) {
		e.preventDefault();
        window.location.href = js_site_url + "/Historia_clinica/editar_historia_clinica" ;              
    }); 
    
     $('#nueva_historia_form').submit(function (event) {
        event.preventDefault();
         
        $('.ac_p_error').fadeOut('slow').remove();
         var cliente = $(this).attr('cliente');
        var postData = $(this).serializeArray(); 
        $.ajax({
            type: 'POST',
            url: js_site_url + 'nueva_historia_clinica/',
            data: postData,
            beforeSend:function(){
            	$('#div_waiting_new_story').removeClass("hidden");            	
            },
            success: function (msg){
                console.log(msg);
                if (isNaN(msg)) {
                	$('#div_waiting_new_story').addClass("hidden");  
                    $.each(msg, function (i, item) {
                        $('#div_' + i).after('<p class="alert alert-danger text-center ac_p_error" role="alert">' + item + '</p>');
                    });
                } else {
                    if (msg == 1) {    
                    	swal({   
                    		title: "",   
                    		text: "Se insertó exitosamente la historia clínica",   
                    		type: "success"                 
                    	}, 
                    	function(){ 
                         
                    		window.location.href = js_site_url + '/index/' + cliente ; 
                    	});                    	
                        $('#modal_add_story').modal('hide');
                    } else {
                    	$('#div_waiting_new_story').addClass("hidden"); 
                    	swal("Error", "Se ha presentado un error al ingresar la historia clínica, ya hay una en existencia.", "error");
                    }
                }
            }
        });
    });
		
     $('#editar_historia_form').submit(function (event) {
        event.preventDefault();
         
        $('.ac_p_error').fadeOut('slow').remove();
         var cliente = $(this).attr('cliente');
        var postData = $(this).serializeArray(); 
        $.ajax({
            type: 'POST',
            url: js_site_url + 'historia_clinica_editada/',
            data: postData,
            beforeSend:function(){
            	$('#div_waiting_edit_story').removeClass("hidden");            	
            },
            success: function (msg){
                console.log(msg);
                if (isNaN(msg)) {
                	$('#div_waiting_edit_story').addClass("hidden");  
                    $.each(msg, function (i, item) {
                        $('#div_' + i).after('<p class="alert alert-danger text-center ac_p_error" role="alert">' + item + '</p>');
                    });
                } else {
                    if (msg == 1) {    
                    	swal({   
                    		title: "",   
                    		text: "Se editó exitosamente la historia clínica",   
                    		type: "success"                 
                    	}, 
                    	function(){ 
                            window.location.href = js_site_url + '/index/' + cliente ; 
                    	});                    	
                        $('#modal_edit_story').modal('hide');
                    } else {
                    	$('#div_waiting_edit_story').addClass("hidden"); 
                    	swal("Error", "Se ha presentado un error al editar la historia clínica.", "error");
                    }
                }
            }
        });
    });



$('#runner').runner({
    autostart: true,
    countdown: false
    
});


	$('.no-asistir-btn').click(function(e) {
		e.preventDefault();
		var cita = $(this).attr('cita');
		var cliente = $(this).attr('cliente');
		swal({
				title: 'Marcar cita',
				text: '¿Desea marcar como no asistida la cita con ' + cliente + '?',
				type: 'warning',
				showCancelButton: true,
				confirmButtonText: 'Sí, marcar',
				cancelButtonText: 'No, no confirmar',
				showLoaderOnConfirm: true,
			},
			function(isConfirm) {
				if (isConfirm) {
					$.ajax({
						type: 'GET',
						url: js_site_url + 'marcar_no_asistir/' + cita,
						success: function(msg) {
							console.log(msg);
							if (msg) {
								swal({
										title: "Cita marcada",
										text: "La cita con " + cliente + " ha sido marcada como no asistida por el cliente.",
										type: "success",
									},
									function() {
										location.reload();
									});
							} else {
								swal("Error", "La cita con " + odonto + " no puede ser marcada, vuelva a intentarlo.", "error");
							}
						}
					});
				}
			});
	});

	$('.atender-btn').click(function(e) {
		e.preventDefault();
		var cita = $(this).attr('cita');
        var cliente = $(this).attr('cliente');
        var id = $(this).attr('id');
        swal({
            title: 'Atender',
            text: '¿Desea atender su cita con ' + cliente + '?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, atender cita',
            cancelButtonText: 'No atender la cita',
            showLoaderOnConfirm: true,
        },
        function(isConfirm) {
            if (isConfirm) {
            	window.location.href = js_site_url2 + "index/" + id + "/" + cita ;
                
            }
        });           
    });
    
    	$('.terminar-cita-btn').click(function(e) {
		e.preventDefault();
		var cliente = $(this).attr('cliente');
        var cita = $(this).attr('cita');
		swal({
				title: 'Terminar cita',
				text: '¿Desea terminar su cita con ' + cliente + '?',
				type: 'warning',
				showCancelButton: true,
				confirmButtonText: 'Sí, terminar',
				cancelButtonText: 'No, no confirmar',
				showLoaderOnConfirm: true,
			},
			function(isConfirm) {
				if (isConfirm) {
					$.ajax({
						type: 'GET',
						url: js_site_url + 'Cita/marcar_asistir/' + cita,
						success: function(msg) {
							console.log(msg);
							if (msg) {
								swal({
										title: "Cita finalizada",
										text: "La cita con " + cliente + " ha terminado.",
										type: "success",
									},
									function() {
										window.location.href = js_site_url + '/Cita' ;
									});
							} else {
								swal("Error", "La cita con " + cliente + " no puede ser terminada, vuelva a intentarlo.", "error");
							}
						}
					});
				}
			});
	});


    $(".timepicker").timepicker({
		showInputs: false,
		minuteStep: 30,
		defaultTime: false
	});
});