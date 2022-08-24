export interface CreateHashServiceDTO {
  tweetId: string;
  tweetCreatedAt: string;
}

/**
 * 1. checar se existe um screenshot com o mesmo tweet id, size e theme ('dark', 'light')
 *   a. se existe, então recuperar da base e disparar um evento screenshot ready | screenshot created
 *   b. enviar o email com o screenshot para o usuário
 *
 * 2. se não existe,
 */
