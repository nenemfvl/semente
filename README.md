# SementesPLAY

Site para conectar jogadores, criadores de conteúdo de FiveM e cidades/servidores.

## Stack Principal
- **Frontend:** Next.js (React)
- **Estilização:** TailwindCSS (dark mode por padrão)
- **Animações:** Framer Motion
- **Backend/Banco:** Firebase (Auth, Firestore, Storage)
- **Hospedagem:** Vercel
- **Ícones/Componentes:** Heroicons, HeadlessUI

## Funcionalidades do MVP
- Cadastro/login/recuperação de senha
- Aceite obrigatório dos termos de uso
- Perfis dinâmicos: usuário, criador, dono de cidade, admin
- Solicitação e aprovação de papéis
- Vínculos entre jogadores, criadores e cidades
- Feed de atividades e notificações
- Painel admin para aprovações
- Suporte/contato

## Fluxo de papéis
- Todo usuário começa como "usuário comum"
- Pode solicitar ser criador ou dono de cidade
- Admin aprova solicitações
- Permissões e navegação mudam conforme papel

## Como rodar localmente
```bash
npm install
npm run dev
```

## Deploy
- Deploy automático na Vercel (recomendado)
- Configurar variáveis de ambiente do Firebase em `.env.local`

## Observações
- Consulte os blocos de notas em `/blocos_de_notas` para lógicas detalhadas
- Visual dark/gamer, responsivo e moderno
- Código pronto para expansão futura 