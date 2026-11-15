/*
 * Central Operacional GAD — ÚNICO arquivo que muda quando o sistema troca de conta.
 * Pegue os dois valores no Supabase: Project Settings → API.
 *  - url:     "Project URL"
 *  - anonKey: chave "anon public" (é pública por natureza; quem protege os dados
 *             são as regras de acesso criadas pelo arquivo supabase/001_banco_central_gad.sql)
 */
window.GAD_CONFIG = {
  url: 'https://stsqoukejyeodtydxycg.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0c3FvdWtlanllb2R0eWR4eWNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ3NTEwNjMsImV4cCI6MjExMDMyNzA2M30.WzttSy0iTsYNv1Kv2smmiZEq-DKklC6kB4qNTgwvdkI',
  empresa: 'GAD Soluções'
};
