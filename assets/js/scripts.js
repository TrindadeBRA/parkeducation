// Função para preencher o formulário com base no JSON
function preencherFormulario() {
    fetch('./assets/data/data.json')
        .then(response => response.json())
        .then(json => {

            var selectEstado = document.getElementById("estado");
            var selectCidade = document.getElementById("cidade");
            var selectUnidade = document.getElementById("unidade");

            // Limpar as opções existentes
            selectEstado.innerHTML = "";
            selectCidade.selectedIndex = 0;
            selectUnidade.selectedIndex = 0;

            // Adicionar a opção inicial no select de Estado
            var optionInicialEstado = document.createElement("option");
            optionInicialEstado.value = "";
            optionInicialEstado.text = "ESTADO";
            optionInicialEstado.disabled = true;
            optionInicialEstado.selected = true;
            selectEstado.appendChild(optionInicialEstado);

            // Filtrar e obter os estados únicos
            var estados = [...new Set(json.map(item => item.Estado))];

            // Preencher o select de Estado com base nos estados filtrados
            for (var i = 0; i < estados.length; i++) {
                var optionEstado = document.createElement("option");
                optionEstado.value = estados[i];
                optionEstado.text = estados[i];
                selectEstado.appendChild(optionEstado);
            }

            // Preencher o select de Cidade quando o Estado for selecionado
            selectEstado.addEventListener("change", function (e) {

                // Limpar as opções existentes
                selectCidade.value = e.target.value;
                selectCidade.innerHTML = "";

                selectUnidade.innerHTML = "";
                var optionUnidadeInicial = document.createElement("option");
                optionUnidadeInicial.value = "";
                optionUnidadeInicial.text = "ESCOLHA UMA UNIDADE PARK";
                optionUnidadeInicial.disabled = true;
                optionUnidadeInicial.selected = true;
                selectUnidade.appendChild(optionUnidadeInicial);
                selectUnidade.selectedIndex = 0;

                // Adicionar a opção inicial no select de Cidade
                var optionInicialCidade = document.createElement("option");
                optionInicialCidade.text = "CIDADE";
                optionInicialCidade.disabled = true;
                optionInicialCidade.selected = true;
                selectCidade.appendChild(optionInicialCidade);

                // Filtrar as cidades com base no Estado selecionado
                var estadoSelecionado = selectEstado.value;
                var cidades = [...new Set(json.filter(function (item) {
                    return item.Estado === estadoSelecionado;
                }).map(item => item.Cidade))];

                // Preencher o select de Cidade com base nas cidades filtradas
                for (var j = 0; j < cidades.length; j++) {
                    var optionCidade = document.createElement("option");
                    optionCidade.value = cidades[j];
                    optionCidade.text = cidades[j];
                    selectCidade.appendChild(optionCidade);
                }
            });


            // Preencher o select de Unidade quando a Cidade for selecionada
            selectCidade.addEventListener("change", function (e) {
                // Limpar as opções existentes
                selectUnidade.innerHTML = "";

                // Adicionar a opção "ESCOLHA UMA UNIDADE PARK" no select de Unidade
                var optionUnidadeInicial = document.createElement("option");
                optionUnidadeInicial.value = "";
                optionUnidadeInicial.text = "ESCOLHA UMA UNIDADE PARK";
                optionUnidadeInicial.disabled = true;
                optionUnidadeInicial.selected = true;
                selectUnidade.appendChild(optionUnidadeInicial);

                // Filtrar as unidades com base na Cidade selecionada
                var cidadeSelecionada = selectCidade.value;
                var unidades = json.filter(function (item) {
                    return item.Cidade === cidadeSelecionada;
                });

                // Preencher o select de Unidade com base nas unidades filtradas
                for (var k = 0; k < unidades.length; k++) {
                    var optionUnidade = document.createElement("option");
                    optionUnidade.value = unidades[k].Unidade;
                    optionUnidade.text = unidades[k].Unidade;
                    selectUnidade.appendChild(optionUnidade);
                }
            });

            // Preencher o select de Unidade quando a Cidade for selecionada
            selectUnidade.addEventListener("change", function (e) {

                // Filtrar as unidades com base na Cidade selecionada
                var unidadeSelecionada = selectUnidade.value;
                var emails = json.filter(function (item) {
                    return item.Unidade === unidadeSelecionada;
                });

                // Preencher o select de Unidade com base nas unidades filtradas
                for (var k = 0; k < emails.length; k++) {
                    var emailsStore = {};
                    emails[k]["E-mail da unidade"] ? emailsStore["E-mail da unidade"] = emails[k]["E-mail da unidade"] : "";
                    emails[k]["E-mail Comercial"] ? emailsStore["E-mail Comercial"] = emails[k]["E-mail Comercial"] : "";
                    emails[k]["E-mail Backup Park"] ? emailsStore["E-mail Backup Park"] = emails[k]["E-mail Backup Park"] : "";
                    emails[k]["Estado"] ? emailsStore["Estado"] = emails[k]["Estado"] : "";
                    emails[k]["Cidade"] ? emailsStore["Cidade"] = emails[k]["Cidade"] : "";
                    emails[k]["Unidade"] ? emailsStore["Unidade"] = emails[k]["Unidade"] : "";
                }
                var inputHidden = document.getElementById("json-data");
                inputHidden.value = JSON.stringify(emailsStore);
            });

        })
        .catch(error => console.log('Ocorreu um erro ao carregar o JSON:', error));
}

function formatarTelefone(input) {
    // Remove todos os caracteres que não são dígitos
    var telefone = input.value.replace(/\D/g, '');

    // Formata o telefone de acordo com a máscara (11) 00000-0000
    var formatado = telefone.replace(/^(\d{2})(\d{0,5})(\d{0,4}).*/, '($1) $2-$3');

    // Atualiza o valor do input
    input.value = formatado;
}

document.addEventListener("DOMContentLoaded", function() {
    // Verifica se o parâmetro "emailsend" é igual a "true"
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("emailsend") === "true") {
      // Remove a classe "hidden" do elemento com o ID "submitmail"
      const submitMailElement = document.getElementById("submitmail");
      if (submitMailElement) {
        submitMailElement.classList.remove("hidden");
      }
    }
  });
  
  
