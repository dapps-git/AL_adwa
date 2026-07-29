'use client';
import { useEffect, useState, useCallback } from 'react';
import styles from './page.module.css';

const API = 'http://localhost:4000/api';
const CATEGORIES = ['Photography', 'Videography', 'Teleprompter', 'Studio', 'Events', 'Tips', 'General'];

function Toast({ msg, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, []);
  return <div className={`toast ${type}`}>{msg}</div>;
}

const EMPTY = { title: '', slug: '', excerpt: '', content: '', coverImg: '', category: 'General', author: 'AL ADHWA Team', published: true, tags: '' };

export default function BlogAdmin() {
  const [blogs,    setBlogs]   = useState([]);
  const [modal,    setModal]   = useState(false);
  const [editing,  setEditing] = useState(null);   // null = new
  const [form,     setForm]    = useState(EMPTY);
  const [saving,   setSaving]  = useState(false);
  const [deleting, setDeleting]= useState(null);
  const [toast,    setToast]   = useState(null);
  const [search,   setSearch]  = useState('');

  const token = () => localStorage.getItem('admin_token');
  const headers = () => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` });

  const showToast = (msg, type = 'success') => setToast({ msg, type });

  const load = useCallback(async () => {
    try {
      const res = await fetch(`${API}/blogs/admin/all`, { headers: { Authorization: `Bearer ${token()}` } });
      const data = await res.json();
      setBlogs(Array.isArray(data) ? data : []);
    } catch { setBlogs([]); }
  }, []);

  useEffect(() => { load(); }, [load]);

  function openNew() { setEditing(null); setForm(EMPTY); setModal(true); }
  function openEdit(blog) {
    setEditing(blog._id);
    setForm({ ...blog, tags: (blog.tags || []).join(', ') });
    setModal(true);
  }
  function closeModal() { setModal(false); setEditing(null); }

  function onChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  }

  // Auto-generate slug from title
  function onTitleChange(e) {
    const title = e.target.value;
    const slug = title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
    setForm(f => ({ ...f, title, slug }));
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [] };
      const url    = editing ? `${API}/blogs/${editing}` : `${API}/blogs`;
      const method = editing ? 'PUT' : 'POST';
      const res    = await fetch(url, { method, headers: headers(), body: JSON.stringify(payload) });
      if (!res.ok) { const d = await res.json(); throw new Error(d.message); }
      showToast(editing ? 'Blog updated!' : 'Blog created!');
      closeModal();
      load();
    } catch (err) {
      showToast(err.message || 'Error saving blog', 'error');
    } finally { setSaving(false); }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this blog post?')) return;
    setDeleting(id);
    try {
      await fetch(`${API}/blogs/${id}`, { method: 'DELETE', headers: headers() });
      showToast('Blog deleted');
      load();
    } catch { showToast('Error deleting', 'error'); }
    finally { setDeleting(null); }
  }

  const filtered = blogs.filter(b =>
    b.title?.toLowerCase().includes(search.toLowerCase()) ||
    b.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.page}>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Blog Posts</h1>
          <p className={styles.sub}>{blogs.length} posts total</p>
        </div>
        <button className="btn-primary" onClick={openNew}>+ New Post</button>
      </div>

      {/* Search */}
      <div className={styles.toolbar}>
        <input
          className={styles.searchInput}
          placeholder="Search posts…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <p>No blog posts yet.</p>
          <button className="btn-primary" onClick={openNew} style={{ marginTop: '1rem' }}>Create your first post</button>
        </div>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Author</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(blog => (
                <tr key={blog._id}>
                  <td>
                    <p className={styles.blogTitle}>{blog.title}</p>
                    <p className={styles.blogSlug}>/{blog.slug}</p>
                  </td>
                  <td><span className={styles.catTag}>{blog.category}</span></td>
                  <td className={styles.muted}>{blog.author}</td>
                  <td>
                    <span className={`badge ${blog.published ? 'badge-published' : 'badge-draft'}`}>
                      {blog.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className={styles.muted}>{new Date(blog.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className={styles.actions}>
                      <button className="btn-ghost" onClick={() => openEdit(blog)}>Edit</button>
                      <button className="btn-danger" onClick={() => handleDelete(blog._id)} disabled={deleting === blog._id}>
                        {deleting === blog._id ? '…' : 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && closeModal()}>
          <div className="modal-box">
            <div className="modal-header">
              <h3>{editing ? 'Edit Blog Post' : 'New Blog Post'}</h3>
              <button className="btn-ghost" onClick={closeModal}>✕</button>
            </div>
            <form onSubmit={handleSave}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Title *</label>
                  <input name="title" value={form.title} onChange={onTitleChange} required placeholder="Blog post title" />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Slug</label>
                    <input name="slug" value={form.slug} onChange={onChange} placeholder="auto-generated" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select name="category" value={form.category} onChange={onChange}>
                      {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Cover Image URL</label>
                  <input name="coverImg" value={form.coverImg} onChange={onChange} placeholder="https://… or /img/photo.webp" />
                </div>
                <div className="form-group">
                  <label className="form-label">Excerpt</label>
                  <textarea name="excerpt" value={form.excerpt} onChange={onChange} rows={2} placeholder="Short description shown in blog listing…" />
                </div>
                <div className="form-group">
                  <label className="form-label">Content</label>
                  <textarea name="content" value={form.content} onChange={onChange} rows={8} placeholder="Full blog post content…" />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Author</label>
                    <input name="author" value={form.author} onChange={onChange} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Tags (comma separated)</label>
                    <input name="tags" value={form.tags} onChange={onChange} placeholder="photography, UAE, studio" />
                  </div>
                </div>
                <label className={styles.checkRow}>
                  <input type="checkbox" name="published" checked={form.published} onChange={onChange} />
                  <span>Published (visible on website)</span>
                </label>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-ghost" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={saving}>
                  {saving ? 'Saving…' : editing ? 'Update Post' : 'Create Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
