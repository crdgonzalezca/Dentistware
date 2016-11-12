<?php
if (!defined('BASEPATH'))
	exit('No direct script access allowed');
class Dientes extends Odon_Controller {
	
	function __construct() {
		parent::__construct();
		$this->data['page_title_end'] = '| Dientes';
		$this->load->model('diente_model');
		$this->data['id_cliente'] = '';
	}
    
    public function index() {
		$this->data['dientes'] = $this->diente_model->get_dientes($this->data['id_cliente']);
		$this->load->view('odontologo/dientes_view', $this->data);
	}
    
    public function seleccionarPaciente($doc = '') {
		$this->data['id_cliente'] = $doc;
        redirect('odontologo/Dientes', 'refresh');
	}
    
    public function nuevoDiente(){
        $input = array(
            'num_diente' => $_POST['num'],
            'ausente'    => $_POST['aus'],
			'extraer'    => $_POST['ext'],
			'carie'      => $_POST['car'],
			'obturacion' => $_POST['obt'],
			'corona'     => $_POST['cor'],
            'tramo'      => $_POST['tra']
        );
			
        $result = $this->diente_model->nuevo_diente($input);
		echo $result;
    }
}