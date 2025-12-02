import React, { useEffect, useState, useRef } from "react";
import api from "../services/api";
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { confirmDialog } from 'primereact/confirmdialog';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Divider } from 'primereact/divider';

export default function PanelAdministrador() {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({
    id: null,
    titulo: "",
    preco: null,
    categoria: "",
    imagem: "",
  });
  const toast = useRef(null);

  const categorias = [
    { label: "Selecione a categoria", value: "" },
    { label: "Eletrônicos", value: "electronics" },
    { label: "Joias", value: "jewelery" },
    { label: "Roupas Masculinas", value: "men's clothing" },
    { label: "Roupas Femininas", value: "women's clothing" }
  ];

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await api.get("/products");
        setProductos(
          res.data.map((p) => ({
            ...p,
            createdAt: new Date(),
            updatedAt: new Date(),
          }))
        );
      } catch (err) {
        console.log(err);
        toast.current?.show({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao carregar produtos',
          life: 3000
        });
      }
    }

    fetchProducts();
  }, []);

  function handleChange(name, value) {
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.titulo || !form.preco || !form.categoria || !form.imagem) {
      toast.current?.show({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'Preencha todos os campos',
        life: 3000
      });
      return;
    }

    const payload = {
      title: form.titulo,
      price: Number(form.preco),
      category: form.categoria,
      image: form.imagem,
      description: "Criado no painel",
    };

    try {
      if (form.id) {
        await api.put(`/products/${form.id}`, payload);
        toast.current?.show({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Produto atualizado com sucesso',
          life: 3000
        });
      } else {
        await api.post("/products", payload);
        toast.current?.show({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Produto criado com sucesso',
          life: 3000
        });
      }

      setForm({ id: null, titulo: "", preco: null, categoria: "", imagem: "" });
      const res = await api.get("/products");
      setProductos(res.data.map((p) => ({ ...p, createdAt: new Date(), updatedAt: new Date() })));

    } catch (err) {
      console.log(err);
      toast.current?.show({
        severity: 'error',
        summary: 'Erro',
        detail: 'Erro ao salvar produto',
        life: 3000
      });
    }
  }

  function loadEdit(p) {
    setForm({
      id: p.id,
      titulo: p.title,
      preco: p.price,
      categoria: p.category,
      imagem: p.image,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function confirmRemove(id) {
    confirmDialog({
      message: 'Tem certeza que deseja excluir este produto?',
      header: 'Confirmar Exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => remove(id),
    });
  }

  async function remove(id) {
    try {
      await api.delete(`/products/${id}`);
      toast.current?.show({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Produto excluído com sucesso',
        life: 3000
      });
      setProductos(productos.filter(p => p.id !== id));
    } catch (err) {
      console.log("error);
      toast.current?.show({
        severity: 'error',
        summary: 'Erro',
        detail: 'Erro ao excluir produto',
        life: 3000
      });
    }
  }

  function cancelEdit() {
    setForm({ id: null, titulo: "", preco: null, categoria: "", imagem: "" });
  }

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <Button
          icon="pi pi-pencil"
          rounded
          severity="warning"
          onClick={() => loadEdit(rowData)}
          tooltip="Editar"
          tooltipOptions={{ position: 'top' }}
        />
        <Button
          icon="pi pi-trash"
          rounded
          severity="danger"
          onClick={() => confirmRemove(rowData.id)}
          tooltip="Excluir"
          tooltipOptions={{ position: 'top' }}
        />
      </div>
    );
  };

  const imageBodyTemplate = (rowData) => {
    return (
      <img
        src={rowData.image}
        alt={rowData.title}
        style={{ width: '50px', height: '50px', objectFit: 'contain' }}
      />
    );
  };

  const priceBodyTemplate = (rowData) => {
    return `R$ ${rowData.price.toFixed(2)}`;
  };

  return (
    <div className="surface-ground" style={{ minHeight: '100vh', padding: '2rem' }}>
      <Toast ref={toast} />
      <ConfirmDialog />

      <div className="max-w-8xl mx-auto">
        <div className="flex align-items-center gap-3 mb-4">
          <i className="pi pi-cog text-4xl" style={{ color: 'var(--primary-color)' }}></i>
          <h1 className="text-4xl font-bold m-0">Painel Administrativo</h1>
        </div>

        {/* Formulário */}
        <Card className="shadow-3 mb-4">
          <h2 className="text-2xl font-semibold mb-4">
            {form.id ? 'Editar Produto' : 'Adicionar Novo Produto'}
          </h2>

          <div className="grid">
            <div className="col-12 md:col-6">
              <div className="field">
                <label htmlFor="titulo" className="block mb-2 font-semibold">
                  <i className="pi pi-tag mr-2"></i>
                  Título do Produto
                </label>
                <InputText
                  id="titulo"
                  value={form.titulo}
                  onChange={(e) => handleChange('titulo', e.target.value)}
                  placeholder="Digite o título"
                  className="w-full"
                />
              </div>
            </div>

            <div className="col-12 md:col-6">
              <div className="field">
                <label htmlFor="preco" className="block mb-2 font-semibold">
                  <i className="pi pi-dollar mr-2"></i>
                  Preço
                </label>
                <InputNumber
                  id="preco"
                  value={form.preco}
                  onValueChange={(e) => handleChange('preco', e.value)}
                  placeholder="0.00"
                  mode="currency"
                  currency="BRL"
                  locale="pt-BR"
                  className="w-full"
                />
              </div>
            </div>

            <div className="col-12 md:col-6">
              <div className="field">
                <label htmlFor="categoria" className="block mb-2 font-semibold">
                  <i className="pi pi-th-large mr-2"></i>
                  Categoria
                </label>
                <Dropdown
                  id="categoria"
                  value={form.categoria}
                  onChange={(e) => handleChange('categoria', e.value)}
                  options={categorias}
                  placeholder="Selecione a categoria"
                  className="w-full"
                />
              </div>
            </div>

            <div className="col-12 md:col-6">
              <div className="field">
                <label htmlFor="imagem" className="block mb-2 font-semibold">
                  <i className="pi pi-image mr-2"></i>
                  URL da Imagem
                </label>
                <InputText
                  id="imagem"
                  value={form.imagem}
                  onChange={(e) => handleChange('imagem', e.target.value)}
                  placeholder="https://exemplo.com/imagem.jpg"
                  className="w-full"
                />
              </div>
            </div>

            <div className="col-12">
              <div className="flex gap-2 flex-wrap">
                <Button
                  label={form.id ? "Salvar Alterações" : "Adicionar Produto"}
                  icon={form.id ? "pi pi-check" : "pi pi-plus"}
                  onClick={handleSubmit}
                  severity="success"
                  size="large"
                />
                {form.id && (
                  <Button
                    label="Cancelar"
                    icon="pi pi-times"
                    onClick={cancelEdit}
                    severity="secondary"
                    outlined
                    size="large"
                  />
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Tabela de Produtos */}
        <Card className="shadow-3">
          <h2 className="text-2xl font-semibold mb-4 flex align-items-center">
            <i className="pi pi-list mr-2" style={{ color: 'var(--primary-color)' }}></i>
            Produtos Cadastrados
          </h2>

          <DataTable
            value={productos}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25, 50]}
            emptyMessage="Nenhum produto cadastrado"
            className="p-datatable-striped"
            sortField="id"
            sortOrder={-1}
          >
            <Column field="id" header="ID" sortable style={{ width: '5%' }} />
            
          </DataTable>
        </Card>
      </div>
    </div>
  );
}