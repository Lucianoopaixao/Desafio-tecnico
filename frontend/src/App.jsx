import React, { useState, useEffect } from "react";
import axios from "axios";
import { Sparkles, Plus, Trash2, Globe } from "lucide-react";
import "./App.css";

const API_URL = "http://127.0.0.1:8000"; //url do uvicorn

function App() {
  // controle de estados com as infos dos recursos
  const [recursos, setRecursos] = useState([]);
  const [loadingIA, setLoadingIA] = useState(false);
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    tipo: "Vídeo",
    url: "",
    tags: "",
  });

  // carregando lista de recursos
  useEffect(() => {
    fetchRecursos();
  }, []);

  const fetchRecursos = async () => {
    const res = await axios.get(`${API_URL}/recursos/`);
    setRecursos(res.data);
  };

  // assistencia pedagogica inteligente
  const handleSmartAssist = async () => {
    if (!formData.titulo) return alert("Digite um titulo primeiro");

    setLoadingIA(true);
    try {
      const res = await axios.post(`${API_URL}/smart-assist`, {
        titulo: formData.titulo,
        tipo: formData.tipo,
      });

      // retorno da AI
      setFormData({
        ...formData,
        descricao: res.data.descricao,
        tags: res.data.tags.join(", "),
      });
    } catch (error) {
      alert("Erro ao consultar a AI.");
    } finally {
      setLoadingIA(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${API_URL}/recursos/`, formData);
    setFormData({
      titulo: "",
      descricao: "",
      tipo: "Vídeo",
      url: "",
      tags: "",
    });
    fetchRecursos();
  };

  //caracterizacao
  return (
    <div className="container">
      <h1>Hub de Recursos</h1>

      <form className="form-card" onSubmit={handleSubmit}>
        <input
          placeholder="Título do Material"
          value={formData.titulo}
          onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
          required
        />

        <div className="row">
          <select
            value={formData.tipo}
            onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
          >
            <option>Vídeo</option>
            <option>PDF</option>
            <option>Link</option>
          </select>

          <button
            type="button"
            className="btn-ai"
            onClick={handleSmartAssist}
            disabled={loadingIA}
          >
            <Sparkles size={16} />
            {loadingIA ? "AI Pensando..." : "Smart Assist"}
          </button>
        </div>

        <textarea
          placeholder="Descrição sugerida pela AI"
          value={formData.descricao}
          onChange={(e) =>
            setFormData({ ...formData, descricao: e.target.value })
          }
          rows="3"
        />

        <input
          placeholder="URL do Recurso"
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          required
        />

        <input
          placeholder="Tags (AI sugere automaticamente)"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
        />

        <button type="submit" className="btn-submit">
          Cadastrar Recurso
        </button>
      </form>

      <div className="resource-grid">
        <h2>Materiais Disponíveis</h2>
        {recursos.map((r) => (
          <div key={r.id} className="resource-card">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>{r.titulo}</h3>
              <span className="badge">{r.tipo}</span>
            </div>
            <p>{r.descricao}</p>
            <small>
              <strong>Tags:</strong> {r.tags}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
