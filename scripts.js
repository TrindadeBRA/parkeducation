// Função para preencher o formulário com base no JSON
function preencherFormulario() {
    fetch('data.json')
        .then(response => response.json())
        .then(json => {
            var selectEstado = document.getElementById("estado");
            var selectCidade = document.getElementById("cidade");
            var selectUnidade = document.getElementById("unidade");

            // Limpar as opções existentes
            selectEstado.innerHTML = "";
            selectCidade.innerHTML = "";
            selectUnidade.innerHTML = "";

            // Adicionar a opção inicial no select de Estado
            var optionInicialEstado = document.createElement("option");
            optionInicialEstado.value = "";
            optionInicialEstado.text = "Selecione seu estado";
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
            selectEstado.addEventListener("change", function () {
                // Limpar as opções existentes
                selectCidade.innerHTML = "";
                selectUnidade.innerHTML = "";

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
            selectCidade.addEventListener("change", function () {
                // Limpar as opções existentes
                selectUnidade.innerHTML = "";

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
        })
        .catch(error => console.log('Ocorreu um erro ao carregar o JSON:', error));
}