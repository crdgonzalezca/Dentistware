<?php
   defined('BASEPATH') OR exit('No direct script access allowed');
   ?>
<!DOCTYPE html>
<html>
   <head>
      <title>Dentistware | Creando historia clinica</title>
      <link rel="shortcut icon" type="image/png" href="<?php echo base_url('assets/img/logo.png')?>"/>
      <?php
         echo meta('X-UA-Compatible', 'IE=edge', 'equiv');
         echo meta('', 'text/html; charset=utf-8');
         echo meta('viewport', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
         
         echo plugin_css('font-awesome');
         echo plugin_css('icons');
         echo plugin_css('bootstrap');
         echo plugin_css('adminLTE');
         echo plugin_css('skin');
         echo plugin_css('pace');
         echo plugin_css('sweetalert');
         echo plugin_css('datatables');
         
         ?>
   </head>
   <body class="hold-transition skin-blue-light sidebar-mini">
      <button type="button" class="btn btn-block btn-primary btn-lg"  > 
      <b>DENTIST</b>WARE
      </button>
      <div >
         <section class="content-header">
            <?php echo heading('Crear historia clínica',1);?>
         </section>
         <section class="content">
            <div class="box box-primary">
               <div class="overlay hidden" id="div_waiting_new_story">
                  <i class="fa fa-refresh fa-spin" id="i_refresh"></i>  
               </div>
                <h3 class="pull-right">Tiempo transcurrido en esta cita: <br><span  class="pull-right" id="runner2"> </span></h3>
                
               <?php 
                  $data_input = array(
                  		'id' => "nueva_historia_form",
                      'cliente' => $cliente_info->id_persona,
                  );        
                  echo form_open('', $data_input);	
                  ?>
               <input id="input_cliente" name="input_cliente" class="hidden" value="<?php echo $cliente_info->id_persona; ?>">
               <!-- /.box-header -->
               <div class="box-body">
                  <div class="col-xs-12 input-group"  id="div_input_antecedentes">                     
                     <label  class="control-label">Antecedentes familiares: *</label>
                        <?php 
                           $data_input = array(
                           		'type' => "text",
                           		'class' => "form-control",
                           		'id' => "input_antecedentes",
                           		'name' => "input_antecedentes",
                           		'rows' => "3",
                           		"maxlength" => "1000",
                           );
                           echo form_textarea($data_input);	                	
                           ?>  
              		</div>
                      <br>                     
                     <div class="col-xs-12 input-group" id="div_input_enfermedad"> 
                     	<label  class="control-label">Enfermedad actual: *</label>
                        <?php 
                           $data_input = array(
                           		'type' => "text",
                           		'class' => "form-control",
                           		'id' => "input_enfermedad",
                           		'name' => "input_enfermedad",
                           		'rows' => "1",
                           		"maxlength" => "100",
                           );
                           echo form_textarea($data_input);	                	
                           ?>  
                     </div>
                      <br>
                     <label  class="control-label">Observaciones: *</label>
                     <div class="col-xs-12 input-group" id="div_input_observaciones"> 
                        <?php 
                           $data_input = array(
                           		'type' => "text",
                           		'class' => "form-control",
                           		'id' => "input_observaciones",
                           		'name' => "input_observaciones",
                           		'rows' => "3",
                           		"maxlength" => "2000",
                           );
                           echo form_textarea($data_input);	                	
                           ?>  
                     </div>                   
                   <hr>
                  <h3 class="box-title">Información medica *</h3>
                  <small><i class="fa fa-warning"></i> Si no selecciona un pregunta, esta quedara marcada como no.</small>
                  <div class="row">
                  <?php $num_preguntas = count($preguntas);?>
                  	<div class="col-lg-6">
	                  <table class="table table-bordered">
	                     <tr>
	                        <th style="width: 10px">#</th>
	                        <th>Pregunta</th>
	                        <th>Sí</th>
	                        <th>No</th>
	                     </tr>
	                     <?php 
		                     for($i = 1; $i <= $num_preguntas / 2; $i++){
		                     	$pregunta = $preguntas[$i - 1];
		                     	echo '<tr>';
		                     	echo '<td>' .$i . '.</td>';
		                     	echo  '<td>' .$pregunta->desc_pregunta . '</td>';
		                     	echo '<td style="width:2%"> <input type="radio" name="p' . $i .'"  value="1"> </td>';
		                     	echo '<td style="width:2%"> <input type="radio" name="p' . $i .'"  value="0"> </td>';
		                     	echo '</tr>';
		                     }
	                      ?>
	                   </table>                  	
                  	</div>
                  	<div class="col-lg-6">
	                  <table class="table table-bordered">
	                     <tr>
	                        <th style="width: 10px">#</th>
	                        <th>Pregunta</th>
	                        <th>Sí</th>
	                        <th>No</th>
	                     </tr>
	                     <?php 
		                     for($i = $num_preguntas / 2 + 1; $i <= $num_preguntas; $i++){
		                     	$pregunta = $preguntas[$i - 1];
		                     	echo '<tr>';
		                     	echo '<td>' .$i . '.</td>';
		                     	echo  '<td>' .$pregunta->desc_pregunta . '</td>';
		                     	echo '<td style="width:2%"> <input type="radio" name="p' . $i .'"  value="1"> </td>';
		                     	echo '<td style="width:2%"> <input type="radio" name="p' . $i .'"  value="0"> </td>';
		                     	echo '</tr>';
		                     }
	                      ?>
	                   </table>                  	
                  	</div>                  
                  </div>

               </div>
               <div class="box-footer text-center">
                   <button type="button" class="btn btn-danger btn-lg pull-left cancelar-edit-btn" id = "cancelar_edit" name = "cancelar_edit">Cancelar</button>
                  <?php                 
                   /*  $data_input = array(
                     		'class' => "btn btn-danger btn-lg pull-left",
                     		'id' => "edit_cancel_btn",
                     		'name' => "cancelar_edit"
                     ); */
                /*  $str = '<span  class="pull-right" id="runner2"> </span>';

$DOM = new DOMDocument;
$DOM->loadHTML($str);

// all span elements
                   echo "sifhsiod";
echo $DOM->getElementById('runner2')->nodeValue;
$span_list = array();

for($i = 0; $i < $items->length; $i++) {
    $item = $items->item($i);
    $span_list[$item->getAttribute('id')] = $item->nodeValue;
}
extract($span_list);
echo "sd";
echo $runner2; // 239 House
echo "sd";*/
   
                    
                  //  $redirigir = 'Odontologo/Historia_clinica'  ;
                  //   echo anchor(base_url() . $redirigir, 'Cancelar', $data_input);
                     $data_input = array(
                     		'class' => "btn btn-primary btn-lg pull-right",
                     		'id' => "guardar_edit",
                     		'name' => "guardar_edit",
                     		'value' => "Guardar",
                     );
                     echo form_submit($data_input);
                     ?>
               </div>
               <?php echo form_close();?>
            </div>
         </section>
      </div>

      <?php
         $path = "Odontologo/";
         echo '<script>
                 var js_site_url = "'. site_url($path) . '";
               ';
             echo 'var timed = "' . $this->session->userdata('time') . '";';
            echo  '</script>';
         echo plugin_js();
         echo plugin_js('bootstrap');
         echo plugin_js('app');
         echo plugin_js('pace');
         echo plugin_js('timepicker');
         echo plugin_js('runner');
         echo plugin_js('datatable');
         echo plugin_js('sweetalert');
         echo plugin_js('assets/js/dentistware/odontologo.js', true);
      ?>
   </body>
</html>