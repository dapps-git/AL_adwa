'use client';
import { useEffect, useState, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './page.module.css';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
const FIXED_CATEGORIES = [
  'School Photography',
  'Studio Services & Printing',
  'Outdoor Photography',
  'Outdoor Videography',
  'Teleprompter Services',
];

function Toast({ msg, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, []);
  return (
    <div className={`toast ${type}`}>
      <span>{type === 'error' ? '✕' : '✓'}</span>
      <span>{msg}</span>
    </div>
  );
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
  const [isDragging, setIsDragging] = useState(false);

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

  function openNew(cat) { 
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

  function processFile(file) {
    if (!file || !file.type.startsWith('image/')) {
      showToast('Please select a valid image file', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setForm(f => ({ ...f, imageUrl: base64 }));
      setPreview(base64);
    };
    reader.readAsDataURL(file);
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    processFile(file);
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
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
      showToast(editing ? 'Photo updated successfully!' : 'New photo added successfully!');
      closeModal();
      load();
    } catch (err) {
      showToast(err.message || 'Error saving photo', 'error');
    } finally { setSaving(false); }
  }

  async function handleDelete(id) {
    if (!confirm('Are you sure you want to remove this photo from the gallery?')) return;
    setDeleting(id);
    try {
      const res = await fetch(`${API}/gallery/${id}`, { method: 'DELETE', headers: headers() });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.message || 'Failed to delete photo');
      }
      showToast('Photo removed from gallery');
      load();
    } catch (err) { showToast(err.message || 'Error deleting photo', 'error'); }
    finally { setDeleting(null); }
  }

  const filtered = filter === 'All' ? images : images.filter(i => i.category === filter);
  const featuredCount = images.filter(i => i.featured).length;

  return (
    <div className={styles.page}>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      {/* Header Banner */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Gallery Photo Management</h1>
          <p className={styles.sub}>Upload, organize, and showcase studio photography across categories</p>
        </div>
        <button className="btn-primary" onClick={() => openNew()}>
          <span>+</span> Upload New Photo
        </button>
      </div>

      {/* Stats Summary Bar */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>🖼️</div>
          <div>
            <span className={styles.statValue}>{images.length}</span>
            <span className={styles.statLabel}>Total Photos</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>📁</div>
          <div>
            <span className={styles.statValue}>{FIXED_CATEGORIES.length}</span>
            <span className={styles.statLabel}>Active Categories</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>★</div>
          <div>
            <span className={styles.statValue}>{featuredCount}</span>
            <span className={styles.statLabel}>Featured on Homepage</span>
          </div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className={styles.filtersSection}>
        <div className={styles.filters}>
          <button
            className={`${styles.filterBtn} ${filter === 'All' ? styles.filterActive : ''}`}
            onClick={() => setFilter('All')}
          >
            All Photos ({images.length})
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
      </div>

      {/* Photo Grid */}
      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>📷</div>
          <h3>No photos in this category</h3>
          <p>Click below to upload the first photo to {filter === 'All' ? 'the gallery' : filter}.</p>
          <button className="btn-primary" onClick={() => openNew(filter === 'All' ? null : filter)}>
            + Upload Photo to {filter === 'All' ? 'Gallery' : filter}
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
                  <button className="btn-ghost" onClick={() => openEdit(img)}>✏ Edit</button>
                  <button className="btn-danger" onClick={() => handleDelete(img._id)} disabled={deleting === img._id}>
                    {deleting === img._id ? '…' : '🗑 Delete'}
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
              <h3>{editing ? 'Edit Gallery Photo' : 'Upload New Gallery Photo'}</h3>
              <button className="btn-ghost" onClick={closeModal}>✕</button>
            </div>
            <form onSubmit={handleSave}>
              <div className="modal-body">
                {/* 1. Category Dropdown */}
                <div className="form-group">
                  <label className="form-label">Select Category *</label>
                  <select name="category" value={form.category} onChange={onChange} required style={{ fontWeight: '600' }}>
                    {FIXED_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                {/* 2. Drag & Drop File Uploader Zone */}
                <div className="form-group">
                  <label className="form-label">Photo File Upload *</label>
                  <div
                    className={`${styles.dropZone} ${isDragging ? styles.dropZoneActive : ''}`}
                    onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                  >
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileChange} 
                      className={styles.fileInputHidden}
                      id="photo-upload-input"
                    />
                    <label htmlFor="photo-upload-input" className={styles.dropZoneLabel}>
                      <span className={styles.dropIcon}>📁</span>
                      <span className={styles.dropTitle}>Click or Drag photo file here</span>
                      <span className={styles.dropSub}>PNG, JPG, WEBP formats supported</span>
                    </label>
                  </div>
                </div>

                {/* Image URL fallback */}
                <div className="form-group">
                  <label className="form-label">Or Direct Image URL</label>
                  <input 
                    name="imageUrl" 
                    value={form.imageUrl} 
                    onChange={onChange} 
                    required 
                    placeholder="https://… or image data string" 
                  />
                </div>

                {/* Preview Frame */}
                {preview && (
                  <div className={styles.previewWrap}>
                    <span className={styles.previewTag}>Photo Preview</span>
                    <img src={preview} alt="preview" className={styles.previewImg} onError={() => setPreview('')} />
                  </div>
                )}

                {/* 3. Description */}
                <div className="form-group">
                  <label className="form-label">Photo Description / Highlights (Optional)</label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={onChange}
                    rows={3}
                    placeholder="Enter short description or highlights for this gallery item"
                  />
                </div>

                {/* 4. Show on Homepage Checkbox */}
                <label className={styles.checkRow}>
                  <input type="checkbox" name="featured" checked={form.featured} onChange={onChange} />
                  <span>Feature on Homepage Gallery Preview Slider</span>
                </label>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-ghost" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={saving}>
                  {saving ? 'Saving…' : editing ? 'Update Photo' : 'Save Photo'}
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
    <Suspense fallback={<div style={{ padding: '3rem', textAlign: 'center', color: '#8E95A8' }}>Loading Gallery Dashboard...</div>}>
      <GalleryAdminContent />
    </Suspense>
  );
}
