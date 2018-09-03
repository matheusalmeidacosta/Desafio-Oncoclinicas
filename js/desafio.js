// JavaScript Document

//Inicia quando a pagina carrega e monitora os eneventos da pagina.
$( document ).ready(function() {
	

	
	$("#VlFabricacao").mask('#.##0,00', {reverse: true});
	$("#VlProduto").mask('#.##0,00', {reverse: true});	
	$("#DataCadastro").mask('00/00/0000');	
	
	$("#salvar").click(function(){
		
		var valida = valida_campos();
		
		if(valida === 0){
			var newRow = $("<tr>");	    
			var cols = "";	
			var qtd_linha = $("#tab-produtos tbody tr").length;
			
			var codProduto   = qtd_linha+1;
			var nomeProduto  = $("#NomeProduto").val();
			var dataCadastro = $("#DataCadastro").val();	
			var vlFabricacao = $("#VlFabricacao").val();
			var porcentagem  = $("#Porcentagem").val(); 
			var vlProduto    = $("#VlProduto").val();
			
			vlFabricacao = formata_moeda(vlFabricacao);

			cols += '<th scope="row" class="tab-ajust">'+codProduto+'</th>';	    
			cols += '<td class="tab-ajust">'+nomeProduto+'</td>';	    
			cols += '<td class="tab-ajust">'+dataCadastro+'</td>';	    
			cols += '<td class="tab-ajust">'+vlFabricacao+'</td>';
			cols += '<td class="tab-ajust">'+porcentagem+' %</td>';
			cols += '<td class="tab-ajust">'+vlProduto+'</td>';		

			newRow.append(cols);	    
			$("#tab-produtos").append(newRow);
			
			$("#CodProduto").val(codProduto+1);
			$("#NomeProduto").val("");
			$("#VlFabricacao").val("");
			$("#Porcentagem").val(""); 
			$("#VlProduto").val("0,00");
			
			mensagem(2, "Produto cadastrado com sucesso!");
		}else{
			mensagem(1, "Existe campos obrigatórios não preenchidos!");
		}	
		
	});	
		
});


//Valida os campos do formulario de cadastro dos produtos. Retorno: Form OK = 0; Form Não Ok = 1. 
function valida_campos(){
	var isvalid = 0;
	
	var nomeProduto  = $("#NomeProduto");
	var vlFabricacao = $("#VlFabricacao");
	var porcentagem  = $("#Porcentagem"); 
	
	if(porcentagem.val() === ""){
		porcentagem.focus();
		porcentagem.addClass("input-erro");
		isvalid = 1;
	}else{
		porcentagem.removeClass("input-erro");
	}
	
	if(vlFabricacao.val() === ""){
		vlFabricacao.focus();
		vlFabricacao.addClass("input-erro");
		isvalid = 1;
	}else{
		vlFabricacao.removeClass("input-erro");
	}
	
	if(nomeProduto.val() === ""){
		nomeProduto.focus();
		nomeProduto.addClass("input-erro");
		isvalid = 1;
	}else{
		nomeProduto.removeClass("input-erro");
	}

	return isvalid;
}

function data_atual(){	
	var now = new Date;
	var dia = now.getDate();
	dia = ("00" + dia).slice(-2);
	var mes = now.getMonth()+1;
	mes = ("00" + mes).slice(-2);
	var ano = now.getFullYear();
	
	return dia+'/'+mes+'/'+ano;
}

function inicia_pagina(){
	var qtd_linha = $("#tab-produtos tbody tr").length+1;
	$("#CodProduto").val(qtd_linha);
	$("#DataCadastro").val(data_atual());
	$("#VlProduto").val("0,00");
}

function calc_preco(){
	
	var vlFabricacao = $("#VlFabricacao").val();
	var porcentagem  = $("#Porcentagem").val() ;
	var formato = { minimumFractionDigits: 2 }

	if(vlFabricacao != "" && porcentagem != ""){
		
		vlFabricacao = vlFabricacao.replace(".", "");
		vlFabricacao = parseFloat(vlFabricacao.replace(",", "."));
		
		porcentagem = porcentagem.replace(".", "");
		porcentagem = parseFloat(porcentagem.replace(",", "."));

		
		var vlProduto    = (vlFabricacao * (porcentagem/100)) + vlFabricacao;
		
		vlProduto = parseFloat(vlProduto.toFixed(2));
		vlProduto = vlProduto.toLocaleString('pt-BR',formato);
		
		$("#VlProduto").val(vlProduto);
		
	}else{
		$("#VlProduto").val("0,00");
	}	
}

function formata_moeda(numero){
	var numeroFormatado = numero;	
	var formato = { minimumFractionDigits: 2 };
	
	numeroFormatado = numeroFormatado.replace(".", "");
	numeroFormatado = numeroFormatado.replace(",", ".");
	numeroFormatado = parseFloat(numeroFormatado);
	numeroFormatado = numeroFormatado.toLocaleString('pt-BR',formato);	
	return numeroFormatado;
}

function mensagem(tipo, mensagem){
	
	/*Tipo de entrada:
	1 - Erro.
	2 - Sucesso.
	*/
	
	if(tipo === 1){
		var msg = '<div class="alert alert-danger alert-dismissible fade show" role="alert">					 '+mensagem+'<button type="button" class="close" data-dismiss="alert" aria-   			label="Close"><span aria-hidden="true">&times;</span></button></div>';
	$("#mensagem").html(msg);
	}else if(tipo === 2){
		var msg = '<div class="alert alert-success alert-dismissible fade show" role="alert">					 '+mensagem+'<button type="button" class="close" data-dismiss="alert" aria-   			label="Close"><span aria-hidden="true">&times;</span></button></div>';
	$("#mensagem").html(msg);
	}

}






