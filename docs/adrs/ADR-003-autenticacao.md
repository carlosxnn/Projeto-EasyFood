# ADR-003: Escolha da Estratégia de Autenticação

## Contexto

A Missão 4 do projeto EasyFood exige a definição de uma arquitetura de autenticação para proteger as rotas da API. Atualmente, os endpoints estão públicos. É necessário pesquisar, escolher e justificar uma solução de autenticação, considerando o estágio atual do projeto e sua arquitetura em camadas. A implementação completa do login de usuário não é um requisito imediato, mas a estrutura para autenticação deve ser estabelecida.

## Alternativas Consideradas

### 1. JSON Web Tokens (JWT)

- **Descrição:** Um padrão aberto (RFC 7519) para criar tokens de acesso que afirmam um número de "claims". Os tokens são assinados digitalmente, permitindo que o servidor verifique sua autenticidade sem consultar um banco de dados a cada requisição.
- **Prós:**
    - **Stateless:** O servidor não precisa manter o estado da sessão.
    - **Leve e Flexível:** Pode ser usado em diferentes tipos de aplicações (web, mobile) e se integra bem com arquiteturas de microsserviços.
    - **Padrão da Indústria:** Vasta documentação e bibliotecas robustas disponíveis para Node.js (ex: `jsonwebtoken`).
- **Contras:**
    - **Invalidação Complexa:** Uma vez emitido, um token é válido até sua expiração. A invalidação imediata requer uma lógica adicional (como uma blacklist), quebrando a natureza stateless.
    - **Segurança do Payload:** O payload é apenas codificado (Base64), não criptografado. Dados sensíveis não devem ser armazenados nele.

### 2. AWS Cognito

- **Descrição:** Um serviço de identidade totalmente gerenciado pela AWS. Oferece gerenciamento de diretório de usuários, login social (Google, Facebook), federação de identidade e recursos de segurança avançados.
- **Prós:**
    - **Totalmente Gerenciado:** A AWS cuida da infraestrutura, escalabilidade e segurança do serviço de identidade.
    - **Funcionalidades Completas:** Inclui registro, login, recuperação de senha, MFA (Multi-Factor Authentication), etc.
- **Contras:**
    - **Vendor Lock-in:** Cria uma forte dependência do ecossistema AWS.
    - **Complexidade de Configuração:** Pode ser excessivamente complexo para as necessidades iniciais do projeto.
    - **Custo:** Embora possua um nível gratuito, os custos podem aumentar com a base de usuários.

### 3. Login com Provedores Sociais (ex: Google Sign-In via OAuth 2.0)

- **Descrição:** Delega o processo de autenticação a um provedor de identidade terceirizado e confiável, como o Google. A aplicação recebe um token ou código após o usuário se autenticar com sucesso no provedor.
- **Prós:**
    - **Conveniência para o Usuário:** Muitos usuários já possuem uma conta Google, simplificando o processo de login.
    - **Segurança Delegada:** A responsabilidade de armazenar e proteger senhas fica com o provedor.
- **Contras:**
    - **Dependência de Terceiros:** A aplicação fica dependente da disponibilidade e das políticas do provedor.
    - **Gerenciamento de Sessão:** A aplicação ainda precisa gerenciar sua própria sessão e autorização após a autenticação inicial.

## Solução Escolhida

**JSON Web Tokens (JWT)**

## Justificativa

Para o estágio atual do projeto EasyFood, a escolha do **JWT** é a mais pragmática e alinhada com os objetivos da Missão 4. A principal meta é estabelecer uma **arquitetura em camadas** para autenticação, e não necessariamente implementar um sistema de login completo e complexo.

- **Simplicidade e Controle:** JWT oferece um equilíbrio ideal entre segurança e simplicidade de implementação. Permite-nos criar a camada de autenticação (geração de token, middleware de verificação) com controle total sobre o código, o que é educacionalmente valioso e suficiente para as necessidades atuais.
- **Alinhamento com a Arquitetura:** Uma solução baseada em JWT se encaixa perfeitamente na arquitetura de serviços existente. Podemos criar um `auth.service` para encapsular a lógica de geração e verificação de tokens, e um middleware para proteger as rotas, mantendo a separação de responsabilidades.
- **Independência de Infraestrutura:** Diferente do AWS Cognito, o JWT não nos acopla a um provedor específico, mantendo a portabilidade e a flexibilidade da aplicação.
- **Escopo Apropriado:** Enquanto Cognito e Login Social são soluções poderosas, elas são superdimensionadas para o requisito atual, que é focar na estrutura da aplicação. JWT nos permite atender ao requisito sem introduzir complexidade desnecessária.

## Consequências

### Positivas

- A arquitetura de autenticação será definida de forma clara e desacoplada.
- A solução é leve e não adiciona dependências externas de infraestrutura.
- Mantém o foco no aprendizado da arquitetura de software, em vez de na configuração de um serviço gerenciado.

### Negativas / Trade-offs

- **Gerenciamento de Invalidação:** A invalidação de tokens antes da expiração (por exemplo, ao fazer logout) não é trivial. Para o escopo atual, aceitamos o trade-off de que os tokens serão válidos até expirarem. Em uma implementação futura, uma estratégia de blacklist poderia ser adicionada se necessário.
- **Segurança do Token:** A responsabilidade de armazenar o token de forma segura no cliente (por exemplo, em um cookie `httpOnly`) e de proteger a chave secreta (`JWT_SECRET`) no servidor é inteiramente nossa.

## Critérios de Revisão

- O ADR deve ser claro e justificar a decisão.
- A solução escolhida deve ser implementável dentro do contexto do projeto.
- As consequências e trade-offs devem ser explicitamente declarados.