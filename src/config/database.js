// sequelaze-cli não entende import e export, precisamos fazer na sintaxe antiga

module.exports = {
  dialect: 'postgres', // informa o banco de dados que eu vou utilizar
  url: 'postgresql://postgres:etQaFMGkKUCBlhyYSvDWVFLIRSswWvXq@viaduct.proxy.rlwy.net:27951/railway',
  // host: 'localhost',
  // username: 'postgres', // username pra entrar no Postbird
  //  port: 5432,
  //  password: 'codemaster', // senha pra entrar no Postbird
  //  database: 'hackton-users', // conforme arquivo já criado no Postbird
  define: {
    timespamps: true, // ele adiciona automaticamente nas informações a data do created_at e do updated_at que registra a data criada e a data da última atualização
    underscored: true, // as duas configurações são para que ele não utilize o camelCase para nomes e que seja tudo em caixa baixa e separados por underline
    underscoredAll: true // explicação acima
  }
}
