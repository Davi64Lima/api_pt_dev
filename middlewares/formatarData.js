function formatarData(dataString) {
  // Parse da data original
  const data = new Date(dataString);

  // Obtém os componentes da data e hora
  const dia = String(data.getDate()).padStart(2, "0"); // Dia com dois dígitos
  const mes = String(data.getMonth() + 1).padStart(2, "0"); // Mês com dois dígitos (lembrando que janeiro é 0)
  const ano = data.getFullYear();
  const horas = String(data.getHours()).padStart(2, "0"); // Hora com dois dígitos
  const minutos = String(data.getMinutes()).padStart(2, "0"); // Minutos com dois dígitos

  // Formata a data no formato desejado
  const dataFormatada = `${dia}/${mes}/${ano} às ${horas}:${minutos}`;

  return dataFormatada;
}

module.exports = formatarData;
