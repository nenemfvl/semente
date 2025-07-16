# Índice das Lógicas do Sistema SementesPLAY

Este arquivo serve como índice e guia rápido para todas as lógicas implementadas no sistema. Cada lógica possui:
- Nome do arquivo
- Breve descrição
- Necessidade de página separada
- Dependências
- Histórico de alterações

---

## Lógicas

- **logica_aprovacao.txt**
  - Aprovação/reprovação de perfis (criador, parceiro, dono de cidade)
  - Página separada: Sim (Gestão de Solicitações - admin)
  - Dependências: logica_notificacoes.txt, logica_historico.txt
  - Histórico: [adicione aqui]

- **logica_pagamentos.txt**
  - Pagamentos, assinaturas e reembolsos
  - Página separada: Sim (Meus Pagamentos/Assinaturas, Gestão de Pagamentos)
  - Dependências: logica_upgrade_planos.txt, logica_notificacoes.txt
  - Histórico: [adicione aqui]

- **logica_vinculo.txt**
  - Vínculo e desvínculo entre jogadores, criadores e cidades
  - Página separada: Não (seção no perfil/painel)
  - Dependências: logica_notificacoes.txt
  - Histórico: [adicione aqui]

- **logica_agendamento.txt**
  - Agendamento e gestão de eventos
  - Página separada: Sim (Eventos/Agenda)
  - Dependências: logica_notificacoes.txt, logica_feedback_evento.txt
  - Histórico: [adicione aqui]

- **logica_relatorios_problemas.txt**
  - Relato e gestão de problemas
  - Página separada: Sim (Relatar Problema, Problemas Reportados)
  - Dependências: logica_notificacoes.txt
  - Histórico: [adicione aqui]

- **logica_enquetes.txt**
  - Enquetes e votações
  - Página separada: Opcional (página ou componente)
  - Dependências: logica_notificacoes.txt
  - Histórico: [adicione aqui]

- **logica_recuperacao_conteudo.txt**
  - Recuperação de conteúdo excluído
  - Página separada: Não (seção no painel)
  - Dependências: logica_historico.txt
  - Histórico: [adicione aqui]

- **logica_upgrade_planos.txt**
  - Upgrade/downgrade de planos
  - Página separada: Não (seção em pagamentos)
  - Dependências: logica_pagamentos.txt
  - Histórico: [adicione aqui]

- **logica_feedback_evento.txt**
  - Feedback pós-evento
  - Página separada: Não (modal/seção no evento)
  - Dependências: logica_agendamento.txt
  - Histórico: [adicione aqui]

- **logica_moderacao.txt**
  - Moderação de conteúdo e denúncias
  - Página separada: Sim (Moderação de Conteúdo/Denúncias)
  - Dependências: logica_notificacoes.txt
  - Histórico: [adicione aqui]

- **logica_moderacao_comunitaria.txt**
  - Moderação comunitária
  - Página separada: Não (integrar à moderação)
  - Dependências: logica_moderacao.txt
  - Histórico: [adicione aqui]

- **logica_avaliacao.txt**
  - Avaliação e reputação de criadores/cidades
  - Página separada: Não (seção no perfil)
  - Dependências: logica_feed.txt
  - Histórico: [adicione aqui]

- **logica_feed.txt**
  - Feed de atividades
  - Página separada: Sim (Feed de Atividades)
  - Dependências: logica_vinculo.txt, logica_agendamento.txt
  - Histórico: [adicione aqui]

- **logica_estatisticas_publicas.txt**
  - Estatísticas públicas/ranking
  - Página separada: Sim (Estatísticas Públicas/Ranking)
  - Dependências: logica_feed.txt
  - Histórico: [adicione aqui]

- **logica_customizacao_perfil.txt**
  - Customização de perfil
  - Página separada: Não (seção no perfil)
  - Dependências: -
  - Histórico: [adicione aqui]

- **logica_relacionamento_cidades.txt**
  - Relacionamento entre cidades
  - Página separada: Não (seção no perfil da cidade)
  - Dependências: logica_vinculo.txt
  - Histórico: [adicione aqui]

- **logica_favoritos.txt**
  - Favoritos/seguindo
  - Página separada: Não (seção no perfil)
  - Dependências: logica_notificacoes.txt
  - Histórico: [adicione aqui]

- **logica_sugestao.txt**
  - Sugestão inteligente de cidades/criadores
  - Página separada: Não (componente em páginas)
  - Dependências: logica_feed.txt, logica_estatisticas_publicas.txt
  - Histórico: [adicione aqui]

- **logica_alteracao_dados.txt**
  - Solicitação de alteração de dados sensíveis
  - Página separada: Não (seção no perfil)
  - Dependências: logica_notificacoes.txt
  - Histórico: [adicione aqui]

- **logica_analytics.txt**
  - Integração com analytics
  - Página separada: Sim (Analytics/Relatórios)
  - Dependências: logica_relatorios.txt
  - Histórico: [adicione aqui]

- **logica_api.txt**
  - Integração com APIs externas
  - Página separada: Sim (Integrações/API)
  - Dependências: logica_permissoes.txt
  - Histórico: [adicione aqui]

- **logica_auditoria_acoes.txt**
  - Auditoria de ações sensíveis
  - Página separada: Sim (Auditoria)
  - Dependências: logica_auditoria.txt
  - Histórico: [adicione aqui]

- **logica_auditoria.txt**
  - Auditoria do sistema
  - Página separada: Sim (Auditoria)
  - Dependências: logica_auditoria_acoes.txt
  - Histórico: [adicione aqui]

- **logica_backup_usuario.txt**
  - Backup de dados do usuário
  - Página separada: Não (opção no perfil)
  - Dependências: logica_backup.txt
  - Histórico: [adicione aqui]

- **logica_backup.txt**
  - Backup e recuperação de dados do sistema
  - Página separada: Não (opção no painel admin)
  - Dependências: -
  - Histórico: [adicione aqui]

- **logica_banimento.txt**
  - Banimento/suspensão de usuários
  - Página separada: Não (painel admin)
  - Dependências: logica_historico.txt
  - Histórico: [adicione aqui]

- **logica_convites.txt**
  - Convites e indicações
  - Página separada: Não (seção no perfil)
  - Dependências: logica_notificacoes.txt
  - Histórico: [adicione aqui]

- **logica_gamificacao.txt**
  - Gamificação (badges, conquistas)
  - Página separada: Opcional (página ou seção no perfil)
  - Dependências: logica_feed.txt
  - Histórico: [adicione aqui]

- **logica_historico.txt**
  - Histórico de atividades
  - Página separada: Não (aba/seção no painel)
  - Dependências: -
  - Histórico: [adicione aqui]

- **logica_limite_acoes.txt**
  - Limite de ações para evitar spam
  - Página separada: Não (backend/alerta)
  - Dependências: -
  - Histórico: [adicione aqui]

- **logica_mensagens_automaticas.txt**
  - Mensagens automáticas do sistema
  - Página separada: Não (backend/notificações)
  - Dependências: logica_notificacoes.txt
  - Histórico: [adicione aqui]

- **logica_mensagens.txt**
  - Mensagens internas (inbox)
  - Página separada: Sim (Mensagens)
  - Dependências: logica_notificacoes.txt
  - Histórico: [adicione aqui]

- **logica_multidioma.txt**
  - Multi-idioma
  - Página separada: Não (configuração global/menu)
  - Dependências: -
  - Histórico: [adicione aqui]

- **logica_notificacoes_tempo_real.txt**
  - Notificações em tempo real
  - Página separada: Não (componente global)
  - Dependências: logica_notificacoes.txt
  - Histórico: [adicione aqui]

- **logica_notificacoes.txt**
  - Notificações gerais
  - Página separada: Não (componente global)
  - Dependências: -
  - Histórico: [adicione aqui]

- **logica_onboarding.txt**
  - Onboarding/tutorial para novos usuários
  - Página separada: Não (modal/componente)
  - Dependências: -
  - Histórico: [adicione aqui]

- **logica_permissoes.txt**
  - Permissões de papéis
  - Página separada: Não (painel admin)
  - Dependências: -
  - Histórico: [adicione aqui]

- **logica_preferencias.txt**
  - Preferências e privacidade
  - Página separada: Não (seção no perfil)
  - Dependências: -
  - Histórico: [adicione aqui]

- **logica_recuperacao.txt**
  - Recuperação de conta
  - Página separada: Sim (Recuperar Senha)
  - Dependências: -
  - Histórico: [adicione aqui]

- **logica_relatorios.txt**
  - Relatórios e estatísticas
  - Página separada: Sim (Relatórios/Estatísticas)
  - Dependências: logica_analytics.txt
  - Histórico: [adicione aqui]

- **logica_suporte.txt**
  - Suporte/contato
  - Página separada: Sim (Suporte/Contato)
  - Dependências: logica_notificacoes.txt
  - Histórico: [adicione aqui]

- **logica_termos.txt**
  - Termos de uso e consentimento
  - Página separada: Sim (Termos de Uso e Privacidade)
  - Dependências: -
  - Histórico: [adicione aqui]

---

## Observações
- Sempre que atualizar uma lógica, registre no bloco "Histórico" do arquivo correspondente.
- Mantenha os nomes dos arquivos padronizados.
- Adicione exemplos práticos e dependências sempre que possível. 