# Hub Inteligente de Recursos Educacionais (SmartHub)

## 1. Descrição do Projeto
O SmartHub é uma plataforma Fullstack desenvolvida para a gestão centralizada de materiais didáticos digitais. [cite_start]O sistema visa otimizar o fluxo de trabalho de conteudistas através da integração com modelos de linguagem de grande escala (LLM), permitindo a geração assistida de metadados pedagógicos[cite: 1, 2, 6].

## 2. Requisitos Funcionais Implementados
### 2.1. CRUD de Recursos
[cite_start]Sistema completo para o gerenciamento do ciclo de vida dos materiais, incluindo[cite: 7, 11]:
- [cite_start]Listagem de recursos com suporte a paginação[cite: 10].
- [cite_start]Cadastro de novos materiais com validação de campos obrigatórios[cite: 11, 12].
- [cite_start]Edição de registros existentes e exclusão lógica/física de dados[cite: 11].
- [cite_start]Atributos suportados: Título, Descrição, Tipo (Vídeo, PDF, Link), Link/URL e Tags[cite: 12].

### 2.2. Funcionalidade Smart Assist (IA)
[cite_start]Integração com API de Inteligência Artificial para automação de preenchimento[cite: 13]:
- [cite_start]Processamento de contexto baseado em "Título" e "Tipo" do material[cite: 15].
- [cite_start]Sugestão automática de descrição educativa e recomendações de tags[cite: 16].
- [cite_start]Sincronização automática entre a resposta da API e os campos do formulário no frontend[cite: 17].

## 3. Arquitetura Técnica
### 3.1. Backend (Python)
- [cite_start]**Framework:** FastAPI para construção de API RESTful de alta performance[cite: 21, 22].
- [cite_start]**Validação:** Uso extensivo de Pydantic para garantir a integridade dos contratos de dados[cite: 23].
- [cite_start]**Integração LLM:** Implementação nativa com Google Gemini API utilizando Prompt Engineering para retorno em formato JSON estrito[cite: 29, 34].
- [cite_start]**Segurança:** Gestão de credenciais sensíveis via variáveis de ambiente (.env)[cite: 35, 57].

### 3.2. Frontend (React)
- [cite_start]**Interface:** Single Page Application (SPA) reativa[cite: 37, 38].
- [cite_start]**Experiência do Usuário:** Gerenciamento de estados de carregamento (loading states) durante requisições assíncronas à IA[cite: 39].
- [cite_start]**Resiliência:** Tratamento robusto de exceções para falhas de comunicação ou timeout da API[cite: 41].

## 4. Observabilidade e Diferenciais Técnicos
- [cite_start]**Logs Estruturados:** Registro de telemetria das interações com a IA, incluindo Título da requisição e latência de resposta[cite: 47, 48, 49].
- [cite_start]**Health Check:** Endpoint dedicado (/health) para monitoramento da disponibilidade do serviço[cite: 50].
- [cite_start]**Prompt Engineering:** Configuração de "Assistente Pedagógico" para garantir que o conteúdo gerado seja adequado ao público estudantil[cite: 56].


Projeto desenvolvido conforme as especificações do Desafio Técnico para Desenvolvedor Fullstack.
