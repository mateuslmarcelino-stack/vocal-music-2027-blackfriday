import React, { useState } from 'react';
import { Download, Trash2, X, Users, Database, Link as LinkIcon, Check, Copy, FileSpreadsheet, Send, HelpCircle, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import { Lead } from '../types';
import { GOOGLE_APPS_SCRIPT_TEMPLATE, sendLeadToGoogleSheets } from '../utils/googleSheets';

interface LeadsManagerModalProps {
  leads: Lead[];
  onClearLeads: () => void;
  onClose: () => void;
  whatsappGroupUrl: string;
  onUpdateWhatsappGroupUrl: (url: string) => void;
  sheetsWebhookUrl: string;
  onUpdateSheetsWebhookUrl: (url: string) => void;
}

export const LeadsManagerModal: React.FC<LeadsManagerModalProps> = ({
  leads,
  onClearLeads,
  onClose,
  whatsappGroupUrl,
  onUpdateWhatsappGroupUrl,
  sheetsWebhookUrl,
  onUpdateSheetsWebhookUrl
}) => {
  const [newWaUrl, setNewWaUrl] = useState(whatsappGroupUrl);
  const [savedWaMsg, setSavedWaMsg] = useState(false);

  const [newSheetsUrl, setNewSheetsUrl] = useState(sheetsWebhookUrl);
  const [savedSheetsMsg, setSavedSheetsMsg] = useState(false);

  const [isTestingWebhook, setIsTestingWebhook] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [showScriptCode, setShowScriptCode] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);

  const handleSaveWaUrl = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateWhatsappGroupUrl(newWaUrl);
    setSavedWaMsg(true);
    setTimeout(() => setSavedWaMsg(false), 2500);
  };

  const handleSaveSheetsUrl = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSheetsWebhookUrl(newSheetsUrl);
    setSavedSheetsMsg(true);
    setTimeout(() => setSavedSheetsMsg(false), 2500);
  };

  const handleTestSheets = async () => {
    if (!newSheetsUrl) {
      setTestResult({ success: false, message: 'Insira a URL do webhook do Google Sheets antes de testar.' });
      return;
    }

    setIsTestingWebhook(true);
    setTestResult(null);

    const testLead: Lead = {
      id: 'test_' + Date.now(),
      name: 'Lead Teste Gestor de Tráfego',
      phone: '(11) 99999-9999',
      weddingDate: 'Outubro / 2027',
      city: 'São Paulo / SP',
      createdAt: new Date().toISOString(),
      utmSource: 'Teste Manual',
      utmMedium: 'Painel do Gestor',
      utmCampaign: 'Validacao Google Sheets',
      utmContent: 'Linha de Teste'
    };

    const res = await sendLeadToGoogleSheets(testLead, newSheetsUrl);
    setIsTestingWebhook(false);
    setTestResult(res);
  };

  const handleCopyScript = () => {
    navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_TEMPLATE);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  const handleExportCSV = () => {
    if (leads.length === 0) return;

    const headers = ['Nome', 'WhatsApp', 'Data Casamento 2027', 'Cidade', 'Data de Cadastro', 'Origem (UTM)', 'Campanha'];
    const rows = leads.map((l) => [
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.phone}"`,
      `"${l.weddingDate}"`,
      `"${l.city.replace(/"/g, '""')}"`,
      `"${new Date(l.createdAt).toLocaleString('pt-BR')}"`,
      `"${l.utmSource || 'Direto / Tráfego Pago'}"`,
      `"${l.utmCampaign || 'Black Friday 2027'}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `leads_vocal_music_2027_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-4xl bg-[#14161b] border border-[#c5a059]/40 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-[#1c1f26] px-6 py-4 border-b border-[#262a34] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#c5a059]/15 text-[#c5a059]">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#f4efe6]">
                Painel do Gestor de Tráfego & Lançamento
              </h3>
              <p className="text-xs text-stone-400">
                Integração direta com Google Sheets, configuração do Grupo VIP e histórico de leads.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white p-1 rounded-lg bg-[#0c0d10] hover:bg-[#262a34] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* SECTION 1: GOOGLE SHEETS INTEGRATION */}
          <div className="bg-[#0c0d10] p-5 rounded-xl border border-emerald-500/30 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#262a34]">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-bold text-[#f4efe6]">
                  Integração Google Sheets (Webhook em Tempo Real)
                </span>
              </div>
              <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                sheetsWebhookUrl ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800' : 'bg-stone-800 text-stone-400'
              }`}>
                {sheetsWebhookUrl ? '● Webhook Ativo' : '○ Não Conectado'}
              </span>
            </div>

            <form onSubmit={handleSaveSheetsUrl} className="space-y-3">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-300 block mb-1">
                  URL do Webhook do Google Sheets (Apps Script / Make / Zapier)
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="url"
                    value={newSheetsUrl}
                    onChange={(e) => setNewSheetsUrl(e.target.value)}
                    placeholder="https://script.google.com/macros/s/AKfycbx.../exec"
                    className="flex-1 bg-[#14161b] border border-[#262a34] focus:border-emerald-500 rounded-lg px-3.5 py-2 text-xs text-[#f4efe6] outline-none font-mono"
                  />
                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors cursor-pointer shrink-0"
                  >
                    Salvar Webhook
                  </button>
                  <button
                    type="button"
                    onClick={handleTestSheets}
                    disabled={isTestingWebhook || !newSheetsUrl}
                    className="bg-[#1c1f26] hover:bg-[#262a34] text-stone-200 border border-[#262a34] font-semibold text-xs px-3.5 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{isTestingWebhook ? 'Enviando teste...' : 'Testar Envio'}</span>
                  </button>
                </div>
              </div>

              {savedSheetsMsg && (
                <div className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                  <Check className="w-4 h-4" /> URL do webhook salva com sucesso!
                </div>
              )}

              {testResult && (
                <div className={`p-3 rounded-lg text-xs flex items-center gap-2 ${
                  testResult.success
                    ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800'
                    : 'bg-red-950/60 text-red-300 border border-red-800'
                }`}>
                  {testResult.success ? <Check className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                  <span>{testResult.message} Abra sua planilha para verificar a nova linha!</span>
                </div>
              )}
            </form>

            {/* Quick 3-Step Guide & Script */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowScriptCode(!showScriptCode)}
                className="text-xs text-[#c5a059] hover:text-[#dfb963] font-medium flex items-center gap-1.5 cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Como criar a planilha e o script em 2 minutos (grátis)?</span>
                {showScriptCode ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {showScriptCode && (
                <div className="mt-3 p-4 bg-[#14161b] rounded-xl border border-[#262a34] space-y-3 text-xs text-stone-300">
                  <div className="space-y-1 text-stone-300">
                    <p><strong>Passo 1:</strong> Abra uma planilha vazia no seu <a href="https://sheets.new" target="_blank" rel="noopener noreferrer" className="text-[#c5a059] underline">Google Sheets</a>.</p>
                    <p><strong>Passo 2:</strong> No menu superior, clique em <strong>Extensões ➔ Apps Script</strong>.</p>
                    <p><strong>Passo 3:</strong> Apague o código que estiver lá e cole o script abaixo:</p>
                  </div>

                  <div className="relative">
                    <pre className="p-3 bg-[#0c0d10] border border-[#262a34] rounded-lg text-[11px] font-mono text-stone-300 overflow-x-auto max-h-48">
                      {GOOGLE_APPS_SCRIPT_TEMPLATE}
                    </pre>
                    <button
                      type="button"
                      onClick={handleCopyScript}
                      className="absolute top-2 right-2 flex items-center gap-1 bg-[#1c1f26] hover:bg-[#262a34] text-xs px-2.5 py-1 rounded text-[#c5a059] border border-[#262a34] cursor-pointer"
                    >
                      {copiedScript ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedScript ? 'Copiado!' : 'Copiar Código'}</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-stone-400">
                    <strong>Passo 4:</strong> Clique em <strong>Implantar (Deploy) ➔ Nova Implantação ➔ Selecionar tipo: App da Web</strong>. Em "Quem pode acessar", selecione <strong>Qualquer pessoa (Anyone)</strong> e clique em Implantar. Copie a URL gerada e cole no campo acima!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* SECTION 2: WHATSAPP GROUP CONFIG */}
          <form onSubmit={handleSaveWaUrl} className="bg-[#0c0d10] p-4 rounded-xl border border-[#262a34] space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-300 flex items-center gap-1.5">
                <LinkIcon className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Link do Grupo VIP de WhatsApp</span>
              </label>
              {savedWaMsg && (
                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Salvo com sucesso!
                </span>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="url"
                value={newWaUrl}
                onChange={(e) => setNewWaUrl(e.target.value)}
                placeholder="https://chat.whatsapp.com/seu-grupo-aqui"
                className="flex-1 bg-[#14161b] border border-[#262a34] focus:border-[#c5a059] rounded-lg px-3 py-2 text-xs text-[#f4efe6] outline-none"
              />
              <button
                type="submit"
                className="bg-[#c5a059] hover:bg-[#dfb963] text-[#0c0d10] font-bold text-xs px-4 py-2 rounded-lg transition-colors cursor-pointer shrink-0"
              >
                Atualizar Link do Grupo
              </button>
            </div>
          </form>

          {/* SECTION 3: LEADS LIST */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#c5a059]" />
                <span className="text-sm font-semibold text-[#f4efe6]">
                  Leads Captados no Funil ({leads.length})
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportCSV}
                  disabled={leads.length === 0}
                  className="flex items-center gap-1.5 bg-[#1c1f26] hover:bg-[#262a34] text-stone-200 border border-[#262a34] text-xs font-semibold px-3 py-2 rounded-lg transition-colors cursor-pointer disabled:opacity-40"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Exportar CSV</span>
                </button>

                <button
                  onClick={onClearLeads}
                  disabled={leads.length === 0}
                  className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 bg-red-950/40 hover:bg-red-950/80 border border-red-900/60 px-3 py-2 rounded-lg transition-colors cursor-pointer disabled:opacity-40"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Limpar Leads</span>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="border border-[#262a34] rounded-xl overflow-hidden bg-[#0c0d10]">
              {leads.length === 0 ? (
                <div className="p-8 text-center text-xs text-stone-500">
                  Nenhum lead captado ainda. Preencha o formulário na página inicial para testar.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-stone-300">
                    <thead className="bg-[#14161b] text-stone-400 border-b border-[#262a34] uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="px-4 py-3 font-semibold">Noiva / Noivo</th>
                        <th className="px-4 py-3 font-semibold">WhatsApp</th>
                        <th className="px-4 py-3 font-semibold">Mês 2027</th>
                        <th className="px-4 py-3 font-semibold">Cidade</th>
                        <th className="px-4 py-3 font-semibold">Origem UTM</th>
                        <th className="px-4 py-3 font-semibold">Horário</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#262a34]">
                      {leads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-[#14161b]/50">
                          <td className="px-4 py-3 font-medium text-[#f4efe6]">{lead.name}</td>
                          <td className="px-4 py-3 text-[#c5a059] font-mono">{lead.phone}</td>
                          <td className="px-4 py-3">{lead.weddingDate}</td>
                          <td className="px-4 py-3 text-stone-400">{lead.city}</td>
                          <td className="px-4 py-3 text-emerald-400 font-mono text-[11px]">{lead.utmSource || 'Meta Ads'}</td>
                          <td className="px-4 py-3 text-stone-500 text-[11px]">
                            {new Date(lead.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
