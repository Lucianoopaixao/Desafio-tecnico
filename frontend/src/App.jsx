import React, { useState, useEffect } from "react";
import axios from "axios";
import { Sparkles, Plus, Trash2, Globe, Edit3 } from "lucide-react";
import "./App.css";

const API_URL = "http://127.0.0.1:8000"; //url do uvicorn

function App() {
  // controle de estados com as infos dos recursos CRUD
  const [recursos, setRecursos] = useState([]);
  const [loadingIA, setLoadingIA] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
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

  //delete
  const handleDelete = async (id) => {
    if (window.confirm("Deseja realmente excluir este material?")) {
      try {
        await axios.delete(`${API_URL}/recursos/${id}`);
        fetchRecursos(); // Atualiza a lista após deletar [cite: 10]
      } catch (error) {
        alert("Erro ao excluir recurso.");
      }
    }
  };

  // edit
  const handleEdit = (recurso) => {
    setIsEditing(true);
    setEditingId(recurso.id);
    setFormData({
      titulo: recurso.titulo,
      descricao: recurso.descricao,
      tipo: recurso.tipo,
      url: recurso.url,
      tags: recurso.tags,
    });
    window.scrollTo({ top: 0, behavior: "smooth" }); // Sobe para o formulário
  };

  // cancel edit
  const cancelEdit = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({
      titulo: "",
      descricao: "",
      tipo: "Vídeo",
      url: "",
      tags: "",
    });
  };

  //submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // edit ativo
        await axios.put(`${API_URL}/recursos/${editingId}`, formData);
      } else {
        // se for new
        await axios.post(`${API_URL}/recursos/`, formData);
      }

      cancelEdit();
      fetchRecursos();
    } catch (error) {
      alert("Erro ao salvar recurso.");
    }
  };

  //caracterizacao
  return (
    <div className="container">
      <h1>Hub de Recursos</h1>

      <form className="form-card" onSubmit={handleSubmit}>
        <h2>{isEditing ? "Editar Recurso" : "Novo Cadastro"}</h2>

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
          placeholder="Descrição"
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
          placeholder="Tags"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
        />

        <div className="row">
          <button type="submit" className="btn-submit">
            {isEditing ? "Atualizar Recurso" : "Cadastrar Recurso"}
          </button>

          {isEditing && (
            <button type="button" className="btn-cancel" onClick={cancelEdit}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div className="materials-section">
        <h2>Materiais Disponíveis</h2>
        <div className="resource-grid">
          {recursos.map((r) => (
            <div key={r.id} className="resource-card">
              <div className="card-header">
                <div className="title-area">
                  <h3>{r.titulo}</h3>
                  <span className="badge">{r.tipo}</span>
                </div>
                <div className="actions">
                  <button onClick={() => handleEdit(r)} className="btn-icon">
                    <Edit3 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(r.id)}
                    className="btn-icon delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <p className="description">{r.descricao}</p>
              <div className="card-footer">
                <strong>Tags:</strong> {r.tags}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
