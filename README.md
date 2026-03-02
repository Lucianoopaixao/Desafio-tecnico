# Hub Inteligente de Recursos Educacionais (SmartHub)

## 1. Descrição do Projeto
O SmartHub é uma plataforma Fullstack desenvolvida para a gestão centralizada de materiais didáticos digitais. O sistema visa otimizar o fluxo de trabalho de conteudistas através da integração com modelos de linguagem de grande escala (LLM), permitindo a geração assistida de metadados pedagógicos.

## 2. Requisitos Funcionais Implementados
### 2.1. CRUD de Recursos
Sistema completo para o gerenciamento do ciclo de vida dos materiais, incluindo:
- Listagem de recursos com suporte a paginação.
- Cadastro de novos materiais com validação de campos obrigatórios.
- Edição de registros existentes e exclusão de dados.
- Atributos suportados: Título, Descrição, Tipo (Vídeo, PDF, Link), Link/URL e Tags.

### 2.2. Funcionalidade Smart Assist (IA)
Integração com API de Inteligência Artificial para automação de preenchimento:
- Processamento de contexto baseado em "Título" e "Tipo" do material.
- Sugestão automática de descrição educativa e recomendações de tags.
- Sincronização automática entre a resposta da API e os campos do formulário no frontend.

## 3. Arquitetura Técnica
### 3.1. Backend (Python)
- Framework: FastAPI para construção de API RESTful de alta performance.
- Validação: Uso de Pydantic para garantir a integridade dos contratos de dados.
- Integração LLM: Implementação com Google Gemini API utilizando Prompt Engineering para retorno em formato JSON estrito.
- Segurança: Gestão de credenciais sensíveis via variáveis de ambiente (.env).

### 3.2. Frontend (React)
- Interface: Single Page Application (SPA) reativa.
- Experiência do Usuário: Gerenciamento de estados de carregamento (loading states) durante requisições à IA.
- Resiliência: Tratamento de exceções para falhas de comunicação ou timeout da API.

## 4. Observabilidade e Diferenciais Técnicos
- Logs Estruturados: Registro de telemetria das interações com a IA, incluindo Título da requisição e latência de resposta.
- Health Check: Endpoint dedicado (/health) para monitoramento da disponibilidade do serviço.
- Prompt Engineering: Configuração de "Assistente Pedagógico" para garantir que o conteúdo gerado seja adequado ao público estudantil.


Projeto desenvolvido conforme as especificações do Desafio Técnico para Desenvolvedor Fullstack.
