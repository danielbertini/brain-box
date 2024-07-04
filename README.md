# Teste LaborIt

Desenvolvimento de uma interface de usuário para um chat inteligente visando
aprimorar a comunicação e o suporte ao cliente na empresa FinTechX.
A FinTechX, reconhece a necessidade de melhorar a interação e o suporte oferecido aos seus
clientes. Enfrentando desafios na rápida resposta às dúvidas e na personalização do
atendimento ao cliente, a empresa busca soluções tecnológicas que proporcionem um
serviço mais eficiente e acessível.

O desafio proposto envolve a criação de um chat inteligente com uma interface de usuário
intuitiva e responsiva, garantindo acesso fácil e consistente a todos os usuários e
dispositivos. Este chat inteligente funcionará como um assistente virtual, projetado para
responder automaticamente às dúvidas dos clientes em tempo real, utilizando linguagem
natural para proporcionar uma experiência de usuário fluida e satisfatória.

## Premissas

1. Lembre-se, você pode contar conosco para tirar dúvidas;
2. Você deve criar uma aplicação em React ou React Native;
   a. Caso escolha React, publicar a solução em um host free (vercel, netlify, etc).
   b. Se escolher React Native, gerar o build e disponibilizar o arquivo ou publicar nas lojas.
3. Utilize qualquer Modelo de Linguagem (LLM) para implementar a funcionalidade de chat inteligente;
4. Será avaliado com base na qualidade do código, boas práticas, UI/UX e nas interações do chat.
5. Documentação, testes, CI/CD são diferenciais.

## Assets

https://www.figma.com/file/GVJntS7Sv1ludiySw12tka/Laborit-UI-Test-File

## Considerações de UI/UX

- Levando em consideração que optei pelo desenvolvimento ReactJs/NextJs (web) fiz alguns ajustes no layout para dar melhor suporte à responsividade.
- Fiz também algumas mudanças/sugestões em relação ao design proposto de acordo com meu entendimento sobre UI/UX, em um contexto normal penso que isso seria algo a ser alinhado com a equipe de design, mas para efeitos de teste achei interessante expor também minhas sugestões.
- Para ganhar mais agilidade não utilizei os ícones propostos no protótipo, para isso utilizei a lib (https://lucide.dev/icons/)
- Multi indiomas (EN/PT) com detecção automática.
- Theme (Light/Dark) com detecção automática.

## Considerações de IA

- Para treinamento utilizei a OpenAi com treinamento utilizando o Banco de Dados Vetorial no Supabase.
- Estou armazenando os vetores em uma coluna "vector".
- Como esta parte está em minha conta Supabase não coloquei aqui, mas caso considerem necessário posso mostrar o passo a passo de como estou criando isso (treinamento).

## Acesso

[Clique aqui para acessar](https://brainbox-daniel.vercel.app/pt)

## Autor

- **Daniel Bertini** [linkedin](https://linkedin.com/in/danielbertini) - [whatsapp](+5511976910760)

Agradeço à oportunidade e me coloco à disposição para esclarecer qualquer dúvida.
