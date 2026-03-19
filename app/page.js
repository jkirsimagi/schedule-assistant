'use client'
import { useEffect, useState, useRef, useCallback } from 'react'
import { createClient } from '../lib/supabase'

const supabase = createClient()

// ...... STYLES ............................................................................................................................................................................................................
const G = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Source+Sans+3:ital,wght@0,300;0,400;0,600;1,300&family=Source+Code+Pro:wght@300;400;500&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Source Sans 3',sans-serif;background:#fff;color:#1c1c1c;font-size:13px;line-height:1.5}
:root{--ink:#1c1c1c;--ink-mid:#555;--ink-faint:#999;--bg:#fff;--bg-subtle:#f7f7f7;--rule:#e4e4e4;--rule-strong:#c8c8c8;--accent:#2a6049;--accent-light:#3d8068;--accent-muted:#edf4f0;--amber:#b07020;--danger:#9b3030;--shadow:0 1px 2px rgba(0,0,0,.05),0 3px 10px rgba(0,0,0,.04);--shadow-lg:0 4px 16px rgba(0,0,0,.08),0 16px 40px rgba(0,0,0,.06)}

/* LOGIN */
.login-wrap{display:flex;align-items:center;justify-content:center;min-height:100vh;background:#f7f7f7}
.login-card{background:#fff;border:1px solid var(--rule);border-radius:6px;padding:48px 40px;width:360px;text-align:center;box-shadow:var(--shadow-lg)}
.login-logo{font-family:'Inter',sans-serif;font-weight:300;font-size:20px;letter-spacing:.02em;margin-bottom:8px}
.login-sub{font-size:12px;color:var(--ink-faint);margin-bottom:32px}
.google-btn{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;padding:11px 16px;border:1px solid var(--rule);border-radius:3px;background:#fff;font-family:'Inter',sans-serif;font-size:14px;cursor:pointer;transition:all .12s;color:var(--ink)}
.google-btn:hover{border-color:var(--rule-strong);background:var(--bg-subtle)}
.google-btn svg{flex-shrink:0}

/* HEADER */
header{background:#fff;border-bottom:1px solid var(--rule);padding:0 24px;display:flex;align-items:center;justify-content:space-between;height:52px;position:sticky;top:0;z-index:100;overflow:visible}
.logo{font-family:'Inter',sans-serif;font-weight:300;font-size:16px;letter-spacing:.02em}
.header-right{display:flex;align-items:center;gap:12px}
.user-pill{display:flex;align-items:center;gap:8px;font-size:12px;color:var(--ink-mid)}
.user-pill img{width:24px;height:24px;border-radius:50%;border:1px solid var(--rule)}
.btn{font-family:'Source Sans 3',sans-serif;font-size:12px;padding:6px 14px;border-radius:2px;border:1px solid transparent;cursor:pointer;transition:all .12s}
.btn-ghost{background:transparent;border-color:var(--rule);color:var(--ink-mid)}
.btn-ghost:hover{border-color:var(--rule-strong);color:var(--ink)}
.btn-primary{background:var(--accent);border-color:var(--accent);color:#fff}
.btn-primary:hover{background:var(--accent-light)}
.btn-sm{padding:4px 10px;font-size:11px}
.btn-outline{background:#fff;border-color:var(--rule);color:var(--ink-mid)}
.btn-outline:hover{border-color:var(--rule-strong);color:var(--ink)}
.btn-danger{background:var(--danger);border-color:var(--danger);color:#fff}

/* LAYOUT */
.app-body{display:flex;height:calc(100vh - 52px);overflow:hidden}

/* SIDEBAR */
.sidebar{width:280px;min-width:280px;background:#fff;border-right:1px solid var(--rule);display:flex;flex-direction:column;overflow:hidden}
.sidebar-tabs{display:flex;border-bottom:1px solid var(--rule)}
.sidebar-tab{flex:1;padding:11px 6px;font-family:'Source Sans 3',sans-serif;font-size:11px;text-transform:uppercase;letter-spacing:.08em;text-align:center;cursor:pointer;color:#999;border-bottom:2px solid transparent;transition:all .15s;background:none;border-top:none;border-left:none;border-right:none}
.sidebar-tab.active{color:var(--accent);border-bottom-color:var(--accent)}
.sidebar-content{flex:1;overflow-y:auto;padding:14px;display:none}
.sidebar-content.active{display:block}

/* PROJECT SWITCHER */
.proj-switcher{position:relative;margin-bottom:12px}
.proj-btn{display:flex;align-items:center;justify-content:space-between;width:100%;padding:7px 10px;background:var(--bg-subtle);border:1px solid var(--rule);border-radius:2px;cursor:pointer;font-family:'Inter',sans-serif;font-size:13px;color:var(--ink);transition:all .12s}
.proj-btn:hover{border-color:var(--rule-strong)}
.proj-dropdown{position:absolute;top:calc(100% + 4px);left:0;min-width:240px;background:#fff;border:1px solid var(--rule);border-radius:3px;box-shadow:var(--shadow-lg);z-index:200;display:none}
.proj-dropdown.open{display:block}
.proj-item{display:flex;align-items:center;justify-content:space-between;padding:8px 12px;cursor:pointer;font-size:12px;transition:background .1s}
.proj-item:hover{background:var(--bg-subtle)}
.proj-item.active{color:var(--accent);font-weight:500}
.proj-footer{padding:8px 10px;border-top:1px solid var(--rule);display:flex;gap:6px}
.proj-footer input{flex:1;padding:5px 8px;border:1px solid var(--rule);border-radius:2px;font-family:'Inter',sans-serif;font-size:12px;outline:none}
.proj-footer input:focus{border-color:var(--accent)}

/* SEARCH */
.search-box{position:relative;margin-bottom:10px}
.search-box input{width:100%;padding:7px 10px 7px 30px;border:1px solid var(--rule);border-radius:2px;font-family:'Source Sans 3',sans-serif;font-size:12px;background:var(--bg-subtle);outline:none;transition:border-color .12s}
.search-box input:focus{border-color:var(--rule-strong);background:#fff}
.search-box svg{position:absolute;left:8px;top:50%;transform:translateY(-50%);color:#ccc}
.filter-chips{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:10px}
.chip{font-family:'Source Sans 3',sans-serif;font-size:10px;padding:3px 9px;border-radius:20px;border:1px solid var(--rule);cursor:pointer;transition:all .12s;background:#fff;color:#888;text-transform:uppercase;letter-spacing:.04em}
.chip.active{background:var(--accent);border-color:var(--accent);color:#fff}
.result-card{border:1px solid var(--rule);border-radius:3px;padding:11px;background:#fff;margin-bottom:7px;transition:border-color .12s}
.result-card:hover{border-color:var(--rule-strong)}
.result-mfr{font-family:'Source Code Pro',monospace;font-size:10px;color:var(--accent);margin-bottom:2px}
.result-name{font-size:12px;font-weight:500;margin-bottom:3px}
.result-price{font-family:'Source Code Pro',monospace;font-size:11px;color:var(--amber)}
.result-meta{font-size:10px;color:#aaa;margin-top:3px}
.result-actions{display:flex;gap:5px;margin-top:8px}
.search-placeholder{text-align:center;padding:28px 10px;color:#bbb;font-size:12px;line-height:1.7}
.ai-badge{display:inline-flex;align-items:center;gap:4px;font-family:'Source Code Pro',monospace;font-size:9px;text-transform:uppercase;letter-spacing:.06em;padding:2px 7px;border-radius:20px;background:var(--accent-muted);color:var(--accent);margin-bottom:8px}

/* CATEGORIES */
.cat-heading{font-family:'Source Sans 3',sans-serif;font-size:10px;text-transform:uppercase;letter-spacing:.1em;color:#999;margin-bottom:7px;padding-bottom:4px;border-bottom:1px solid var(--rule)}
.cat-item{display:flex;align-items:center;justify-content:space-between;padding:6px 9px;border-radius:3px;cursor:pointer;transition:background .1s;font-size:12px}
.cat-item:hover{background:var(--bg-subtle)}
.cat-item.active{background:var(--accent-muted);color:var(--accent);font-weight:500}
.cat-count{font-family:'Source Code Pro',monospace;font-size:10px;background:var(--rule);color:#888;padding:1px 6px;border-radius:10px}
.cat-item.active .cat-count{background:var(--accent);color:#fff}
.cat-group{margin-bottom:16px}

/* LIBRARY */
.lib-card{border:1px solid var(--rule);border-radius:3px;padding:11px;background:#fff;margin-bottom:7px}
.lib-card:hover{border-color:var(--rule-strong)}
.lib-name{font-size:12px;font-weight:500;margin-bottom:2px}
.lib-mfr{font-family:'Source Code Pro',monospace;font-size:10px;color:var(--accent)}
.lib-meta{font-size:10px;color:#aaa;margin-top:3px}
.lib-price{font-family:'Source Code Pro',monospace;font-size:11px;color:var(--amber);margin-top:4px}
.lib-actions{display:flex;gap:5px;margin-top:8px}
.lib-empty{text-align:center;padding:28px 10px;color:#bbb;font-size:12px;line-height:1.7}

/* MAIN */
.main{flex:1;display:flex;flex-direction:column;overflow:hidden}
.toolbar{background:#fff;border-bottom:1px solid var(--rule);padding:8px 18px;display:flex;align-items:center;gap:10px}
.toolbar-left{font-family:'Source Code Pro',monospace;font-size:10px;color:#aaa;flex-shrink:0}
.toolbar-search{flex:1;display:flex;justify-content:center}
.matrix-search{position:relative;display:flex;align-items:center;width:100%;max-width:340px;border:1px solid var(--rule);border-radius:2px;background:var(--bg-subtle);padding:0 9px;gap:7px;transition:all .12s}
.matrix-search:focus-within{border-color:var(--rule-strong);background:#fff}
.matrix-search input{flex:1;border:none;outline:none;background:transparent;font-family:'Inter',sans-serif;font-size:12px;color:var(--ink);padding:6px 0}
.matrix-search input::placeholder{color:#bbb}
.clear-btn{background:none;border:none;cursor:pointer;color:#ccc;font-size:15px;padding:0;display:none;transition:color .12s}
.clear-btn.visible{display:block}
.clear-btn:hover{color:var(--ink-mid)}
.schedule-wrap{flex:1;overflow:auto;padding:18px}

/* TABLE */
.schedule-table{width:100%;border-collapse:collapse;background:#fff;border:1px solid var(--rule);border-radius:5px;overflow:hidden;box-shadow:var(--shadow)}
.schedule-table th{font-family:'Source Code Pro',monospace;font-size:9px;text-transform:uppercase;letter-spacing:.06em;color:#999;padding:9px 12px;text-align:left;background:var(--bg-subtle);border-bottom:1px solid var(--rule);white-space:nowrap;font-weight:400}
.schedule-table th.sortable{cursor:pointer;user-select:none}
.schedule-table th.sortable:hover{background:#ebebeb}
.sort-icon{display:inline-block;margin-left:3px;opacity:.3;font-size:8px}
.schedule-table th.sort-asc .sort-icon,.schedule-table th.sort-desc .sort-icon{opacity:1;color:var(--accent)}
.schedule-table th.sort-asc .sort-icon::after{content:' ...'}
.schedule-table th.sort-desc .sort-icon::after{content:' ...'}
.schedule-table th:not(.sort-asc):not(.sort-desc) .sort-icon::after{content:' ...'}
.schedule-table td{padding:9px 12px;border-bottom:1px solid rgba(0,0,0,.025);vertical-align:top;font-size:12px}
.schedule-table tr:last-child td{border-bottom:none}
.schedule-table tr:hover td{background:rgba(0,0,0,.015)}
.schedule-table tr.selected-row td{background:var(--accent-muted)}
.schedule-table tr.option-row td:first-child{border-left:2px solid var(--amber)}
.section-header td{font-family:'Inter',sans-serif;font-weight:400;font-size:10px;letter-spacing:.04em;color:var(--accent);background:var(--bg-subtle);padding:6px 12px 5px;border-bottom:1px solid var(--accent);border-top:8px solid #fff}
.fixture-tag{display:inline-block;font-family:'Source Code Pro',monospace;font-size:8px;font-weight:500;padding:2px 6px;border-radius:2px;color:#fff;letter-spacing:.04em}
.tag-plumbing{background:#2d4a6b}.tag-lighting{background:#6b4a2d}.tag-hardware{background:#4a2d6b}.tag-appliance{background:#2d6b4a}.tag-finish{background:#6b2d4a}.tag-other{background:#555}
.price-cell{font-family:'Source Code Pro',monospace;color:var(--amber)}
.link-cell a{color:var(--accent-light);text-decoration:none;font-family:'Source Code Pro',monospace;font-size:10px}
.status-badge{font-family:'Source Code Pro',monospace;font-size:9px;padding:2px 8px;border-radius:20px;text-transform:uppercase;letter-spacing:.04em;white-space:nowrap}
.status-option{background:#fdf5e6;color:var(--amber)}
.status-selected{background:var(--accent-muted);color:var(--accent)}
.status-approved{background:#e8f5e9;color:#2e7d32}
.row-actions{display:flex;gap:3px;opacity:0;transition:opacity .12s}
tr:hover .row-actions{opacity:1}
.icon-btn{background:none;border:none;cursor:pointer;padding:3px;border-radius:2px;color:#aaa;transition:all .12s;display:flex;align-items:center}
.icon-btn:hover{background:rgba(0,0,0,.05);color:var(--ink)}
.icon-btn.saved{color:var(--amber)}
.icon-btn.danger:hover{background:#fde8e8;color:var(--danger)}
.add-row td{padding:7px 12px;color:#bbb;font-family:'Source Code Pro',monospace;font-size:10px;text-transform:uppercase;letter-spacing:.05em;cursor:pointer;border-top:1px dashed var(--rule);transition:all .12s}
.add-row:hover td{color:var(--accent);background:var(--accent-muted)}

/* COST TOTAL */
.cost-total-row td{padding:11px 12px;border-top:2px solid var(--rule);background:var(--bg-subtle)}
.cost-label{font-family:'Source Sans 3',sans-serif;font-size:9px;text-transform:uppercase;letter-spacing:.08em;color:var(--ink-faint)}
.cost-value{font-family:'Source Code Pro',monospace;font-size:13px;font-weight:500;color:var(--ink)}
.cost-note{font-family:'Source Code Pro',monospace;font-size:9px;color:#bbb;margin-top:1px}

/* INLINE EDIT */
.editable-cell{cursor:pointer;border-radius:2px;transition:background .1s}
.editable-cell:hover{background:#eef5f1;outline:1px solid var(--accent-muted)}
.cell-input,.cell-select{width:100%;border:none;outline:2px solid var(--accent-light);border-radius:2px;padding:3px 6px;font-family:inherit;font-size:inherit;color:var(--ink);background:#fff;box-shadow:var(--shadow)}

/* EMPTY */
.empty-state{text-align:center;padding:56px 20px;color:#bbb}
.empty-state h3{font-family:'Inter',sans-serif;font-weight:300;font-size:18px;color:#aaa;margin-bottom:8px}
.empty-state p{font-size:12px;max-width:280px;margin:0 auto 18px;line-height:1.7}

/* MODAL */
.modal-overlay{position:fixed;inset:0;background:rgba(26,26,24,.5);z-index:200;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(2px);opacity:0;pointer-events:none;transition:opacity .18s}
.modal-overlay.open{opacity:1;pointer-events:all}
.modal{background:#fff;border-radius:6px;padding:28px;width:580px;max-width:95vw;max-height:90vh;overflow-y:auto;box-shadow:var(--shadow-lg);transform:translateY(8px);transition:transform .18s}
.modal-overlay.open .modal{transform:translateY(0)}
.modal-title{font-family:'Inter',sans-serif;font-weight:300;font-size:18px;margin-bottom:20px}
.modal-close{background:none;border:none;cursor:pointer;color:#aaa;font-size:18px;padding:3px;border-radius:2px;line-height:1;transition:all .12s;float:right;margin-top:-4px}
.modal-close:hover{color:var(--ink);background:rgba(0,0,0,.05)}
.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.form-field{display:flex;flex-direction:column;gap:4px}
.form-field.full{grid-column:1/-1}
.form-label{font-family:'Source Sans 3',sans-serif;font-size:10px;text-transform:uppercase;letter-spacing:.1em;color:#999}
.form-input{padding:7px 10px;border:1px solid var(--rule);border-radius:2px;font-family:'Source Sans 3',sans-serif;font-size:13px;color:var(--ink);background:var(--bg-subtle);outline:none;transition:border-color .12s}
.form-input:focus{border-color:var(--accent-light);background:#fff}
.form-actions{display:flex;gap:7px;justify-content:flex-end;margin-top:20px;padding-top:14px;border-top:1px solid var(--rule)}

/* AUTOFILL TABS */
.autofill-area{background:var(--bg-subtle);border-radius:4px;padding:12px;margin-bottom:14px;border:1px solid var(--rule)}
.autofill-tabs{display:flex;border:1px solid var(--rule);border-radius:2px;overflow:hidden;margin-bottom:10px}
.autofill-tab{flex:1;padding:6px 10px;font-family:'Source Sans 3',sans-serif;font-size:10px;text-transform:uppercase;letter-spacing:.05em;background:var(--bg-subtle);border:none;cursor:pointer;color:#999;transition:all .12s;border-right:1px solid var(--rule)}
.autofill-tab:last-child{border-right:none}
.autofill-tab.active{background:#fff;color:var(--ink);font-weight:500}
.ai-results{max-height:200px;overflow-y:auto;display:flex;flex-direction:column;gap:6px;margin-top:8px}
.ai-result{border:1px solid var(--rule);border-radius:3px;padding:10px;cursor:pointer;transition:all .12s;background:#fff}
.ai-result:hover{border-color:var(--accent-light);background:var(--accent-muted)}
.ai-result h4{font-size:12px;font-weight:500;margin-bottom:2px}
.ai-result .mfr{font-family:'Source Code Pro',monospace;font-size:10px;color:var(--accent)}
.ai-result .meta{font-size:10px;color:#aaa;margin-top:3px}
.url-status{font-size:11px;margin-top:5px;min-height:15px}
.spinner{display:inline-block;width:12px;height:12px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:spin .7s linear infinite;vertical-align:middle}
.spinner.dark{border-color:rgba(0,0,0,.1);border-top-color:var(--accent)}
@keyframes spin{to{transform:rotate(360deg)}}

/* TOAST */
.toast{position:fixed;bottom:22px;right:22px;z-index:300;background:var(--ink);color:#f5f2ec;padding:9px 16px;border-radius:3px;font-family:'Source Code Pro',monospace;font-size:11px;transform:translateY(60px);opacity:0;transition:all .22s;max-width:300px}
.toast.show{transform:translateY(0);opacity:1}
.toast.success{border-left:3px solid var(--accent)}
.toast.error{border-left:3px solid var(--danger)}

/* SYNC INDICATOR */
.sync-dot{width:6px;height:6px;border-radius:50%;background:#ccc;transition:background .3s}
.sync-dot.syncing{background:var(--amber);animation:pulse 1s infinite}
.sync-dot.synced{background:#4caf50}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
`

function parsePrice(str) {
  if (!str) return NaN
  const nums = str.toString().match(/[\d,]+\.?\d*/g)
  if (!nums || !nums.length) return NaN
  const vals = nums.map(n => parseFloat(n.replace(/,/g, ''))).filter(n => !isNaN(n) && n > 0)
  return vals.length ? Math.min(...vals) : NaN
}

const CELL_OPTIONS = {
  status: [{ value: 'option', label: 'Option' }, { value: 'selected', label: 'Selected' }, { value: 'approved', label: 'Approved' }],
  type: [{ value: 'plumbing', label: 'Plumbing' }, { value: 'lighting', label: 'Lighting' }, { value: 'hardware', label: 'Hardware' }, { value: 'appliance', label: 'Appliance' }, { value: 'finish', label: 'Finish' }, { value: 'other', label: 'Other' }],
}

export default function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [projects, setProjects] = useState([])
  const [activeProjectId, setActiveProjectId] = useState(null)
  const [fixtures, setFixtures] = useState([])
  const [library, setLibrary] = useState([])
  const [syncing, setSyncing] = useState(false)
  const [synced, setSynced] = useState(false)
  const [sidebarTab, setSidebarTab] = useState('search')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState(null)
  const [matrixSearch, setMatrixSearch] = useState('')
  const [sortField, setSortField] = useState(null)
  const [sortDir, setSortDir] = useState('asc')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchFilter, setSearchFilter] = useState('all')
  const [searchResults, setSearchResults] = useState([])
  const [searching, setSearching] = useState(false)
  const [projDropOpen, setProjDropOpen] = useState(false)
  const [newProjName, setNewProjName] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [autofillTab, setAutofillTab] = useState('url')
  const [urlInput, setUrlInput] = useState('')
  const [urlStatus, setUrlStatus] = useState('')
  const [fetchingUrl, setFetchingUrl] = useState(false)
  const [modalSearchInput, setModalSearchInput] = useState('')
  const [modalResults, setModalResults] = useState([])
  const [modalSearching, setModalSearching] = useState(false)
  const [form, setForm] = useState({})
  const [toast, setToast] = useState({ msg: '', type: '', show: false })
  const syncTimer = useRef(null)

  // Auth
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const signIn = () => supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: `${location.origin}/auth/callback` }
  })
  const signOut = () => supabase.auth.signOut()

  // Load data
  useEffect(() => {
    if (!user) return
    loadProjects()
    loadLibrary()
  }, [user])

  async function loadProjects() {
    const { data } = await supabase.from('projects').select('*').order('created_at')
    if (data && data.length) {
      setProjects(data)
      setActiveProjectId(prev => prev || data[0].id)
    } else {
      // Create default project
      const { data: p } = await supabase.from('projects').insert({ name: 'Default Project' }).select().single()
      if (p) { setProjects([p]); setActiveProjectId(p.id) }
    }
  }

  useEffect(() => {
    if (activeProjectId) loadFixtures(activeProjectId)
  }, [activeProjectId])

  async function loadFixtures(pid) {
    const { data } = await supabase.from('fixtures').select('*').eq('project_id', pid).order('sort_order')
    setFixtures(data || [])
  }

  async function loadLibrary() {
    const { data } = await supabase.from('library').select('*').order('saved_at', { ascending: false })
    setLibrary(data || [])
  }

  // Debounced sync to Supabase
  const syncFixtures = useCallback((newFixtures, pid) => {
    setSyncing(true); setSynced(false)
    if (syncTimer.current) clearTimeout(syncTimer.current)
    syncTimer.current = setTimeout(async () => {
      // Upsert all fixtures
      if (newFixtures.length) {
        await supabase.from('fixtures').upsert(
          newFixtures.map((f, i) => ({ ...f, project_id: pid, sort_order: i })),
          { onConflict: 'id' }
        )
      }
      setSyncing(false); setSynced(true)
      setTimeout(() => setSynced(false), 2000)
    }, 800)
  }, [])

  function updateFixtures(newFixtures) {
    setFixtures(newFixtures)
    syncFixtures(newFixtures, activeProjectId)
  }

  function showToast(msg, type = '') {
    setToast({ msg, type, show: true })
    setTimeout(() => setToast(t => ({ ...t, show: false })), 3000)
  }

  // Projects
  async function createProject() {
    const name = newProjName.trim() || 'New Project'
    const { data } = await supabase.from('projects').insert({ name }).select().single()
    if (data) {
      setProjects(p => [...p, data])
      setActiveProjectId(data.id)
      setFixtures([])
      setNewProjName('')
      setProjDropOpen(false)
      showToast(`Created: ${name}`, 'success')
    }
  }

  async function deleteProject(id) {
    if (projects.length === 1) { showToast('Cannot delete the only project', 'error'); return }
    if (!confirm('Delete this project? All fixtures in it will be lost.')) return
    await supabase.from('projects').delete().eq('id', id)
    const remaining = projects.filter(p => p.id !== id)
    setProjects(remaining)
    if (activeProjectId === id) {
      setActiveProjectId(remaining[0].id)
    }
  }

  // AI search
  async function runSearch() {
    if (!searchQuery.trim()) return
    setSearching(true); setSearchResults([])
    const typeHint = searchFilter !== 'all' ? ` (type: ${searchFilter})` : ''
    const prompt = `You are a product research assistant for architects. Search for real architectural fixtures matching: "${searchQuery}"${typeHint}.\n\nReturn ONLY a JSON array (no markdown) with exactly 4 results. Each: {"name":"","manufacturer":"","model":"","type":"plumbing|lighting|hardware|appliance|finish|other","price":"","dimensions":"","finish":"","url":"","notes":""}. Use real products.`
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 1000, tools: [{ type: 'web_search_20250305', name: 'web_search' }], messages: [{ role: 'user', content: prompt }] })
      })
      const data = await res.json()
      const text = data.content?.filter(b => b.type === 'text').map(b => b.text).join('') || ''
      const match = text.match(/\[[\s\S]*\]/)
      if (match) setSearchResults(JSON.parse(match[0]))
    } catch (e) { showToast('Search failed', 'error') }
    setSearching(false)
  }

  async function addResultToSchedule(r, status = 'selected') {
    const f = { id: crypto.randomUUID(), project_id: activeProjectId, type: r.type || 'other', room: '', qty: '1', manufacturer: r.manufacturer || '', model: r.model || '', description: r.name || '', price: r.price || '', dimensions: r.dimensions || '', finish: r.finish || '', url: r.url || '', status, notes: r.notes || '', sort_order: fixtures.length }
    const newF = [...fixtures, f]
    setFixtures(newF)
    await supabase.from('fixtures').insert(f)
    showToast(`Added: ${f.description || f.manufacturer}`, 'success')
  }

  // Modal
  function openModal(id) {
    setEditingId(id || null)
    if (id) {
      const f = fixtures.find(x => x.id === id)
      if (f) setForm({ ...f })
    } else {
      setForm({ type: '', room: '', qty: '1', manufacturer: '', model: '', description: '', price: '', dimensions: '', finish: '', url: '', status: 'option', notes: '' })
    }
    setUrlInput(''); setUrlStatus(''); setModalResults([])
    setModalOpen(true)
  }

  async function saveFixture() {
    if (!form.type) { showToast('Please select a fixture type', 'error'); return }
    if (editingId) {
      const updated = fixtures.map(f => f.id === editingId ? { ...f, ...form } : f)
      updateFixtures(updated)
      await supabase.from('fixtures').update(form).eq('id', editingId)
    } else {
      const f = { ...form, id: crypto.randomUUID(), project_id: activeProjectId, sort_order: fixtures.length }
      const newF = [...fixtures, f]
      setFixtures(newF)
      await supabase.from('fixtures').insert(f)
      syncFixtures(newF, activeProjectId)
    }
    setModalOpen(false)
    showToast(editingId ? 'Updated' : 'Fixture added', 'success')
  }

  // URL autofill
  async function fetchFromURL() {
    if (!urlInput || !urlInput.startsWith('http')) { setUrlStatus('Please paste a valid URL'); return }
    setFetchingUrl(true); setUrlStatus('Fetching page...')
    const prompt = `Extract product details from this URL: ${urlInput}\n\nUse web search to fetch the page. Return ONLY a JSON object: {"name":"","manufacturer":"","model":"","type":"plumbing|lighting|hardware|appliance|finish|other","price":"","dimensions":"","finish":"","url":"${urlInput}","notes":""}. Be specific and accurate.`
    try {
      const res = await fetch('/api/ai', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 800, tools: [{ type: 'web_search_20250305', name: 'web_search' }], messages: [{ role: 'user', content: prompt }] })
      })
      const data = await res.json()
      const text = data.content?.filter(b => b.type === 'text').map(b => b.text).join('') || ''
      const match = text.match(/\{[\s\S]*\}/)
      if (!match) throw new Error()
      const r = JSON.parse(match[0])
      setForm(f => ({ ...f, manufacturer: r.manufacturer || f.manufacturer, model: r.model || f.model, description: r.name || f.description, price: r.price || f.price, dimensions: r.dimensions || f.dimensions, finish: r.finish || f.finish, url: r.url || f.url, notes: r.notes || f.notes, type: r.type || f.type }))
      setUrlStatus(`... Fields populated from ${r.manufacturer || 'product page'}`)
    } catch { setUrlStatus('Could not extract data ... fill fields manually') }
    setFetchingUrl(false)
  }

  // Modal search
  async function runModalSearch() {
    if (!modalSearchInput.trim()) return
    setModalSearching(true); setModalResults([])
    const prompt = `Find 3 real architectural fixtures matching: "${modalSearchInput}". Return ONLY a JSON array. Each: {"name":"","manufacturer":"","model":"","type":"plumbing|lighting|hardware|appliance|finish|other","price":"","dimensions":"","finish":"","url":"","notes":""}.`
    try {
      const res = await fetch('/api/ai', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 700, tools: [{ type: 'web_search_20250305', name: 'web_search' }], messages: [{ role: 'user', content: prompt }] })
      })
      const data = await res.json()
      const text = data.content?.filter(b => b.type === 'text').map(b => b.text).join('') || ''
      const match = text.match(/\[[\s\S]*\]/)
      if (match) setModalResults(JSON.parse(match[0]))
    } catch { }
    setModalSearching(false)
  }

  function selectModalResult(r) {
    setForm(f => ({ ...f, manufacturer: r.manufacturer || f.manufacturer, model: r.model || f.model, description: r.name || f.description, price: r.price || f.price, dimensions: r.dimensions || f.dimensions, finish: r.finish || f.finish, url: r.url || f.url, notes: r.notes || f.notes, type: r.type || f.type }))
    setAutofillTab('url')
    showToast('Fields populated', 'success')
  }

  // Library
  async function toggleLibrary(f) {
    const existing = library.find(l => l.url === f.url && l.manufacturer === f.manufacturer && l.model === f.model)
    if (existing) {
      await supabase.from('library').delete().eq('id', existing.id)
      setLibrary(l => l.filter(x => x.id !== existing.id))
      showToast('Removed from library')
    } else {
      const entry = { manufacturer: f.manufacturer, model: f.model, description: f.description, type: f.type, price: f.price, dimensions: f.dimensions, finish: f.finish, url: f.url, notes: f.notes, qty: f.qty }
      const { data } = await supabase.from('library').insert(entry).select().single()
      if (data) setLibrary(l => [data, ...l])
      showToast('Saved to library', 'success')
    }
  }

  function isInLibrary(f) {
    return library.some(l => l.url === f.url && l.manufacturer === f.manufacturer && l.model === f.model)
  }

  async function addLibraryItem(item) {
    const f = { id: crypto.randomUUID(), project_id: activeProjectId, type: item.type || 'other', room: '', qty: item.qty || '1', manufacturer: item.manufacturer || '', model: item.model || '', description: item.description || '', price: item.price || '', dimensions: item.dimensions || '', finish: item.finish || '', url: item.url || '', status: 'option', notes: item.notes || '', sort_order: fixtures.length }
    const newF = [...fixtures, f]
    setFixtures(newF)
    await supabase.from('fixtures').insert(f)
    showToast('Added to schedule', 'success')
  }

  async function removeFromLibrary(id) {
    await supabase.from('library').delete().eq('id', id)
    setLibrary(l => l.filter(x => x.id !== id))
    showToast('Removed from library')
  }

  // Inline edit
  function editCell(e, id, field, inputType) {
    e.stopPropagation()
    const td = e.currentTarget
    const f = fixtures.find(x => x.id === id)
    if (!f) return
    const currentVal = f[field] || ''
    if (inputType === 'select') {
      const sel = document.createElement('select')
      sel.className = 'cell-select'
      CELL_OPTIONS[field].forEach(opt => {
        const o = document.createElement('option')
        o.value = opt.value; o.textContent = opt.label
        if (opt.value === currentVal) o.selected = true
        sel.appendChild(o)
      })
      td.innerHTML = ''; td.appendChild(sel); sel.focus()
      const commit = async () => {
        const updated = fixtures.map(x => x.id === id ? { ...x, [field]: sel.value } : x)
        updateFixtures(updated)
        await supabase.from('fixtures').update({ [field]: sel.value }).eq('id', id)
      }
      sel.addEventListener('change', commit)
      sel.addEventListener('blur', () => loadFixtures(activeProjectId))
    } else {
      const inp = document.createElement('input')
      inp.className = 'cell-input'; inp.type = 'text'; inp.value = currentVal
      td.innerHTML = ''; td.appendChild(inp); inp.focus(); inp.select()
      const commit = async () => {
        const val = inp.value.trim()
        const updated = fixtures.map(x => x.id === id ? { ...x, [field]: val } : x)
        updateFixtures(updated)
        await supabase.from('fixtures').update({ [field]: val }).eq('id', id)
      }
      inp.addEventListener('blur', commit)
      inp.addEventListener('keydown', ev => { if (ev.key === 'Enter') inp.blur(); if (ev.key === 'Escape') loadFixtures(activeProjectId) })
    }
  }

  async function deleteFixture(id) {
    if (!confirm('Remove this fixture?')) return
    const updated = fixtures.filter(x => x.id !== id)
    setFixtures(updated)
    await supabase.from('fixtures').delete().eq('id', id)
    showToast('Fixture removed')
  }

  // Sorting
  function sortBy(field) {
    if (sortField === field) { setSortDir(d => d === 'asc' ? 'desc' : 'asc') }
    else { setSortField(field); setSortDir('asc') }
  }

  // Filtered + sorted fixtures
  const filtered = fixtures.filter(f => {
    if (statusFilter !== 'all' && f.status !== statusFilter) return false
    if (typeFilter && f.type !== typeFilter) return false
    if (matrixSearch) {
      const hay = [f.type, f.room, f.manufacturer, f.model, f.description, f.price, f.dimensions, f.finish, f.notes, f.status].join(' ').toLowerCase()
      if (!hay.includes(matrixSearch.toLowerCase())) return false
    }
    return true
  })

  const sorted = sortField ? [...filtered].sort((a, b) => {
    if (sortField === 'qty') return sortDir === 'asc' ? (parseFloat(a.qty) || 0) - (parseFloat(b.qty) || 0) : (parseFloat(b.qty) || 0) - (parseFloat(a.qty) || 0)
    if (sortField === 'price') return sortDir === 'asc' ? (parsePrice(a.price) || 0) - (parsePrice(b.price) || 0) : (parsePrice(b.price) || 0) - (parsePrice(a.price) || 0)
    if (sortField === 'status') { const o = { option: 0, selected: 1, approved: 2 }; return sortDir === 'asc' ? (o[a.status] || 0) - (o[b.status] || 0) : (o[b.status] || 0) - (o[a.status] || 0) }
    return sortDir === 'asc' ? (a[sortField] || '').localeCompare(b[sortField] || '') : (b[sortField] || '').localeCompare(a[sortField] || '')
  }) : filtered

  const typeOrder = ['plumbing', 'lighting', 'hardware', 'appliance', 'finish', 'other']

  // Cost total
  let totalCost = 0, missingPrice = 0
  filtered.forEach(f => {
    const qty = parseFloat(f.qty) || 1
    const p = parsePrice(f.price)
    if (!isNaN(p) && p > 0) totalCost += p * qty
    else missingPrice++
  })
  const formattedTotal = totalCost.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })

  function buildRow(f, i) {
    const statusClass = f.status === 'selected' ? 'status-selected' : f.status === 'approved' ? 'status-approved' : 'status-option'
    const statusLabel = f.status === 'selected' ? 'Selected' : f.status === 'approved' ? 'Approved' : 'Option'
    const rowClass = f.status === 'selected' ? 'selected-row' : f.status === 'option' ? 'option-row' : ''
    const inLib = isInLibrary(f)
    return (
      <tr key={f.id} className={rowClass}>
        <td style={{ fontFamily: "'Source Code Pro',monospace", fontSize: 11, color: '#aaa' }}>{i + 1}</td>
        <td className="editable-cell" onClick={e => editCell(e, f.id, 'type', 'select')}><span className={`fixture-tag tag-${f.type || 'other'}`}>{(f.type || 'other').substring(0, 4).toUpperCase()}</span></td>
        <td className="editable-cell" onClick={e => editCell(e, f.id, 'room', 'text')} style={{ fontWeight: 500 }}>{f.room || <span style={{ color: '#ccc' }}>...</span>}</td>
        <td className="editable-cell" onClick={e => editCell(e, f.id, 'qty', 'text')} style={{ fontFamily: "'Source Code Pro',monospace", textAlign: 'center' }}>{f.qty || '1'}</td>
        <td className="editable-cell" onClick={e => editCell(e, f.id, 'manufacturer', 'text')} style={{ fontFamily: "'Source Code Pro',monospace", fontSize: 11, color: 'var(--accent)' }}>{f.manufacturer || <span style={{ color: '#ccc' }}>...</span>}</td>
        <td className="editable-cell" onClick={e => editCell(e, f.id, 'description', 'text')}>
          <div style={{ fontWeight: 500 }}>{f.description || f.model || <span style={{ color: '#ccc' }}>...</span>}</div>
          {f.model && f.description && <div style={{ fontFamily: "'Source Code Pro',monospace", fontSize: 10, color: '#aaa' }}>{f.model}</div>}
        </td>
        <td className="editable-cell price-cell" onClick={e => editCell(e, f.id, 'price', 'text')}>{f.price || <span style={{ color: '#ccc' }}>...</span>}</td>
        <td className="editable-cell" onClick={e => editCell(e, f.id, 'dimensions', 'text')} style={{ fontSize: 11, whiteSpace: 'nowrap' }}>{f.dimensions || <span style={{ color: '#ccc' }}>...</span>}</td>
        <td className="editable-cell" onClick={e => editCell(e, f.id, 'finish', 'text')} style={{ fontSize: 11 }}>{f.finish || <span style={{ color: '#ccc' }}>...</span>}</td>
        <td className="link-cell">{f.url ? <a href={f.url} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}>... Link</a> : '...'}</td>
        <td className="editable-cell" onClick={e => editCell(e, f.id, 'status', 'select')}><span className={`status-badge ${statusClass}`}>{statusLabel}</span></td>
        <td className="editable-cell" onClick={e => editCell(e, f.id, 'notes', 'text')} style={{ fontSize: 11, color: '#888', maxWidth: 110, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.notes || <span style={{ color: '#ccc' }}>...</span>}</td>
        <td>
          <div className="row-actions">
            <button className={`icon-btn ${inLib ? 'saved' : ''}`} onClick={() => toggleLibrary(f)} title={inLib ? 'Remove from library' : 'Save to library'}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill={inLib ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
            </button>
            <button className="icon-btn" onClick={() => openModal(f.id)} title="Edit">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
            </button>
            <button className="icon-btn danger" onClick={() => deleteFixture(f.id)} title="Delete">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" /></svg>
            </button>
          </div>
        </td>
      </tr>
    )
  }

  const activeProject = projects.find(p => p.id === activeProjectId)

  if (loading) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'Inter,sans-serif', color: '#999', fontSize: 14 }}>Loading...</div>

  if (!user) return (
    <>
      <style>{G}</style>
      <div className="login-wrap">
        <div className="login-card">
          <div className="login-logo">Schedule Assistant</div>
          <div className="login-sub">Architectural fixture scheduling</div>
          <button className="google-btn" onClick={signIn}>
            <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" /><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" /><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" /><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" /><path fill="none" d="M0 0h48v48H0z" /></svg>
            Sign in with Google
          </button>
        </div>
      </div>
    </>
  )

  return (
    <>
      <style>{G}</style>

      {/* HEADER */}
      <header>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div className="logo">Schedule Assistant</div>
          <div style={{ width: 1, height: 16, background: 'var(--rule)' }} />
          {/* Project switcher */}
          <div className="proj-switcher">
            <button className="proj-btn" onClick={() => setProjDropOpen(o => !o)}>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 180 }}>{activeProject?.name || 'Select project'}</span>
              <span style={{ marginLeft: 6, color: '#aaa', fontSize: 10 }}>...</span>
            </button>
            {projDropOpen && (
              <div className="proj-dropdown open" onClick={e => e.stopPropagation()}>
                {projects.map(p => (
                  <div key={p.id} className={`proj-item ${p.id === activeProjectId ? 'active' : ''}`} onClick={() => { setActiveProjectId(p.id); setProjDropOpen(false) }}>
                    <span>{p.name}</span>
                    {projects.length > 1 && <button className="icon-btn danger" onClick={e => { e.stopPropagation(); deleteProject(p.id) }} style={{ opacity: 0.5, padding: 2 }}></button>}
                  </div>
                ))}
                <div className="proj-footer">
                  <input value={newProjName} onChange={e => setNewProjName(e.target.value)} placeholder="New project name..." onKeyDown={e => e.key === 'Enter' && createProject()} />
                  <button className="btn btn-primary btn-sm" onClick={createProject}>Add</button>
                </div>
              </div>
            )}
          </div>
          {/* Sync indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10, color: '#aaa', fontFamily: "'Source Code Pro',monospace" }}>
            <div className={`sync-dot ${syncing ? 'syncing' : synced ? 'synced' : ''}`} />
            {syncing ? 'Saving...' : synced ? 'Saved' : ''}
          </div>
        </div>
        <div className="header-right">
          <div className="user-pill">
            {user.user_metadata?.avatar_url && <img src={user.user_metadata.avatar_url} alt="" />}
            {user.user_metadata?.full_name || user.email}
          </div>
          <button className="btn btn-ghost" onClick={signOut}>Sign out</button>
          <button className="btn btn-primary" onClick={() => openModal()}>+ Add Fixture</button>
        </div>
      </header>

      <div className="app-body" onClick={() => setProjDropOpen(false)}>
        {/* SIDEBAR */}
        <div className="sidebar">
          <div className="sidebar-tabs">
            {['search', 'categories', 'library'].map(tab => (
              <button key={tab} className={`sidebar-tab ${sidebarTab === tab ? 'active' : ''}`} onClick={() => setSidebarTab(tab)}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* AI SEARCH */}
          <div className={`sidebar-content ${sidebarTab === 'search' ? 'active' : ''}`}>
            <div className="ai-badge"><span>...</span> AI-Powered Search</div>
            <div className="search-box">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
              <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && runSearch()} placeholder="e.g. matte black faucet, Kohler..." />
            </div>
            <div className="filter-chips">
              {['all', 'plumbing', 'lighting', 'hardware', 'appliance', 'finish', 'other'].map(f => (
                <div key={f} className={`chip ${searchFilter === f ? 'active' : ''}`} onClick={() => setSearchFilter(f)}>{f}</div>
              ))}
            </div>
            <button className="btn btn-primary" style={{ width: '100%', marginBottom: 10 }} onClick={runSearch} disabled={searching}>
              {searching ? <><span className="spinner" /> Searching...</> : 'Search'}
            </button>
            {searchResults.length > 0 ? searchResults.map((r, i) => (
              <div key={i} className="result-card">
                <div className="result-mfr">{r.manufacturer}</div>
                <div className="result-name">{r.name || r.model}</div>
                <div className="result-meta">{r.model} {r.dimensions && `· ${r.dimensions}`}</div>
                <div className="result-meta">{r.finish}</div>
                <div className="result-price">{r.price || 'Price TBD'}</div>
                <div className="result-actions">
                  <button className="btn btn-primary btn-sm" onClick={() => addResultToSchedule(r, 'selected')}>+ Add</button>
                  <button className="btn btn-outline btn-sm" onClick={() => addResultToSchedule(r, 'option')}>Save as Option</button>
                </div>
              </div>
            )) : !searching && (
              <div className="search-placeholder">Search for fixtures using natural language. Results include manufacturer, model, price, and specs.</div>
            )}
          </div>

          {/* CATEGORIES */}
          <div className={`sidebar-content ${sidebarTab === 'categories' ? 'active' : ''}`}>
            <div className="cat-group">
              <div className="cat-heading">Status</div>
              {[['all', 'All'], ['option', 'Options'], ['selected', 'Selected'], ['approved', 'Approved']].map(([v, l]) => (
                <div key={v} className={`cat-item ${statusFilter === v && !typeFilter ? 'active' : ''}`} onClick={() => { setStatusFilter(v); setTypeFilter(null) }}>
                  {l} <span className="cat-count">{v === 'all' ? fixtures.length : fixtures.filter(f => f.status === v).length}</span>
                </div>
              ))}
            </div>
            <div className="cat-group">
              <div className="cat-heading">Type</div>
              {typeOrder.map(t => (
                <div key={t} className={`cat-item ${typeFilter === t ? 'active' : ''}`} onClick={() => { setTypeFilter(t); setStatusFilter('all') }}>
                  {t.charAt(0).toUpperCase() + t.slice(1)} <span className="cat-count">{fixtures.filter(f => f.type === t).length}</span>
                </div>
              ))}
            </div>
          </div>

          {/* LIBRARY */}
          <div className={`sidebar-content ${sidebarTab === 'library' ? 'active' : ''}`}>
            <div className="search-box" style={{ marginBottom: 10 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
              <input placeholder="Search library..." onChange={e => {
                const q = e.target.value.toLowerCase()
                // filter handled inline
              }} id="lib-search" />
            </div>
            {library.length === 0 ? (
              <div className="lib-empty">No saved fixtures yet.<br />Click the bookmark icon on any row to save it.</div>
            ) : library.map(item => (
              <div key={item.id} className="lib-card">
                <div className="lib-mfr">{item.manufacturer}</div>
                <div className="lib-name">{item.description || item.model || '...'}</div>
                <div className="lib-meta">{[item.type, item.model, item.finish].filter(Boolean).join(' · ')}</div>
                <div className="lib-price">{item.price}</div>
                <div className="lib-actions">
                  <button className="btn btn-primary btn-sm" onClick={() => addLibraryItem(item)}>+ Add to Schedule</button>
                  <button className="btn btn-outline btn-sm" onClick={() => removeFromLibrary(item.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MAIN */}
        <div className="main">
          <div className="toolbar">
            <div className="toolbar-left">{fixtures.length} fixture{fixtures.length !== 1 ? 's' : ''}</div>
            <div className="toolbar-search">
              <div className="matrix-search">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
                <input value={matrixSearch} onChange={e => setMatrixSearch(e.target.value)} placeholder="Search fixtures..." />
                <button className={`clear-btn ${matrixSearch ? 'visible' : ''}`} onClick={() => setMatrixSearch('')}></button>
              </div>
            </div>
          </div>

          <div className="schedule-wrap">
            <table className="schedule-table">
              <thead>
                <tr>
                  <th style={{ width: 36 }}>#</th>
                  {[['type', 'Type', 80], ['room', 'Room / Location'], ['qty', 'Qty', 46], ['manufacturer', 'Manufacturer'], ['description', 'Model / Description']].map(([f, l, w]) => (
                    <th key={f} className={`sortable ${sortField === f ? `sort-${sortDir}` : ''}`} style={w ? { width: w } : {}} onClick={() => sortBy(f)}>{l}<span className="sort-icon" /></th>
                  ))}
                  <th className={`sortable ${sortField === 'price' ? `sort-${sortDir}` : ''}`} style={{ width: 86 }} onClick={() => sortBy('price')}>Price<span className="sort-icon" /></th>
                  <th>Dimensions</th>
                  <th className={`sortable ${sortField === 'finish' ? `sort-${sortDir}` : ''}`} onClick={() => sortBy('finish')}>Finish<span className="sort-icon" /></th>
                  <th>Link</th>
                  <th className={`sortable ${sortField === 'status' ? `sort-${sortDir}` : ''}`} style={{ width: 78 }} onClick={() => sortBy('status')}>Status<span className="sort-icon" /></th>
                  <th style={{ width: 76 }}>Notes</th>
                  <th style={{ width: 56 }} />
                </tr>
              </thead>
              <tbody>
                {sorted.length === 0 ? (
                  <tr><td colSpan={13}>
                    <div className="empty-state">
                      <h3>{fixtures.length ? 'No fixtures match this filter' : 'Start your schedule'}</h3>
                      <p>{fixtures.length ? 'Try clearing filters.' : 'Search for fixtures in the sidebar, or click + Add Fixture.'}</p>
                      {!fixtures.length && <button className="btn btn-primary" onClick={() => openModal()}>+ Add First Fixture</button>}
                    </div>
                  </td></tr>
                ) : sortField ? (
                  sorted.map((f, i) => buildRow(f, i))
                ) : (
                  typeOrder.flatMap(type => {
                    const group = sorted.filter(f => f.type === type)
                    if (!group.length) return []
                    return [
                      <tr key={`section-${type}`} className="section-header"><td colSpan={13}>{type.charAt(0).toUpperCase() + type.slice(1)}</td></tr>,
                      ...group.map((f, i) => buildRow(f, i))
                    ]
                  })
                )}
                <tr className="add-row" onClick={() => openModal()}><td colSpan={13}>+ Add fixture</td></tr>
                <tr className="cost-total-row">
                  <td colSpan={6} />
                  <td colSpan={3}>
                    <div className="cost-label">Estimated Total</div>
                    <div className="cost-value">{formattedTotal}</div>
                    <div className="cost-note">{missingPrice > 0 ? `+ ${missingPrice} fixture${missingPrice !== 1 ? 's' : ''} without pricing` : 'All fixtures priced'}</div>
                  </td>
                  <td colSpan={4} />
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ADD/EDIT MODAL */}
      <div className={`modal-overlay ${modalOpen ? 'open' : ''}`} onClick={e => e.target === e.currentTarget && setModalOpen(false)}>
        <div className="modal">
          <button className="modal-close" onClick={() => setModalOpen(false)}></button>
          <div className="modal-title">{editingId ? 'Edit Fixture' : 'Add Fixture'}</div>

          {!editingId && (
            <div className="autofill-area">
              <div className="autofill-tabs">
                {[['url', 'Paste URL'], ['search', 'Search'], ['library', 'Library']].map(([v, l]) => (
                  <button key={v} className={`autofill-tab ${autofillTab === v ? 'active' : ''}`} onClick={() => setAutofillTab(v)}>{l}</button>
                ))}
              </div>

              {autofillTab === 'url' && (
                <div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <input className="form-input" style={{ flex: 1 }} type="url" value={urlInput} onChange={e => { setUrlInput(e.target.value); if (e.target.value.startsWith('http') && e.target.value.length > 20) setTimeout(fetchFromURL, 800) }} placeholder="Paste product URL to auto-fill..." />
                    <button className="btn btn-primary btn-sm" onClick={fetchFromURL} disabled={fetchingUrl}>{fetchingUrl ? <span className="spinner" /> : 'Fill'}</button>
                  </div>
                  <div className="url-status" style={{ color: urlStatus.startsWith('...') ? 'var(--accent)' : urlStatus ? 'var(--danger)' : '#999' }}>{urlStatus}</div>
                </div>
              )}

              {autofillTab === 'search' && (
                <div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <input className="form-input" style={{ flex: 1 }} value={modalSearchInput} onChange={e => setModalSearchInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && runModalSearch()} placeholder="Search to auto-fill fields..." />
                    <button className="btn btn-primary btn-sm" onClick={runModalSearch} disabled={modalSearching}>{modalSearching ? <span className="spinner" /> : 'Search'}</button>
                  </div>
                  <div className="ai-results">
                    {modalResults.map((r, i) => (
                      <div key={i} className="ai-result" onClick={() => selectModalResult(r)}>
                        <div className="mfr">{r.manufacturer}</div>
                        <h4>{r.name || r.model}</h4>
                        <div className="meta">{[r.model, r.price, r.finish].filter(Boolean).join(' · ')}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {autofillTab === 'library' && (
                <div className="ai-results">
                  {library.length === 0 ? <div style={{ fontSize: 12, color: '#aaa', textAlign: 'center', padding: 16 }}>No saved fixtures yet.</div> :
                    library.map(item => (
                      <div key={item.id} className="ai-result" onClick={() => { setForm(f => ({ ...f, ...item })); setAutofillTab('url') }}>
                        <div className="mfr">{item.manufacturer}</div>
                        <h4>{item.description || item.model || '...'}</h4>
                        <div className="meta">{[item.type, item.price, item.finish].filter(Boolean).join(' · ')}</div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}

          <div className="form-grid">
            <div className="form-field">
              <label className="form-label">Type *</label>
              <select className="form-input" value={form.type || ''} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                <option value="">Select type...</option>
                {CELL_OPTIONS.type.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div className="form-field">
              <label className="form-label">Room / Location</label>
              <input className="form-input" value={form.room || ''} onChange={e => setForm(f => ({ ...f, room: e.target.value }))} placeholder="e.g. Master Bath" />
            </div>
            <div className="form-field">
              <label className="form-label">Manufacturer</label>
              <input className="form-input" value={form.manufacturer || ''} onChange={e => setForm(f => ({ ...f, manufacturer: e.target.value }))} placeholder="e.g. Kohler" />
            </div>
            <div className="form-field">
              <label className="form-label">Model Number</label>
              <input className="form-input" value={form.model || ''} onChange={e => setForm(f => ({ ...f, model: e.target.value }))} placeholder="e.g. K-8304-0" />
            </div>
            <div className="form-field full">
              <label className="form-label">Description</label>
              <input className="form-input" value={form.description || ''} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="e.g. Wellworth Round-Front Toilet" />
            </div>
            <div className="form-field">
              <label className="form-label">Quantity</label>
              <input className="form-input" type="number" min="1" value={form.qty || '1'} onChange={e => setForm(f => ({ ...f, qty: e.target.value }))} />
            </div>
            <div className="form-field">
              <label className="form-label">Price (USD)</label>
              <input className="form-input" value={form.price || ''} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} placeholder="e.g. $425.00" />
            </div>
            <div className="form-field">
              <label className="form-label">Dimensions</label>
              <input className="form-input" value={form.dimensions || ''} onChange={e => setForm(f => ({ ...f, dimensions: e.target.value }))} placeholder='e.g. 28"W  17"D' />
            </div>
            <div className="form-field">
              <label className="form-label">Finish</label>
              <input className="form-input" value={form.finish || ''} onChange={e => setForm(f => ({ ...f, finish: e.target.value }))} placeholder="e.g. Matte Black" />
            </div>
            <div className="form-field">
              <label className="form-label">Status</label>
              <select className="form-input" value={form.status || 'option'} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                {CELL_OPTIONS.status.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div className="form-field full">
              <label className="form-label">Product URL</label>
              <input className="form-input" type="url" value={form.url || ''} onChange={e => setForm(f => ({ ...f, url: e.target.value }))} placeholder="https://..." />
            </div>
            <div className="form-field full">
              <label className="form-label">Notes</label>
              <input className="form-input" value={form.notes || ''} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="Lead time, spec requirements..." />
            </div>
          </div>

          <div className="form-actions">
            <button className="btn btn-outline" onClick={() => setModalOpen(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={saveFixture}>Save Fixture</button>
          </div>
        </div>
      </div>

      {/* TOAST */}
      <div className={`toast ${toast.type} ${toast.show ? 'show' : ''}`}>{toast.msg}</div>
    </>
  )
}
