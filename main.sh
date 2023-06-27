#!/bin/bash
# CRIA UM ARQUIVO .ENV PARA O MICROSERVIÇO DE PRODUTOS
ms_products_env_file="ms-products/.env"

if [ -f "$ms_products_env_file" ]; then
  echo "O arquivo .env já existe na pasta ms-products."
else
  echo "O arquivo .env não existe na pasta ms-products. Criando..."
  touch "$ms_products_env_file"
  echo -e "APP_PORT=5001\n\nMONGO_URI=mongodb://localhost:27017\nMONGO_DB_NAME=products" >> "$ms_products_env_file"
  echo "O arquivo .env foi criado com sucesso na pasta ms-products."
fi


# CRIA UM ARQUIVO .ENV PARA O MICROSERVIÇO DE CARRINHO
ms_cart_env_file="ms-cart/.env"

if [ -f "$ms_cart_env_file" ]; then
  echo "O arquivo .env já existe na pasta ms-cart."
else
  echo "O arquivo .env não existe na pasta ms-cart. Criando..."
  touch "$ms_cart_env_file"
  echo -e "APP_PORT=5002\n\nDB_HOST=localhost\nDB_NAME=shopping_cart\nDB_USER=postgres\nDB_PASSWORD=postgres\nDB_PORT=5432\nPOSTGRES_HOST_AUTH_METHOD=trust\nDB_SYNCHRONIZE=true" >> "$ms_cart_env_file"
  echo "O arquivo .env foi criado com sucesso na pasta ms-cart."
fi

# CRIA UM ARQUIVO .ENV PARA O MICROSERVIÇO DE CARRINHO
api_store_env_file="api-store/.env"

if [ -f "$api_store_env_file" ]; then
  echo "O arquivo .env já existe na pasta api-store."
else
  echo "O arquivo .env não existe na pasta api-store. Criando..."
  touch "$api_store_env_file"
  echo -e "APP_PORT=5000\n\nMS_PRODUCTS_URL=http://localhost:5001\nMS_CART_URL=http://localhost:5002" >> "$api_store_env_file"
  echo "O arquivo .env foi criado com sucesso na pasta api-store."
fi

sleep 1

start "" "C:\Program Files\Git\bin\bash.exe" -c "cd ms-products; ./startup-ms-products.sh"
start "" "C:\Program Files\Git\bin\bash.exe" -c "cd ms-cart; ./startup-ms-cart.sh"
start "" "C:\Program Files\Git\bin\bash.exe" -c "cd api-store; ./startup-api-store.sh"

start "" "C:\Program Files\Git\bin\bash.exe" -c "cd ms-products; yarn test:cov --watchAll=true"
start "" "C:\Program Files\Git\bin\bash.exe" -c "cd ms-cart; yarn test:cov --watchAll=true"
start "" "C:\Program Files\Git\bin\bash.exe" -c "cd api-store; yarn test:cov --watchAll=true"

docker-compose up -d

sleep 5

docker exec -it postgres_cart createdb -U postgres shopping_cart
