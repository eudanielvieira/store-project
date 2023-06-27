# Shopping Service

Este é um projeto desenvolvido em NestJS que consiste em 2 microserviços, `ms-cart` e `ms-products`, e uma API REST chamada `api-store`.

## Sobre o projeto

O projeto consiste em 2 microserviços que se comunicam através de uma API REST. Cada microserviço se conecta independentemente ao seu respectivo banco de dados. Os bancos de dados utilizados são o PostgreSQL e o MongoDB, conectados aos microserviços de carrinho (ms-cart) e produto (ms-product), respectivamente.

A imagem abaixo ilustra a arquitetura do projeto:

![Diagrama de Arquitetura](/img1.png)

## Dependências do projeto
Este projeto foi desenvolvido na plataforma Windows e requer as seguintes dependências para o desenvolvimento e automação:

- Node.js versão `18.16.0` (ou superior)
- Git Bash (instalado com o Git) para utilizar as automações do projeto
- Docker para utilizar os bancos de dados PostgreSQL e MongoDB

## Execução automática
Este projeto oferece automações para facilitar a execução. O arquivo principal é o `main.sh`, localizado na raiz do projeto. Para executar, abra o Git Bash e execute o seguinte comando:

```bash
$ ./main.sh
```
Isso iniciará a execução do projeto e executará as tarefas automatizadas definidas no arquivo main.sh.

Certifique-se de ter as dependências instaladas corretamente e as permissões adequadas para executar os comandos. Se ocorrerem problemas durante a execução, verifique se todas as dependências estão instaladas corretamente e se você possui as permissões necessárias.

## Sobre o arquivo `main.sh`

O arquivo `main.sh` é um script em shell que automatiza a configuração e execução dos microserviços, bem como a criação dos containers necessários para os bancos de dados PostgreSQL e MongoDB. Além disso, o `main.sh` também realiza testes de cobertura nos microserviços e na API.

## Principais funcionalidades do `main.sh`:

1. Criação dos arquivos `.env` dos microserviços: O script cria automaticamente os arquivos `.env` para cada um dos microserviços, garantindo as configurações necessárias para a execução correta.

2. Criação dos containers dos bancos de dados: O `main.sh` utiliza o Docker para criar os containers dos bancos de dados PostgreSQL e MongoDB, configurando-os de acordo com as necessidades do projeto.

3. Inicialização dos microserviços: O script inicia os microserviços, garantindo que todos estejam prontos para serem utilizados.

4. Execução dos testes de cobertura: O `main.sh` abre um shell interativo para cada microserviço e executa o comando `yarn test:cov`, que é responsável por executar os testes e exibir a cobertura de código. Isso permite verificar a qualidade e a abrangência dos testes em cada microserviço e na API.

## Documentação

A documentação de cada API foi escrita utilizando o Swagger e está disponível nos seguintes endereços:

1. Microserviço de Carrinho (`ms-cart`): [Swagger do ms-cart](http://localhost:5002/swagger)
2. Microserviço de Produto (`ms-products`): [Swagger do ms-products](http://localhost:5001/swagger)
3. Aplicação principal (`api-store`): [Swagger do api-store](http://localhost:5000/swagger)

Você pode acessar os links acima para visualizar a documentação detalhada de cada API. Certifique-se de que os respectivos serviços estejam em execução para acessar corretamente o Swagger.


 