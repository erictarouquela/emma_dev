# 📦 Dependências do Frontend - Emma

Este arquivo documenta todas as dependências instaladas para o projeto.

## 🚀 Instalação

Para instalar todas as dependências, execute:

```bash
npm install
```

## 📋 Dependências Principais (package.json)

### Runtime Dependencies
- **react@^19.0.0** - Biblioteca UI React
- **react-dom@^19.0.0** - Renderização React
- **axios@^1.7.0** - Cliente HTTP
- **react-hook-form@^7.51.0** - Gerenciamento de formulários
- **zod@^3.22.0** - Validação de schema
- **lucide-react@^0.408.0** - Ícones SVG

### Dev Dependencies
- **vite@^5.0.0** - Build tool
- **@vitejs/plugin-react@^4.2.0** - Plugin React para Vite
- **tailwindcss@^3.4.0** - Framework CSS
- **postcss@^8.4.0** - Processador CSS
- **autoprefixer@^10.4.0** - Prefixos CSS automáticos
- **@types/react@^18.2.0** - Type definitions React
- **@types/react-dom@^18.2.0** - Type definitions React DOM

## 🛠 Scripts Disponíveis

```bash
npm run dev      # Iniciar servidor de desenvolvimento (http://localhost:5173)
npm run build    # Build para produção
npm run preview  # Pré-visualizar o build
```

## ⚠️ Notas

- O projeto utiliza ESM (ES Modules)
- Tailwind CSS está configurado e pronto para usar
- Vite oferece hot reload automático durante desenvolvimento
- CORS está configurado para `http://localhost:8000/api` (backend)

## 🔧 Se Precisares Adicionar Mais Pacotes

```bash
npm install <nome-do-pacote>
```

O `package.json` será atualizado automaticamente.
