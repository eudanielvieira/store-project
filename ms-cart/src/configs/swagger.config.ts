import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Micro-Serviço de Carrinho de Compras')
  .build();
