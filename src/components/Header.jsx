import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Avatar } from "primereact/avatar";
import { Divider } from "primereact/divider";
import { Badge } from "primereact/badge";

export default function Header({ search, setSearch, filter, setFilter }) {
  const { user, logout } = useAuth();
  const { items } = useCart();

  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const filterOptions = [
    { label: "Todos os produtos", value: "all" },
    { label: "Masculino", value: "men's clothing" },
    { label: "Feminino", value: "women's clothing" },
    { label: "Joias", value: "jewelery" }
  ];

  return (
    <>
      <header
        className="border-b sticky top-0 z-5"
        style={{
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(6px)",
          padding: "1rem 0",
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div
            className="flex items-center justify-center relative"
            style={{ height: "70px" }}
          >

            <Link
              to="/"
              className="text-5xl font-light tracking-widest text-black absolute left-1/2 transform -translate-x-1/2"
              style={{ letterSpacing: "0.32em",
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)"
               }}
            >
              HIFASHION
            </Link>

      <div className="flex items-center gap-4 absolute right-0">

              <Link to="/cart" className="relative flex items-center">
                <Button icon="pi pi-shopping-bag" text rounded severity="secondary" className="text-xl" />
                {!!items.length && (
                  <Badge
                    value={items.length}
                    severity="danger"
                    className="absolute"
                    style={{ top: 2, right: 2 }}
                  />
                )}
              </Link>

              {!user && (
                <Link to="/login" className="flex items-center">
                  <Button icon="pi pi-user" text rounded severity="secondary" className="text-xl" />
                </Link>
              )}

              <Button
                icon="pi pi-search"
                text
                rounded
                severity="secondary"
                className="text-xl"
                onClick={() => setSearchOpen(v => !v)}
              />

              <Button
                icon="pi pi-bars"
                text
                rounded
                severity="secondary"
                className="text-xl"
                onClick={() => setSidebarVisible(true)}
              />

            </div>

          </div>

          {searchOpen && (
            <div className="pb-3 animate-fadeIn">
              <InputText
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar produtos..."
                className="w-full border-0 border-bottom-1 surface-border border-round-none"
                autoFocus
              />
            </div>
          )}
        </div>
      </header>


      {/* Sidebar */}
      <Sidebar
        visible={sidebarVisible}
        onHide={() => setSidebarVisible(false)}
        position="right"
        className="w-full md:w-25rem"
        style={{ background: "#fafafa" }}
      >
        <div className="flex flex-column h-full">

          <h2 className="text-3xl tracking-wider mb-4" style={{ letterSpacing: "0.2em" }}>
            MENU
          </h2>

          <Divider />

          {/* Usuário */}
          {user ? (
            <div className="mb-4 p-4 bg-white border-round flex align-items-center gap-3">
              <Avatar
                label={user.username?.[0]?.toUpperCase()}
                size="large"
                style={{ background: "#000", color: "white" }}
              />
              <div>
                <div className="font-semibold text-lg">{user.username}</div>
                <div className="text-sm text-color-secondary">{user.email}</div>
              </div>
            </div>
          ) : (
            <div className="mb-4 p-4 bg-white border-round text-center">
              <p className="text-color-secondary mb-3">Entre para continuar</p>
              <Link to="/login" onClick={() => setSidebarVisible(false)}>
                <Button
                  label="ENTRAR"
                  className="w-full"
                  style={{ background: "#000", border: "none", letterSpacing: "0.1em" }}
                />
              </Link>
            </div>
          )}

          <Divider />

          {/* Categorias */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-3 text-color-secondary" style={{ letterSpacing: "0.1em" }}>
              CATEGORIAS
            </h3>

            <div className="flex flex-column gap-2">
              {filterOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    setFilter(opt.value);
                    setSidebarVisible(false);
                  }}
                  className={`p-3 text-left border-round hover:bg-white transition-colors ${
                    filter === opt.value && "bg-white font-semibold"
                  }`}
                  style={{ letterSpacing: "0.05em" }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <Divider />

          {/* Admin */}
          {user?.role === "admin" && (
            <>
              <Link to="/panel-administrador" onClick={() => setSidebarVisible(false)}>
                <Button
                  label="PAINEL ADMIN"
                  icon="pi pi-cog"
                  className="w-full text-left"
                  text
                  style={{ letterSpacing: "0.05em" }}
                />
              </Link>
              <Divider />
            </>
          )}

          {/* Logout */}
          {user && (
            <Button
              label="SAIR"
              icon="pi pi-sign-out"
              outlined
              severity="secondary"
              className="w-full mt-auto"
              style={{ letterSpacing: "0.1em" }}
              onClick={() => {
                logout();
                setSidebarVisible(false);
              }}
            />
          )}

        </div>
      </Sidebar>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
