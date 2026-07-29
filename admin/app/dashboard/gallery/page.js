'use client';
import { useEffect, useState, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './page.module.css';

const API = 'http://localhost:4000/api';
const FIXED_CATEGORIES = [
  'Studio Services & Printing',
  'Outdoor Photography',
  'Outdoor Videography',
  'Teleprompter Services',
];

function Toast({ msg, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, []);
  return <div className={`toast ${type}`}>{msg}</div>;
}

const EMPTY = { category: 'Studio Services & Printing', imageUrl: '', description: '', featured: false };

function GalleryAdminContent() {
  const searchParams = useSearchParams();
  const [images,   setImages]   = useState([]);
  const [modal,    setModal]    = useState(false);
  const [editing,  setEditing]  = useState(null);
  const [form,     setForm]     = useState(EMPTY);
  const [saving,   setSaving]   = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [toast,    setToast]    = useState(null);
  const [filter,   setFilter]   = useState('All');
  const [preview,  setPreview]  = useState('');

  const token   = () => localStorage.getItem('admin_token');
  const headers = () => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` });
  const showToast = (msg, type = 'success') => setToast({ msg, type });

  const load = useCallback(async () => {
    try {
      const res = await fetch(`${API}/gallery`, { headers: { Authorization: `Bearer ${token()}` } });
      const data = await res.json();
      setImages(Array.isArray(data) ? data : []);
    } catch { setImages([]); }
  }, []);

  useEffect(() => { 
    load(); 
    if (searchParams.get('action') === 'new') {
      openNew();
    }
  }, [load, searchParams]);

  function openNew(cat)   { 
    setEditing(null); 
    setForm({ ...EMPTY, category: cat || FIXED_CATEGORIES[0] }); 
    setPreview(''); 
    setModal(true); 
  }

  function openEdit(img) {
    setEditing(img._id);
    setForm({ 
      category: img.category || FIXED_CATEGORIES[0], 
      imageUrl: img.imageUrl || '', 
      description: img.description || '', 
      featured: Boolean(img.featured) 
    });
    setPreview(img.imageUrl || '');
    setModal(true);
  }

  function closeModal() { setModal(false); setEditing(null); setPreview(''); }

  function onChange(e) {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setForm(f => ({ ...f, [name]: val }));
    if (name === 'imageUrl') setPreview(value);
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setForm(f => ({ ...f, imageUrl: base64 }));
      setPreview(base64);
    };
    reader.readAsDataURL(file);
  }

  async function handleSave(e) {
    e.preventDefault();
    if (!token()) {
      showToast('Session expired. Please log in again.', 'error');
      setTimeout(() => { window.location.href = '/'; }, 1500);
      return;
    }
    setSaving(true);
    try {
      const url    = editing ? `${API}/gallery/${editing}` : `${API}/gallery`;
      const method = editing ? 'PUT' : 'POST';
      const payload = {
        category: form.category,
        imageUrl: form.imageUrl,
        description: form.description,
        featured: form.featured,
        title: form.category,
      };
      const res    = await fetch(url, { method, headers: headers(), body: JSON.stringify(payload) });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.message || 'Failed to save content');
      }
      showToast(editing ? 'Content updated successfully!' : 'New content added successfully!');
      closeModal();
      load();
    } catch (err) {
      showToast(err.message || 'Error saving content', 'error');
    } finally { setSaving(false); }
  }

  async function handleDelete(id) {
    if (!confirm('Remove this content item from the category?')) return;
    setDeleting(id);
    try {
      const res = await fetch(`${API}/gallery/${id}`, { method: 'DELETE', headers: headers() });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.message || 'Failed to delete');
      }
      showToast('Content removed');
      load();
    } catch (err) { showToast(err.message || 'Error deleting', 'error'); }
    finally { setDeleting(null); }
  }

  const filtered = filter === 'All' ? images : images.filter(i => i.category === filter);

  return (
    <div className={styles.page}>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Category Content Management</h1>
          <p className={styles.sub}>Manage and upload media items across the 4 fixed studio categories</p>
        </div>
        <button className="btn-primary" onClick={() => openNew()}>+ Add New Content</button>
      </div>

      {/* Filter tabs */}
      <div className={styles.filters}>
        <button
          className={`${styles.filterBtn} ${filter === 'All' ? styles.filterActive : ''}`}
          onClick={() => setFilter('All')}
        >
          All Content ({images.length})
        </button>
        {FIXED_CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`${styles.filterBtn} ${filter === cat ? styles.filterActive : ''}`}
            onClick={() => setFilter(cat)}
          >
            {cat} ({images.filter(i => i.category === cat).length})
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <p>No content added to {filter === 'All' ? 'any category' : filter} yet.</p>
          <button className="btn-primary" onClick={() => openNew(filter === 'All' ? null : filter)} style={{ marginTop: '1rem' }}>
            + Add Content to {filter === 'All' ? 'Category' : filter}
          </button>
        </div>
      ) : (
        <div className={styles.grid}>
          {filtered.map(img => (
            <div key={img._id} className={styles.imgCard}>
              <div className={styles.imgWrap}>
                {img.imageUrl ? (
                  <img src={img.imageUrl} alt={img.category} className={styles.img} />
                ) : (
                  <div className={styles.imgPlaceholder}>📷</div>
                )}
                {img.featured && <span className={styles.featuredBadge}>★ Homepage</span>}
                <div className={styles.imgOverlay}>
                  <button className="btn-ghost" onClick={() => openEdit(img)}>Edit</button>
                  <button className="btn-danger" onClick={() => handleDelete(img._id)} disabled={deleting === img._id}>
                    {deleting === img._id ? '…' : 'Remove'}
                  </button>
                </div>
              </div>
              <div className={styles.imgInfo}>
                <span className={styles.catTag}>{img.category}</span>
                {img.description && <p className={styles.imgDesc}>{img.description}</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {modal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && closeModal()}>
          <div className="modal-box">
            <div className="modal-header">
              <h3>{editing ? 'Edit Category Content' : 'Add New Category Content'}</h3>
              <button className="btn-ghost" onClick={closeModal}>✕</button>
            </div>
            <form onSubmit={handleSave}>
              <div className="modal-body">
                {/* 1. Category Dropdown (Required - FIRST FIELD) */}
                <div className="form-group">
                  <label className="form-label">Select Category *</label>
                  <select name="category" value={form.category} onChange={onChange} required style={{ fontWeight: '600' }}>
                    {FIXED_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                {/* 2. Image Upload */}
                <div className="form-group">
                  <label className="form-label">Upload Image File *</label>
                  <input type="file" accept="image/*" onChange={handleFileChange} style={{ padding: '0.4rem 0' }} />
                </div>

                <div className="form-group">
                  <label className="form-label">Or Image URL</label>
                  <input name="imageUrl" value={form.imageUrl} onChange={onChange} required placeholder="https://… or Base64 data" />
                </div>

                {preview && (
                  <div className={styles.previewWrap}>
                    <img src={preview} alt="preview" className={styles.previewImg} onError={() => setPreview('')} />
                  </div>
                )}

                {/* 3. Description (Optional) */}
                <div className="form-group">
                  <label className="form-label">Description (Optional)</label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={onChange}
                    rows={3}
                    placeholder="Enter short description or highlights for this category item"
                    style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid #E2E8F0', fontFamily: 'inherit', fontSize: '0.88rem' }}
                  />
                </div>

                {/* 4. Show on Homepage Checkbox */}
                <label className={styles.checkRow}>
                  <input type="checkbox" name="featured" checked={form.featured} onChange={onChange} />
                  <span>Show on Homepage Gallery Showcase</span>
                </label>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-ghost" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={saving}>
                  {saving ? 'Saving…' : editing ? 'Update Content' : 'Save Content'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function GalleryAdmin() {
  return (
    <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center', color: '#64748B' }}>Loading gallery...</div>}>
      <GalleryAdminContent />
    </Suspense>
  );
}
