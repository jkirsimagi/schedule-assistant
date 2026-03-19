'use client'
// build: 1773958218418
import { useEffect, useState, useRef, useCallback } from 'react'
import { createClient } from '../lib/supabase'

const supabase = createClient()

// ...... STYLES ............................................................................................................................................................................................................
const G = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Source+Sans+3:ital,wght@0,300;0,400;0,600;1,300&family=Source+Code+Pro:wght@300;400;500&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Source Sans 3',sans-serif;background:#fff;color:#1c1c1c;font-size:13px;line-height:1.5}
:root{--ink:#1c1c1c;--ink-mid:#555;--ink-faint:#999;--bg:#fff;--bg-subtle:#f7f7f7;--rule:#e4e4e4;--rule-strong:#c8c8c8;--accent:#1a1a1a;--accent-light:#444444;--accent-muted:#f0f0f0;--amber:#b07020;--danger:#9b3030;--shadow:0 1px 2px rgba(0,0,0,.05),0 3px 10px rgba(0,0,0,.04);--shadow-lg:0 4px 16px rgba(0,0,0,.08),0 16px 40px rgba(0,0,0,.06)}


.prefs-wrapper{position:relative}
.prefs-btn{display:flex;align-items:center;gap:5px;font-family:'Source Sans 3',sans-serif;font-size:11px;padding:5px 10px;border-radius:2px;border:1px solid var(--rule);background:#fff;cursor:pointer;color:var(--ink-mid);transition:all .12s}
.prefs-btn:hover{border-color:var(--rule-strong);color:var(--ink)}
.prefs-btn.active{border-color:var(--accent);color:var(--accent);background:var(--accent-muted)}
.prefs-dropdown{position:absolute;top:calc(100% + 6px);right:0;width:320px;background:#fff;border:1px solid var(--rule);border-radius:4px;box-shadow:var(--shadow-lg);z-index:500;padding:16px;display:none}
.prefs-dropdown.open{display:block}
.prefs-header{font-family:'Inter',sans-serif;font-weight:500;font-size:13px;margin-bottom:4px}
.prefs-subhead{font-size:10px;color:var(--ink-faint);margin-bottom:14px}
.prefs-section{margin-bottom:12px}
.prefs-label{font-family:'Source Sans 3',sans-serif;font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:#999;margin-bottom:6px}
.prefs-chips{display:flex;flex-wrap:wrap;gap:5px}
.pref-chip{font-size:11px;padding:3px 10px;border-radius:20px;border:1px solid var(--rule);cursor:pointer;background:#fff;color:#888;transition:all .12s}
.pref-chip.active{background:var(--accent);border-color:var(--accent);color:#fff}
.prefs-input{width:100%;padding:6px 8px;border:1px solid var(--rule);border-radius:2px;font-family:'Source Sans 3',sans-serif;font-size:12px;outline:none;box-sizing:border-box}
.prefs-input:focus{border-color:var(--accent-light)}
.prefs-footer{display:flex;justify-content:flex-end;gap:6px;margin-top:14px;padding-top:10px;border-top:1px solid var(--rule)}
.lib-expand-btn{display:flex;align-items:center;gap:5px;font-family:'Source Sans 3',sans-serif;font-size:11px;color:var(--accent);background:none;border:none;cursor:pointer;padding:0;margin-bottom:10px;transition:opacity .12s}
.lib-expand-btn:hover{opacity:.7}
.lib-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:300;display:flex;flex-direction:column;opacity:0;pointer-events:none;transition:opacity .18s}
.lib-modal-overlay.open{opacity:1;pointer-events:all}
.lib-modal{background:#fff;margin:40px auto;width:90vw;max-width:1100px;border-radius:6px;box-shadow:var(--shadow-lg);display:flex;flex-direction:column;max-height:calc(100vh - 80px);transform:translateY(8px);transition:transform .18s;overflow:hidden}
.lib-modal-overlay.open .lib-modal{transform:translateY(0)}
.lib-modal-header{display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid var(--rule)}
.lib-modal-title{font-family:'Inter',sans-serif;font-weight:300;font-size:18px}
.lib-modal-body{flex:1;overflow-y:auto;padding:20px}
.lib-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px}
.lib-grid-card{border:1px solid var(--rule);border-radius:4px;padding:14px;background:#fff;transition:border-color .12s}
.lib-grid-card:hover{border-color:var(--rule-strong)}
.lib-grid-card .lib-mfr{font-family:'Source Code Pro',monospace;font-size:10px;color:var(--accent);margin-bottom:2px}
.lib-grid-card .lib-name{font-size:13px;font-weight:500;margin-bottom:4px}
.lib-grid-card .lib-meta{font-size:11px;color:#aaa}
.lib-grid-card .lib-price{font-family:'Source Code Pro',monospace;font-size:12px;color:var(--amber);margin-top:6px}
.lib-grid-card .lib-actions{display:flex;gap:6px;margin-top:10px}


.cat-config-btn{display:flex;align-items:center;gap:4px;font-size:10px;color:var(--ink-faint);background:none;border:none;cursor:pointer;padding:4px 0;transition:color .12s;text-transform:uppercase;letter-spacing:.06em}
.cat-config-btn:hover{color:var(--accent)}
.cat-modal{width:560px}
.cat-list{display:flex;flex-direction:column;gap:6px;margin-bottom:16px}
.cat-row{display:flex;align-items:center;gap:8px;padding:8px 10px;border:1px solid var(--rule);border-radius:3px;background:var(--bg-subtle)}
.cat-color-dot{width:12px;height:12px;border-radius:50%;flex-shrink:0;cursor:pointer;border:2px solid rgba(0,0,0,.1)}
.cat-row-name{flex:1;font-size:12px;font-weight:500}
.cat-col-chips{display:flex;flex-wrap:wrap;gap:4px;flex:2}
.cat-col-chip{display:flex;align-items:center;gap:4px;font-size:10px;padding:2px 8px;border-radius:20px;background:#e8f0eb;color:var(--accent);border:1px solid var(--accent-muted)}
.cat-col-chip button{background:none;border:none;cursor:pointer;color:var(--accent);font-size:12px;padding:0;line-height:1;opacity:.6}
.cat-col-chip button:hover{opacity:1}
.cat-row-actions{display:flex;gap:4px;flex-shrink:0}
.cat-edit-section{background:var(--bg-subtle);border:1px solid var(--rule);border-radius:4px;padding:14px;margin-bottom:14px}
.cat-edit-title{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#999;margin-bottom:10px}
.cat-add-row{display:flex;gap:6px;margin-bottom:10px}
.color-picker-row{display:flex;align-items:center;gap:8px;margin-bottom:10px}
.color-swatch{width:24px;height:24px;border-radius:50%;cursor:pointer;border:2px solid rgba(0,0,0,.1);transition:transform .1s}
.color-swatch:hover{transform:scale(1.15)}
.color-swatch.selected{border-color:var(--ink);transform:scale(1.15)}
.new-cat-row{display:flex;gap:6px}


.status-dropdown-wrap{position:relative;display:inline-block}
.status-dropdown-menu{position:absolute;top:calc(100% + 4px);left:50%;transform:translateX(-50%);background:#fff;border:1px solid var(--rule);border-radius:3px;box-shadow:var(--shadow-lg);z-index:600;min-width:110px;overflow:hidden;display:none}
.status-dropdown-menu.open{display:block}
.status-dropdown-item{padding:6px 12px;font-size:11px;cursor:pointer;white-space:nowrap;transition:background .1s;display:flex;align-items:center;gap:6px}
.status-dropdown-item:hover{background:var(--bg-subtle)}
.status-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}

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
.proj-rename-input{border:1px solid var(--accent-light)!important;border-radius:2px;padding:2px 6px;font-size:12px;outline:none;width:130px}
.proj-item{display:flex;align-items:center;gap:4px;padding:8px 12px;cursor:pointer;font-size:12px;transition:background .1s}
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
.cell-input,.cell-select{width:100%;min-height:30px;border:none;outline:2px solid var(--accent-light);border-radius:2px;padding:5px 8px;font-family:inherit;font-size:inherit;color:var(--ink);background:#fff;box-shadow:var(--shadow)}

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
  const [editingProjId, setEditingProjId] = useState(null)
  const [catConfig, setCatConfig] = useState({
    plumbing:   { color: '#2d4a6b', columns: [] },
    lighting:   { color: '#6b4a2d', columns: [] },
    hardware:   { color: '#4a2d6b', columns: [] },
    appliance:  { color: '#2d6b4a', columns: [] },
    finish:     { color: '#6b2d4a', columns: [] },
    other:      { color: '#555555', columns: [] },
  })
  const typeOptions = Object.entries(catConfig).map(([k, v]) => ({
    value: k, label: v.label || (k.charAt(0).toUpperCase() + k.slice(1).replace(/_/g, ' '))
  }))
  const [catModalOpen, setCatModalOpen] = useState(false)
  const [editingCat, setEditingCat] = useState(null) // category key being edited
  const [newCatName, setNewCatName] = useState('')
  const [newColName, setNewColName] = useState('')
  const [prefsOpen, setPrefsOpen] = useState(false)
  const [prefs, setPrefs] = useState({ projectType: 'residential', budget: 'mid-range', finish: '', manufacturers: '', notes: '' })
  const [libExpanded, setLibExpanded] = useState(false)
  const [openStatusId, setOpenStatusId] = useState(null)

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


  async function renameProject(id, newName) {
    const name = newName.trim()
    if (!name) return
    await supabase.from('projects').update({ name }).eq('id', id)
    setProjects(p => p.map(x => x.id === id ? { ...x, name } : x))
  }

  // AI search
  async function runSearch() {
    if (!searchQuery.trim()) return
    setSearching(true); setSearchResults([])
    const typeHint = searchFilter !== 'all' ? ` (type: ${searchFilter})` : ''
    const prefHint = [
      prefs.projectType && `project type: ${prefs.projectType}`,
      prefs.budget && `budget range: ${prefs.budget}`,
      prefs.finish && `preferred finish: ${prefs.finish}`,
      prefs.manufacturers && `preferred manufacturers: ${prefs.manufacturers}`,
      prefs.notes && `requirements: ${prefs.notes}`,
    ].filter(Boolean).join(', ')
    const prompt = `You are a product research assistant for architects. Search for real architectural fixtures matching: "${searchQuery}"${typeHint}${prefHint ? `. Context: ${prefHint}` : ``}.\n\nReturn ONLY a JSON array (no markdown) with exactly 4 results. Each: {"name":"","manufacturer":"","model":"","type":"plumbing|lighting|hardware|appliance|finish|other","price":"","dimensions":"","finish":"","url":"","notes":""}. Use real products.`
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
      (field === 'type' ? typeOptions : CELL_OPTIONS[field]).forEach(opt => {
        const o = document.createElement('option')
        o.value = opt.value; o.textContent = opt.label
        if (opt.value === currentVal) o.selected = true
        sel.appendChild(o)
      })
      const originalSelHTML = td.innerHTML; td.innerHTML = ''; td.appendChild(sel); sel.focus()
      const commit = async () => {
        const updated = fixtures.map(x => x.id === id ? { ...x, [field]: sel.value } : x)
        updateFixtures(updated)
        await supabase.from('fixtures').update({ [field]: sel.value }).eq('id', id)
        if (td.contains(sel)) sel.remove()
      }
      sel.addEventListener('change', commit)
      sel.addEventListener('blur', () => { if (td.contains(sel)) td.innerHTML = originalSelHTML })
    } else {
      const inp = document.createElement('textarea')
      inp.className = 'cell-input'; inp.type = 'text'; inp.value = currentVal
      const originalHTML = td.innerHTML; td.innerHTML = ''; const _h = Math.max(td.offsetHeight, 36); td.appendChild(inp); inp.style.height = _h + 'px'; inp.style.resize = 'none'; inp.focus(); inp.select()
      const commit = async () => {
        const val = inp.value.trim()
        const updated = fixtures.map(x => x.id === id ? { ...x, [field]: val } : x)
        updateFixtures(updated)
        await supabase.from('fixtures').update({ [field]: val }).eq('id', id)
        td.innerHTML = val || originalHTML
      }
      inp.addEventListener('blur', commit)
      inp.addEventListener('keydown', ev => { if (ev.key === 'Enter') inp.blur(); if (ev.key === 'Escape') { td.innerHTML = originalHTML } })
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
        <td className="editable-cell" onClick={e => editCell(e, f.id, 'type', 'select')}><span className="fixture-tag" style={{ background: catConfig[f.type]?.color || '#555' }}>{(catConfig[f.type]?.label || f.type || 'other').substring(0, 4).toUpperCase()}</span></td>
        <td className="editable-cell" onClick={e => editCell(e, f.id, 'room', 'text')} style={{ fontWeight: 500 }}>{f.room || <span style={{ color: '#ccc' }}>...</span>}</td>
        <td className="editable-cell" onClick={e => editCell(e, f.id, 'qty', 'text')} style={{ fontFamily: "'Source Code Pro',monospace", textAlign: 'center' }}>{f.qty || '1'}</td>
        <td className="editable-cell" onClick={e => editCell(e, f.id, 'manufacturer', 'text')} style={{ fontFamily: "'Source Code Pro',monospace", fontSize: 11, color: 'var(--accent)' }}>{f.manufacturer || <span style={{ color: '#ccc' }}>...</span>}</td>
        <td className="editable-cell" onClick={e => editCell(e, f.id, 'description', 'text')}>
          <div style={{ fontWeight: 500 }}>{f.description || f.model || <span style={{ color: '#ccc' }}>...</span>}</div>
          {f.model && f.description && <div style={{ fontFamily: "'Source Code Pro',monospace", fontSize: 10, color: '#aaa' }}>{f.model}</div>}
        </td>
        <td className="editable-cell price-cell" onClick={e => editCell(e, f.id, 'price', 'text')}>{f.price || <span style={{ color: '#ccc' }}>...</span>}</td>
        <td className="editable-cell" onClick={e => editCell(e, f.id, 'dimensions', 'text')} style={{ fontSize: 11, whiteSpace: 'normal', maxWidth: 140, wordBreak: 'break-word' }}>{f.dimensions || <span style={{ color: '#ccc' }}>...</span>}</td>
        <td className="editable-cell" onClick={e => editCell(e, f.id, 'finish', 'text')} style={{ fontSize: 11 }}>{f.finish || <span style={{ color: '#ccc' }}>...</span>}</td>
        <td className="link-cell">{f.url ? <a href={f.url} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}>... Link</a> : '...'}</td>
        <td className="editable-cell" style={{position:'relative'}}>
          <div className="status-dropdown-wrap" onClick={e => e.stopPropagation()}>
            <span className={`status-badge ${statusClass}`} style={{cursor:'pointer'}} onClick={() => setOpenStatusId(openStatusId === f.id ? null : f.id)}>{statusLabel}</span>
            <div className={`status-dropdown-menu ${openStatusId === f.id ? 'open' : ''}`}>
              {[{v:'option',label:'Option',color:'#b07020'},{v:'selected',label:'Selected',color:'#2a6049'},{v:'approved',label:'Approved',color:'#2e7d32'}].map(opt => (
                <div key={opt.v} className="status-dropdown-item" onClick={async () => {
                  setOpenStatusId(null)
                  const updated = fixtures.map(x => x.id === f.id ? {...x, status: opt.v} : x)
                  updateFixtures(updated)
                  await supabase.from('fixtures').update({status: opt.v}).eq('id', f.id)
                }}>
                  <span className="status-dot" style={{background:opt.color}} />
                  {opt.label}
                </div>
              ))}
            </div>
          </div>
        </td>
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


  // Get ordered list of all category keys
  const allCatKeys = Object.keys(catConfig)

  // Get custom columns for a given type
  function getCatCols(type) {
    return (catConfig[type]?.columns || [])
  }

  // Add a new category
  function addCategory(name) {
    const key = name.trim().toLowerCase().replace(/\s+/g, '_')
    if (!key || catConfig[key]) return
    const colors = ['#5a6a3a','#3a5a6a','#6a3a5a','#5a3a6a','#6a5a3a','#3a6a5a']
    const color = colors[Object.keys(catConfig).length % colors.length]
    setCatConfig(prev => ({ ...prev, [key]: { color, columns: [], label: name.trim() } }))
    setNewCatName('')
    showToast('Category added: ' + name.trim(), 'success')
  }

  // Delete a category (only if no fixtures use it)
  function deleteCategory(key) {
    if (['plumbing','lighting','hardware','appliance','finish','other'].includes(key)) {
      showToast('Cannot delete built-in categories', 'error'); return
    }
    const inUse = fixtures.some(f => f.type === key)
    if (inUse) { showToast('Remove all fixtures of this type first', 'error'); return }
    setCatConfig(prev => { const next = {...prev}; delete next[key]; return next })
    showToast('Category deleted', 'success')
  }

  // Add a custom column to a category
  function addCatColumn(catKey, colName) {
    const name = colName.trim()
    if (!name) return
    setCatConfig(prev => ({
      ...prev,
      [catKey]: { ...prev[catKey], columns: [...(prev[catKey].columns||[]), { key: name.toLowerCase().replace(/\s+/g,'_'), label: name }] }
    }))
    setNewColName('')
  }

  // Remove a custom column from a category
  function removeCatColumn(catKey, colKey) {
    setCatConfig(prev => ({
      ...prev,
      [catKey]: { ...prev[catKey], columns: (prev[catKey].columns||[]).filter(c => c.key !== colKey) }
    }))
  }

  // Update category color
  function setCatColor(catKey, color) {
    setCatConfig(prev => ({ ...prev, [catKey]: { ...prev[catKey], color } }))
  }

  // Rename a category label
  function renameCat(catKey, newLabel) {
    const label = newLabel.trim()
    if (!label) return
    setCatConfig(prev => ({ ...prev, [catKey]: { ...prev[catKey], label } }))
  }

  function exportCSV() {
    const projectName = activeProject?.name || 'Fixture-Schedule'
    const headers = ['#','Type','Room','Qty','Manufacturer','Model','Description','Price','Dimensions','Finish','URL','Status','Notes']
    const rows = fixtures.map((f, i) => [
      i+1, f.type, f.room, f.qty||'1', f.manufacturer, f.model, f.description,
      f.price, f.dimensions, f.finish, f.url, f.status, f.notes
    ].map(v => '"' + (v||'').toString().replace(/"/g, '""') + '"'))
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = projectName.replace(/\s+/g, '-') + '-Fixtures.csv'
    a.click()
    URL.revokeObjectURL(url)
    showToast('CSV exported', 'success')
  }

  function exportPDF() {
    const projectName = activeProject?.name || 'Fixture Schedule'
    const typeOrder = ['plumbing','lighting','hardware','appliance','finish','other']
    const groups = {}
    typeOrder.forEach(t => { groups[t] = fixtures.filter(f => f.type === t) })

    let rows = ''
    let idx = 0
    typeOrder.forEach(type => {
      const group = groups[type]
      if (!group.length) return
      rows += '<tr class="section-hdr"><td colspan="12">' + type.charAt(0).toUpperCase() + type.slice(1) + '</td></tr>'
      group.forEach(f => {
        idx++
        rows += '<tr>' +
          '<td>' + idx + '</td>' +
          '<td><span class="tag tag-' + (f.type||'other') + '">' + (f.type||'other').substring(0,4).toUpperCase() + '</span></td>' +
          '<td>' + (f.room||'') + '</td>' +
          '<td>' + (f.qty||'1') + '</td>' +
          '<td>' + (f.manufacturer||'') + '</td>' +
          '<td>' + (f.description||f.model||'') + (f.model&&f.description?'<br><small>'+f.model+'</small>':'') + '</td>' +
          '<td>' + (f.price||'') + '</td>' +
          '<td>' + (f.dimensions||'') + '</td>' +
          '<td>' + (f.finish||'') + '</td>' +
          '<td>' + (f.status||'') + '</td>' +
          '<td>' + (f.notes||'') + '</td>' +
          '<td>' + (f.url ? '<a href="'+f.url+'">Link</a>' : '') + '</td>' +
          '</tr>'
      })
    })

    let totalCost = 0, missing = 0
    fixtures.forEach(f => {
      const nums = (f.price||'').match(/[\d,]+\.?\d*/g)
      const vals = nums ? nums.map(n => parseFloat(n.replace(/,/g,''))).filter(n => !isNaN(n) && n > 0) : []
      const p = vals.length ? Math.min(...vals) : NaN
      if (!isNaN(p)) totalCost += p * (parseFloat(f.qty)||1)
      else missing++
    })
    const totalFmt = totalCost.toLocaleString('en-US',{style:'currency',currency:'USD',minimumFractionDigits:2})

    const html = '<!DOCTYPE html><html><head><meta charset="utf-8"><title>' + projectName + ' — Fixture Schedule</title><style>' +
      'body{font-family:Arial,sans-serif;font-size:10px;margin:20px;color:#1c1c1c}' +
      'h1{font-size:16px;font-weight:300;margin-bottom:4px}' +
      '.meta{font-size:10px;color:#888;margin-bottom:16px}' +
      'table{width:100%;border-collapse:collapse;font-size:9px}' +
      'th{background:#f7f7f7;border-bottom:1px solid #e4e4e4;padding:5px 6px;text-align:left;font-size:8px;text-transform:uppercase;letter-spacing:.05em;color:#999;white-space:nowrap}' +
      'td{padding:5px 6px;border-bottom:1px solid rgba(0,0,0,.04);vertical-align:top}' +
      'tr.section-hdr td{background:#f0f4f2;color:#2a6049;font-weight:600;font-size:9px;text-transform:uppercase;letter-spacing:.06em;padding:4px 6px;border-top:6px solid #fff}' +
      '.tag{display:inline-block;padding:1px 5px;border-radius:2px;color:#fff;font-size:7px;font-weight:600}' +
      '.tag-plumbing{background:#2d4a6b}.tag-lighting{background:#6b4a2d}.tag-hardware{background:#4a2d6b}.tag-appliance{background:#2d6b4a}.tag-finish{background:#6b2d4a}.tag-other{background:#555}' +
      '.total-row td{border-top:2px solid #e4e4e4;background:#f7f7f7;font-weight:600}' +
      '@media print{@page{margin:15mm;size:A3 landscape}body{margin:0}}' +
      '</style></head><body>' +
      '<h1>' + projectName + ' — Fixture Schedule</h1>' +
      '<div class="meta">' + fixtures.length + ' fixture' + (fixtures.length!==1?'s':'') + ' &nbsp;·&nbsp; Generated ' + new Date().toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'}) + '</div>' +
      '<table><thead><tr>' +
      '<th>#</th><th>Type</th><th>Room</th><th>Qty</th><th>Manufacturer</th><th>Model / Description</th><th>Price</th><th>Dimensions</th><th>Finish</th><th>Status</th><th>Notes</th><th>Link</th>' +
      '</tr></thead><tbody>' + rows +
      '<tr class="total-row"><td colspan="5"></td><td colspan="2">' +
      '<div style="font-size:8px;text-transform:uppercase;letter-spacing:.06em;color:#999">Estimated Total</div>' +
      '<div style="font-size:13px;font-family:monospace">' + totalFmt + '</div>' +
      (missing > 0 ? '<div style="font-size:8px;color:#bbb">+ '+missing+' without pricing</div>' : '') +
      '</td><td colspan="5"></td></tr>' +
      '</tbody></table></body></html>'

    const w = window.open('', '_blank')
    w.document.write(html)
    w.document.close()
    setTimeout(() => { w.print() }, 500)
    showToast('Opening print dialog...', 'success')
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
                    {editingProjId === p.id ? (
                      <input autoFocus defaultValue={p.name} onClick={e => e.stopPropagation()} style={{ flex:1, border:'1px solid var(--rule)', borderRadius:2, padding:'2px 6px', fontSize:12, outline:'none', width:130 }}
                        onBlur={e => { renameProject(p.id, e.target.value); setEditingProjId(null); }}
                        onKeyDown={e => { if(e.key==='Enter'){renameProject(p.id,e.target.value);setEditingProjId(null);} if(e.key==='Escape')setEditingProjId(null); }} />
                    ) : (
                      <span style={{flex:1}}>{p.name}</span>
                    )}
                    {projects.length > 1 && <button className="icon-btn danger" onClick={e => { e.stopPropagation(); deleteProject(p.id) }} style={{ opacity: 0.5, padding: '2px 6px', fontSize: 13 }}>×</button>}
                      <button className="icon-btn" title="Rename" onClick={e => { e.stopPropagation(); setEditingProjId(editingProjId === p.id ? null : p.id); }} style={{ opacity: 0.5, padding: '2px 5px', fontSize: 11 }}>✎</button>
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
          <div className="prefs-wrapper" onClick={e => e.stopPropagation()}>
            <button className={`prefs-btn ${prefsOpen ? 'active' : ''}`} onClick={() => setPrefsOpen(o => !o)} title="Search Preferences">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
              Search Prefs
            </button>
            <div className={`prefs-dropdown ${prefsOpen ? 'open' : ''}`}>
              <div className="prefs-header">Search Preferences</div>
              <div className="prefs-subhead">Applied to all AI searches</div>
              <div className="prefs-section">
                <div className="prefs-label">Project Type</div>
                <div className="prefs-chips">
                  {['residential','commercial','hospitality','healthcare'].map(v => (
                    <div key={v} className={`pref-chip ${prefs.projectType === v ? 'active' : ''}`} onClick={() => setPrefs(p => ({...p, projectType: p.projectType === v ? '' : v}))}>{v.charAt(0).toUpperCase()+v.slice(1)}</div>
                  ))}
                </div>
              </div>
              <div className="prefs-section">
                <div className="prefs-label">Budget Range</div>
                <div className="prefs-chips">
                  {['budget','mid-range','high-end','luxury'].map(v => (
                    <div key={v} className={`pref-chip ${prefs.budget === v ? 'active' : ''}`} onClick={() => setPrefs(p => ({...p, budget: p.budget === v ? '' : v}))}>{v.charAt(0).toUpperCase()+v.slice(1)}</div>
                  ))}
                </div>
              </div>
              <div className="prefs-section">
                <div className="prefs-label">Preferred Finish</div>
                <div className="prefs-chips">
                  {['Matte Black','Brushed Nickel','Polished Chrome','Brass','Bronze','White'].map(v => (
                    <div key={v} className={`pref-chip ${prefs.finish === v ? 'active' : ''}`} onClick={() => setPrefs(p => ({...p, finish: p.finish === v ? '' : v}))}>{v}</div>
                  ))}
                </div>
              </div>
              <div className="prefs-section">
                <div className="prefs-label">Preferred Manufacturers</div>
                <input className="prefs-input" value={prefs.manufacturers} onChange={e => setPrefs(p => ({...p, manufacturers: e.target.value}))} placeholder="e.g. Kohler, Lutron, Rejuvenation..." />
                <div style={{fontSize:10,color:'var(--ink-faint)',marginTop:4}}>Comma-separated, prioritised in results</div>
              </div>
              <div className="prefs-section">
                <div className="prefs-label">Additional Notes</div>
                <textarea className="prefs-input" value={prefs.notes} onChange={e => setPrefs(p => ({...p, notes: e.target.value}))} placeholder="e.g. ADA compliant, Energy Star, lead times under 8 weeks..." rows={2} style={{resize:'vertical'}} />
              </div>
              <div className="prefs-footer">
                <button className="btn btn-outline btn-sm" onClick={() => setPrefs({ projectType: 'residential', budget: 'mid-range', finish: '', manufacturers: '', notes: '' })}>Reset</button>
                <button className="btn btn-primary btn-sm" onClick={() => setPrefsOpen(false)}>Save Preferences</button>
              </div>
            </div>
          </div>
          <button className="btn btn-ghost" onClick={signOut}>Sign out</button>
          <button className="btn btn-ghost" onClick={exportPDF}>Export PDF</button>
          <button className="btn btn-ghost" onClick={exportCSV}>Export CSV</button>
          <button className="btn btn-primary" onClick={() => openModal()}>+ Add Fixture</button>
        </div>
      </header>

      <div className="app-body" onClick={() => { setProjDropOpen(false); setPrefsOpen(false); setOpenStatusId(null); }}>
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
            <button className="cat-config-btn" onClick={() => setCatModalOpen(true)}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
              Manage Categories
            </button>
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
              {Object.entries(catConfig).map(([key, cfg]) => (
                <div key={key} className={`cat-item ${typeFilter === key ? 'active' : ''}`} onClick={() => { setTypeFilter(key); setStatusFilter('all') }}>
                  <span style={{ display:'flex', alignItems:'center', gap:6, flex:1 }}>
                    <span style={{ width:8, height:8, borderRadius:'50%', background: cfg.color, flexShrink:0 }} />
                    {cfg.label || key.charAt(0).toUpperCase()+key.slice(1).replace(/_/g,' ')}
                  </span>
                  <span className="cat-count">{fixtures.filter(f => f.type === key).length}</span>
                </div>
              ))}
            </div>
          </div>

          {/* LIBRARY */}
          <div className={`sidebar-content ${sidebarTab === 'library' ? 'active' : ''}`}>
            <button className="lib-expand-btn" onClick={() => setLibExpanded(true)}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 3h6m0 0v6m0-6L14 10M9 21H3m0 0v-6m0 6l7-7"/></svg>
              Expand to full view
            </button>
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
                  {Array.from(new Set(sorted.flatMap(f => getCatCols(f.type).map(col => col.key)))).map(colKey => {
                    const label = Object.values(catConfig).flatMap(cat => cat.columns||[]).find(c => c.key === colKey)?.label || colKey
                    return <th key={colKey} style={{ minWidth: 80 }}>{label}</th>
                  })}
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
                {typeOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
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
            {form.type && getCatCols(form.type).map(col => (
              <div key={col.key} className="form-field full">
                <label className="form-label">{col.label}</label>
                <input className="form-input" value={form['custom_' + col.key] || ''} onChange={e => setForm(f => ({ ...f, ['custom_' + col.key]: e.target.value }))} placeholder={col.label + '...'} />
              </div>
            ))}
          </div>

          <div className="form-actions">
            <button className="btn btn-outline" onClick={() => setModalOpen(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={saveFixture}>Save Fixture</button>
          </div>
        </div>
      </div>

      {/* CATEGORY CONFIG MODAL */}
      <div className={`modal-overlay ${catModalOpen ? 'open' : ''}`} onClick={e => e.target === e.currentTarget && setCatModalOpen(false)}>
        <div className="modal cat-modal">
          <button className="modal-close" onClick={() => setCatModalOpen(false)}>x</button>
          <div className="modal-title">Manage Categories</div>

          <div className="cat-list">
            {Object.entries(catConfig).map(([key, cfg]) => {
              const label = cfg.label || key.charAt(0).toUpperCase()+key.slice(1).replace(/_/g,' ')
              const isBuiltIn = ['plumbing','lighting','hardware','appliance','finish','other'].includes(key)
              return (
                <div key={key} className="cat-row">
                  <span className="cat-color-dot" style={{ background: cfg.color }} title="Color" />
                  <span className="cat-row-name">{label}</span>
                  <div className="cat-col-chips">
                    {(cfg.columns||[]).map(col => (
                      <span key={col.key} className="cat-col-chip">
                        {col.label}
                        <button onClick={() => removeCatColumn(key, col.key)} title="Remove column">x</button>
                      </span>
                    ))}
                    {(cfg.columns||[]).length === 0 && <span style={{fontSize:10,color:'#ccc',fontStyle:'italic'}}>no custom columns</span>}
                  </div>
                  <div className="cat-row-actions">
                    <button className="btn btn-outline btn-sm" onClick={() => setEditingCat(editingCat === key ? null : key)}>Edit</button>
                    {!isBuiltIn && <button className="btn btn-sm" style={{background:'#fde8e8',color:'var(--danger)',border:'1px solid #f5c0c0'}} onClick={() => deleteCategory(key)}>Delete</button>}
                  </div>
                </div>
              )
            })}
          </div>

          {editingCat && catConfig[editingCat] && (
            <div className="cat-edit-section">
              <div className="cat-edit-title">Editing: {catConfig[editingCat].label || editingCat}</div>

              <div className="color-picker-row">
                <span style={{fontSize:11,color:'#999',marginRight:4}}>Color:</span>
                {["#2d4a6b","#6b4a2d","#4a2d6b","#2d6b4a","#6b2d4a","#555555","#5a6a3a","#3a5a6a","#6a5a3a","#3a6a5a","#b07020","#9b3030"].map(col => (
                  <div key={col} className={`color-swatch ${catConfig[editingCat]?.color === col ? 'selected' : ''}`}
                    style={{ background: col }} onClick={() => setCatColor(editingCat, col)} title={col} />
                ))}
              </div>

              {!['plumbing','lighting','hardware','appliance','finish','other'].includes(editingCat) && (
                <div className="cat-add-row" style={{marginBottom:10}}>
                  <span style={{fontSize:11,color:'#999',lineHeight:'28px',whiteSpace:'nowrap'}}>Rename:</span>
                  <input className="form-input" style={{flex:1,padding:'4px 8px',fontSize:12}}
                    defaultValue={catConfig[editingCat]?.label || editingCat}
                    onBlur={e => renameCat(editingCat, e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && renameCat(editingCat, e.target.value)} />
                </div>
              )}

              <div style={{fontSize:11,color:'#999',marginBottom:6}}>Add custom column:</div>
              <div className="cat-add-row">
                <input className="form-input" style={{flex:1,padding:'4px 8px',fontSize:12}}
                  value={newColName} onChange={e => setNewColName(e.target.value)}
                  placeholder="e.g. Foot Candles, BTU, Wattage..."
                  onKeyDown={e => e.key === 'Enter' && (addCatColumn(editingCat, newColName), setNewColName(''))} />
                <button className="btn btn-primary btn-sm" onClick={() => { addCatColumn(editingCat, newColName); setNewColName(''); }}>Add Column</button>
              </div>
            </div>
          )}

          <div style={{borderTop:'1px solid var(--rule)',paddingTop:14}}>
            <div style={{fontSize:11,color:'#999',marginBottom:6}}>Add new category:</div>
            <div className="new-cat-row">
              <input className="form-input" style={{flex:1,padding:'6px 10px',fontSize:13}}
                value={newCatName} onChange={e => setNewCatName(e.target.value)}
                placeholder="e.g. Heating, AV/Tech, Furniture..."
                onKeyDown={e => e.key === 'Enter' && addCategory(newCatName)} />
              <button className="btn btn-primary" onClick={() => addCategory(newCatName)}>Add Category</button>
            </div>
          </div>
        </div>
      </div>

      {/* LIBRARY FULL-PAGE MODAL */}
      <div className={`lib-modal-overlay ${libExpanded ? 'open' : ''}`} onClick={e => e.target === e.currentTarget && setLibExpanded(false)}>
        <div className="lib-modal">
          <div className="lib-modal-header">
            <div className="lib-modal-title">Fixture Library</div>
            <div style={{display:'flex',alignItems:'center',gap:10}}>
              <span style={{fontSize:12,color:'var(--ink-faint)'}}>{library.length} saved fixture{library.length !== 1 ? 's' : ''}</span>
              <button className="modal-close" onClick={() => setLibExpanded(false)}>x</button>
            </div>
          </div>
          <div className="lib-modal-body">
            {library.length === 0 ? (
              <div style={{textAlign:'center',padding:'60px 20px',color:'#bbb'}}>
                <div style={{fontSize:18,marginBottom:8}}>No saved fixtures yet</div>
                <div style={{fontSize:12}}>Click the bookmark icon on any row to save fixtures here.</div>
              </div>
            ) : (
              <div className="lib-grid">
                {library.map(item => (
                  <div key={item.id} className="lib-grid-card">
                    <div className="lib-mfr">{item.manufacturer}</div>
                    <div className="lib-name">{item.description || item.model || '-'}</div>
                    <div className="lib-meta">{[item.type, item.model, item.finish].filter(Boolean).join(' · ')}</div>
                    <div className="lib-price">{item.price}</div>
                    <div className="lib-actions">
                      <button className="btn btn-primary btn-sm" onClick={() => { addLibraryItem(item); setLibExpanded(false); }}>+ Add to Schedule</button>
                      <button className="btn btn-outline btn-sm" onClick={() => removeFromLibrary(item.id)}>Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* TOAST */}
      <div className={`toast ${toast.type} ${toast.show ? 'show' : ''}`}>{toast.msg}</div>
    </>
  )
}
